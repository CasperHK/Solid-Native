interface TopHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function TopHeader(props: TopHeaderProps) {
  return (
    <header class="safe-top sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--paper)]/70 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--ink)]"
          onClick={props.onMenuClick}
          aria-label="Open side menu"
        >
          <span class="text-base leading-none">☰</span>
          <span>Menu</span>
        </button>

        <p class="text-sm font-semibold tracking-wide text-[var(--muted)] sm:text-base">
          {props.title ?? "Solid Native Dashboard"}
        </p>
      </div>
    </header>
  );
}
