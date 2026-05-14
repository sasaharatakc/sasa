import GlobalAtmosphere from '@/components/GlobalAtmosphere';
import ScrollEngine from '@/components/ScrollEngine';
import { AromaParticleScene, AssamEstateScene, AssamPourHero, BrewingRitualHorizontalStory, EmotionalMomentScene, FinalCTA, LeafToTeaHorizontalStory, LiquidDiveScene, OpeningScene, ProductShowcaseScene } from '@/components/sections';

export default function Page() {
  return (
    <main className="bg-deepBlack text-cream min-h-screen">
      <ScrollEngine />
      <GlobalAtmosphere />
      <header className="fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-5 py-4 md:px-8">
        <p className="text-xs tracking-[0.3em]">ASSAM IMMERSIVE FILM</p>
        <button className="text-[10px] tracking-[0.35em]">SOUND · OFF</button>
      </header>
      <OpeningScene />
      <AssamPourHero />
      <LiquidDiveScene />
      <AromaParticleScene />
      <AssamEstateScene />
      <LeafToTeaHorizontalStory />
      <BrewingRitualHorizontalStory />
      <ProductShowcaseScene />
      <EmotionalMomentScene />
      <FinalCTA />
    </main>
  );
}
