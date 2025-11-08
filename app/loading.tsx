export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="h-14 w-14 rounded-full border-4 border-foreground/20 border-t-foreground animate-spin" aria-hidden="true" />
      <p className="mt-6 text-sm font-medium tracking-wide text-foreground/70">Loading…</p>
    </div>
  );
}
