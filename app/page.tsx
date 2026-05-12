import GlobalAtmosphere from '@/components/GlobalAtmosphere';
import ScrollEngine from '@/components/ScrollEngine';
import { HorizontalBrewStory, HorizontalLeafStory, VerticalScenes } from '@/components/Scenes';

export default function Page() {
  return (
    <main className="bg-deepBlack text-cream min-h-screen">
      <ScrollEngine />
      <GlobalAtmosphere />
      <div className="fixed top-6 right-6 z-[90] text-[10px] tracking-[0.3em] text-cream/70">SOUND · OFF</div>
      <VerticalScenes />
      <HorizontalLeafStory />
      <HorizontalBrewStory />
      <section className="h-[160vh] flex items-center justify-center text-center px-6">
        <div data-fade className="space-y-6">
          <h2 className="scene-title">ASSAM, IN A CUP</h2>
          <p className="scene-copy mx-auto">商品を見る / 茶葉の物語を読む</p>
        </div>
      </section>
    </main>
  );
}
