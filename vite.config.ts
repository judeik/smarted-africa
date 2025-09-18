import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// ✅ Works cross-platform (Windows/Linux/Mac)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
    },
  },
});
