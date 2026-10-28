// Wrapper seguro para Capacitor App
// Permite que la app compile y funcione tanto en la web/PWA como en Capacitor nativo de Android,
// previniendo errores de importación de Rollup si @capacitor/app no está en el node_modules local.

let NativeApp = null;

try {
  if (typeof window !== "undefined" && window.Capacitor && window.Capacitor.Plugins) {
    NativeApp = window.Capacitor.Plugins.App;
  }
} catch (_) {}

export const App = {
  addListener: (eventName, listenerFunc) => {
    try {
      if (NativeApp && typeof NativeApp.addListener === "function") {
        return NativeApp.addListener(eventName, listenerFunc);
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.App?.addListener) {
        return window.Capacitor.Plugins.App.addListener(eventName, listenerFunc);
      }
    } catch (e) {
      console.warn("Capacitor App.addListener error:", e);
    }
    return Promise.resolve({
      remove: () => {}
    });
  },
  exitApp: () => {
    try {
      if (NativeApp && typeof NativeApp.exitApp === "function") {
        return NativeApp.exitApp();
      }
      if (typeof window !== "undefined" && window.Capacitor?.Plugins?.App?.exitApp) {
        return window.Capacitor.Plugins.App.exitApp();
      }
    } catch (_) {}
  },
  getInfo: async () => {
    try {
      if (NativeApp && typeof NativeApp.getInfo === "function") {
        return await NativeApp.getInfo();
      }
    } catch (_) {}
    return { name: "Suelta", id: "suelta_app.com", version: "1.0.0", build: "1" };
  },
  getState: async () => {
    try {
      if (NativeApp && typeof NativeApp.getState === "function") {
        return await NativeApp.getState();
      }
    } catch (_) {}
    return { isActive: true };
  }
};

export default App;
