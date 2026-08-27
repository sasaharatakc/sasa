import { I18nProvider } from '@/lib/i18n';
import { SmoothScroll } from '@/lib/SmoothScroll';
import { Navigation } from '@/components/Navigation';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HeroScene } from '@/components/HeroScene';
import { CapsuleScene } from '@/components/CapsuleScene';
import { IngredientScene } from '@/components/IngredientScene';
import { HumanScene } from '@/components/HumanScene';
import { TherapeuticAreasScene } from '@/components/TherapeuticAreasScene';
import { ProductsScene } from '@/components/ProductsScene';
import { QualityScene } from '@/components/QualityScene';
import { RnDScene } from '@/components/RnDScene';
import { GlobalScene } from '@/components/GlobalScene';
import { ManufacturingScene } from '@/components/ManufacturingScene';
import { DeliveryScene } from '@/components/DeliveryScene';
import { FinalValues } from '@/components/FinalValues';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <I18nProvider>
      <SmoothScroll>
      <Navigation />
      <ScrollProgress />
      <main>
        {/* Phase 1 — the signature immersive narrative */}
        <HeroScene />
        <CapsuleScene />
        <IngredientScene />
        <HumanScene />

        {/* Phase 2 — horizontal / capability scenes */}
        <TherapeuticAreasScene />
        <ProductsScene />
        <QualityScene />

        {/* Phase 3 — R&D → Global → Manufacturing → Delivery */}
        <RnDScene />
        <GlobalScene />
        <ManufacturingScene />
        <DeliveryScene />

        {/* Phase 4 — calm close */}
        <FinalValues />
      </main>
      <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}
