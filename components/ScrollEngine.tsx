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

    const lenis = new Lenis({ smoothWheel: true, lerp: 0.08, duration: 1.3 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
      gsap.fromTo(el,{ autoAlpha: 0.12, y: 80 },{ autoAlpha: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 35%', scrub: true } });
    });

    gsap.utils.toArray<HTMLElement>('.scene').forEach((section) => {
      gsap.to(section, {
        backgroundPositionY: '40%',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-horizontal]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-track]');
      if (!track) return;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return null;
}
