'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/sections';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(13,43,52,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#hero" className="flex items-center gap-2.5" aria-label="ASLE Pharmaceuticals home">
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wider2 text-navy">
              ASLE
            </span>
            <span className="text-[9px] font-medium uppercase tracking-wider3 text-teal-deep">
              Pharmaceuticals
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-navy/70 transition-colors hover:text-teal-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#delivery"
            className="hidden rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-deep hover:shadow-md sm:inline-flex"
          >
            Partner With Us
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-teal/10 bg-white/95 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col px-5 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-navy/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#delivery"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white"
              >
                Partner With Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="34" height="34" rx="9" fill="#0f9b8e" />
      <path
        d="M17 7.5 25.5 24h-4.2l-1.4-2.9h-5.8L12.7 24H8.5L17 7.5Zm0 7.2-1.7 3.5h3.4L17 14.7Z"
        fill="#fff"
      />
    </svg>
  );
}
