export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Brands",
    href: "/brands",
    mega: "brands",
    brands: [
      "Catcher Gourmet",
      "Casadio",
      "Eureka 1920",
      "Slayer",
      "La Nuova Era",
      "Marcafé",
      "puly CAFF",
      "didiesse",
    ],
  },
  {
    label: "Espresso Machines",
    href: "/espresso-machines",
    mega: "catalog",
    children: [
      { label: "Cafe", href: "/espresso-machines?use=cafe" },
      { label: "Restaurant", href: "/espresso-machines?use=restaurant" },
      { label: "Hotel", href: "/espresso-machines?use=hotel" },
      { label: "Office", href: "/espresso-machines?use=office" },
      { label: "Home", href: "/espresso-machines?use=home" },
    ],
    extras: [
      { label: "Single Group", href: "/espresso-machines?group=1" },
      { label: "Double Group", href: "/espresso-machines?group=2" },
    ],
    featured: [
      {
        src: "",
        name: "Casadio",
        alt: "Casadio Bologna 1958",
        href: "/espresso-machines?brand=casadio",
        cta: "View Casadio Catalog >",
      },
    ],
  },
  {
    label: "Grinders",
    href: "/grinders",
    mega: "catalog",
    children: [
      { label: "Cafe", href: "/grinders?use=cafe" },
      { label: "Restaurant", href: "/grinders?use=restaurant" },
      { label: "Hotel", href: "/grinders?use=hotel" },
      { label: "Office", href: "/grinders?use=office" },
      { label: "Home", href: "/grinders?use=home" },
    ],
    extras: [
      { label: "Mignon Series", href: "/grinders?series=mignon" },
      { label: "Commercial Series", href: "/grinders?series=commercial" },
    ],
    featured: [
      {
        src: "/images/brand-eureka.png",
        name: "",
        alt: "Eureka 1920",
        href: "/grinders?brand=eureka-1920",
        cta: "View Eureka Grinder",
      },
      {
        src: "",
        name: "Casadio",
        alt: "Casadio Bologna 1958",
        href: "/grinders?brand=casadio",
        cta: "View Casadio",
      },
    ],
  },
  {
    label: "Coffee",
    href: "/coffee",
    mega: "catalog",
    children: [
      { label: "For Espresso", href: "/coffee?category=beans&brew=espresso" },
      { label: "For Manual Brew", href: "/coffee?category=beans&brew=manual" },
      { label: "For Drip Coffee Machine Beans", href: "/coffee?category=beans&brew=drip" },
      { label: "Green Coffee Beans", href: "/coffee?category=beans&brew=green" },
    ],
    extras: [
      { label: "Cold Brew", href: "/coffee?category=beans&brew=cold-brew" },
      { label: "Drip Packs", href: "/coffee?category=beans&brew=drip-packs" },
      { label: "Capsules", href: "/coffee?category=pods" },
    ],
    featured: [
      {
        src: "",
        name: "Marcafé",
        alt: "Marcafé Gran Caffè",
        href: "/coffee",
        cta: "View Marcafe Catalog >",
      },
    ],
  },
  {
    label: "Flavours",
    href: "/flavours",
    mega: "catalog",
    children: [
      { label: "Syrups", href: "/flavours?tab=syrups" },
      { label: "Sauce", href: "/flavours?tab=sauce" },
      { label: "Powdered Mix", href: "/flavours?tab=powder" },
    ],
    extras: [],
    featured: [
      {
        src: "",
        name: "Catcher Gourmet",
        alt: "Catcher Gourmet",
        href: "/brands?brand=catcher-gourmet",
        cta: "View Gourmet Catcher",
      },
    ],
  },
  { label: "Cleaning Solution", href: "/#service" },
  { label: "Barista Training", href: "/training" },
  { label: "Services", href: "/services" },
  { label: "News & Events", href: "/#news" },
  { label: "Contact Us", href: "/#contact" },
] as const;

export const heroSlides = [
  {
    src: "/images/hero-slayer-steam.png",
    alt: "White Slayer espresso machine on a café counter",
    title: "Premium Coffee Collection",
    brand: "SLAYER",
  },
  {
    src: "/images/hero-slayer-barista.png",
    alt: "Barista preparing espresso on a Slayer machine",
    title: "Crafted for Flavor",
    brand: "SLAYER",
    fit: "contain",
  },
  {
    src: "/images/hero-slayer-workshop.png",
    alt: "Slayer espresso machine in a workshop",
    title: "Built for Professionals",
    brand: "SLAYER",
  },
  {
    src: "/images/hero-slayer-display.png",
    alt: "Espresso machine digital brew display",
    title: "Precision Control",
    brand: "SLAYER",
  },
] as const;

export const newArrivals = [
  {
    name: "La Nuova Era Iron",
    heading: "Description",
    tagline: "Strength. Precision. Modern Italian Design.",
    src: "/images/product-la-nuova-era-iron.png",
    alt: "La Nuova Era IRON two-group espresso machine",
    paragraphs: [
      "Introducing the La Nuova Era IRON — a newly launched professional espresso machine designed to meet the demands of modern cafés and baristas. With its sleek, contemporary aesthetic and integrated LED spotlight, IRON delivers both visual impact and uncompromising performance.",
      "Built for consistency and control, the IRON features adjustable levers that allow baristas to fine-tune extraction with precision, ensuring every cup meets professional standards. Its robust construction and intuitive interface make it ideal for high-volume environments while maintaining ease of use.",
      "Whether you’re starting a new café or upgrading your current bar, IRON brings professional-grade Italian engineering to every shot.",
    ],
  },
  {
    name: "La Nuova Era Iron",
    heading: "Description",
    tagline: "Strength. Precision. Modern Italian Design.",
    src: "/images/product-la-nuova-era-iron-alt.png",
    alt: "La Nuova Era IRON espresso machine, three-quarter view",
    paragraphs: [
      "Introducing the La Nuova Era IRON — a newly launched professional espresso machine designed to meet the demands of modern cafés and baristas. With its sleek, contemporary aesthetic and integrated LED spotlight, IRON delivers both visual impact and uncompromising performance.",
      "Built for consistency and control, the IRON features adjustable levers that allow baristas to fine-tune extraction with precision, ensuring every cup meets professional standards. Its robust construction and intuitive interface make it ideal for high-volume environments while maintaining ease of use.",
      "Whether you’re starting a new café or upgrading your current bar, IRON brings professional-grade Italian engineering to every shot.",
    ],
  },
] as const;

export const audienceTiles = [
  {
    id: "office",
    src: "/images/for-office.png",
    title: "For Office",
    href: "/#office",
    caption: "Fuel productivity with coffee your team will love >",
  },
  {
    id: "hotel",
    src: "/images/for-hotel.png",
    title: "For Hotel",
    href: "/#hotel",
    caption: "Indulge your guests with an exquisite coffee selection >",
  },
  {
    id: "homes",
    src: "/images/for-home.png",
    title: "For Homes",
    href: "/#homes",
    caption: "Evaluate coffee from home >",
  },
] as const;

export const valueProps = [
  {
    title: "Premium Quality",
    body: "Sourced from the finest growers and producers worldwide",
  },
  {
    title: "Fast Shipping",
    body: "Get your favorites delivered fresh to your doorstep",
  },
  {
    title: "Expert Curation",
    body: "Handpicked selections by coffee professionals",
  },
] as const;

export const featuredProducts = [
  {
    name: "Doge Fenix",
    brand: "DOGE",
    category: "Espresso Machines",
    price: 2392,
    src: "/images/product-doge-fenix.png",
  },
  {
    name: "Casadio Compact",
    brand: "Casadio",
    category: "Espresso Machines",
    price: 3425,
    src: "/images/product-casadio-compact.png",
  },
  {
    name: "UNDICI WD 2G",
    brand: "DOGE",
    category: "Espresso Machines",
    price: 25667,
    src: "/images/product-undici-wd-2g.png",
  },
  {
    name: "Bravo",
    brand: "Eureka Grinder",
    category: "Grinder",
    price: 34876,
    src: "/images/product-eureka-bravo.png",
  },
  {
    name: "Firenze 75",
    brand: "Eureka Grinder",
    category: "Grinder",
    price: 23545,
    src: "/images/product-firenze-75.png",
  },
  {
    name: "SLAYER EP",
    brand: "SLAYER",
    category: "Espresso Machines",
    price: 21545,
    src: "/images/product-slayer-ep.png",
  },
  {
    name: "SLAYER SG",
    brand: "SLAYER",
    category: "Espresso Machines",
    price: 65897,
    src: "/images/product-slayer-sg.png",
  },
  {
    name: "STEAM-LP-standard-2GR",
    brand: "SLAYER",
    category: "Espresso Machines",
    price: 78565,
    src: "/images/product-steam-lp-2gr.png",
  },
] as const;

export const topSellers = [
  {
    name: "DOGE FENIX",
    brand: "DOGE",
    category: "Espresso Machines",
    price: 2392,
    src: "/images/product-doge-fenix.png",
    isNew: true,
  },
  {
    name: "UNDICI WD 2G",
    brand: "Casadio",
    category: "Espresso Machines",
    price: 25667,
    src: "/images/product-undici-wd-2g.png",
    isNew: true,
  },
  {
    name: "Casadio Compact",
    brand: "Casadio",
    category: "Espresso Machines",
    price: 3425,
    src: "/images/product-casadio-compact.png",
    isNew: false,
  },
  {
    name: "SLAYER EP",
    brand: "SLAYER",
    category: "Espresso Machines",
    price: 21545,
    src: "/images/product-slayer-ep.png",
    isNew: false,
  },
  {
    name: "Bravo",
    brand: "Eureka Grinder",
    category: "Grinder",
    price: 34876,
    src: "/images/product-eureka-bravo.png",
    isNew: false,
  },
  {
    name: "Firenze 75",
    brand: "Eureka Grinder",
    category: "Grinder",
    price: 23545,
    src: "/images/product-firenze-75.png",
    isNew: false,
  },
] as const;

export function brandSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function brandPageHref(name: string) {
  return `/brands?brand=${brandSlug(name)}`;
}

export const espressoCatalogCopy = {
  title: "Espresso Machines",
  description:
    "Discover our premium collection of coffee machines, grinders, and specialty coffee selections. Each product is carefully curated for quality and performance.",
} as const;

export const espressoMachines = [
  {
    name: "Doge Fenix",
    brand: "DOGE",
    groups: 2,
    uses: ["cafe", "restaurant", "office"],
    src: "/images/product-doge-fenix.png",
  },
  {
    name: "Casadio Compact",
    brand: "Casadio",
    groups: 1,
    uses: ["home", "office"],
    src: "/images/product-casadio-compact.png",
  },
  {
    name: "UNDICI WD 2G",
    brand: "Casadio",
    groups: 2,
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-undici-wd-2g.png",
  },
  {
    name: "Casadio A2 Plus",
    brand: "Casadio",
    groups: 2,
    uses: ["cafe", "hotel", "restaurant"],
    src: "/images/product-casadio-a2.png",
  },
  {
    name: "Doge Uno",
    brand: "DOGE",
    groups: 1,
    uses: ["home", "office", "cafe"],
    src: "/images/product-doge-uno.png",
  },
  {
    name: "SLAYER EP",
    brand: "Slayer",
    groups: 2,
    uses: ["cafe", "restaurant"],
    src: "/images/product-slayer-ep.png",
  },
  {
    name: "SLAYER SG",
    brand: "Slayer",
    groups: 1,
    uses: ["cafe", "home"],
    src: "/images/product-slayer-sg.png",
  },
  {
    name: "STEAM-LP-standard-2GR",
    brand: "Slayer",
    groups: 2,
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-steam-lp-2gr.png",
  },
] as const;

export const grinderCatalogCopy = {
  title: "Grinder",
  description:
    "Discover our premium collection of coffee machines, grinders, and specialty coffee selections. Each product is carefully curated for quality and performance.",
} as const;

export const grinderShopUses = [
  { label: "Cafe", slug: "cafe", src: "/images/shop-grinder-cafe.png" },
  { label: "Restaurant", slug: "restaurant", src: "/images/shop-grinder-restaurant.png" },
  { label: "Hotel", slug: "hotel", src: "/images/shop-grinder-hotel.png" },
  { label: "Office", slug: "office", src: "/images/shop-grinder-office.png" },
  { label: "Home", slug: "home", src: "/images/shop-grinder-home.png" },
] as const;

export const grinders = [
  {
    name: "Bravo",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-eureka-bravo.png",
  },
  {
    name: "Firenze 75",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-firenze-75.png",
  },
  {
    name: "Helios 75",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel", "office"],
    src: "/images/product-helios-75.png",
  },
  {
    name: "Zenith",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "office"],
    src: "/images/product-eureka-zenith.png",
  },
  {
    name: "Mignon Specialita",
    brand: "Eureka 1920",
    series: "mignon",
    uses: ["home", "office", "cafe"],
    src: "/images/product-mignon-specialita.png",
  },
  {
    name: "Mignon Silenzio",
    brand: "Eureka 1920",
    series: "mignon",
    uses: ["home", "office"],
    src: "/images/product-mignon-silenzio.png",
  },
  {
    name: "Casadio On Demand",
    brand: "Casadio",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel", "office"],
    src: "/images/product-casadio-grinder.png",
  },
] as const;

export const coffeeCatalogCopy = {
  title: "Roasted Coffee Product",
  shopHeading: "Shop Roasted Coffee Beans",
  description:
    "Discover our premium collection of coffee machines, grinders, and specialty coffee selections. Each product is carefully curated for quality and performance.",
} as const;

export const coffeeCategories = [
  {
    slug: "beans",
    title: "Roasted Coffee Beans",
    caption: "Evaluate coffee from Restaurant dinning experience >",
    src: "/images/marcafe-roasted-beans.png",
  },
  {
    slug: "pods",
    title: "Pods",
    caption: "Fuel productivity delight on your office >",
    src: "/images/marcafe-pods.png",
  },
] as const;

export const coffeeProducts = [
  {
    name: "Idillio",
    brand: "Marcafé",
    category: "beans",
    brews: ["espresso", "manual"],
    src: "/images/product-marcafe-idillio.png",
  },
  {
    name: "Classico",
    brand: "Marcafé",
    category: "beans",
    brews: ["manual", "drip", "drip-packs"],
    src: "/images/product-marcafe-classico.png",
  },
  {
    name: "Diamante",
    brand: "Marcafé",
    category: "pods",
    brews: ["espresso", "cold-brew"],
    src: "/images/product-marcafe-diamante.png",
  },
  {
    name: "Espresso Capsules",
    brand: "Marcafé",
    category: "pods",
    brews: ["capsules"],
    src: "/images/product-marcafe-capsules.png",
  },
] as const;

export const flavourCategories = [
  { slug: "syrups", label: "Syrups", src: "/images/syrup-irish-cream.png" },
  { slug: "sauce", label: "Sauce", src: "/images/flavour-sauce.png" },
  { slug: "powder", label: "Powdered Mix", src: "/images/flavour-powder.png" },
] as const;

export const flavourProducts = [
  { name: "Almond", tab: "syrups", src: "/images/syrup-almond.png" },
  { name: "Irish Cream", tab: "syrups", src: "/images/syrup-irish-cream.png" },
  { name: "Macadamia", tab: "syrups", src: "/images/syrup-macadamia.png" },
  { name: "Caramel", tab: "syrups", src: "/images/syrup-caramel.png" },
  { name: "Vanilla", tab: "syrups", src: "/images/syrup-vanilla.png" },
  { name: "Caramel Sauce", tab: "sauce", src: "/images/flavour-sauce.png" },
  { name: "Chocolate Sauce", tab: "sauce", src: "/images/product-sauce-chocolate.png" },
  { name: "White Chocolate Mix", tab: "powder", src: "/images/flavour-powder.png" },
  { name: "Mocha Mix", tab: "powder", src: "/images/product-powder-mocha.png" },
] as const;

export const trainingCourses = [
  {
    title: "Barista 101",
    description: "Discussion and Insights",
    src: "/images/training-course-thumb.png",
  },
  {
    title: "Barista 102",
    description: "Discussion and Insights",
    src: "/images/training-course-thumb.png",
  },
] as const;

export const machineServicesCopy = {
  title: "Machine Services",
  body: "Our Service Specialists receive regular international training and continuous hands-on instruction from visiting principals around the world—ensuring expert care for every machine.",
} as const;

export const servicePillars = [
  {
    title: "Customer Care",
    body: "Available daily from 8:00 AM – 5:00 PM",
  },
  {
    title: "Top Service",
    body: "Quality service you can trust, from inspection to after-care",
  },
  {
    title: "Expert Curation",
    body: "Handpicked selections by coffee professionals",
  },
] as const;

export const serviceFeatures = [
  {
    title: "Diagnostics & Troubleshooting",
    body: "Comprehensive diagnostics and systematic troubleshooting for reported machine issues.",
    src: "/images/service-diagnostics.png",
    alt: "Internal wiring and copper tubing of an espresso machine",
  },
  {
    title: "Preventive Maintenance",
    body: "Scheduled servicing and genuine parts to keep espresso machines and grinders running with less downtime.",
    src: "/images/service-maintenance.png",
    alt: "Espresso machine being serviced with tools and spare parts",
  },
] as const;

export const brandCatalogCopy = {
  title: "Brands",
  description:
    "Discover our premium collection of coffee machines, grinders, and specialty coffee selections. Each product is carefully curated for quality and performance.",
} as const;

export const brandCatalog = [
  { name: "Almond", brand: "Catcher Gourmet", src: "/images/syrup-almond.png" },
  { name: "Irish Cream", brand: "Catcher Gourmet", src: "/images/syrup-irish-cream.png" },
  { name: "Macadamia", brand: "Catcher Gourmet", src: "/images/syrup-macadamia.png" },
  { name: "Caramel", brand: "Catcher Gourmet", src: "/images/syrup-caramel.png" },
  { name: "Vanilla", brand: "Catcher Gourmet", src: "/images/syrup-vanilla.png" },
  { name: "Caramel Sauce", brand: "Catcher Gourmet", src: "/images/flavour-sauce.png" },
  { name: "Chocolate Sauce", brand: "Catcher Gourmet", src: "/images/product-sauce-chocolate.png" },
  { name: "White Chocolate Mix", brand: "Catcher Gourmet", src: "/images/flavour-powder.png" },
  { name: "Mocha Mix", brand: "Catcher Gourmet", src: "/images/product-powder-mocha.png" },
  { name: "Casadio Compact", brand: "Casadio", src: "/images/product-casadio-compact.png" },
  { name: "UNDICI WD 2G", brand: "Casadio", src: "/images/product-undici-wd-2g.png" },
  { name: "Bravo", brand: "Eureka 1920", src: "/images/product-eureka-bravo.png" },
  { name: "Firenze 75", brand: "Eureka 1920", src: "/images/product-firenze-75.png" },
  { name: "Helios 75", brand: "Eureka 1920", src: "/images/product-helios-75.png" },
  { name: "Zenith", brand: "Eureka 1920", src: "/images/product-eureka-zenith.png" },
  { name: "Mignon Specialita", brand: "Eureka 1920", src: "/images/product-mignon-specialita.png" },
  { name: "Mignon Silenzio", brand: "Eureka 1920", src: "/images/product-mignon-silenzio.png" },
  { name: "Casadio On Demand", brand: "Casadio", src: "/images/product-casadio-grinder.png" },
  { name: "Idillio", brand: "Marcafé", src: "/images/product-marcafe-idillio.png" },
  { name: "Classico", brand: "Marcafé", src: "/images/product-marcafe-classico.png" },
  { name: "Diamante", brand: "Marcafé", src: "/images/product-marcafe-diamante.png" },
  { name: "Espresso Capsules", brand: "Marcafé", src: "/images/product-marcafe-capsules.png" },
  { name: "SLAYER EP", brand: "Slayer", src: "/images/product-slayer-ep.png" },
  { name: "SLAYER SG", brand: "Slayer", src: "/images/product-slayer-sg.png" },
  { name: "STEAM-LP-standard-2GR", brand: "Slayer", src: "/images/product-steam-lp-2gr.png" },
] as const;

export const brandLogos = [
  { name: "Catcher Gourmet", href: brandPageHref("Catcher Gourmet") },
  { name: "Casadio", href: brandPageHref("Casadio") },
  { name: "Eureka 1920", href: brandPageHref("Eureka 1920") },
  { name: "Slayer", href: brandPageHref("Slayer") },
  { name: "La Nuova Era", href: brandPageHref("La Nuova Era") },
  { name: "Marcafé", href: brandPageHref("Marcafé") },
  { name: "puly CAFF", href: brandPageHref("puly CAFF") },
  { name: "didiesse", href: brandPageHref("didiesse") },
] as const;

export const newsItems = [
  {
    featured: true,
    tag: "Events",
    date: "2025",
    title: "WOFEX Mindanao 2025",
    excerpt:
      "Prokrate International met café owners, chefs, and hotel buyers on the WOFEX floor — showing Slayer, La Nuova Era, and Marcafé in person, and talking through the machines that actually fit their bar.",
    href: "/#news",
    src: "/images/news-wofex-mindanao.png",
    alt: "Prokrate team at a coffee equipment trade expo",
  },
  {
    featured: false,
    tag: "Training",
    date: "Academy",
    title: "Hands-on barista courses, from the first shot to service",
    excerpt:
      "Barista 101 and 102 walk teams through extraction, milk, and the habits that hold up when the café is full.",
    href: "/training",
    src: "/images/training-hero.png",
    alt: "Barista training at an espresso bar",
  },
  {
    featured: false,
    tag: "Service",
    date: "Workshop",
    title: "Specialists trained by the people who build the machines",
    excerpt:
      "Our technicians take regular instruction from visiting principals, so diagnostics and preventive work stay true to each brand.",
    href: "/services",
    src: "/images/machine-services-hero.png",
    alt: "Espresso machine in a service workshop",
  },
] as const;

export const aboutCopy = {
  company:
    "Prokrate International Trading Corporation is committed to providing exceptional coffee experiences by offering comprehensive solutions for coffee aficionados and businesses. With an unparalleled selection of high-quality coffee machines, grinders, specialty beans, flavorful gourmet sauces, and state-of-the-art barista tools, We cater to the diverse needs of our clientele.",
  objectives: [
    "Implement a rewards and referral program to retain at least 80% of existing customers and increase repeat purchases by 25% within the next 12 months.",
    "Introduce new beverage/machine products and expand brand presence through partnerships with at least 50 new cafés, restaurants, and resellers nationwide.",
    "Launch a franchise or dealership model, targeting the opening of 10 new partner branches in key cities across the Philippines within the next two years.",
  ],
  mission: [
    "Intends to become a recognized distributor of specialty beverages and beverage-related supplies and services to coffee houses and espresso stands throughout Mindanao and will cover the whole Philippines in the next two years.",
    "Prokrate plans to develop strong relationships with key customers so we will be viewed as indispensable partners, rather than just another supplier. We will work closely with each customer to recommend product assortment unique for their retail base, appropriate stocking levels, pricing as well as promotional ideas and material to increase sales.",
    "Prokrate will seek out and work with the manufacturers we represent to deliver the most innovative and exciting products possible to the customers we serve. We are not only selling product, we are selling service.",
  ],
  services: [
    "Coffee Machine",
    "Barista Training & Coffee Consultation",
    "Technical Support",
    "Barista Tools & Accessories",
    "Coffee Beans",
    "Beverage Supplies",
    "After-Sales Service",
  ],
} as const;
