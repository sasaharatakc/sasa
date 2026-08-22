'use client';

import { useLayoutEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { Capsule } from './visuals/Capsule';

/**
 * 00 — HERO. A giant capsule sits centre-right. As the pinned section scrolls,
 * the "camera" eases back (scale down) while the capsule rotates and the brand
 * copy settles into place. Background light blooms behind it.
 */
export function HeroScene() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      // One-time intro so the brand copy is visible on load, then settles in.
      gsap.from('[data-hero=copy] > *', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
      });

      // Scroll-scrubbed "camera" motion.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      // Capsule: enter large, rotate, then camera pulls back.
      tl.fromTo(
        '[data-hero=capsule]',
        { scale: 1.35, rotate: 8, xPercent: 6 },
        { scale: 0.92, rotate: 42, xPercent: 0, ease: 'none' },
        0
      )
        .fromTo(
          '[data-hero=glow]',
          { scale: 0.6, opacity: 0.5 },
          { scale: 1.25, opacity: 1, ease: 'none' },
          0
        )
        // Copy drifts up gently as the camera pulls back (stays visible).
        .fromTo(
          '[data-hero=copy]',
          { y: 0 },
          { y: -60, ease: 'none' },
          0
        )
        .fromTo(
          '[data-hero=hint]',
          { opacity: 0.9 },
          { opacity: 0, ease: 'none', duration: 0.2 },
          0
        );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="hero" ref={root} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-gradient-to-b from-white via-aqua-light/40 to-mist">
        {/* Background bloom */}
        <div
          data-hero="glow"
          className="radial-glow pointer-events-none absolute right-[-10%] top-1/2 h-[80vh] w-[80vh] -translate-y-1/2 rounded-full"
          style={{ willChange: 'transform, opacity' }}
        />
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 sm:px-10 lg:grid-cols-2">
          {/* Copy */}
          <div data-hero="copy" className="max-w-xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider2 text-teal-deep backdrop-blur">
              Scroll to discover ASLE
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
              Better Medicines.
              <br />
              <span className="text-teal">Better Lives.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-navy/70">
              Innovating for a healthier tomorrow — third-party &amp; OEM
              pharmaceutical manufacturing, quality-assured and delivered across
              the globe.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#delivery"
                className="rounded-full bg-teal px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-teal-deep"
              >
                Partner With Us
              </a>
              <a
                href="#capsule"
                className="text-sm font-semibold text-teal-deep underline-offset-4 hover:underline"
              >
                Explore our world →
              </a>
            </div>
          </div>

          {/* Capsule */}
          <div className="relative flex items-center justify-center">
            <div
              data-hero="capsule"
              className="w-[110%] max-w-[680px] drop-shadow-[0_30px_60px_rgba(10,107,98,0.25)]"
              style={{ willChange: 'transform' }}
            >
              <Capsule className="h-auto w-full" />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          data-hero="hint"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-teal-deep"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider3">
            Scroll Down
          </span>
          <ChevronDown className="animate-bounce" size={18} />
        </div>
      </div>
    </section>
  );
}
