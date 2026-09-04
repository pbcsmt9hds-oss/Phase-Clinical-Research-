'use client';

export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-mist">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
      </span>
      <span className="data-readout">{children}</span>
    </div>
  );
}

export function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>{children}</div>
  );
}
