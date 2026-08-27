'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

type Props = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical travel distance of the reveal in px. */
  y?: number;
  /** Trigger start position (ScrollTrigger syntax). */
  start?: string;
};

/**
 * A block of text (or any content) that rises and fades into place the first
 * time it scrolls into view. Respects reduced-motion by rendering statically.
 */
export function MotionText({
  children,
  as = 'div',
  className,
  delay = 0,
  y = 34,
  start = 'top 82%',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const Tag = as as React.ElementType;

  useLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced, delay, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
