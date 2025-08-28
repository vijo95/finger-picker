import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "icon-192x192.png", "icon-192x192.png"],
  manifest: false,
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
