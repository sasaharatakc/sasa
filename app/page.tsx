'use client';

import { ScrollSystem } from '@/components/ScrollSystem';
import {
  AnimatedTitle,
  AromaWords,
  GlobalAtmosphere,
  HorizontalStory,
  ScrollProgressNav,
  Section,
  brew,
  steps,
  useSceneMotion,
} from '@/components/scenes';

export default function Page() {
  useSceneMotion();

  return (
    <main className="bg-deepBlack text-white">
      <ScrollSystem />
      <GlobalAtmosphere />
      <ScrollProgressNav />

      <Section id="opening" className="scene">
        <div className="scene-content sticky top-0 flex h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-amber/70">SOUND ON / OFF</p>
          <AnimatedTitle text="香りで、時間が動き出す。" />
        </div>
      </Section>

      <Section id="pour" className="scene bg-gradient-to-b from-black to-espresso min-h-[300vh]">
        <div className="scene-content sticky top-0 flex h-screen items-center px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-sm tracking-[0.4em] text-amber/70">ASSAM TEA POUR</p>
            <h1 className="font-display text-6xl md:text-8xl">琥珀の一滴へ。</h1>
          </div>
        </div>
      </Section>

      <Section id="liquid" className="scene min-h-[250vh] overflow-hidden">
        <div className="liquid-tunnel scene-content sticky top-0 flex h-screen items-center justify-center">
          <AnimatedTitle text="Enter the Liquid" />
        </div>
      </Section>

      <Section id="aroma" className="scene min-h-[220vh] bg-black">
        <div className="scene-content sticky top-0 flex h-screen items-center justify-center px-6">
          <AromaWords />
        </div>
      </Section>

      <Section id="estate" className="scene min-h-[300vh] bg-forest/40">
        <div className="scene-content sticky top-0 flex h-screen items-end px-8 pb-24">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.35em] text-mist/70">ASSAM, INDIA</p>
            <h2 className="mt-5 font-display text-5xl md:text-7xl">大地の熱、霧、雨。</h2>
          </div>
        </div>
      </Section>

      <HorizontalStory id="leaf-story" items={steps} />
      <HorizontalStory id="brew-story" items={brew} dark />

      <Section id="product" className="scene min-h-[250vh]">
        <div className="scene-content sticky top-0 flex h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-sm tracking-[0.35em] text-amber/70">PRODUCT SHOWCASE</p>
            <h2 className="mt-4 font-display text-5xl md:text-8xl">ASSAM BLACK TEA</h2>
          </div>
        </div>
      </Section>

      <Section id="emotion" className="scene min-h-[200vh] bg-[linear-gradient(180deg,#1d1510,#3a2c20)]">
        <div className="scene-content sticky top-0 flex h-screen items-center px-8">
          <h2 className="max-w-3xl font-display text-4xl leading-tight md:text-7xl">濃く、深く、やさしく。 一杯が、今日を整える。</h2>
        </div>
      </Section>

      <section id="final" className="relative min-h-[150vh] bg-black">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8">
          <h2 className="font-display text-4xl md:text-7xl">アッサムの記憶を、一杯に。</h2>
          <div className="flex gap-4">
            <button className="rounded-full border border-amber/50 px-6 py-3 text-sm">商品を見る</button>
            <button className="rounded-full border border-white/30 px-6 py-3 text-sm">茶葉の物語を読む</button>
          </div>
        </div>
      </section>
    </main>
  );
}
