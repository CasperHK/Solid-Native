use serde::Serialize;
use tauri::Manager;

/// Structured response type for device information.
#[derive(Debug, Serialize)]
pub struct DeviceInfo {
    pub os_name: String,
    pub os_version: String,
    pub arch: String,
    pub cpu_cores: usize,
}

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
        .setup(|app| {
            #[cfg(debug_assertions)]
            app.get_webview_window("main").unwrap().open_devtools();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![fetch_device_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
