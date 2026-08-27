'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useI18n } from '@/lib/i18n';
import { Molecule } from './visuals/Molecule';

/**
 * 03 — INGREDIENTS. The particles have resolved into a molecular structure.
 * Three parallax depths (background grid, molecule, foreground particles) move
 * at different speeds while the copy holds centre-left.
 */
export function IngredientScene() {
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
        '[data-ing=molecule]',
        { scale: 0.7, rotate: -12, opacity: 0.4 },
        { scale: 1.05, rotate: 8, opacity: 1, ease: 'none' },
        0
      )
        .fromTo('[data-ing=bg]', { y: -60 }, { y: 60, ease: 'none' }, 0)
        .fromTo('[data-ing=fg]', { y: 120 }, { y: -120, ease: 'none' }, 0)
        .fromTo(
          '[data-part=nodes] circle',
          { scale: 0, transformOrigin: 'center' },
          { scale: 1, stagger: 0.03, ease: 'back.out(2)', duration: 0.4 },
          0.1
        )
        .fromTo(
          '[data-ing=copy] > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.06, ease: 'power2.out', duration: 0.4 },
          0.15
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="ingredients" ref={root} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-gradient-to-b from-aqua-light/30 via-white to-mist">
        {/* Background layer */}
        <div
          data-ing="bg"
          className="grid-backdrop pointer-events-none absolute inset-0 opacity-70"
          style={{ willChange: 'transform' }}
        />

        {/* Molecule (midground) */}
        <div className="pointer-events-none absolute right-[2%] top-1/2 flex w-[54vw] max-w-[640px] -translate-y-1/2 justify-center lg:right-[6%]">
          <div
            data-ing="molecule"
            className="w-full"
            style={{ willChange: 'transform, opacity' }}
          >
            <Molecule className="h-auto w-full drop-shadow-[0_20px_50px_rgba(10,107,98,0.18)]" />
          </div>
        </div>

        {/* Foreground drifting particles */}
        <div
          data-ing="fg"
          className="pointer-events-none absolute inset-0"
          style={{ willChange: 'transform' }}
        >
          <span className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-teal/70" />
          <span className="absolute left-[70%] top-[22%] h-2 w-2 rounded-full bg-aqua" />
          <span className="absolute left-[60%] top-[72%] h-4 w-4 rounded-full bg-teal/50" />
          <span className="absolute left-[30%] top-[66%] h-2.5 w-2.5 rounded-full bg-aqua" />
        </div>

        {/* Copy */}
        <div
          data-ing="copy"
          className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10"
        >
          <div className="max-w-md">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
              {m.ingredients.eyebrow}
            </p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              {m.ingredients.title}
            </h2>
            <p className="mt-5 text-lg text-navy/70">{m.ingredients.lead}</p>
            <ul className="mt-6 space-y-2 text-navy/75">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                {m.ingredients.c1}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                {m.ingredients.c2}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                {m.ingredients.c3}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
