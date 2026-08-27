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
    featured: [],
    brands: ["La Nuova Era", "Slayer", "Casadio", "didiesse"],
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
    ],
  },
  {
    label: "Coffee",
    href: "/coffee",
    mega: "catalog",
    children: [
      { label: "Roasted Coffee Beans", href: "/coffee?category=beans" },
      { label: "Pods", href: "/coffee?category=pods" },
    ],
    extras: [],
    featured: [
      {
        src: "",
        name: "Marcafé",
        alt: "Marcafé Gran Caffè",
        href: "/coffee?category=beans",
        cta: "View Roasted Coffee",
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
  { label: "Cleaning Solution", href: "/cleaning-solution" },
  { label: "Barista Training", href: "/training" },
  { label: "Services", href: "/services" },
  { label: "News & Events", href: "/news-events" },
  { label: "Contact Us", href: "/#contact" },
] as const;

export const headerNavOrder = [
  "Home",
  "About Us",
  "Brands",
  "Espresso Machines",
  "Grinders",
  "Coffee",
  "Flavours",
  "Cleaning Solution",
  "Barista Training",
  "Services",
  "News & Events",
  "Contact Us",
] as const;

export const headerNavLayout = {
  row1Left: [
    "Home",
    "About Us",
    "Brands",
    "Espresso Machines",
    "Grinders",
    "Coffee",
    "Flavours",
  ],
  row1Right: ["Cleaning Solution", "Barista Training"],
  row2Left: ["Services", "News & Events"],
  row2Right: ["Contact Us"],
} as const;

export function navDisplayLabel(label: string) {
  return label;
}

export function navItemsByLabels(labels: readonly string[]) {
  return labels
    .map((label) => navItems.find((item) => item.label === label))
    .filter((item): item is (typeof navItems)[number] => item != null);
}

export const heroSlides = [
  {
    src: "/images/hero-slayer-steam.png",
    alt: "White Slayer espresso machine on a café counter",
    title: "Premium Coffee Collection",
    brand: "SLAYER",
  },
  {
    src: "/images/hero-slayer-barista.png",
    alt: "Barista pulling espresso on a white Slayer machine beside a Ceado grinder",
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
    name: "Anniversario",
    brand: "La Nuova Era",
    category: "Espresso Machines",
    href: "/espresso-machines",
    price: 21545,
    src: "/images/product-la-nuova-era-anniversario.png",
  },
  {
    name: "Nettuno A2",
    brand: "Casadio",
    category: "Espresso Machines",
    href: "/espresso-machines",
    price: 3425,
    src: "/images/product-casadio-nettuno-a2.jpg",
  },
  {
    name: "SLAYER EP",
    brand: "Slayer",
    category: "Espresso Machines",
    href: "/espresso-machines",
    price: 21545,
    src: "/images/product-slayer-ep.png",
  },
  {
    name: "Lamille",
    brand: "La Nuova Era",
    category: "Espresso Machines",
    href: "/espresso-machines",
    price: 25667,
    src: "/images/product-la-nuova-era-lamille.jpg",
  },
  {
    name: "Firenze 75",
    brand: "Eureka 1920",
    category: "Grinder",
    href: "/grinders",
    price: 23545,
    src: "/images/product-firenze-75.jpg",
  },
  {
    name: "Helios 75",
    brand: "Eureka 1920",
    category: "Grinder",
    href: "/grinders",
    price: 34876,
    src: "/images/product-helios-75.jpg",
  },
  {
    name: "Mignon Silenzio",
    brand: "Eureka 1920",
    category: "Grinder",
    href: "/grinders",
    price: 18990,
    src: "/images/product-mignon-silenzio.jpg",
  },
  {
    name: "Mignon Turbo",
    brand: "Eureka 1920",
    category: "Grinder",
    href: "/grinders",
    price: 21450,
    src: "/images/product-mignon-turbo.jpg",
  },
] as const;

export const dreamCafeShopTiles = [
  {
    label: "Espresso Machine",
    href: "/espresso-machines",
    src: "/images/hero-slayer-steam.png",
    alt: "Espresso pouring into a cup",
  },
  {
    label: "Coffee Grinder",
    href: "/grinders",
    src: "/images/grinder-display.png",
    alt: "Professional coffee grinder on a cafe counter",
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
    src: "/images/product-firenze-75.jpg",
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
    "Commercial and home espresso machines chosen for flavor, steam, and a counter that looks the part — from cafe bars to hotel lobbies and home kitchens.",
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
  {
    name: "Anniversario",
    brand: "La Nuova Era",
    groups: 2,
    uses: ["cafe", "restaurant"],
    src: "/images/product-la-nuova-era-anniversario.png",
  },
  {
    name: "Nettuno A2",
    brand: "Casadio",
    groups: 2,
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-casadio-nettuno-a2.jpg",
  },
  {
    name: "Nettuno A3",
    brand: "Casadio",
    groups: 2,
    uses: ["restaurant", "hotel"],
    src: "/images/product-casadio-nettuno-a3.jpg",
  },
  {
    name: "LA5CENTO",
    brand: "La Nuova Era",
    groups: 2,
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-la-nuova-era-la5cento.jpg",
  },
  {
    name: "IRON",
    brand: "La Nuova Era",
    groups: 2,
    uses: ["cafe", "restaurant"],
    src: "/images/product-la-nuova-era-iron.png",
  },
  {
    name: "Altea Root",
    brand: "La Nuova Era",
    groups: 2,
    uses: ["cafe", "restaurant"],
    src: "/images/product-la-nuova-era-altea-root.png",
  },
  {
    name: "Lamille",
    brand: "La Nuova Era",
    groups: 2,
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-la-nuova-era-lamille.jpg",
  },
  {
    name: "Nettuno A1",
    brand: "Casadio",
    groups: 1,
    uses: ["cafe", "office", "home"],
    src: "/images/product-casadio-nettuno-a1.jpg",
  },
] as const;

export function espressoMachinesForUse(use?: string) {
  if (!use) return espressoMachines;
  return espressoMachines.filter((item) => item.uses.some((value) => value === use));
}

export const espressoUseLabels: Record<string, string> = {
  cafe: "Cafe",
  restaurant: "Restaurant",
  hotel: "Hotel",
  office: "Office",
  home: "Home",
};

export const espressoBrandCategories = [
  { label: "Casadio", slug: "casadio" },
  { label: "Slayer", slug: "slayer" },
  { label: "La Nuova Era", slug: "la-nuova-era" },
  { label: "Didiesse", slug: "didiesse" },
] as const;

export const espressoDirectory = [
  {
    title: "Espresso Machines",
    href: "/espresso-machines",
    src: "/images/product-undici-wd-2g.png",
    alt: "Professional espresso machine",
    links: [
      { label: "La Nuova Era", href: "/espresso-machines?brand=la-nuova-era" },
      { label: "Casadio", href: "/espresso-machines?brand=casadio" },
      { label: "Slayer", href: "/espresso-machines?brand=slayer" },
      { label: "Didiesse", href: "/espresso-machines?brand=didiesse" },
    ],
  },
  {
    title: "Eureka Grinder",
    href: "/grinders",
    src: "/images/product-mignon-silenzio.png",
    alt: "Eureka Mignon coffee grinder",
    links: [
      { label: "Eureka Mignon Series", href: "/grinders?series=mignon" },
      { label: "Eureka Commercial Series", href: "/grinders?series=commercial" },
    ],
  },
  {
    title: "Gourmet Catcher",
    href: "/flavours",
    src: "/images/flavour-sauce.png",
    alt: "Catcher Gourmet syrups and sauces",
    links: [
      { label: "Syrups", href: "/flavours?tab=syrups" },
      { label: "Sauce", href: "/flavours?tab=sauce" },
      { label: "Powdered Mix", href: "/flavours?tab=powder" },
    ],
  },
  {
    title: "Marcafe",
    href: "/coffee",
    src: "/images/marcafe-roasted-beans.png",
    alt: "Marcafé roasted coffee bags",
    links: [
      { label: "Roasted Coffee Beans", href: "/coffee?category=beans" },
      { label: "Pods", href: "/coffee?category=pods" },
    ],
  },
] as const;

export const espressoShopUses = [
  { label: "Cafe", slug: "cafe", src: "/images/shop-machine-cafe.jpg" },
  { label: "Restaurant", slug: "restaurant", src: "/images/shop-machine-restaurant.jpg" },
  { label: "Hotel", slug: "hotel", src: "/images/shop-machine-hotel.jpg" },
  { label: "Office", slug: "office", src: "/images/shop-machine-office.jpg" },
  { label: "Home", slug: "home", src: "/images/shop-machine-home.jpg" },
] as const;

export const grinderCatalogCopy = {
  title: "Grinders",
  description:
    "Commercial and home grinders chosen for dose consistency, quiet operation, and a counter that looks the part — from cafe bars to home kitchens.",
} as const;

export const grinderUseLabels: Record<string, string> = {
  cafe: "Cafe",
  restaurant: "Restaurant",
  hotel: "Hotel",
  office: "Office",
  home: "Home",
};

export const grinderShopUses = [
  { label: "Cafe", slug: "cafe", src: "/images/shop-machine-cafe.jpg" },
  { label: "Restaurant", slug: "restaurant", src: "/images/shop-machine-restaurant.jpg" },
  { label: "Hotel", slug: "hotel", src: "/images/shop-machine-hotel.jpg" },
  { label: "Office", slug: "office", src: "/images/shop-machine-office.jpg" },
  { label: "Home", slug: "home", src: "/images/shop-machine-home.jpg" },
] as const;

export const grinders = [
  {
    name: "Firenze 75",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-firenze-75.jpg",
  },
  {
    name: "Firenze 85",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-firenze-85.jpg",
  },
  {
    name: "Helios 75",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel", "office"],
    src: "/images/product-helios-75.jpg",
  },
  {
    name: "Mignon Silenzio",
    brand: "Eureka 1920",
    series: "mignon",
    uses: ["home", "office"],
    src: "/images/product-mignon-silenzio.jpg",
  },
  {
    name: "Mignon Turbo",
    brand: "Eureka 1920",
    series: "mignon",
    uses: ["home", "office", "cafe"],
    src: "/images/product-mignon-turbo.jpg",
  },
  {
    name: "Mignon Zero 65",
    brand: "Eureka 1920",
    series: "mignon",
    uses: ["home", "office", "cafe"],
    src: "/images/product-mignon-zero-65.jpg",
  },
  {
    name: "Mignon Drawer",
    brand: "Eureka 1920",
    series: "mignon",
    uses: ["home", "office", "cafe"],
    src: "/images/product-eureka-mignon-drawer.jpg",
    detail: "Knock box drawer",
  },
  {
    name: "Disko Auto Tamper",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-eureka-disko-tamper.jpg",
    detail: "Automatic tamper",
  },
  {
    name: "Bravo",
    brand: "Eureka 1920",
    series: "commercial",
    uses: ["cafe", "restaurant", "hotel"],
    src: "/images/product-eureka-bravo.png",
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
  shopCaption: "Choose beans or pods",
  description:
    "Italian roasted beans and pods for espresso bars, offices, and home — packed for flavour, consistency, and a counter that looks the part.",
} as const;

export const coffeeTabCopy: Record<
  string,
  { title: string; description: string; selection: string }
> = {
  beans: {
    title: "Roasted Coffee Beans",
    description:
      "1kg Marcafé blends for espresso bar and cafe service — roasted in Italy and packed for the professional counter.",
    selection: "Roasted Coffee Beans",
  },
  pods: {
    title: "Pods",
    description:
      "Marcafé cialde and decaf pods for office and hospitality — portioned, consistent, and ready for the machine.",
    selection: "Pods selection",
  },
};

export const coffeeCategories = [
  {
    slug: "beans",
    title: "Roasted Coffee Beans",
    caption: "Evaluate coffee from Restaurant dinning experience >",
    src: "/images/marcafe-roasted-beans.png",
    overlay: "orange",
  },
  {
    slug: "pods",
    title: "Pods",
    caption: "Fuel productivity delight on your office >",
    src: "/images/marcafe-pods.png",
    overlay: "white",
  },
] as const;

export const coffeeProducts = [
  {
    name: "Idillio",
    brand: "Marcafé",
    category: "beans",
    detail: "1000g · Arabica 100%",
    brews: ["espresso", "manual"],
    src: "/images/product-marcafe-idillio.jpg",
  },
  {
    name: "Miscela Speciale",
    brand: "Marcafé",
    category: "beans",
    detail: "1000g · Vending",
    brews: ["espresso", "drip"],
    src: "/images/product-marcafe-miscela-speciale.jpg",
  },
  {
    name: "Crema Bar Super",
    brand: "Marcafé",
    category: "beans",
    detail: "1000g · Espresso Bar",
    brews: ["espresso"],
    src: "/images/product-marcafe-crema-bar-super.jpg",
  },
  {
    name: "Diamante",
    brand: "Marcafé",
    category: "beans",
    detail: "1000g · Espresso Bar",
    brews: ["espresso", "manual"],
    src: "/images/product-marcafe-diamante.jpg",
  },
  {
    name: "Caffè Decaffeinato",
    brand: "Marcafé",
    category: "pods",
    detail: "72 sachets · 504g",
    brews: ["espresso"],
    src: "/images/product-marcafe-decaffeinato.jpg",
  },
  {
    name: "Perla Nera Special",
    brand: "Marcafé",
    category: "pods",
    detail: "100 pods",
    brews: ["espresso"],
    src: "/images/product-marcafe-perla-nera.jpg",
  },
  {
    name: "Cuor di Caffè",
    brand: "Marcafé",
    category: "pods",
    detail: "50 compostable pods",
    brews: ["espresso"],
    src: "/images/product-marcafe-cuor-di-caffe.jpg",
  },
] as const;

export const flavourCatalogCopy = {
  title: "Flavours",
  description:
    "Catcher Gourmet syrups, sauces, and powdered mixes for cafes and beverage programs — built for consistent flavour, clean pours, and a bar that looks the part.",
  shopHeading: "Shop Flavours",
  shopCaption: "Choose a flavour family",
} as const;

export const flavourTabCopy: Record<
  string,
  { title: string; description: string; selection: string }
> = {
  syrups: {
    title: "Syrups",
    description:
      "Flavoured syrups for coffee, mocktails, and dessert drinks — from classic 750ml bottles to gourmet cafe pours.",
    selection: "Syrups selection",
  },
  sauce: {
    title: "Sauce",
    description:
      "Thick gourmet sauces and fruity toppings for lattes, desserts, and ice cream — ready for the bar and the pastry case.",
    selection: "Sauce selection",
  },
  powder: {
    title: "Powdered Mix",
    description:
      "Barista powdered mixes for lattes, frappes, smoothies, and hot chocolate — Catcher Gourmet 1kg bags ready for the bar.",
    selection: "Powdered Mix selection",
  },
};

export const flavourCategories = [
  { slug: "syrups", label: "Syrups", src: "/images/syrup-irish-cream.jpg", padded: true },
  { slug: "sauce", label: "Sauce", src: "/images/flavour-sauce.png", padded: false },
  { slug: "powder", label: "Powdered Mix", src: "/images/flavour-powder.png", padded: false },
] as const;

export const flavourProducts = [
  { name: "Chocolate", tab: "syrups", src: "/images/syrup-chocolate-cutout.png" },
  { name: "White Chocolate", tab: "syrups", src: "/images/syrup-white-chocolate-cutout.png" },
  { name: "Hazelnut", tab: "syrups", src: "/images/syrup-hazelnut-cutout.png" },
  { name: "Caramel", tab: "syrups", src: "/images/syrup-caramel-2l-cutout.png" },
  { name: "Matcha", tab: "syrups", src: "/images/syrup-matcha-cutout.png" },
  { name: "Salted Caramel", tab: "syrups", src: "/images/syrup-salted-caramel-cutout.png" },
  { name: "Pistachio", tab: "syrups", src: "/images/syrup-pistachio-cutout.png" },
  { name: "Earl Grey", tab: "syrups", src: "/images/syrup-earl-grey-cutout.png" },
  { name: "Irish Cream", tab: "syrups", src: "/images/syrup-irish-cream-cutout.png" },
  { name: "Almond", tab: "sauce", src: "/images/sauce-almond-cutout.png" },
  { name: "Irish Cream", tab: "sauce", src: "/images/sauce-irish-cream-cutout.png" },
  { name: "Macadamia Nut", tab: "sauce", src: "/images/sauce-macadamia-nut-cutout.png" },
  { name: "Vanilla", tab: "sauce", src: "/images/sauce-vanilla-cutout.png" },
  { name: "Caramel", tab: "sauce", src: "/images/sauce-caramel-cutout.png" },
  { name: "Peach Fruity Sauce", tab: "sauce", src: "/images/sauce-fruity-peach-cutout.png" },
  { name: "Blackcurrant Fruity Sauce", tab: "sauce", src: "/images/sauce-fruity-blackcurrant-cutout.png" },
  { name: "Blueberry Fruity Sauce", tab: "sauce", src: "/images/sauce-fruity-blueberry-cutout.png" },
  { name: "Pink Guava Fruity Sauce", tab: "sauce", src: "/images/sauce-fruity-pink-guava-cutout.png" },
  { name: "Mango Fruity Sauce", tab: "sauce", src: "/images/sauce-fruity-mango-cutout.png" },
  { name: "Strawberry Fruity Sauce", tab: "sauce", src: "/images/sauce-fruity-strawberry-cutout.png" },
  { name: "Crème Smoothies", tab: "powder", src: "/images/powder-creme-smoothies.jpg" },
  { name: "Matcha Latte", tab: "powder", src: "/images/powder-matcha-latte.jpg" },
  { name: "Crème Chocolate", tab: "powder", src: "/images/powder-creme-chocolate.jpg" },
  { name: "Crème Vanilla Mix", tab: "powder", src: "/images/powder-creme-vanilla.jpg" },
  { name: "Chai Tea Latte", tab: "powder", src: "/images/powder-chai-tea-latte.jpg" },
  { name: "Crème Frappe Mix", tab: "powder", src: "/images/powder-creme-frappe.jpg" },
  { name: "White Chocolate Mix", tab: "powder", src: "/images/powder-white-chocolate.jpg" },
  { name: "Crème Yogurt Mix", tab: "powder", src: "/images/powder-creme-yogurt.jpg" },
  { name: "Classic Chocolate", tab: "powder", src: "/images/powder-classic-chocolate.jpg" },
  { name: "Bellagio Chocolate", tab: "powder", src: "/images/powder-bellagio-chocolate.jpg" },
] as const;

export const cleaningCatalogCopy = {
  title: "Cleaning Solution",
  description:
    "Professional espresso and grinder cleaning products to keep every machine tasting clean, running smooth, and looking ready for service.",
} as const;

export const cleaningCategories = [
  { slug: "machine", label: "Machine" },
  { slug: "milk", label: "Milk System" },
  { slug: "grinder", label: "Grinder" },
  { slug: "bar", label: "Bar Care" },
] as const;

export const cleaningProducts = [
  {
    name: "pulyCAFF Plus",
    brand: "puly CAFF",
    category: "machine",
    detail: "Backflush detergent",
    src: "/images/brand-pulycaff.png",
  },
  {
    name: "pulyCAFF Tabs",
    brand: "puly CAFF",
    category: "machine",
    detail: "Group head tablets",
    src: "/images/brand-pulycaff.png",
  },
  {
    name: "pulyCAFF Descaler",
    brand: "puly CAFF",
    category: "machine",
    detail: "Limescale remover",
    src: "/images/brand-pulycaff.png",
  },
  {
    name: "pulyMILK",
    brand: "puly CAFF",
    category: "milk",
    detail: "Milk system cleaner",
    src: "/images/brand-pulycaff.png",
  },
  {
    name: "pulySTEAM",
    brand: "puly CAFF",
    category: "milk",
    detail: "Steam wand cleaner",
    src: "/images/brand-pulycaff.png",
  },
  {
    name: "pulyGRIND",
    brand: "puly CAFF",
    category: "grinder",
    detail: "Grinder cleaner",
    src: "/images/brand-pulycaff.png",
  },
  {
    name: "pulyBAR",
    brand: "puly CAFF",
    category: "bar",
    detail: "Bar surface cleaner",
    src: "/images/brand-pulycaff.png",
  },
  {
    name: "pulyBRUSH Kit",
    brand: "puly CAFF",
    category: "bar",
    detail: "Group & portafilter brushes",
    src: "/images/brand-pulycaff.png",
  },
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
  { name: "Chocolate", brand: "Catcher Gourmet", src: "/images/syrup-chocolate-cutout.png" },
  { name: "White Chocolate", brand: "Catcher Gourmet", src: "/images/syrup-white-chocolate-cutout.png" },
  { name: "Hazelnut", brand: "Catcher Gourmet", src: "/images/syrup-hazelnut-cutout.png" },
  { name: "Caramel", brand: "Catcher Gourmet", src: "/images/syrup-caramel-2l-cutout.png" },
  { name: "Matcha", brand: "Catcher Gourmet", src: "/images/syrup-matcha-cutout.png" },
  { name: "Salted Caramel", brand: "Catcher Gourmet", src: "/images/syrup-salted-caramel-cutout.png" },
  { name: "Pistachio", brand: "Catcher Gourmet", src: "/images/syrup-pistachio-cutout.png" },
  { name: "Earl Grey", brand: "Catcher Gourmet", src: "/images/syrup-earl-grey-cutout.png" },
  { name: "Irish Cream", brand: "Catcher Gourmet", src: "/images/syrup-irish-cream-cutout.png" },
  { name: "Almond Sauce", brand: "Catcher Gourmet", src: "/images/sauce-almond-cutout.png" },
  { name: "Irish Cream Sauce", brand: "Catcher Gourmet", src: "/images/sauce-irish-cream-cutout.png" },
  { name: "Macadamia Nut Sauce", brand: "Catcher Gourmet", src: "/images/sauce-macadamia-nut-cutout.png" },
  { name: "Vanilla Sauce", brand: "Catcher Gourmet", src: "/images/sauce-vanilla-cutout.png" },
  { name: "Caramel Sauce", brand: "Catcher Gourmet", src: "/images/sauce-caramel-cutout.png" },
  { name: "Peach Fruity Sauce", brand: "Catcher Gourmet", src: "/images/sauce-fruity-peach-cutout.png" },
  { name: "Blackcurrant Fruity Sauce", brand: "Catcher Gourmet", src: "/images/sauce-fruity-blackcurrant-cutout.png" },
  { name: "Blueberry Fruity Sauce", brand: "Catcher Gourmet", src: "/images/sauce-fruity-blueberry-cutout.png" },
  { name: "Pink Guava Fruity Sauce", brand: "Catcher Gourmet", src: "/images/sauce-fruity-pink-guava-cutout.png" },
  { name: "Mango Fruity Sauce", brand: "Catcher Gourmet", src: "/images/sauce-fruity-mango-cutout.png" },
  { name: "Strawberry Fruity Sauce", brand: "Catcher Gourmet", src: "/images/sauce-fruity-strawberry-cutout.png" },
  { name: "Crème Smoothies", brand: "Catcher Gourmet", src: "/images/powder-creme-smoothies.jpg" },
  { name: "Matcha Latte", brand: "Catcher Gourmet", src: "/images/powder-matcha-latte.jpg" },
  { name: "Crème Chocolate", brand: "Catcher Gourmet", src: "/images/powder-creme-chocolate.jpg" },
  { name: "Crème Vanilla Mix", brand: "Catcher Gourmet", src: "/images/powder-creme-vanilla.jpg" },
  { name: "Chai Tea Latte", brand: "Catcher Gourmet", src: "/images/powder-chai-tea-latte.jpg" },
  { name: "Crème Frappe Mix", brand: "Catcher Gourmet", src: "/images/powder-creme-frappe.jpg" },
  { name: "White Chocolate Mix", brand: "Catcher Gourmet", src: "/images/powder-white-chocolate.jpg" },
  { name: "Crème Yogurt Mix", brand: "Catcher Gourmet", src: "/images/powder-creme-yogurt.jpg" },
  { name: "Classic Chocolate", brand: "Catcher Gourmet", src: "/images/powder-classic-chocolate.jpg" },
  { name: "Bellagio Chocolate", brand: "Catcher Gourmet", src: "/images/powder-bellagio-chocolate.jpg" },
  { name: "Casadio Compact", brand: "Casadio", src: "/images/product-casadio-compact.png" },
  { name: "UNDICI WD 2G", brand: "Casadio", src: "/images/product-undici-wd-2g.png" },
  { name: "Bravo", brand: "Eureka 1920", src: "/images/product-eureka-bravo.png" },
  { name: "Firenze 75", brand: "Eureka 1920", src: "/images/product-firenze-75.jpg" },
  { name: "Helios 75", brand: "Eureka 1920", src: "/images/product-helios-75.jpg" },
  { name: "Zenith", brand: "Eureka 1920", src: "/images/product-eureka-zenith.png" },
  { name: "Mignon Specialita", brand: "Eureka 1920", src: "/images/product-mignon-specialita.png" },
  { name: "Firenze 85", brand: "Eureka 1920", src: "/images/product-firenze-85.jpg" },
  { name: "Mignon Silenzio", brand: "Eureka 1920", src: "/images/product-mignon-silenzio.jpg" },
  { name: "Mignon Turbo", brand: "Eureka 1920", src: "/images/product-mignon-turbo.jpg" },
  { name: "Mignon Zero 65", brand: "Eureka 1920", src: "/images/product-mignon-zero-65.jpg" },
  { name: "Mignon Drawer", brand: "Eureka 1920", src: "/images/product-eureka-mignon-drawer.jpg" },
  { name: "Disko Auto Tamper", brand: "Eureka 1920", src: "/images/product-eureka-disko-tamper.jpg" },
  { name: "Casadio On Demand", brand: "Casadio", src: "/images/product-casadio-grinder.png" },
  { name: "Idillio", brand: "Marcafé", src: "/images/product-marcafe-idillio.jpg" },
  { name: "Miscela Speciale", brand: "Marcafé", src: "/images/product-marcafe-miscela-speciale.jpg" },
  { name: "Crema Bar Super", brand: "Marcafé", src: "/images/product-marcafe-crema-bar-super.jpg" },
  { name: "Diamante", brand: "Marcafé", src: "/images/product-marcafe-diamante.jpg" },
  { name: "Caffè Decaffeinato", brand: "Marcafé", src: "/images/product-marcafe-decaffeinato.jpg" },
  { name: "Perla Nera Special", brand: "Marcafé", src: "/images/product-marcafe-perla-nera.jpg" },
  { name: "Cuor di Caffè", brand: "Marcafé", src: "/images/product-marcafe-cuor-di-caffe.jpg" },
  { name: "SLAYER EP", brand: "Slayer", src: "/images/product-slayer-ep.png" },
  { name: "SLAYER SG", brand: "Slayer", src: "/images/product-slayer-sg.png" },
  { name: "STEAM-LP-standard-2GR", brand: "Slayer", src: "/images/product-steam-lp-2gr.png" },
] as const;

const holidayInclusions = [
  "1–2 Days Basic Barista Training",
  "Cafe Consultations",
  "Knock box",
  "Puly Caff 900g",
  "12oz Steaming Pitcher",
  "Stainless Tamper",
  "Single Tamping Mat",
  "1kg Coffee Beans",
  "2L Earl Grey Sauce",
  "2L Chocolate Sauce",
  "1L Pink Guava Sauce",
] as const;

export const packageDeals = [
  {
    id: "casadio-undici-a2",
    featured: true,
    brand: "Casadio",
    title: "UNDICI A2 WOOD",
    subtitle: "Made in Italy · Machine + Eureka Grinder Packages",
    src: "/images/package-casadio-undici.png",
    alt: "Casadio Undici A2 Wood espresso machine package flyer",
    machineOnly: 259000,
    machineBefore: 269000,
    warranty: "1 Year Warranty",
    packages: [
      { name: "Helios 65", price: 319000 },
      { name: "Firenze 75", price: 306000 },
      { name: "Mignon Silenzio", price: 287000 },
      { name: "Mignon Crono", price: 277000 },
    ],
    addons: [
      { name: "JTC OmniBlend", price: 19500 },
      { name: "Eureka DISKO Tamper", price: 21500 },
    ],
    inclusions: [
      "1–2 Days Basic Barista Training",
      "Free Consultation",
      "Coffee beans",
      "Gourmet syrups",
      "Tamper & knock box",
    ],
  },
  {
    id: "lne-holiday-helios",
    featured: false,
    brand: "La Nuova Era",
    title: "Holiday Promo · Helios 65",
    subtitle: "White 2-group + Eureka Helios 65",
    src: "/images/package-lne-helios.png",
    alt: "La Nuova Era holiday promo with Eureka Helios 65 grinder",
    machineOnly: 272000,
    before: 342000,
    after: 337000,
    grinder: "Eureka Helios 65",
    freebiesWorth: 15000,
    warranty: "1 Year Warranty",
    inclusions: ["1pc Eureka Helios 65 Grinder", ...holidayInclusions],
  },
  {
    id: "lne-holiday-bravo-black",
    featured: false,
    brand: "La Nuova Era",
    title: "Holiday Promo · Bravo",
    subtitle: "Black 2-group + Eureka Mignon Bravo",
    src: "/images/package-lne-bravo-black.png",
    alt: "La Nuova Era black machine holiday promo with Eureka Mignon Bravo",
    machineOnly: 282000,
    before: 316000,
    after: 311000,
    grinder: "Eureka Mignon Bravo",
    freebiesWorth: 15000,
    warranty: "1 Year Warranty",
    inclusions: ["1pc Eureka Mignon Bravo Grinder", ...holidayInclusions],
  },
  {
    id: "lne-holiday-bravo-white",
    featured: false,
    brand: "La Nuova Era",
    title: "Holiday Promo · Bravo",
    subtitle: "White 2-group + Eureka Mignon Bravo",
    src: "/images/package-lne-bravo-white.png",
    alt: "La Nuova Era white machine holiday promo with Eureka Mignon Bravo",
    machineOnly: 272000,
    before: 306000,
    after: 301000,
    grinder: "Eureka Mignon Bravo",
    freebiesWorth: 15000,
    warranty: "1 Year Warranty",
    inclusions: ["1pc Eureka Mignon Bravo Grinder", ...holidayInclusions],
  },
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
