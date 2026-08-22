'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { Capsule } from './visuals/Capsule';

/**
 * 02 — CAPSULE BREAK. The pinned capsule separates: the two halves slide apart
 * and the inner granules burst outward, revealing the science inside. This is
 * the signature transition of the site.
 */
export function CapsuleScene() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

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
        '[data-cap=whole]',
        { scale: 0.85, rotate: 42 },
        { scale: 1, rotate: 0, ease: 'none', duration: 0.4 },
        0
      )
        .to('[data-part=cap-left]', { xPercent: -55, rotate: -10, ease: 'power1.inOut' }, 0.35)
        .to('[data-part=cap-right]', { xPercent: 55, rotate: 10, ease: 'power1.inOut' }, 0.35)
        .fromTo(
          '[data-cap=particle]',
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            stagger: { each: 0.02, from: 'center' },
          },
          0.45
        )
        .to(
          '[data-cap=particle]',
          {
            x: (i) => (i % 2 === 0 ? 1 : -1) * (60 + (i % 5) * 40),
            y: (i) => (i % 3 === 0 ? -1 : 1) * (40 + (i % 4) * 45),
            ease: 'power1.out',
          },
          0.5
        )
        .fromTo(
          '[data-cap=copy]',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 },
          0.55
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  const particles = Array.from({ length: 14 });

  return (
    <section id="capsule" ref={root} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-mist via-white to-aqua-light/30">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" />

        {/* Particles burst */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {particles.map((_, i) => (
            <span
              key={i}
              data-cap="particle"
              className="absolute block rounded-full"
              style={{
                width: 8 + (i % 4) * 4,
                height: 8 + (i % 4) * 4,
                background: i % 3 === 0 ? '#7fded1' : '#0f9b8e',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

        {/* Capsule */}
        <div
          data-cap="whole"
          className="relative z-10 w-[85%] max-w-[620px]"
          style={{ willChange: 'transform' }}
        >
          <Capsule className="h-auto w-full" />
        </div>

        {/* Copy */}
        <div
          data-cap="copy"
          className="absolute bottom-16 left-1/2 max-w-xl -translate-x-1/2 px-6 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
            02 — Inside every capsule
          </p>
          <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Precision from the inside out
          </h2>
          <p className="mt-3 text-navy/70">
            Every formulation is engineered granule by granule — the science
            that sits behind dependable, effective medicine.
          </p>
        </div>
      </div>
    </section>
  );
}
