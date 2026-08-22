'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

type Props = {
  children: React.ReactNode;
  className?: string;
  /**
   * Parallax speed. Positive values move the layer up as you scroll down
   * (foreground feel); larger magnitude = faster. Background layers use
   * small negative values to drift slower/opposite.
   */
  speed?: number;
};

/**
 * A single parallax layer. Translates on the Y axis relative to page scroll
 * across the element's own viewport passage. Transform-only (GPU friendly).
 */
export function ParallaxLayer({ children, className, speed = 0.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const distance = speed * 220;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0, y: distance },
        {
          y: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
