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
import { AdSlot } from "@/components/ads/ad-slot";
import { getHomepageSections, sectionOn } from "@/lib/cms/homepage";

export default async function Home() {
  const sections = await getHomepageSections();

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <HeroSlider />
      {sectionOn(sections, "featured") ? <FeaturedSection /> : null}
      {sectionOn(sections, "gallery") ? <ProductGallery /> : null}
      <div className="px-4 py-2 md:px-8">
        <AdSlot placement="home" />
      </div>
      {sectionOn(sections, "new-arrival") ? (
        <NewArrival title={sections["new-arrival"]?.title} description={sections["new-arrival"]?.description} />
      ) : null}
      {sectionOn(sections, "value-props") ? (
        <ValueProps imageSrc={sections["value-props"]?.image_src} />
      ) : null}
      {sectionOn(sections, "packages") ? (
        <PackageDeals title={sections.packages?.title} description={sections.packages?.description} />
      ) : null}
      {sectionOn(sections, "top-seller") ? <TopSeller title={sections["top-seller"]?.title} /> : null}
      {sectionOn(sections, "services") ? (
        <ServicesBanner
          title={sections.services?.title}
          description={sections.services?.description}
          imageSrc={sections.services?.image_src}
          buttonLabel={sections.services?.button_label}
          buttonHref={sections.services?.button_href}
        />
      ) : null}
      <div className="px-4 py-2 md:px-8">
        <AdSlot placement="article" />
      </div>
      {sectionOn(sections, "news") ? <LatestNews /> : null}
      {sectionOn(sections, "brands") ? <BrandStrip /> : null}
    </main>
  );
}
