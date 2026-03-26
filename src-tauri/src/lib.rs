use once_cell::sync::{Lazy, OnceCell};
use serde::Serialize;
use std::collections::HashMap;
use tauri::http::{header::CONTENT_TYPE, Response, StatusCode};
use tauri::Manager;

/// Structured response type for device information.
#[derive(Debug, Serialize)]
pub struct DeviceInfo {
    pub os_name: String,
    pub os_version: String,
    pub arch: String,
    pub cpu_cores: usize,
}

#[derive(Debug, Serialize, Clone)]
pub struct InitialState {
    pub app_version: String,
    pub os_name: String,
    pub os_version: String,
    pub arch: String,
    pub cpu_cores: usize,
    pub cache_ready: bool,
    pub warm_assets: usize,
}

static CRITICAL_ASSET_CACHE: Lazy<HashMap<&'static str, (&'static [u8], &'static str)>> = Lazy::new(|| {
    HashMap::from([
        (
            "shell/index.html",
            (
                include_bytes!("../../index.html") as &'static [u8],
                "text/html; charset=utf-8",
            ),
        ),
        (
            "shell/dashboard.css",
            (
                include_bytes!("../../src/styles/dashboard.css") as &'static [u8],
                "text/css; charset=utf-8",
            ),
        ),
        (
            "shell/app-boot.tsx",
            (
                include_bytes!("../../src/index.tsx") as &'static [u8],
                "application/typescript; charset=utf-8",
            ),
        ),
    ])
});

static PRELOADED_INITIAL_STATE: OnceCell<InitialState> = OnceCell::new();

/// `fetch_device_info` — a Tauri command exposed to the Solid.js frontend.
///
/// Returns basic hardware/OS details so the UI can display them reactively
/// via the `createNativeCommand` primitive.
#[tauri::command]
fn fetch_device_info() -> DeviceInfo {
    DeviceInfo {
        os_name: std::env::consts::OS.to_string(),
        os_version: os_version(),
        arch: std::env::consts::ARCH.to_string(),
        cpu_cores: num_cpus(),
    }
}

#[tauri::command]
fn get_initial_state() -> InitialState {
    PRELOADED_INITIAL_STATE
        .get_or_init(build_initial_state)
        .clone()
}

fn build_initial_state() -> InitialState {
    InitialState {
        app_version: env!("CARGO_PKG_VERSION").to_string(),
        os_name: std::env::consts::OS.to_string(),
        os_version: os_version(),
        arch: std::env::consts::ARCH.to_string(),
        cpu_cores: num_cpus(),
        cache_ready: !CRITICAL_ASSET_CACHE.is_empty(),
        warm_assets: CRITICAL_ASSET_CACHE.len(),
    }
}

fn protocol_response(status: StatusCode, body: Vec<u8>, content_type: Option<&str>) -> Response<Vec<u8>> {
    let mut builder = Response::builder().status(status);
    if let Some(ct) = content_type {
        builder = builder.header(CONTENT_TYPE, ct);
    }
    builder.body(body).expect("failed to build protocol response")
}

/// Returns a best-effort OS version string.
fn os_version() -> String {
    // On Linux, attempt to read /etc/os-release
    #[cfg(target_os = "linux")]
    if let Ok(content) = std::fs::read_to_string("/etc/os-release") {
        for line in content.lines() {
            if let Some(v) = line.strip_prefix("VERSION_ID=") {
                return v.trim_matches('"').to_string();
            }
        }
    }
    // Fallback to the compile-time OS string
    std::env::consts::OS.to_string()
}

/// Returns the number of logical CPU cores (portable, no extra crate).
fn num_cpus() -> usize {
    // std::thread::available_parallelism() was stabilised in Rust 1.59
    std::thread::available_parallelism()
        .map(|n| n.get())
        .unwrap_or(1)
}

/// Application entry-point called by Tauri on all platforms
/// (desktop + iOS + Android share the same lib).
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        // Critical startup path protocol. Requests like `appcache://localhost/shell/index.html`
        // are served from preloaded memory to avoid disk I/O latency.
        .register_uri_scheme_protocol("appcache", |_app, request| {
            let path = request.uri().path().trim_start_matches('/');
            if let Some((bytes, content_type)) = CRITICAL_ASSET_CACHE.get(path) {
                return protocol_response(StatusCode::OK, bytes.to_vec(), Some(content_type));
            }

            protocol_response(
                StatusCode::NOT_FOUND,
                format!("asset not cached: {path}").into_bytes(),
                Some("text/plain; charset=utf-8"),
            )
        })
        .setup(|app| {
            #[cfg(debug_assertions)]
            app.get_webview_window("main").unwrap().open_devtools();

            // Warm up caches before first webview request and first invoke.
            let _ = CRITICAL_ASSET_CACHE.len();
            let _ = PRELOADED_INITIAL_STATE.get_or_init(build_initial_state);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![fetch_device_info, get_initial_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
