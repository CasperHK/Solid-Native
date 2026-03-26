import { invoke } from "@tauri-apps/api/core";

export interface InitialState {
  app_version: string;
  os_name: string;
  os_version: string;
  arch: string;
  cpu_cores: number;
  cache_ready: boolean;
  warm_assets: number;
}

let initialStatePromise: Promise<InitialState> | null = null;

function fallbackState(): InitialState {
  return {
    app_version: "dev",
    os_name: "web",
    os_version: "dev",
    arch: "browser",
    cpu_cores: navigator.hardwareConcurrency ?? 1,
    cache_ready: false,
    warm_assets: 0,
  };
}

export function getInitialState(): Promise<InitialState> {
  if (initialStatePromise) {
    return initialStatePromise;
  }

  initialStatePromise = (async () => {
    if (!("__TAURI_INTERNALS__" in window)) {
      return fallbackState();
    }

    try {
      return await invoke<InitialState>("get_initial_state");
    } catch {
      return fallbackState();
    }
  })();

  return initialStatePromise;
}
