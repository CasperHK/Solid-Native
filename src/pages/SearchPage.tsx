const results = [
  { title: "Quarterly Sales Report", tag: "Report", updated: "Updated 8m ago" },
  { title: "Client Onboarding Checklist", tag: "Doc", updated: "Updated 25m ago" },
  { title: "Warehouse Stock Alerts", tag: "Alert", updated: "Updated 1h ago" },
];

export default function SearchPage() {
  return (
    <section class="rise-in space-y-4">
      <header class="rounded-2xl border border-[var(--line)] bg-[var(--panel)]/85 p-5 backdrop-blur-sm">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Search</h1>
        <p class="mt-1 text-sm text-[var(--muted)]">Find reports, activity records, and customer documents.</p>

        <div class="mt-4 rounded-xl border border-[var(--line)] bg-[#140f2c] px-3 py-2">
          <input
            type="text"
            placeholder="Search by name, tag, or keyword..."
            class="w-full bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none"
          />
        </div>
      </header>

      <div class="space-y-3">
        {results.map((item) => (
          <article class="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_12px_24px_rgba(24,24,24,0.06)]">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h2 class="text-base font-semibold">{item.title}</h2>
                <p class="mt-1 text-xs text-[var(--muted)]">{item.updated}</p>
              </div>
              <span class="rounded-full bg-[var(--accent)]/20 px-2.5 py-1 text-xs font-medium text-[var(--ink)]">{item.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
