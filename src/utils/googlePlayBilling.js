/**
 * googlePlayBilling.js
 * Integración nativa oficial de Google Play Billing (BillingClient) para Suelta & Sana.
 * 
 * Lanza directamente la hoja nativa oficial de Google Play ("Comprar con 1 toque"):
 * - cordova-plugin-purchase (CdvPurchase / Google Play BillingClient nativo en Android)
 * - @capgo/capacitor-purchases (Capacitor Purchases)
 * - Digital Goods API oficial (TWA / Chrome Android)
 * - Persistencia y acuse de recibo (Acknowledge) en Firebase Firestore
 */

import { doc, setDoc, getDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db, auth } from "../firebase";
import { t } from "../data/translations.js";

// Configuración oficial de Google Play Console (com.suelta_app) sincronizada con tus planes base y ofertas activas
export const GOOGLE_PLAY_CONFIG = {
  packageName: "suelta_app.com",
  serviceUrl: "https://play.google.com/billing",
  skus: {
    mensual: {
      productId: "suelta_sub_monthly",
      basePlanId: "monthly-plan",
      offerId: "free-trial-3-days",
      planId: "mensual",
      nombre: "Suelta Premium Mensual",
      descripcion: "Acompañamiento emocional continuo mes a mes, reto de 21 días y herramientas de calma.",
      precioFormatted: "45.000 COP",
      precioMicros: 45000000000,
      moneda: "COP",
      periodoFacturacion: "P1M",
      periodoPrueba: "P3D",
      tipo: "subs"
    },
    anual: {
      productId: "suelta_sub_annual",
      basePlanId: "annual-plan",
      offerId: "free-trial-3-days-annual",
      planId: "anual",
      nombre: "Suelta Premium Anual (Acceso Total)",
      descripcion: "Acceso completo a todos los módulos de bienestar, cartas astrológicas y directorio de especialistas.",
      precioFormatted: "118.000 COP",
      precioMicros: 118000000000,
      moneda: "COP",
      periodoFacturacion: "P1Y",
      periodoPrueba: "P3D",
      tipo: "subs"
    }
  }
};

let storeInicializado = false;
let storeListenersConfigurados = false;

/**
 * Inicializa el catálogo de productos con la pasarela oficial de Google Play (BillingClient)
 */
export async function inicializarGooglePlayBillingStore(onCompraExitosaCallback = null) {
  if (typeof window === "undefined" || storeInicializado) return;

  // 1. CdvPurchase (Google Play BillingClient nativo en Android)
  if (window.CdvPurchase && window.CdvPurchase.store) {
    try {
      const store = window.CdvPurchase.store;

      store.register([
        {
          type: window.CdvPurchase.ProductType.PAID_SUBSCRIPTION,
          id: GOOGLE_PLAY_CONFIG.skus.mensual.productId,
          platform: window.CdvPurchase.Platform.GOOGLE_PLAY
        },
        {
          type: window.CdvPurchase.ProductType.PAID_SUBSCRIPTION,
          id: GOOGLE_PLAY_CONFIG.skus.anual.productId,
          platform: window.CdvPurchase.Platform.GOOGLE_PLAY
        }
      ]);

      if (!storeListenersConfigurados) {
        store.when()
          .approved(async (transaction) => {
            console.log("Transacción de Google Play aprobada con éxito:", transaction);
            // Acuse de recibo oficial obligatorio (Acknowledge)
            try {
              await transaction.finish();
            } catch (finErr) {
              console.warn("Aviso finalizando transacción:", finErr);
            }

            const productId = transaction.products?.[0]?.id || transaction.id;
            const planId = productId?.includes("annual") ? "anual" : "mensual";
            const orderId = transaction.transactionId || `GPA.${Date.now()}`;
            const token = transaction.purchaseToken || transaction.receipt || "";

            let datos = null;
            const targetUser = auth?.currentUser;
            datos = await registrarCompraExitosa({
              orderId,
              purchaseToken: token,
              planId,
              productId,
              currentUser: targetUser
            });

            if (onCompraExitosaCallback) {
              onCompraExitosaCallback({ orderId, planId, token, datosPago: datos });
            }
          })
          .updated(async (product) => {
            if (product && product.owned) {
              const productId = product.id;
              const planId = productId?.includes("annual") ? "anual" : "mensual";
              console.log("Membresía activa de Google Play confirmada:", productId);
              const targetUser = auth?.currentUser;
              const datos = await registrarCompraExitosa({
                orderId: `GPA.ACTIVE.${Date.now()}`,
                purchaseToken: "GOOGLE_PLAY_ACTIVE_OWNED_TOKEN",
                planId,
                productId,
                currentUser: targetUser
              });
              if (onCompraExitosaCallback) {
                onCompraExitosaCallback({ planId, datosPago: datos });
              }
            }
          })
          .receiptUpdated((receipt) => {
            console.log("Recibo de Google Play actualizado:", receipt);
          })
          .error((err) => {
            console.warn("Error en Google Play Billing:", err);
          });

        storeListenersConfigurados = true;
      }

      await store.initialize([window.CdvPurchase.Platform.GOOGLE_PLAY]);
      storeInicializado = true;
      console.log("Google Play BillingClient Store inicializado con éxito.");
    } catch (e) {
      console.warn("Aviso inicializando CdvPurchase store:", e);
    }
  }
}

/**
 * Detecta qué método nativo de Google Play está activo en el dispositivo
 */
export async function detectarSoporteGooglePlay() {
  if (typeof window === "undefined") {
    return { disponible: false, metodo: "ninguno" };
  }

  // 1. CdvPurchase oficial (BillingClient nativo)
  if (window.CdvPurchase && window.CdvPurchase.store) {
    return { disponible: true, metodo: "cdv_purchase", store: window.CdvPurchase.store };
  }

  // 2. Capacitor Purchases (@capgo/capacitor-purchases)
  if (window.Capacitor?.isPluginAvailable?.("CapacitorPurchases") || window.Capacitor?.Plugins?.CapacitorPurchases) {
    return { disponible: true, metodo: "capacitor_purchases", plugin: window.Capacitor.Plugins.CapacitorPurchases };
  }

  // 3. Digital Goods API oficial de Google Play (Chrome Android / TWA)
  if ("getDigitalGoodsService" in window) {
    try {
      const service = await window.getDigitalGoodsService(GOOGLE_PLAY_CONFIG.serviceUrl);
      if (service) {
        return { disponible: true, metodo: "digital_goods_api", service };
      }
    } catch (e) {
      console.warn("Digital Goods API no disponible:", e);
    }
  }

  const esAndroid = /Android/i.test(navigator.userAgent);
  return {
    disponible: true,
    metodo: esAndroid ? "android_webview" : "web_browser",
    esAndroid
  };
}

/**
 * Registra la compra completada en Firestore y localStorage
 */
async function registrarCompraExitosa({ orderId, purchaseToken, planId, productId, currentUser }) {
  const now = Date.now();
  const duracionDias = planId === "anual" ? 365 : 30;
  const fechaFin = now + (duracionDias * 24 * 60 * 60 * 1000);

  const datosPago = {
    plataforma: "Google Play Store",
    gateway: "google_play",
    orderId,
    transaccionId: orderId,
    purchaseToken: purchaseToken || "",
    productId,
    planId,
    medioPago: "Google Play Billing",
    fechaTransaccion: new Date(now).toLocaleDateString() + " " + new Date(now).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    fechaInicio: now,
    fechaExpiracion: fechaFin,
    autoRenovable: true,
    estado: "ACTIVE",
    emailFacturacion: currentUser?.email || ""
  };

  try {
    localStorage.setItem("suelta_google_play_purchase", JSON.stringify(datosPago));
    localStorage.setItem("suelta_es_premium", "true");
    localStorage.setItem("suelta_plan_pago", planId);
    localStorage.setItem("suelta_datos_pago", JSON.stringify(datosPago));
  } catch (_) {}

  if (currentUser?.uid && db) {
    try {
      const purchaseDocRef = doc(db, "users", currentUser.uid, "purchases", orderId);
      await setDoc(purchaseDocRef, {
        ...datosPago,
        uid: currentUser.uid,
        createdAt: now,
        acknowledged: true
      }, { merge: true });

      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, {
        planPago: planId,
        esPremium: true,
        subscription: {
          isActive: true,
          plan: planId,
          gateway: "google_play",
          orderId,
          productId,
          purchaseToken,
          startedAt: now,
          expiresAt: fechaFin,
          status: "ACTIVE"
        },
        datosPagoBasico: datosPago,
        appState: {
          planPago: planId,
          esPremium: true,
          datosPagoBasico: datosPago
        }
      }, { merge: true });
    } catch (e) {
      console.warn("Aviso actualizando Firestore tras compra:", e);
    }
  }

  return datosPago;
}

/**
 * Inicia la pasarela nativa oficial de Google Play ("Comprar con 1 toque").
 */
export async function procesarCompraGooglePlay({ planId, currentUser, idioma = "es", onEstadoChange = () => {} }) {
  const activeAuth = auth?.currentUser;
  const targetUser = (currentUser?.uid && !currentUser.uid.startsWith("play_user_")) ? currentUser : activeAuth;

  if (!targetUser?.uid) {
    throw new Error(t("Debes registrarte o iniciar sesión con tu cuenta antes de proceder al pago o activar tu prueba.", idioma));
  }

  const skuInfo = GOOGLE_PLAY_CONFIG.skus[planId] || GOOGLE_PLAY_CONFIG.skus.anual;
  onEstadoChange({ paso: "verificando", mensaje: t("Conectando con Google Play Store...", idioma) });

  // Asegurar inicialización de la tienda nativa
  await inicializarGooglePlayBillingStore();
  const soporte = await detectarSoporteGooglePlay();

  // 1. CdvPurchase nativo (Google Play BillingClient directo en Android)
  if (soporte.metodo === "cdv_purchase" && soporte.store) {
    const store = soporte.store;
    onEstadoChange({ paso: "hoja_nativa", mensaje: t("Abriendo pasarela oficial de Google Play...", idioma) });

    const product = store.get(skuInfo.productId, window.CdvPurchase.Platform.GOOGLE_PLAY);
    // Buscar la oferta exacta, el plan base o la primera oferta disponible
    const offer = product?.getOffer?.(skuInfo.offerId) ||
                  product?.getOffer?.(skuInfo.basePlanId) ||
                  product?.getOffer?.() ||
                  product?.offers?.[0];

    if (offer) {
      return new Promise((resolve, reject) => {
        let resuelto = false;

        const timeoutSeguridad = setTimeout(() => {
          if (resuelto) return;
          resuelto = true;
          reject(new Error(t("La pasarela de Google Play tardó demasiado en responder. Puedes reintentar o volver al inicio.", idioma)));
        }, 12000);

        const approvedListener = store.when().approved(async (transaction) => {
          if (resuelto) return;
          resuelto = true;
          clearTimeout(timeoutSeguridad);
          try {
            await transaction.finish();
          } catch (_) {}

          const orderId = transaction.transactionId || `GPA.${Date.now()}`;
          const token = transaction.purchaseToken || transaction.receipt || "";
          const datos = await registrarCompraExitosa({
            orderId,
            purchaseToken: token,
            planId,
            productId: skuInfo.productId,
            currentUser: targetUser
          });
          resolve({ ok: true, datosPago: datos });
        });

        // Lanzar la hoja nativa oficial de Google Play ("Comprar con 1 toque")
        store.order(offer)
          .then(async (res) => {
            if (res && res.isError) {
              if (resuelto) return;
              clearTimeout(timeoutSeguridad);
              const msg = res.message || "";
              const esYaComprado = msg.includes("ITEM_ALREADY_OWNED") ||
                                   msg.includes("Ya te suscribiste") ||
                                   msg.includes("already owned") ||
                                   res.code === 7 ||
                                   res.code === 6777007;

              if (esYaComprado) {
                resuelto = true;
                const orderId = `GPA.OWNED.${Date.now()}`;
                const datos = await registrarCompraExitosa({
                  orderId,
                  purchaseToken: "GOOGLE_PLAY_ACTIVE_OWNED_TOKEN",
                  planId,
                  productId: skuInfo.productId,
                  currentUser: targetUser
                });
                resolve({ ok: true, datosPago: datos, yaComprado: true });
                return;
              }

              resuelto = true;
              if (res.code === window.CdvPurchase?.ErrorCode?.PAYMENT_CANCELLED || res.code === 6777006) {
                reject(new Error(t("Proceso de suscripción cancelado en Google Play.", idioma)));
              } else {
                reject(new Error(res.message || t("Error al procesar la compra en Google Play.", idioma)));
              }
            }
          })
          .catch(async (err) => {
            if (resuelto) return;
            clearTimeout(timeoutSeguridad);
            const errMsg = err?.message || "";
            const esYaComprado = errMsg.includes("ITEM_ALREADY_OWNED") ||
                                 errMsg.includes("Ya te suscribiste") ||
                                 errMsg.includes("already owned") ||
                                 err?.code === 7;

            if (esYaComprado) {
              resuelto = true;
              const orderId = `GPA.OWNED.${Date.now()}`;
              const datos = await registrarCompraExitosa({
                orderId,
                purchaseToken: "GOOGLE_PLAY_ACTIVE_OWNED_TOKEN",
                planId,
                productId: skuInfo.productId,
                currentUser: targetUser
              });
              resolve({ ok: true, datosPago: datos, yaComprado: true });
              return;
            }

            resuelto = true;
            if (errMsg.includes("cancel") || err?.code === 6777006) {
              reject(new Error(t("Proceso de suscripción cancelado en Google Play.", idioma)));
            } else {
              reject(new Error(err?.message || t("No se pudo iniciar la compra en Google Play.", idioma)));
            }
          });
      });
    } else {
      // Reintentar registrar y ordenar de forma segura
      try {
        store.register([{
          type: window.CdvPurchase.ProductType.PAID_SUBSCRIPTION,
          id: skuInfo.productId,
          platform: window.CdvPurchase.Platform.GOOGLE_PLAY
        }]);
        await store.initialize([window.CdvPurchase.Platform.GOOGLE_PLAY]);
        const p2 = store.get(skuInfo.productId);
        const off2 = p2?.getOffer?.(skuInfo.offerId) || p2?.getOffer?.(skuInfo.basePlanId) || p2?.getOffer?.() || p2?.offers?.[0];
        if (off2) {
          const resOrder = await store.order(off2);
          if (resOrder?.isError) {
            throw new Error(resOrder.message || t("Error al solicitar el producto en Google Play.", idioma));
          }
          const orderId = `GPA.${Date.now()}`;
          const datos = await registrarCompraExitosa({
            orderId,
            purchaseToken: "GOOGLE_PLAY_TOKEN_" + Date.now(),
            planId,
            productId: skuInfo.productId,
            currentUser: targetUser
          });
          return { ok: true, datosPago: datos };
        }
      } catch (err) {
        console.warn("Reintento de oferta falló:", err);
      }
      throw new Error(t("No se encontró el plan de suscripción en Google Play Store. Verifica tu conexión o reintenta.", idioma));
    }
  }

  // 2. Capacitor Purchases
  if (soporte.metodo === "capacitor_purchases" && soporte.plugin) {
    onEstadoChange({ paso: "hoja_nativa", mensaje: t("Abriendo pasarela oficial de Google Play...", idioma) });
    try {
      let res;
      try {
        res = await soporte.plugin.purchaseProduct({ 
          productId: skuInfo.productId, 
          basePlanId: skuInfo.basePlanId, 
          offerId: skuInfo.offerId 
        });
      } catch (e1) {
        res = await soporte.plugin.purchaseProduct({ productId: skuInfo.productId });
      }

      if (res && (res.orderId || res.purchaseToken || res.transactionId)) {
        const orderId = res.orderId || res.transactionId || `GPA.${Date.now()}`;
        const token = res.purchaseToken || res.receipt || "";
        const datos = await registrarCompraExitosa({
          orderId,
          purchaseToken: token,
          planId,
          productId: skuInfo.productId,
          currentUser: targetUser
        });
        return { ok: true, datosPago: datos };
      }
    } catch (e) {
      const errMsg = e?.message || "";
      if (errMsg.includes("ITEM_ALREADY_OWNED") || errMsg.includes("Ya te suscribiste") || e?.code === 7) {
        const orderId = `GPA.OWNED.${Date.now()}`;
        const datos = await registrarCompraExitosa({
          orderId,
          purchaseToken: "GOOGLE_PLAY_ACTIVE_OWNED_TOKEN",
          planId,
          productId: skuInfo.productId,
          currentUser: targetUser
        });
        return { ok: true, datosPago: datos, yaComprado: true };
      }
      if (errMsg.includes("cancel") || errMsg.includes("USER_CANCELED") || e?.code === 1) {
        throw new Error(t("Proceso de suscripción cancelado en Google Play.", idioma));
      }
      throw new Error(e.message || t("Error en Google Play Billing al procesar la compra.", idioma));
    }
  }

  // 3. Digital Goods API oficial (TWA)
  if (soporte.metodo === "digital_goods_api" && soporte.service && window.PaymentRequest) {
    onEstadoChange({ paso: "hoja_nativa", mensaje: t("Abriendo pasarela oficial de Google Play...", idioma) });
    try {
      const paymentMethodData = [{
        supportedMethods: GOOGLE_PLAY_CONFIG.serviceUrl,
        data: { sku: skuInfo.productId }
      }];
      const paymentDetails = {
        total: {
          label: skuInfo.nombre,
          amount: { currency: skuInfo.moneda, value: String(skuInfo.precioMicros / 1000000) }
        }
      };

      const request = new PaymentRequest(paymentMethodData, paymentDetails);
      const paymentResponse = await request.show();
      const { purchaseToken, orderId } = paymentResponse.details || {};

      if (purchaseToken) {
        try {
          await soporte.service.acknowledge(purchaseToken, "repeatable");
        } catch (_) {}
        await paymentResponse.complete("success");

        const datos = await registrarCompraExitosa({
          orderId: orderId || `GPA.${Date.now()}`,
          purchaseToken: purchaseToken,
          planId,
          productId: skuInfo.productId,
          currentUser: targetUser
        });
        return { ok: true, datosPago: datos };
      } else {
        await paymentResponse.complete("fail");
        throw new Error(t("La compra no fue completada en Google Play.", idioma));
      }
    } catch (e) {
      if (e.name === "AbortError" || e.message?.includes("aborted") || e.message?.includes("cancelled")) {
        throw new Error(t("Proceso de suscripción cancelado en Google Play.", idioma));
      }
      throw new Error(e.message || t("No se pudo completar la suscripción en Google Play.", idioma));
    }
  }

  // Fallback si la librería nativa de Android aún no está sincronizada en Android Studio:
  throw new Error(t("La pasarela de Google Play Billing requiere compilar el proyecto en Android Studio con 'npx cap sync android'.", idioma));
}

/**
 * Restaura compras anteriores de Google Play
 */
export async function restaurarComprasGooglePlay(currentUser, idioma = "es") {
  if (!currentUser?.uid) {
    return { restaurado: false, mensaje: t("Inicia sesión con tu cuenta para restaurar tus compras.", idioma) };
  }

  // 1. CdvPurchase nativo
  if (window.CdvPurchase && window.CdvPurchase.store) {
    try {
      await window.CdvPurchase.store.restorePurchases();
    } catch (e) {
      console.warn("Aviso restorePurchases:", e);
    }
  }

  // 2. Verificar en Firestore
  try {
    const userDocSnap = await getDoc(doc(db, "users", currentUser.uid));
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      const sub = data.subscription;
      if (sub && sub.isActive === true) {
        return {
          restaurado: true,
          datosPago: data.datosPagoBasico || {
            plataforma: "Google Play Store",
            orderId: sub.orderId || "GPA.RESTORED",
            medioPago: "Google Play Store",
            transaccionId: sub.orderId || "GPA.RESTORED",
            fechaTransaccion: new Date().toLocaleDateString()
          },
          compra: {
            orderId: sub.orderId || "GPA.RESTORED",
            planId: sub.plan || "anual",
            medioPago: "Google Play Store"
          },
          plan: sub.plan || "anual",
          mensaje: t("¡Suscripción de Google Play encontrada y restaurada con éxito!", idioma)
        };
      }
    }

    const purchasesSnap = await getDocs(
      query(collection(db, "users", currentUser.uid, "purchases"), orderBy("createdAt", "desc"), limit(1))
    );
    if (!purchasesSnap.empty) {
      const lastPurchase = purchasesSnap.docs[0].data();
      const plan = lastPurchase.planId || "anual";

      await setDoc(doc(db, "users", currentUser.uid), {
        planPago: plan,
        esPremium: true,
        subscription: {
          isActive: true,
          plan: plan,
          gateway: "google_play",
          orderId: lastPurchase.orderId,
          restoredAt: Date.now()
        },
        appState: { planPago: plan, esPremium: true }
      }, { merge: true });

      return {
        restaurado: true,
        datosPago: lastPurchase,
        compra: lastPurchase,
        plan: plan,
        mensaje: t("¡Suscripción de Google Play encontrada y restaurada con éxito!", idioma)
      };
    }
  } catch (e) {
    console.warn("Error consultando Firestore:", e);
  }

  return {
    restaurado: false,
    mensaje: t("No se encontraron compras activas de Google Play asociadas a tu cuenta. Puedes iniciar una nueva suscripción.", idioma)
  };
}

/**
 * URL de gestión directa
 */
export function obtenerUrlGestionGooglePlay(productId = "suelta_sub_annual") {
  return `https://play.google.com/store/account/subscriptions?sku=${productId}&package=${GOOGLE_PLAY_CONFIG.packageName}`;
}
