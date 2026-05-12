'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['MALTY', 'RICH', 'BOLD', 'ASSAM'];
const steps = ['芽吹く', '摘み取る', '休ませる', '揉み込む', '深く発酵する', '乾かす', '香りになる'];
const brew = ['量る', 'ポットへ', '湯を注ぐ', '蒸らす', '注ぎ分ける', '飲む'];

export function GlobalAtmosphere() {
  return <div className="pointer-events-none fixed inset-0 z-50 steam-layer film-grain vignette" />;
}

export function ScrollProgressNav() {
  return <div className="fixed right-6 top-1/2 z-40 h-48 w-[2px] -translate-y-1/2 bg-white/20" />;
}

export function Section({ id, className, children }: any) {
  return <section id={id} className={`relative min-h-[220vh] ${className || ''}`}>{children}</section>;
}

export function AnimatedTitle({ text }: { text: string }) {
  return <h2 className="font-display text-4xl text-mist md:text-7xl">{text}</h2>;
}

export function HorizontalStory({ id, items, dark = false }: { id: string; items: string[]; dark?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrap.current) return;
    const track = wrap.current.querySelector('.track') as HTMLElement;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: '+=4500',
          scrub: 1,
          pin: true,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={wrap} className={`relative h-[500vh] overflow-hidden ${dark ? 'bg-black' : 'bg-espresso'}`}>
      <div className="track sticky top-0 flex h-screen w-max items-center">
        {items.map((item, i) => (
          <article key={item} className="relative flex h-screen w-[100vw] flex-col justify-end p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(199,133,45,0.35),transparent_60%)]" />
            <p className="z-10 text-sm tracking-[0.3em] text-amber/70">STEP {String(i + 1).padStart(2, '0')}</p>
            <h3 className="z-10 mt-4 font-display text-5xl text-white md:text-7xl">{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function useSceneMotion() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.scene');
    sections.forEach((scene) => {
      gsap.fromTo(
        scene.querySelector('.scene-content'),
        { y: 120, opacity: 0.25 },
        {
          y: -60,
          opacity: 1,
          scrollTrigger: {
            trigger: scene,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        },
      );
    });
  }, []);
}

export function AromaWords() {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      {words.map((word) => (
        <p key={word} className="font-display text-5xl text-amber/80 md:text-7xl">{word}</p>
      ))}
    </div>
  );
}

export { steps, brew };
