import Link from "next/link";

export function Logo() {
    return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
        CA
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-none">Common App</span>
        <span className="text-xs text-zinc-500 leading-none mt-1">
          Admin Panel
        </span>
      </div>
    </Link>
  );
}