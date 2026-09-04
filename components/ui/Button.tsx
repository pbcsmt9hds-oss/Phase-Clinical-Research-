'use client';

import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'glow' | 'ghost';
};

export function Button({ variant = 'glow', className = '', children, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan';

  const styles =
    variant === 'glow'
      ? 'bg-cyan text-obsidian shadow-glow hover:shadow-[0_0_55px_-6px_rgba(0,242,254,0.55)] hover:-translate-y-0.5'
      : 'border border-mist/30 text-mist hover:border-cyan/60 hover:text-cyan';

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
