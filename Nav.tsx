'use client';

export default function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full px-6 py-5">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3">
        <span className="text-sm font-semibold tracking-tight text-white">
          Phase Clinical Research
        </span>
        <nav className="hidden items-center gap-7 text-sm text-mist md:flex">
          <a href="#dual-hub" className="transition-colors hover:text-cyan">
            Dual-Hub
          </a>
          <a href="#therapeutic" className="transition-colors hover:text-cyan">
            Therapeutic Focus
          </a>
          <a href="#rbqm" className="transition-colors hover:text-cyan">
            RBQM
          </a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-cyan/40 px-4 py-1.5 text-xs font-medium text-cyan transition-colors hover:bg-cyan/10"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
