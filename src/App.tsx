import { createSignal, For } from "solid-js";
import BottomIconNavBar from "@/components/BottomIconNavBar";
import Slider from "@/components/Slider";

export default function App() {
  const [activeTab, setActiveTab] = createSignal("overview");
  const [isSliderOpen, setIsSliderOpen] = createSignal(false);

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

  return (
    <div class="dashboard-shell min-h-screen text-[var(--ink)] font-sans">
      <style>{`
        .dashboard-shell {
          --ink: #f2edff;
          --paper: #0d0a1a;
          --panel: #17102e;
          --muted: #ab9dd8;
          --line: #38285f;
          --accent: #8b5cf6;
          --accent-soft: #a884ff;
          font-family: "Avenir Next", "Century Gothic", "Trebuchet MS", sans-serif;
          background:
            radial-gradient(circle at 8% -12%, #5f2db6 0%, transparent 42%),
            radial-gradient(circle at 100% 18%, #3a2484 0%, transparent 38%),
            linear-gradient(165deg, #0d0a1a 0%, #120d27 58%, #0f0b1f 100%);
        }

        .grain-overlay {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.34;
        }

        .rise-in {
          animation: riseIn 0.6s ease both;
        }

        .rise-in-slow {
          animation: riseIn 0.8s ease both;
        }

        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div class="grain-overlay pointer-events-none fixed inset-0" />

      <Slider isOpen={isSliderOpen} onClose={() => setIsSliderOpen(false)} />

      <button
        type="button"
        class={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${
          isSliderOpen() ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Close side slider"
        onClick={() => setIsSliderOpen(false)}
      />

      <div class="relative z-10 min-h-screen">
        <header class="safe-top sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--paper)]/70 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--ink)]"
              onClick={() => setIsSliderOpen(true)}
              aria-label="Open side menu"
            >
              <span class="text-base leading-none">☰</span>
              <span>Menu</span>
            </button>

            <p class="text-sm font-semibold tracking-wide text-[var(--muted)] sm:text-base">Casper Native Dashboard</p>
          </div>
        </header>

        <main class="mx-auto w-full max-w-7xl p-4 pb-28 sm:p-6 sm:pb-30 lg:p-8 lg:pb-8">
          <header class="rise-in mb-6 flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)]/85 p-5 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
              <p class="mt-1 text-sm text-[var(--muted)]">
                Real-time overview of sales, customers, and operations.
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
        </main>
      </div>

      <BottomIconNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
