'use client';

import { useLayoutEffect, useRef } from 'react';
import { DoorOpen, Factory, ClipboardCheck, Boxes, Warehouse } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useI18n } from '@/lib/i18n';

const STAGE_ICONS = [DoorOpen, Factory, ClipboardCheck, Boxes, Warehouse];

/**
 * 10 — MANUFACTURING. The "camera" travels through the facility: vertical scroll
 * drives horizontal movement past each stage, with a parallax background so it
 * reads as moving *through* a space rather than swapping slides.
 */
export function ManufacturingScene() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { m } = useI18n();

  useLayoutEffect(() => {
    if (reduced || !root.current || !track.current) return;
    const el = root.current;
    const rail = track.current;
    const ctx = gsap.context(() => {
      const distance = () => rail.scrollWidth - window.innerWidth;
      gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      // Parallax backdrop moves slower than the track.
      gsap.to('[data-mfg=bg]', {
        x: () => -distance() * 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="manufacturing" ref={root} className="relative h-[340vh] bg-navy">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Parallax backdrop */}
        <div
          data-mfg="bg"
          className="pointer-events-none absolute inset-0 w-[160%]"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-teal-dark to-navy" />
          <div className="grid-backdrop absolute inset-0 opacity-25" />
        </div>

        <div className="relative z-10 mx-auto mb-8 w-full max-w-7xl px-6 sm:px-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider2 text-aqua">
            {m.manufacturing.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
            {m.manufacturing.title}
          </h2>
        </div>

        <div ref={track} className="relative z-10 flex items-center gap-8 px-[10vw] will-change-transform">
          {m.manufacturing.stages.map((s, i) => {
            const Icon = STAGE_ICONS[i];
            return (
              <div key={s.title} className="flex items-center gap-8">
                <article className="flex h-[42vh] w-[72vw] shrink-0 flex-col justify-between rounded-3xl border border-white/12 bg-white/[0.06] p-8 backdrop-blur-sm sm:w-[380px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/20 text-aqua">
                    <Icon size={30} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-aqua">
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 font-display text-3xl font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-white/65">{s.desc}</p>
                  </div>
                </article>
                {i < m.manufacturing.stages.length - 1 && (
                  <span className="hidden h-px w-16 shrink-0 bg-white/20 sm:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
