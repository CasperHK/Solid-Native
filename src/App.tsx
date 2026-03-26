import { Route, Routes } from "@solidjs/router";
import { createSignal } from "solid-js";
import BottomIconNavBar from "@/components/BottomIconNavBar";
import Slider from "@/components/Slider";
import ActivityPage from "@/pages/ActivityPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import SearchPage from "@/pages/SearchPage";

export default function App() {
  const [isSliderOpen, setIsSliderOpen] = createSignal(false);

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
          <Routes>
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/activity" component={ActivityPage} />
            <Route path="/profile" component={ProfilePage} />
          </Routes>
        </main>
      </div>

      <BottomIconNavBar />
    </div>
  );
}
