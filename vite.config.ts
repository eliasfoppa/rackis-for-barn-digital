import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/rackis-for-barn-digital/", // IMPORTANT for repo pages
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  }
});
