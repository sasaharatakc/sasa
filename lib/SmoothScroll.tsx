'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { useReducedMotion } from './useReducedMotion';

/**
 * Mounts Lenis smooth-scroll and syncs it with the GSAP ScrollTrigger ticker.
 * When the user prefers reduced motion, Lenis is not started and the browser's
 * native scrolling is used — all scroll-triggered content still appears, but
 * without the smoothed / virtualised motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Let ScrollTrigger measure after layout settles.
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 200);

    return () => {
      window.clearTimeout(id);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
