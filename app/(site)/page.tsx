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
import { HomeReveal } from "@/components/home-reveal";
import { getHomepageSections, sectionOn } from "@/lib/cms/homepage";

export default async function Home() {
  const sections = await getHomepageSections();

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <HeroSlider />
      {sectionOn(sections, "featured") ? (
        <HomeReveal>
          <FeaturedSection />
        </HomeReveal>
      ) : null}
      {sectionOn(sections, "gallery") ? (
        <HomeReveal delay={80}>
          <ProductGallery />
        </HomeReveal>
      ) : null}
      <AdSlot placement="home" className="px-4 py-2 md:px-8" />
      {sectionOn(sections, "new-arrival") ? (
        <HomeReveal>
          <NewArrival title={sections["new-arrival"]?.title} description={sections["new-arrival"]?.description} />
        </HomeReveal>
      ) : null}
      {sectionOn(sections, "value-props") ? (
        <HomeReveal>
          <ValueProps imageSrc={sections["value-props"]?.image_src} />
        </HomeReveal>
      ) : null}
      {sectionOn(sections, "packages") ? (
        <HomeReveal>
          <PackageDeals title={sections.packages?.title} description={sections.packages?.description} />
        </HomeReveal>
      ) : null}
      {sectionOn(sections, "top-seller") ? (
        <HomeReveal>
          <TopSeller title={sections["top-seller"]?.title} />
        </HomeReveal>
      ) : null}
      {sectionOn(sections, "services") ? (
        <HomeReveal>
          <ServicesBanner
            title={sections.services?.title}
            description={sections.services?.description}
            imageSrc={sections.services?.image_src}
            buttonLabel={sections.services?.button_label}
            buttonHref={sections.services?.button_href}
          />
        </HomeReveal>
      ) : null}
      <AdSlot placement="article" className="px-4 py-2 md:px-8" />
      {sectionOn(sections, "news") ? (
        <HomeReveal>
          <LatestNews />
        </HomeReveal>
      ) : null}
      {sectionOn(sections, "brands") ? (
        <HomeReveal>
          <BrandStrip />
        </HomeReveal>
      ) : null}
    </main>
  );
}
