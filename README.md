# 🚀 Solid Native
**The ultra-lightweight, high-performance cross-platform mobile framework.**

Solid Native 結合了 Solid.js 的細粒度響應式（Fine-grained reactivity）與 Tauri 2.0 (Rust) 的強大後端，旨在打造一個比 React Native 更快、比 Flutter 更輕量、且擁有 Web 開發體驗的行動開發框架。
## ✨ 核心優勢 (Core Highlights)
* ⚡️ **零 Virtual DOM：** 基於 Solid.js，直接操作原生 DOM 節點，消除渲染層的運算負擔。
* 🦀 **Rust 驅動核心：** 利用 Tauri 2.0 調用原生系統 API，效能遠超傳統 JavaScript Bridge。
* 📦 **極致體積：** 初始安裝包 (Hello World) 僅約 2-5MB，不到傳統框架的 1/5。
* 📱 **原生觸感：** 內建針對 WebKit/WebView 優化的動畫與手勢庫，確保 60fps 的流暢體驗。
* **安全第一：** 繼承 Rust 的記憶體安全特性，為你的 App 邏輯提供最強後盾。

## 🛠 技術棧 (The Stack)
* UI 邏輯: Solid.js (Fine-grained Primitives)
* 系統橋接: Tauri v2 Mobile (Rust Backend)
* 構建工具: Vite (Lightning fast HMR)
* 樣式引擎: UnoCSS (Atomic CSS for Mobile)
* 組件底層: Kobalte (Headless UI)

## 🚀 快速開始 (Quick Start)
1. 安裝環境
確保你已安裝 Rust、Node.js 以及對應平台的 SDK (Android Studio / Xcode)。
2. 初始化專案
    ```bash
    npx solid-native init my-awesome-app
    cd my-awesome-app
    ```

3. 開發模式
    ```bash
    # 啟動桌面版預覽
    pnpm run tauri dev
    
    # 啟動行動端模擬器 (iOS / Android)
    pnpm run tauri android dev
    pnpm run tauri ios dev
    ```

## 📖 架構概念 (Architecture)
Solid Native 採用 "Hybrid-Native" 模式：
1. **Rendering Layer:** 使用系統原生 WebView (WebKit on iOS, WebView on Android) 執行 Solid.js UI。
2. **Native Bridge:** 透過 Tauri 的 invoke 模式，將耗能運算（加密、影像處理）交由 Rust 處理。
3. **Primitive API:** 封裝了 Solid 專屬的 createCamera()、createStorage() 等 Signals，讓原生功能像狀態一樣易用。

## 🗺 路線圖 (Roadmap)
* **Alpha:** 基於 Tauri 2.0 的核心 CLI 工具。
* **UI Kit:** 針對 iOS/Android 設計的 SolidNativeComponents。
* **Plugins:** 預置相機、通知、生物辨識等常用 Rust 插件。
* **Performance:** 自動化基準測試對比 (Vs. React Native/Flutter)。

---

## 🤝 貢獻 (Contributing)
我們歡迎任何形式的貢獻！無論是 Rust 後端優化、Solid 組件開發，還是文檔編寫。

## 📄 許可證 (License)
MIT © [Your Name/Organization]
