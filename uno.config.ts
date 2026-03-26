import { defineConfig, presetMini, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify(),
  ],
  theme: {
    colors: {
      primary: "#6366f1",
      "primary-dark": "#4f46e5",
      surface: "#1e1e2e",
      "surface-alt": "#2a2a3e",
      text: "#cdd6f4",
      "text-muted": "#6c7086",
    },
    fontFamily: {
      sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
    },
  },
  shortcuts: {
    "safe-top": "pt-[env(safe-area-inset-top,0px)]",
    "safe-bottom": "pb-[env(safe-area-inset-bottom,0px)]",
    "btn-primary":
      "inline-flex items-center justify-center rounded-2xl bg-primary text-white font-semibold py-3 px-6 active:scale-95 transition-transform select-none",
    "card": "rounded-2xl bg-surface-alt p-4 shadow-md",
  },
  rules: [
    // allow arbitrary safe-area values
    [/^pt-safe$/, () => ({ "padding-top": "env(safe-area-inset-top, 0px)" })],
    [/^pb-safe$/, () => ({ "padding-bottom": "env(safe-area-inset-bottom, 0px)" })],
  ],
});
