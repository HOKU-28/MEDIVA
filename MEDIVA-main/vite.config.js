import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/MEDIVA/",
  plugins: [react()],
  server: {
    proxy: {
      "/api-groq": {
        target: "https://api.groq.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-groq/, ""),
      },
      "/api-gemini": {
        target: "https://generativelanguage.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-gemini/, ""),
      },
    },
  },
});