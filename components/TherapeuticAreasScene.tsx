'use client';

import { useLayoutEffect, useRef } from 'react';
import {
  Brain,
  HeartPulse,
  Wind,
  Pill,
  Droplet,
  Sparkles,
} from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

const AREAS = [
  { icon: Brain, title: 'Neurology', jp: '神経', desc: 'Central nervous system therapies.' },
  { icon: HeartPulse, title: 'Cardiology', jp: '循環器', desc: 'Cardiovascular care formulations.' },
  { icon: Wind, title: 'Respiratory', jp: '呼吸器', desc: 'Airway and pulmonary support.' },
  { icon: Pill, title: 'Gastro', jp: '消化器', desc: 'Digestive and gastro health.' },
  { icon: Droplet, title: 'Diabetes', jp: '糖尿病', desc: 'Metabolic and glucose management.' },
  { icon: Sparkles, title: 'Dermatology', jp: '皮膚科', desc: 'Skin and topical treatments.' },
];

/**
 * 05 — THERAPEUTIC AREAS. Vertical scroll is converted into horizontal travel
 * across a rail of therapy cards. The card nearest the viewport centre scales
 * up; neighbours recede (scale + opacity), giving a focus-carousel feel.
 */
export function TherapeuticAreasScene() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current || !track.current) return;
    const el = root.current;
    const rail = track.current;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-area=card]');

      const applyFocus = () => {
        const centerX = window.innerWidth / 2;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = Math.min(Math.abs(centerX - cardCenter) / centerX, 1);
          gsap.set(card, {
            scale: 1 - dist * 0.18,
            opacity: 1 - dist * 0.5,
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
          onUpdate: applyFocus,
          onRefresh: applyFocus,
        },
      });
      applyFocus();
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="therapeutic"
      ref={root}
      className="relative h-[320vh] bg-white"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 w-full max-w-7xl px-6 sm:px-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
            05 — Therapeutic Areas
          </p>
          <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
            Broad therapeutic coverage
          </h2>
        </div>

        <div
          ref={track}
          className="flex items-center gap-6 px-[8vw] will-change-transform sm:gap-8"
        >
          {AREAS.map((a) => {
            const Icon = a.icon;
            return (
              <article
                key={a.title}
                data-area="card"
                className="flex h-[46vh] w-[72vw] shrink-0 flex-col justify-between rounded-3xl border border-teal/12 bg-gradient-to-b from-white to-aqua-light/30 p-8 shadow-[0_20px_50px_rgba(10,107,98,0.08)] sm:w-[420px]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/10 text-teal-deep">
                  <Icon size={30} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
                    {a.jp}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-semibold text-navy">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-navy/65">{a.desc}</p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-8 w-full max-w-7xl px-6 text-sm text-navy/50 sm:px-10">
          Scroll to move sideways →
        </p>
      </div>
    </section>
  );
}
