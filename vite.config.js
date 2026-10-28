import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "circular-natal-horoscope-js": path.resolve(__dirname, "node_modules/circular-natal-horoscope-js/dist/index.js"),
      "react": path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "@capacitor/app": path.resolve(__dirname, "src/utils/capacitorApp.js"),
      "@capacitor/local-notifications": path.resolve(__dirname, "src/utils/capacitorLocalNotifications.js"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react"],
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    minify: true,
    target: "esnext",
    sourcemap: false,
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("src/data/constants")) {
            return "constants";
          }
          if (id.includes("src/images")) {
            return "images";
          }
        }
      }
    }
  }
});
