import Link from "next/link";

export function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3 group">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark text-sm font-bold text-white shadow-premium transition-transform group-hover:scale-105">
        CA
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-bold leading-none tracking-tight text-surface-900">
          Common App
        </span>
        <span className="text-[10px] font-semibold text-surface-400 leading-none mt-1.5 uppercase tracking-widest">
          Admin Panel
        </span>
      </div>
    </Link>
  );
}