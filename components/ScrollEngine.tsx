'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEngine() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 40%', scrub: true } });
    });

    const horizontalSections = gsap.utils.toArray<HTMLElement>('[data-horizontal]');
    horizontalSections.forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-track]');
      if (!track) return;
      const x = () => -(track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); lenis.destroy(); };
  }, []);

  return null;
}
