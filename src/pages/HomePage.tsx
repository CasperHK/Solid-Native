import { createResource, For } from "solid-js";
import { getInitialState } from "@/primitives/getInitialState";

const stats = [
  { label: "Revenue", value: "$48,920", delta: "+12.4%" },
  { label: "Active Users", value: "2,381", delta: "+8.1%" },
  { label: "New Orders", value: "364", delta: "+5.9%" },
  { label: "Refund Rate", value: "0.84%", delta: "-0.2%" },
];

const activities = [
  { title: "New customer account", detail: "Ava Johnson joined Pro plan", time: "3m ago" },
  { title: "Payment received", detail: "Invoice INV-2041 was paid", time: "11m ago" },
  { title: "Low inventory alert", detail: "Studio lamp stock below threshold", time: "27m ago" },
  { title: "Subscription cancelled", detail: "Basic plan ended for Acme Co", time: "42m ago" },
];

export default function HomePage() {
  const [initialState] = createResource(getInitialState);

  return (
    <>
      <header class="rise-in mb-6 flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)]/85 p-5 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
          <p class="mt-1 text-sm text-[var(--muted)]">
            Real-time overview of sales, customers, and operations.
          </p>
          <p class="mt-2 text-xs text-[var(--muted)]">
            Startup: {initialState()?.os_name}/{initialState()?.arch} • cache {initialState()?.cache_ready ? "warm" : "cold"}
          </p>
        </div>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          New Report
        </button>
      </header>

      <section class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <For each={stats}>
          {(stat, i) => (
            <article
              class="rise-in rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_12px_24px_rgba(24,24,24,0.06)]"
              style={{ "animation-delay": `${i() * 70}ms` }}
            >
              <p class="text-sm text-[var(--muted)]">{stat.label}</p>
              <p class="mt-2 text-2xl font-bold tracking-tight">{stat.value}</p>
              <p class={`mt-2 text-xs font-semibold ${stat.delta.startsWith("+") ? "text-[#18794e]" : "text-[#9a3412]"}`}>
                {stat.delta} vs last week
              </p>
            </article>
          )}
        </For>
      </section>

      <section class="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        <article class="rise-in-slow rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_12px_24px_rgba(24,24,24,0.06)]">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold">Performance Snapshot</h2>
            <span class="rounded-full bg-[var(--accent-soft)]/35 px-3 py-1 text-xs font-medium text-[var(--ink)]">Weekly</span>
          </div>

          <div class="space-y-3">
            <div>
              <div class="mb-1 flex justify-between text-sm">
                <span class="text-[var(--muted)]">Conversion</span>
                <span class="font-semibold">74%</span>
              </div>
              <div class="h-2 rounded-full bg-[#2b2348]">
                <div class="h-2 w-[74%] rounded-full bg-[var(--ink)]" />
              </div>
            </div>

            <div>
              <div class="mb-1 flex justify-between text-sm">
                <span class="text-[var(--muted)]">Retention</span>
                <span class="font-semibold">89%</span>
              </div>
              <div class="h-2 rounded-full bg-[#2b2348]">
                <div class="h-2 w-[89%] rounded-full bg-[var(--accent)]" />
              </div>
            </div>

            <div>
              <div class="mb-1 flex justify-between text-sm">
                <span class="text-[var(--muted)]">Fulfillment</span>
                <span class="font-semibold">92%</span>
              </div>
              <div class="h-2 rounded-full bg-[#2b2348]">
                <div class="h-2 w-[92%] rounded-full bg-[#205a47]" />
              </div>
            </div>
          </div>
        </article>

        <article class="rise-in-slow rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_12px_24px_rgba(24,24,24,0.06)]">
          <h2 class="mb-4 text-lg font-semibold">Recent Activity</h2>
          <ul class="space-y-3">
            <For each={activities}>
              {(activity) => (
                <li class="rounded-xl border border-[var(--line)] bg-[#1d1536] p-3">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <p class="text-sm font-semibold">{activity.title}</p>
                      <p class="mt-1 text-xs text-[var(--muted)]">{activity.detail}</p>
                    </div>
                    <span class="text-[11px] text-[var(--muted)]">{activity.time}</span>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </article>
      </section>
    </>
  );
}
