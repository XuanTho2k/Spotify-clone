import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 9000,
  },
  define: {
    "process.env": process.env,
    VITE_BASE_URL: process.env.VITE_BASE_URL,
  },
});
