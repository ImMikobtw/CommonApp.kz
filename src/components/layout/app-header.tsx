import { Bell, Search } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-surface-200/60 bg-white/70 px-6 backdrop-blur-xl md:px-10">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex md:items-center md:gap-3 rounded-2xl border border-surface-200 bg-white/50 px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-brand-primary/10 focus-within:border-brand-primary/20">
          <Search className="h-4 w-4 text-surface-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none text-sm text-surface-900 placeholder:text-surface-400 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-surface-200 bg-white shadow-sm transition-all hover:bg-surface-50 active:scale-95 group"
        >
          <Bell className="h-5 w-5 text-surface-600 group-hover:text-brand-primary transition-colors" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-brand-primary border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-surface-200 bg-white p-1.5 pr-4 shadow-sm transition-all hover:border-brand-primary/20 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark text-sm font-bold text-white shadow-premium">
            M
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-surface-900 leading-none group-hover:text-brand-primary transition-colors">Miras</p>
            <p className="text-[11px] font-medium text-surface-400 leading-none mt-1 uppercase tracking-wider">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}