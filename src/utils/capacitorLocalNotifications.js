// Wrapper seguro para Capacitor LocalNotifications
// Permite que la app compile y funcione tanto en la web/PWA como en Capacitor nativo de Android,
// previniendo errores de importación de Rollup si @capacitor/local-notifications no está en el node_modules local.

let NativeNotifications = null;

try {
  if (typeof window !== "undefined" && window.Capacitor && window.Capacitor.Plugins) {
    NativeNotifications = window.Capacitor.Plugins.LocalNotifications;
  }
} catch (_) {}

export const LocalNotifications = {
  createChannel: async (channel) => {
    try {
      if (NativeNotifications && typeof NativeNotifications.createChannel === "function") {
        return await NativeNotifications.createChannel(channel);
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.LocalNotifications?.createChannel) {
        return await window.Capacitor.Plugins.LocalNotifications.createChannel(channel);
      }
    } catch (e) {
      console.warn("LocalNotifications.createChannel error:", e);
    }
  },
  checkPermissions: async () => {
    try {
      if (NativeNotifications && typeof NativeNotifications.checkPermissions === "function") {
        return await NativeNotifications.checkPermissions();
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.LocalNotifications?.checkPermissions) {
        return await window.Capacitor.Plugins.LocalNotifications.checkPermissions();
      }
    } catch (e) {
      console.warn("LocalNotifications.checkPermissions error:", e);
    }
    return { display: "prompt" };
  },
  requestPermissions: async () => {
    try {
      if (NativeNotifications && typeof NativeNotifications.requestPermissions === "function") {
        return await NativeNotifications.requestPermissions();
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.LocalNotifications?.requestPermissions) {
        return await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
      }
    } catch (e) {
      console.warn("LocalNotifications.requestPermissions error:", e);
    }
    return { display: "prompt" };
  },
  schedule: async (options) => {
    try {
      if (NativeNotifications && typeof NativeNotifications.schedule === "function") {
        return await NativeNotifications.schedule(options);
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.LocalNotifications?.schedule) {
        return await window.Capacitor.Plugins.LocalNotifications.schedule(options);
      }
    } catch (e) {
      console.warn("LocalNotifications.schedule error:", e);
    }
  },
  getPending: async () => {
    try {
      if (NativeNotifications && typeof NativeNotifications.getPending === "function") {
        return await NativeNotifications.getPending();
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.LocalNotifications?.getPending) {
        return await window.Capacitor.Plugins.LocalNotifications.getPending();
      }
    } catch (e) {
      console.warn("LocalNotifications.getPending error:", e);
    }
    return { notifications: [] };
  },
  cancel: async (options) => {
    try {
      if (NativeNotifications && typeof NativeNotifications.cancel === "function") {
        return await NativeNotifications.cancel(options);
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.LocalNotifications?.cancel) {
        return await window.Capacitor.Plugins.LocalNotifications.cancel(options);
      }
    } catch (e) {
      console.warn("LocalNotifications.cancel error:", e);
    }
  }
};

export default LocalNotifications;
