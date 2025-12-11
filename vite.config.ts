// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Get the VITE_APP_BASE environment variable, or default to '/' (local)
const BASE_PATH = process.env.VITE_APP_BASE || '/';

export default defineConfig({
  // Use the dynamic BASE_PATH here
  base: BASE_PATH, 
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  }
});