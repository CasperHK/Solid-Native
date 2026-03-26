import { Route } from "@solidjs/router";
import type { ParentProps } from "solid-js";
import { createSignal } from "solid-js";
import BottomIconNavBar from "@/components/BottomIconNavBar";
import Slider from "@/components/Slider";
import TopHeader from "@/components/TopHeader";
import ActivityPage from "@/pages/ActivityPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import SearchPage from "@/pages/SearchPage";

function AppLayout(props: ParentProps) {
  const [isSliderOpen, setIsSliderOpen] = createSignal(false);

  return (
    <div class="dashboard-shell min-h-screen text-[var(--ink)] font-sans">
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
        <TopHeader onMenuClick={() => setIsSliderOpen(true)} />

        <main class="mx-auto w-full max-w-7xl p-4 pb-28 sm:p-6 sm:pb-30 lg:p-8 lg:pb-8">
          {props.children}
        </main>
      </div>

      <BottomIconNavBar />
    </div>
  );
}

export default function App() {
  return (
    <Route path="/" component={AppLayout}>
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/activity" component={ActivityPage} />
      <Route path="/profile" component={ProfilePage} />
    </Route>
  );
}
