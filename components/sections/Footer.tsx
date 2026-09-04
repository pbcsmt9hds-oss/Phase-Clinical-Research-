'use client';

export default function Footer() {
  return (
    <footer className="relative border-t border-mist/10 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-white">Phase Clinical Research</span>
          <p className="max-w-sm text-xs leading-relaxed text-fog">
            This site describes clinical trial operations services and is not
            intended to solicit patients for enrollment or to provide medical
            advice. Regulatory frameworks referenced (FDA, EMA, TGA, CDSCO)
            are named for context on operational scope only.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-mist sm:items-end">
          <a href="#dual-hub" className="transition-colors hover:text-cyan">
            Dual-Hub Model
          </a>
          <a href="#therapeutic" className="transition-colors hover:text-cyan">
            Therapeutic Focus
          </a>
          <a href="#rbqm" className="transition-colors hover:text-cyan">
            RBQM
          </a>
          <a href="#contact" className="transition-colors hover:text-cyan">
            Contact
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-mist/10 pt-6">
        <span className="data-readout text-[11px] text-fog">
          © {new Date().getFullYear()} Phase Clinical Research
        </span>
        <span className="data-readout flex items-center gap-2 text-[11px] text-emerald">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          OPERATIONAL // GLOBAL HUBS ACTIVE
        </span>
      </div>
    </footer>
  );
}
