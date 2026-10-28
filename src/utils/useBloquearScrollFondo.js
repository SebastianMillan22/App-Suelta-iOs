import { useEffect } from "react";

// Contador global de modales activos para soportar modales anidados
let modalesAbiertosCount = 0;
let originalBodyOverflow = "";
let originalDocElOverflow = "";
let originalBodyTouchAction = "";
let originalPhoneContentOverflow = "";

function aplicarBloqueoGlobal() {
  if (typeof document === "undefined") return;

  const body = document.body;
  const docEl = document.documentElement;
  const phoneContent = document.querySelector(".ss-phone-content");

  if (modalesAbiertosCount === 1) {
    originalBodyOverflow = body.style.overflow;
    originalDocElOverflow = docEl.style.overflow;
    originalBodyTouchAction = body.style.touchAction;
    if (phoneContent) {
      originalPhoneContentOverflow = phoneContent.style.overflow;
    }

    body.classList.add("modal-scroll-locked");
    docEl.classList.add("modal-scroll-locked");

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    docEl.style.overflow = "hidden";
    docEl.style.touchAction = "none";

    if (phoneContent) {
      phoneContent.style.overflow = "hidden";
    }

    document.addEventListener("touchmove", prevenirScrollFondoTouch, { passive: false });
    document.addEventListener("wheel", prevenirScrollFondoWheel, { passive: false });
  }
}

function retirarBloqueoGlobal() {
  if (typeof document === "undefined") return;

  if (modalesAbiertosCount <= 0) {
    modalesAbiertosCount = 0;

    const body = document.body;
    const docEl = document.documentElement;
    const phoneContent = document.querySelector(".ss-phone-content");

    body.classList.remove("modal-scroll-locked");
    docEl.classList.remove("modal-scroll-locked");

    body.style.overflow = originalBodyOverflow || "";
    body.style.touchAction = originalBodyTouchAction || "";
    docEl.style.overflow = originalDocElOverflow || "";
    docEl.style.touchAction = "";

    if (phoneContent) {
      phoneContent.style.overflow = originalPhoneContentOverflow || "auto";
    }

    document.removeEventListener("touchmove", prevenirScrollFondoTouch);
    document.removeEventListener("wheel", prevenirScrollFondoWheel);
  }
}

function prevenirScrollFondoTouch(e) {
  // Buscar si el toque proviene de un elemento con scroll interno permitido
  const scrollable = e.target.closest('[data-modal-scrollable="true"], .modal-scrollable');
  if (!scrollable) {
    if (e.cancelable) {
      e.preventDefault();
    }
    return;
  }

  // Si está dentro de un contenedor con scroll, verificar límites para evitar el rebote al fondo
  const atTop = scrollable.scrollTop <= 0;
  const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

  // Permitir scroll normal dentro del contenedor, el overscroll-behavior se encargará del rebote
}

function prevenirScrollFondoWheel(e) {
  const scrollable = e.target.closest('[data-modal-scrollable="true"], .modal-scrollable');
  if (!scrollable) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }
}

/**
 * Hook para bloquear completamente el desplazamiento de fondo mientras una ventana modal o drawer esté visible.
 * @param {boolean} activo - True si la ventana modal está abierta.
 */
export function useBloquearScrollFondo(activo) {
  useEffect(() => {
    if (!activo) return;

    modalesAbiertosCount++;
    aplicarBloqueoGlobal();

    return () => {
      modalesAbiertosCount = Math.max(0, modalesAbiertosCount - 1);
      retirarBloqueoGlobal();
    };
  }, [activo]);
}
