import { createResource, ResourceReturn } from "solid-js";
import { invoke } from "@tauri-apps/api/core";

/**
 * `createNativeCommand` — a Solid.js Primitive that wraps Tauri's `invoke` API
 * with fine-grained reactivity via `createResource`.
 *
 * @param command - The name of the Rust command registered with `#[tauri::command]`
 * @param payload - Optional payload to pass to the Rust command
 * @returns A Solid `ResourceReturn<T>` tuple: `[data, { refetch, mutate }]`
 *
 * @example
 * ```tsx
 * const [info, { refetch }] = createNativeCommand<DeviceInfo>("get_device_info");
 * return <p>{info()?.os_name}</p>;
 * ```
 */
export function createNativeCommand<T, P extends Record<string, unknown> = Record<string, never>>(
  command: string,
  payload?: P
): ResourceReturn<T> {
  return createResource<T>(() => invoke<T>(command, payload ?? {}));
}
