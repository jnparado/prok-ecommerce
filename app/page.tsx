import { HeroSlider } from "@/components/hero-slider";
import { FeaturedSection } from "@/components/featured-section";
import { ValueProps } from "@/components/value-props";
import { ProductGallery } from "@/components/product-gallery";
import { TopSeller } from "@/components/top-seller";
import { ServicesBanner } from "@/components/services-banner";
import { BrandStrip } from "@/components/brand-strip";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <HeroSlider />
      <FeaturedSection />
      <ValueProps />
      <ProductGallery />
      <TopSeller />
      <ServicesBanner />
      <BrandStrip />
    </main>
  );
}
