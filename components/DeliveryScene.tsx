'use client';

import { useLayoutEffect, useRef } from 'react';
import { Package, Truck, Plane, Globe2 } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

const STEPS = [
  { icon: Package, label: 'Package' },
  { icon: Truck, label: 'Transport' },
  { icon: Plane, label: 'Export' },
  { icon: Globe2, label: 'World' },
];

/**
 * 11 — GLOBAL DELIVERY. The emotional peak. A journey (package → transport →
 * export → world) resolves into the closing statement. A moving vehicle and a
 * widening glow carry the momentum, then the copy lands and a CTA appears.
 */
export function DeliveryScene() {
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
      tl.fromTo('[data-del=road]', { xPercent: 40 }, { xPercent: -40, ease: 'none' }, 0)
        .fromTo('[data-del=truck]', { x: '-30vw' }, { x: '30vw', ease: 'none' }, 0)
        .fromTo('[data-del=glow]', { scale: 0.5, opacity: 0.3 }, { scale: 1.4, opacity: 1, ease: 'none' }, 0)
        .fromTo(
          '[data-del=step]',
          { opacity: 0.3, y: 10 },
          { opacity: 1, y: 0, stagger: 0.1, ease: 'power1.out' },
          0.1
        )
        .fromTo(
          '[data-del=copy] > *',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out', duration: 0.5 },
          0.5
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="delivery" ref={root} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-teal-dark via-teal-deep to-navy text-white">
        {/* Glow */}
        <div
          data-del="glow"
          className="radial-glow pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ willChange: 'transform, opacity' }}
        />
        {/* Road parallax */}
        <div
          data-del="road"
          className="pointer-events-none absolute bottom-[26%] left-0 h-px w-[180%] bg-white/20"
          style={{ willChange: 'transform' }}
        />
        {/* Moving vehicle */}
        <div
          data-del="truck"
          className="pointer-events-none absolute bottom-[27%] text-white/90"
          style={{ willChange: 'transform' }}
        >
          <Truck size={54} strokeWidth={1.4} />
        </div>

        {/* Copy */}
        <div data-del="copy" className="relative z-10 px-6 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider2 text-aqua">
            11 — Global Delivery
          </p>
          <h2 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Delivering Health.
            <br />
            <span className="text-aqua">Delivering Hope.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            Medicines reaching partners and patients across the world — the
            message of health and hope, carried everywhere we go.
          </p>

          {/* Journey steps */}
          <div className="mt-10 flex items-center justify-center gap-6">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} data-del="step" className="flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.08]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium text-white/70">{s.label}</span>
                </div>
              );
            })}
          </div>

          <a
            href="#contact"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-deep shadow-lg transition-transform hover:scale-[1.03]"
          >
            お問い合わせ / Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
