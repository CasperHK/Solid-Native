export default function ProfilePage() {
  return (
    <section class="rise-in space-y-4">
      <header class="rounded-2xl border border-[var(--line)] bg-[var(--panel)]/85 p-5 backdrop-blur-sm">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Profile</h1>
        <p class="mt-1 text-sm text-[var(--muted)]">Manage your account information and personal settings.</p>
      </header>

      <article class="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_12px_24px_rgba(24,24,24,0.06)]">
        <div class="flex items-center gap-4">
          <div class="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--accent)]/25 text-xl font-bold text-[var(--ink)]">NU</div>
          <div>
            <h2 class="text-lg font-semibold">Naber User</h2>
            <p class="text-sm text-[var(--muted)]">naber.user@example.com</p>
          </div>
        </div>

        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div class="rounded-xl border border-[var(--line)] bg-[#1d1536] p-3 text-center">
            <p class="text-lg font-bold">12</p>
            <p class="text-xs text-[var(--muted)]">Projects</p>
          </div>
          <div class="rounded-xl border border-[var(--line)] bg-[#1d1536] p-3 text-center">
            <p class="text-lg font-bold">248</p>
            <p class="text-xs text-[var(--muted)]">Followers</p>
          </div>
          <div class="rounded-xl border border-[var(--line)] bg-[#1d1536] p-3 text-center">
            <p class="text-lg font-bold">96</p>
            <p class="text-xs text-[var(--muted)]">Following</p>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          <button type="button" class="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
            Edit Profile
          </button>
          <button type="button" class="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">
            Account Settings
          </button>
        </div>
      </article>
    </section>
  );
}
