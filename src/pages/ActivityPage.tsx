import { For } from "solid-js";

const logs = [
  { event: "Team sync completed", who: "Ops Team", time: "10:32" },
  { event: "Payment batch processed", who: "Finance", time: "09:58" },
  { event: "New profile updated", who: "Nina Brooks", time: "09:22" },
  { event: "Inventory warning raised", who: "System", time: "08:41" },
  { event: "User permission changed", who: "Admin", time: "08:09" },
];

export default function ActivityPage() {
  return (
    <section class="rise-in space-y-4">
      <header class="rounded-2xl border border-[var(--line)] bg-[var(--panel)]/85 p-5 backdrop-blur-sm">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Activity</h1>
        <p class="mt-1 text-sm text-[var(--muted)]">Latest events from operations, finance, and product teams.</p>
      </header>

      <div class="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_12px_24px_rgba(24,24,24,0.06)]">
        <ul class="space-y-3">
          <For each={logs}>
            {(log) => (
              <li class="rounded-xl border border-[var(--line)] bg-[#1d1536] p-3">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold">{log.event}</p>
                    <p class="mt-1 text-xs text-[var(--muted)]">{log.who}</p>
                  </div>
                  <span class="text-xs text-[var(--muted)]">{log.time}</span>
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
}
