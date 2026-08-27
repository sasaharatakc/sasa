'use client';

import { useLayoutEffect, useRef } from 'react';
import { ShieldCheck, FlaskConical, ClipboardCheck, Fingerprint } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useI18n } from '@/lib/i18n';

const PILLAR_ICONS = [ShieldCheck, FlaskConical, ClipboardCheck, Fingerprint];

/**
 * 07 — QUALITY. The mood shifts to the manufacturing & QC world. A framed
 * "facility" panel zooms in, then the copy, quality pillars and statement
 * reveal in sequence.
 */
export function QualityScene() {
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
      tl.fromTo(
        '[data-q=panel]',
        { scale: 1.18 },
        { scale: 1, ease: 'none', duration: 0.6 },
        0
      )
        .fromTo(
          '[data-q=copy] > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.4 },
          0.2
        )
        .fromTo(
          '[data-q=pillar]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.08, ease: 'back.out(1.6)', duration: 0.4 },
          0.45
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="quality" ref={root} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-navy">
        {/* Facility panel (CSS-composed, no fabricated photography) */}
        <div
          data-q="panel"
          className="pointer-events-none absolute inset-0"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-teal-dark to-navy" />
          <div className="grid-backdrop absolute inset-0 opacity-30" />
          <div className="radial-glow absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-2">
          <div data-q="copy" className="text-white">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider2 text-aqua">
              {m.quality.eyebrow}
            </p>
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {m.quality.title}
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/75">{m.quality.lead}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {m.quality.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <div
                  key={p.title}
                  data-q="pillar"
                  className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/20 text-aqua">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
