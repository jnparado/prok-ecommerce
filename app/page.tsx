import { HeroSlider } from "@/components/hero-slider";
import { FeaturedSection } from "@/components/featured-section";
import { NewArrival } from "@/components/new-arrival";
import { ValueProps } from "@/components/value-props";
import { PackageDeals } from "@/components/package-deals";
import { ProductGallery } from "@/components/product-gallery";
import { TopSeller } from "@/components/top-seller";
import { ServicesBanner } from "@/components/services-banner";
import { LatestNews } from "@/components/latest-news";
import { BrandStrip } from "@/components/brand-strip";

export default function Home() {
  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <HeroSlider />
      <FeaturedSection />
      <NewArrival />
      <ValueProps />
      <PackageDeals />
      <ProductGallery />
      <TopSeller />
      <ServicesBanner />
      <LatestNews />
      <BrandStrip />
    </main>
  );
}
