'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * 09 — GLOBAL PARTNERSHIP. A conceptual global network: connection arcs radiate
 * from a central hub outward as you scroll, expressing worldwide reach without
 * asserting specific countries or trade claims.
 */
export function GlobalScene() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Hub at centre; conceptual outbound nodes.
  const hub = { x: 300, y: 260 };
  const nodes = [
    { x: 120, y: 170 },
    { x: 200, y: 320 },
    { x: 420, y: 150 },
    { x: 470, y: 300 },
    { x: 340, y: 100 },
    { x: 150, y: 260 },
    { x: 400, y: 380 },
    { x: 250, y: 130 },
  ];

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
      tl.fromTo('[data-globe]', { scale: 0.85, rotate: -6 }, { scale: 1, rotate: 0, ease: 'none' }, 0)
        .fromTo(
          '[data-arc]',
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, stagger: 0.06, ease: 'power1.out', duration: 0.5 },
          0.1
        )
        .fromTo(
          '[data-gnode]',
          { scale: 0, transformOrigin: 'center' },
          { scale: 1, stagger: 0.05, ease: 'back.out(2)', duration: 0.3 },
          0.25
        )
        .fromTo(
          '[data-global=copy] > *',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out', duration: 0.4 },
          0.2
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="global" ref={root} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-gradient-to-b from-aqua-light/30 to-white">
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-2">
          <div data-global="copy">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
              09 — Global Partnership
            </p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              A network that reaches the world
            </h2>
            <p className="mt-5 max-w-md text-lg text-navy/70">
              From our base in Jaipur, India, ASLE builds international
              collaborations — supplying partners worldwide through global export
              and drop-shipping.
            </p>
          </div>

          <div className="flex justify-center">
            <svg
              data-globe
              viewBox="0 0 600 520"
              className="h-auto w-full max-w-[560px]"
              fill="none"
              aria-hidden="true"
              style={{ willChange: 'transform' }}
            >
              <defs>
                <radialGradient id="globeBg" cx="0.5" cy="0.45" r="0.6">
                  <stop offset="0" stopColor="#c9f3ec" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="300" cy="260" r="220" fill="url(#globeBg)" />
              {/* latitude / longitude */}
              <g stroke="#0f9b8e" strokeOpacity="0.18">
                <ellipse cx="300" cy="260" rx="220" ry="220" />
                <ellipse cx="300" cy="260" rx="220" ry="130" />
                <ellipse cx="300" cy="260" rx="220" ry="60" />
                <ellipse cx="300" cy="260" rx="90" ry="220" />
                <ellipse cx="300" cy="260" rx="170" ry="220" />
              </g>

              {/* arcs */}
              <g stroke="#0f9b8e" strokeWidth="2" strokeLinecap="round">
                {nodes.map((n, i) => {
                  const midX = (hub.x + n.x) / 2;
                  const midY = (hub.y + n.y) / 2 - 60;
                  const d = `M ${hub.x} ${hub.y} Q ${midX} ${midY} ${n.x} ${n.y}`;
                  return (
                    <path
                      key={i}
                      data-arc
                      d={d}
                      strokeDasharray="1000"
                      strokeOpacity="0.55"
                    />
                  );
                })}
              </g>

              {/* nodes */}
              {nodes.map((n, i) => (
                <circle key={i} data-gnode cx={n.x} cy={n.y} r="7" fill="#0f9b8e" />
              ))}
              <circle data-gnode cx={hub.x} cy={hub.y} r="12" fill="#0a6b62" />
              <circle cx={hub.x} cy={hub.y} r="20" fill="none" stroke="#0a6b62" strokeOpacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
