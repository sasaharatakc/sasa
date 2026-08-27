'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useI18n } from '@/lib/i18n';
import { Molecule } from './visuals/Molecule';
import { HumanSilhouette } from './visuals/HumanSilhouette';

/**
 * 04 — TO HUMAN. The molecular network resolves into a human silhouette: the
 * molecule fades/contracts as the body scales up with a soft teal core glow,
 * expressing "Science → Healthcare". Restrained, medical, trustworthy.
 */
export function HumanScene() {
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
        '[data-human=mol]',
        { scale: 1.1, opacity: 1 },
        { scale: 0.5, opacity: 0, ease: 'none', duration: 0.5 },
        0
      )
        .fromTo(
          '[data-human=body]',
          { scale: 0.7, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, ease: 'power2.out', duration: 0.55 },
          0.25
        )
        .fromTo(
          '[data-part=core]',
          { scale: 0.6, opacity: 0.4 },
          { scale: 1.15, opacity: 1, ease: 'sine.inOut', duration: 0.4 },
          0.5
        )
        .fromTo(
          '[data-human=copy] > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.4 },
          0.4
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="human" ref={root} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-gradient-to-b from-mist via-aqua-light/20 to-navy/[0.03]">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />

        {/* Stage */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-[70vh] items-center justify-center">
            <div
              data-human="mol"
              className="absolute w-[46vh] max-w-[420px]"
              style={{ willChange: 'transform, opacity' }}
            >
              <Molecule className="h-auto w-full" />
            </div>
            <div
              data-human="body"
              className="relative h-[70vh] w-auto"
              style={{ willChange: 'transform, opacity' }}
            >
              <HumanSilhouette className="h-full w-auto drop-shadow-[0_20px_60px_rgba(15,155,142,0.3)]" />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div
          data-human="copy"
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-6 sm:px-10"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
            {m.human.eyebrow}
          </p>
          <h2 className="max-w-md font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
            {m.human.title}
          </h2>
          <p className="mt-5 max-w-sm text-lg text-navy/70">{m.human.lead}</p>
        </div>
      </div>
    </section>
  );
}
