'use client';

import { MapPin, Boxes, Factory, Truck, Globe2 } from 'lucide-react';

const SERVICES = [
  { icon: Factory, label: 'Third Party Manufacturing' },
  { icon: Boxes, label: 'OEM Manufacturing' },
  { icon: Truck, label: 'Drop Shipping' },
  { icon: Globe2, label: 'Global Export' },
];

/**
 * Contact / CTA footer. Carries the real, stated company facts (services, base
 * location) — no fabricated numbers, certifications or contact details.
 */
export function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Let&apos;s build better
              <br />
              medicines together.
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Partner with ASLE Pharmaceuticals for third-party &amp; OEM
              manufacturing, drop shipping and global export — with no minimum
              order quantity.
            </p>
            <div className="mt-7 flex items-center gap-2 text-white/70">
              <MapPin size={18} className="text-aqua" />
              <span>Jaipur, India</span>
            </div>
            <a
              href="#hero"
              className="mt-8 inline-flex rounded-full bg-teal px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-light"
            >
              Partner With Us
            </a>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-wider2 text-aqua">
              What we offer
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <li
                    key={s.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
                  >
                    <Icon size={20} className="text-aqua" strokeWidth={1.6} />
                    <span className="text-sm text-white/85">{s.label}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {['GMP-WHO', 'US-FDA aligned', 'No MOQ', 'International Collaboration'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} ASLE Pharmaceuticals. All rights reserved.</span>
          <span className="font-display tracking-wider2">Better Medicines. Better Lives.</span>
        </div>
      </div>
    </footer>
  );
}
