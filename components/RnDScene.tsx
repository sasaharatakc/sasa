'use client';

import { useLayoutEffect, useRef } from 'react';
import { Microscope, Cpu } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useI18n } from '@/lib/i18n';
import { Molecule } from './visuals/Molecule';

/**
 * 08 — R&D. Two worlds meet: real laboratory work (left) transitions into a
 * digital scientific visualisation (right) as the section scrolls — "Real World
 * → Digital World".
 */
export function RnDScene() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { m } = useI18n();

  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });
      tl.fromTo('[data-rnd=real]', { xPercent: 0, opacity: 1 }, { xPercent: -12, opacity: 0.35, ease: 'none' }, 0)
        .fromTo('[data-rnd=digital]', { xPercent: 12, opacity: 0.25 }, { xPercent: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('[data-rnd=mol]', { rotate: -20, scale: 0.8 }, { rotate: 20, scale: 1.05, ease: 'none' }, 0)
        .fromTo(
          '[data-rnd=copy] > *',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.4 },
          0.15
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="rnd" ref={root} className="relative h-[240vh]">
      <div className="sticky top-0 grid h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
        {/* Real world */}
        <div
          data-rnd="real"
          className="relative hidden items-center justify-center bg-gradient-to-br from-navy to-teal-dark lg:flex"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="grid-backdrop absolute inset-0 opacity-20" />
          <div className="relative flex flex-col items-center gap-4 text-white/90">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
              <Microscope size={44} strokeWidth={1.4} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider2 text-aqua">
              {m.rnd.lab}
            </p>
          </div>
        </div>

        {/* Digital world */}
        <div
          data-rnd="digital"
          className="relative flex items-center justify-center bg-gradient-to-br from-mist to-aqua-light/40"
          style={{ willChange: 'transform, opacity' }}
        >
          <div data-rnd="mol" className="w-[60%] max-w-[380px]" style={{ willChange: 'transform' }}>
            <Molecule className="h-auto w-full" />
          </div>
          <Cpu className="absolute right-10 top-12 text-teal/40" size={40} />
        </div>

        {/* Copy overlay */}
        <div
          data-rnd="copy"
          className="pointer-events-none absolute inset-0 z-10 flex items-end"
        >
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10">
            <div className="max-w-lg rounded-2xl bg-white/85 p-7 backdrop-blur">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
                {m.rnd.eyebrow}
              </p>
              <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
                {m.rnd.title}
              </h2>
              <p className="mt-3 text-navy/70">{m.rnd.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
