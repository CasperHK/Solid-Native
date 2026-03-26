import { useNavigate } from "@solidjs/router";
import type { Accessor } from "solid-js";
import { createSignal, For, Show } from "solid-js";

interface SliderProps {
  isOpen: Accessor<boolean>;
  onClose: () => void;
}

const sideLinks = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
  { label: "Activity", path: "/activity" },
  { label: "Profile", path: "/profile" },
];

export default function Slider(props: SliderProps) {
  const [isLinksOpen, setIsLinksOpen] = createSignal(true);
  const navigate = useNavigate();

  return (
    <aside
      class={`fixed left-0 top-0 z-40 h-full w-[82vw] max-w-72 border-r border-[var(--line)] bg-[var(--panel)]/95 p-4 backdrop-blur-sm transition-transform duration-300 sm:p-5 ${
        props.isOpen() ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div class="mb-5 flex items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <div class="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent)] text-white text-xs font-bold sm:h-10 sm:w-10">
            CN
          </div>
          <div>
            <p class="text-sm font-semibold tracking-wide">Solid Native</p>
            <p class="text-[11px] text-[var(--muted)]">Operations Board</p>
          </div>
        </div>

        <button
          type="button"
          class="grid h-8 w-8 place-items-center rounded-lg border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]"
          onClick={props.onClose}
          aria-label="Close side slider"
        >
          x
        </button>
      </div>

      <div class="mb-3 flex items-center justify-between">
        <p class="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Menu</p>
        <button
          type="button"
          class="text-xs text-[var(--muted)] hover:text-[var(--ink)]"
          onClick={() => setIsLinksOpen((open) => !open)}
          aria-label={isLinksOpen() ? "Collapse menu list" : "Expand menu list"}
        >
          {isLinksOpen() ? "Collapse" : "Expand"}
        </button>
      </div>

      <Show when={isLinksOpen()}>
        <nav class="space-y-2">
          <For each={sideLinks}>
            {(link, i) => (
              <button
                type="button"
                class={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                  i() === 0
                    ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--ink)]"
                    : "border-transparent bg-transparent text-[var(--ink)] hover:border-[var(--line)] hover:bg-[#1e1840]"
                }`}
                onClick={() => {
                  navigate(link.path);
                  props.onClose();
                }}
              >
                {link.label}
              </button>
            )}
          </For>
        </nav>
      </Show>
    </aside>
  );
}
