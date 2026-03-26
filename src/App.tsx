import { createSignal, Show } from "solid-js";
import { createNativeCommand } from "./primitives/createNativeCommand";

interface DeviceInfo {
  os_name: string;
  os_version: string;
  arch: string;
  cpu_cores: number;
}

export default function App() {
  // Fine-grained reactive counter — no Virtual DOM diffing
  const [count, setCount] = createSignal(0);

  // Reactive wrapper around the Tauri `get_device_info` Rust command
  const [deviceInfo, { refetch }] = createNativeCommand<DeviceInfo>("get_device_info");

  return (
    <div class="min-h-screen bg-surface text-text font-sans flex flex-col">
      {/* Safe-area-aware header */}
      <header class="safe-top bg-surface-alt shadow-sm">
        <div class="flex items-center justify-center h-14 px-4">
          <span class="text-xl font-bold tracking-tight">
            🚀 Solid Native
          </span>
        </div>
      </header>

      {/* Main content */}
      <main class="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-8">
        {/* Counter card */}
        <div class="card w-full max-w-sm text-center">
          <p class="text-text-muted text-sm mb-2">Reactive Counter</p>
          <p class="text-6xl font-bold text-primary mb-6">{count()}</p>
          <div class="flex gap-3 justify-center">
            <button
              class="btn-primary bg-surface text-primary border border-primary"
              onClick={() => setCount((c) => c - 1)}
              aria-label="Decrement counter"
            >
              −
            </button>
            <button
              class="btn-primary"
              onClick={() => setCount((c) => c + 1)}
              aria-label="Increment counter"
            >
              +
            </button>
          </div>
        </div>

        {/* Native command card */}
        <div class="card w-full max-w-sm">
          <p class="text-text-muted text-sm mb-3">Native Device Info (Rust)</p>
          <Show
            when={!deviceInfo.loading}
            fallback={
              <p class="text-text-muted text-sm animate-pulse">
                Fetching from Rust…
              </p>
            }
          >
            <Show
              when={!deviceInfo.error}
              fallback={
                <p class="text-red-400 text-sm">
                  ⚠ {String(deviceInfo.error)}
                </p>
              }
            >
              <dl class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <dt class="text-text-muted">OS</dt>
                  <dd class="font-medium">
                    {deviceInfo()?.os_name} {deviceInfo()?.os_version}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-text-muted">Arch</dt>
                  <dd class="font-medium">{deviceInfo()?.arch}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-text-muted">CPU Cores</dt>
                  <dd class="font-medium">{deviceInfo()?.cpu_cores}</dd>
                </div>
              </dl>
            </Show>
          </Show>

          <button
            class="btn-primary w-full mt-4"
            onClick={() => refetch()}
            aria-label="Refresh device info from Rust"
          >
            ⚡ Refresh Device Info
          </button>
        </div>
      </main>

      {/* Safe-area-aware footer */}
      <footer class="safe-bottom text-center text-text-muted text-xs py-3">
        Solid.js × Tauri v2 × Rust
      </footer>
    </div>
  );
}
