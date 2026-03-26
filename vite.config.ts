import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import UnoCSS from "unocss/vite";
import { fileURLToPath, URL } from "node:url";

const appShellMarkup = `
<div class="app-shell" aria-hidden="true">
  <div style="height:56px;border-bottom:1px solid #38285f;background:rgba(13,10,26,.7)"></div>
  <div style="padding:16px;display:grid;gap:12px">
    <div style="height:84px;border-radius:16px;background:#17102e"></div>
    <div style="height:84px;border-radius:16px;background:#17102e"></div>
    <div style="height:84px;border-radius:16px;background:#17102e"></div>
  </div>
</div>
`;

function appShellPrerenderPlugin() {
  return {
    name: "solid-native-app-shell-prerender",
    apply: "build" as const,
    transformIndexHtml(html: string) {
      return html.replace('<div id="root"></div>', `<div id="root">${appShellMarkup}</div>`);
    },
  };
}

export default defineConfig({
  plugins: [
    UnoCSS(),
    solidPlugin(),
    appShellPrerenderPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 1420,
    strictPort: true,
    host: false,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 1421,
    },
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  // Env variables starting with the item of `envPrefix` will be exposed
  // in tauri's source code through `import.meta.env`
  envPrefix: ["VITE_", "TAURI_ENV_*"],
  build: {
    assetsInlineLimit: 8192,
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target:
      process.env.TAURI_ENV_PLATFORM === "windows"
        ? "chrome105"
        : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
    rollupOptions: {
      output: {
        manualChunks: {
          router: ["@solidjs/router"],
          motion: ["@motionone/dom"],
        },
      },
    },
  },
});
