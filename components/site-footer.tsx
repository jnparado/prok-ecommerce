import Link from "next/link";

const footerColumns = [
  {
    title: "Shop",
    links: [{ label: "Wholesale", href: "/espresso-machines" }],
  },
  {
    title: "Support",
    links: [
      { label: "My Account", href: "#contact" },
      { label: "Shopping Cart", href: "#top-seller" },
      { label: "Help Center", href: "#service" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "#news" },
      { label: "About Us", href: "#brand" },
      { label: "Careers", href: "#brand" },
      { label: "Press", href: "#news" },
    ],
  },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "#contact" },
  { label: "Terms of Service", href: "#contact" },
  { label: "Cookie Policy", href: "#contact" },
] as const;

function CubeMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
      <polygon points="16,3 29,10.5 16,18 3,10.5" fill="#c0392b" />
      <polygon points="3,10.5 16,18 16,31 3,23.5" fill="#1e7a4a" />
      <polygon points="16,18 29,10.5 29,23.5 16,31" fill="#8b5a2b" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.4 12.8h2.1l.3-2.4h-2.4V8.9c0-.7.2-1.2 1.2-1.2h1.3V5.6c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.6H8.5v2.4h2.3V19h2.6v-6.2z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#E4405F" />
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        rx="3.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.2" cy="7.8" r="0.9" fill="#fff" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1DA1F2" />
      <path
        fill="#fff"
        d="M18.1 8.4c-.4.2-.9.3-1.4.4.5-.3.9-.8 1.1-1.4-.5.3-1 .5-1.6.6A2.4 2.4 0 0 0 12 10.4c0 .2 0 .4.1.5-2-.1-3.8-1.1-5-2.5-.2.4-.3.8-.3 1.2 0 .8.4 1.6 1.1 2-.4 0-.8-.1-1.1-.3v.1c0 1.2.8 2.1 1.9 2.4-.2.1-.4.1-.7.1-.2 0-.3 0-.5-.1.3 1 1.2 1.7 2.3 1.7A4.8 4.8 0 0 1 6 16.1a6.8 6.8 0 0 0 3.7 1.1c4.4 0 6.8-3.7 6.8-6.8v-.3c.5-.3.9-.8 1.2-1.3z"
      />
    </svg>
  );
}

const socials = [
  { label: "Facebook", href: "#contact", icon: FacebookIcon },
  { label: "Instagram", href: "#contact", icon: InstagramIcon },
  { label: "Twitter", href: "#contact", icon: TwitterIcon },
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#f7f5f0] text-zinc-700">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-6 py-14 md:flex-row md:items-start md:justify-between md:py-16">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <CubeMark />
            <span className="text-sm font-bold tracking-[0.12em] text-[#c0392b] uppercase">
              Prokrate International
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Premium specialty coffee and equipment for coffee enthusiasts and
            professionals. Discover the perfect balance of quality and convenience.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="transition-opacity hover:opacity-80"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-20">
          {footerColumns.map((column) => (
            <div
              key={column.title}
              id={
                column.title === "Shop"
                  ? "marcafe"
                  : column.title === "Support"
                    ? "training"
                    : "brand"
              }
            >
              <p className="text-sm font-semibold text-zinc-800">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label} id={link.label === "Blog" ? "news" : undefined}>
                    <Link href={link.href} className="text-sm text-[#5b8def] hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-6 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Prokrate Internation Trading Corporation. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-zinc-700">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
