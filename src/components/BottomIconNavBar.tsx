import type { Accessor } from "solid-js";
import { For } from "solid-js";

interface BottomIconNavBarProps {
  activeTab: Accessor<string>;
  onTabChange: (tabId: string) => void;
}

const navItems = [
  { id: "overview", icon: "🏠", label: "Home" },
  { id: "search", icon: "🔍", label: "Search" },
  { id: "activity", icon: "📊", label: "Activity" },
  { id: "profile", icon: "👤", label: "Profile" },
];

export default function BottomIconNavBar(props: BottomIconNavBarProps) {
  return (
    <nav class="safe-bottom fixed bottom-0 inset-x-0 z-20 px-4 pb-3">
      <div class="mx-auto w-full max-w-sm rounded-2xl border border-[#dccfbf] bg-[var(--panel)]/92 shadow-[0_10px_30px_rgba(25,25,25,0.15)] backdrop-blur">
        <div class="grid grid-cols-4">
          <For each={navItems}>
            {(item) => (
              <button
                type="button"
                class={`flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium transition-colors ${
                  props.activeTab() === item.id
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
                onClick={() => props.onTabChange(item.id)}
                aria-label={`Open ${item.label}`}
              >
                <span class="text-lg leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )}
          </For>
        </div>
      </div>
    </nav>
  );
}