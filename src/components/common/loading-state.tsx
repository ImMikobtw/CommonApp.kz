export function LoadingState() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-3 animate-pulse">
        <div className="h-5 w-40 rounded bg-zinc-200" />
        <div className="h-4 w-full rounded bg-zinc-100" />
        <div className="h-4 w-2/3 rounded bg-zinc-100" />
      </div>
    </div>
  );
}