# 🚀 Solid Native

**The ultra-lightweight, high-performance cross-platform mobile framework.**

Solid Native combines Solid.js's fine-grained reactivity (zero Virtual DOM) with Tauri 2.0's Rust backend to create a mobile development experience that is faster than React Native, lighter than Flutter, and familiar to web developers.

## ✨ Core Highlights

| Feature | Detail |
|---|---|
| ⚡️ Zero Virtual DOM | Solid.js updates the real DOM directly — no reconciliation overhead |
| 🦀 Rust Core | Tauri v2 bridges CPU-intensive tasks through a type-safe Rust API |
| 📦 Tiny Bundle | ~2–5 MB "Hello World" APK/IPA — less than 1/5 of comparable frameworks |
| 📱 Native Feel | WebKit/WebView-optimised animations, safe-area-aware layout, 60 fps |
| 🔒 Memory Safe | Rust's ownership model eliminates entire classes of runtime bugs |

## 🛠 The Stack

| Layer | Technology |
|---|---|
| UI | **Solid.js** (fine-grained Primitives) |
| Native Bridge | **Tauri v2** (Rust backend) |
| Build Tool | **Vite** (lightning-fast HMR) |
| Styling | **UnoCSS** (atomic CSS, mobile-optimised) |
| Headless UI | **Kobalte** (accessible components) |

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Rust** (`rustup` + a stable toolchain): https://rustup.rs
- **Node.js** ≥ 18 and **pnpm**: `npm install -g pnpm`
- **Android Studio** (for Android) *or* **Xcode** (for iOS on macOS)
- Tauri mobile prerequisites: https://v2.tauri.app/start/prerequisites/

### 1. Install dependencies

```bash
pnpm install
```

### 2. Desktop development (fastest feedback loop)

```bash
pnpm tauri:dev
# or equivalently:
pnpm tauri dev
```

### 3. Android development

```bash
# Initialise Android target (first time only)
pnpm tauri android init

# Start the Android emulator / device dev server
pnpm tauri android dev
```

### 4. iOS development *(macOS only)*

```bash
# Initialise iOS target (first time only)
pnpm tauri ios init

# Start the iOS Simulator dev server
pnpm tauri ios dev
```

### 5. Production build

```bash
# Desktop
pnpm tauri build

# Android release APK/AAB
pnpm tauri android build

# iOS IPA
pnpm tauri ios build
```

## 📂 Project Structure

```
solid-native/
├── index.html                  # Vite HTML entry (viewport-fit=cover for iOS)
├── package.json                # pnpm workspace manifest
├── tsconfig.json               # TypeScript config (jsxImportSource: solid-js)
├── vite.config.ts              # Vite + UnoCSS + Solid plugins
├── uno.config.ts               # UnoCSS theme, shortcuts, safe-area rules
├── src/
│   ├── index.tsx               # Solid.js root mount
│   ├── App.tsx                 # Reactive counter + native device-info demo
│   └── primitives/
│       └── createNativeCommand.ts  # createResource wrapper around invoke()
└── src-tauri/
    ├── Cargo.toml              # Tauri v2 + tauri-plugin-os dependencies
    ├── build.rs                # tauri-build script
    ├── tauri.conf.json         # App config (identifier, window size, plugins)
    ├── capabilities/
    │   └── default.json        # ACL: core:default + os:default
    └── src/
        ├── main.rs             # Desktop entry → calls lib::run()
        └── lib.rs              # #[tauri::command] get_device_info + run()
```

## 📖 Architecture

Solid Native uses a **Hybrid-Native** model:

1. **Rendering Layer** — the system WebView (WebKit on iOS, Chromium-based on Android) runs the Solid.js UI with zero Virtual DOM overhead.
2. **Native Bridge** — Tauri's `invoke` IPC passes messages to Rust commands (`#[tauri::command]`) for anything CPU/hardware-intensive.
3. **Primitive API** — `createNativeCommand<T>(command, payload?)` wraps `invoke` with `createResource`, giving you Solid Signals that automatically suspend while the Rust call is in-flight.

```
Solid UI  ──invoke()──▶  Rust Command  ──serialize──▶  Solid Signal
   ▲                                                        │
   └─────────────────── reactive update ◀──────────────────┘
```

## 🗺 Roadmap

- **Alpha** — core CLI scaffolding tool (`solid-native-cli init`)
- **UI Kit** — iOS/Android-native-feel component library
- **Plugins** — camera, push notifications, biometrics, secure storage
- **Benchmarks** — automated performance comparison vs. React Native & Flutter

---

## 🤝 Contributing

Contributions of all kinds are welcome — Rust backend optimisations, Solid.js component work, documentation improvements, or bug reports.

## 📄 License

MIT © Solid Native Contributors
