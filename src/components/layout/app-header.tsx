import { Bell, Search } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/90 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <div className="hidden md:flex md:items-center md:gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">Search...</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 hover:bg-zinc-50"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            M
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-zinc-900">Miras</p>
            <p className="text-xs text-zinc-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}