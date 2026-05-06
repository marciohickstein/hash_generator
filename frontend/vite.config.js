import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8888,
    strictPort: true,
  },
  server: {
    port: 8888,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8888",
    proxy: {
      "^/(md5|sha1|sha256|sha512|encode|decode|encode_url|decode_url|connect|lan|externalip|ping)": {
        target: "http://backend:3003",
        changeOrigin: true,
      },
    },
  },
});