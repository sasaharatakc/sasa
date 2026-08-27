'use client';

import { useEffect, useState } from 'react';
import { SECTIONS } from '@/lib/sections';

/**
 * Left-edge vertical scroll rail. Shows overall progress (0–100%) and a dot per
 * scene that lights up as it becomes the active section. Simplified/hidden on
 * small screens where it would crowd the content.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="mb-2 text-[10px] font-semibold tabular-nums text-teal-deep">
          {String(Math.round(progress * 100)).padStart(2, '0')}%
        </span>
        <div className="relative flex flex-col items-center gap-3">
          {/* track */}
          <span className="absolute top-0 h-full w-px bg-navy/10" />
          {/* fill */}
          <span
            className="absolute top-0 w-px origin-top bg-teal"
            style={{ height: '100%', transform: `scaleY(${progress})` }}
          />
          {SECTIONS.map((s, i) => (
            <span
              key={s.id}
              className={`relative z-10 h-2 w-2 rounded-full border transition-all duration-300 ${
                i === active
                  ? 'scale-125 border-teal bg-teal'
                  : i < active
                  ? 'border-teal bg-teal/50'
                  : 'border-navy/25 bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
