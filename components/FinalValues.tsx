'use client';

import { Users, ShieldCheck, HeartHandshake, Globe, Leaf } from 'lucide-react';
import { MotionText } from './MotionText';

const VALUES = [
  { icon: Users, title: 'Patient Centric', jp: '患者中心の考え方' },
  { icon: ShieldCheck, title: 'Quality First', jp: '品質を最優先' },
  { icon: HeartHandshake, title: 'Affordable Healthcare', jp: '手頃で価値ある医療' },
  { icon: Globe, title: 'Global Presence', jp: '世界への展開' },
  { icon: Leaf, title: 'Sustainable Future', jp: '持続可能な未来へ' },
];

/**
 * 12 — WHY ASLE. After the intensity of the journey, the site settles. Minimal
 * motion (gentle reveals only) creates the closing "calm" beat of the rhythm.
 */
export function FinalValues() {
  return (
    <section id="why" className="relative bg-white py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <MotionText className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider2 text-teal-deep">
            Why ASLE Pharmaceuticals?
          </p>
          <h2 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
            The principles behind our work
          </h2>
        </MotionText>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <MotionText
                key={v.title}
                delay={i * 0.05}
                y={24}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/10 text-teal-deep">
                  <Icon size={30} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-navy">{v.title}</h3>
                <p className="mt-1 text-sm text-navy/55">{v.jp}</p>
              </MotionText>
            );
          })}
        </div>
      </div>
    </section>
  );
}
