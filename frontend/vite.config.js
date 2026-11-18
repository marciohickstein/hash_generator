import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import process from "node:process";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

// No Docker nao tem .git, entao o commit chega pelo build arg GIT_COMMIT
// (ver Dockerfile e deploy). Localmente, pega do git.
const getCommit = () => {
  if (process.env.GIT_COMMIT) return process.env.GIT_COMMIT;
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
};

export default defineConfig({
  base: "/",
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __APP_COMMIT__: JSON.stringify(getCommit()),
  },
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
      "^/(md5|sha1|sha256|sha512|encode|decode|encode_url|decode_url|connect|externalip|ping)": {
        target: "http://backend:3003",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin');
          });
        },
      },
    },
  },
});