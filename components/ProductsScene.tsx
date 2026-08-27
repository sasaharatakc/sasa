'use client';

import { useLayoutEffect, useRef } from 'react';
import {
  Pill,
  Tablets,
  FlaskConical,
  Syringe,
  Droplets,
  Package,
} from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useI18n } from '@/lib/i18n';

/**
 * 06 — CAPABILITIES. Horizontal 3D-carousel of manufacturing capabilities and
 * dosage forms. (No fictitious product SKUs — these are ASLE's stated services
 * and standard dosage forms.) Centre card sits forward; neighbours recede.
 */
const CAP_ICONS = [Tablets, Pill, FlaskConical, Syringe, Droplets, Package];

export function ProductsScene() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { m } = useI18n();

  useLayoutEffect(() => {
    if (reduced || !root.current || !track.current) return;
    const el = root.current;
    const rail = track.current;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-cap=card]');
      const applyDepth = () => {
        const centerX = window.innerWidth / 2;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.min(Math.abs(centerX - cardCenter) / centerX, 1);
          gsap.set(card, {
            scale: 1 - dist * 0.15,
            opacity: 1 - dist * 0.55,
            rotateY: (centerX - cardCenter) / centerX * 12,
          });
        });
      };

      gsap.to(rail, {
        x: () => -(rail.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${rail.scrollWidth - window.innerWidth}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: applyDepth,
          onRefresh: applyDepth,
        },
      });
      applyDepth();
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="products"
      ref={root}
      className="relative h-[320vh] bg-gradient-to-b from-white to-aqua-light/20"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden [perspective:1400px]">
        <div className="mx-auto mb-8 w-full max-w-7xl px-6 sm:px-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
            {m.products.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
            {m.products.title}
          </h2>
          <p className="mt-3 max-w-xl text-navy/65">{m.products.lead}</p>
        </div>

        <div
          ref={track}
          className="flex items-center gap-6 px-[10vw] will-change-transform sm:gap-10 [transform-style:preserve-3d]"
        >
          {m.products.caps.map((c, i) => {
            const Icon = CAP_ICONS[i];
            return (
              <article
                key={c.title}
                data-cap="card"
                className="flex h-[44vh] w-[70vw] shrink-0 flex-col items-center justify-center gap-5 rounded-3xl border border-teal/12 bg-white p-8 text-center shadow-[0_25px_60px_rgba(10,107,98,0.12)] sm:w-[360px]"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal/10 text-teal-deep">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-navy">
                  {c.title}
                </h3>
                <p className="max-w-[240px] text-navy/65">{c.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
