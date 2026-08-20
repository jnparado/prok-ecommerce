import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { newsItems } from "@/lib/site";

export function LatestNews() {
  const featured = newsItems.find((item) => item.featured) ?? newsItems[0];
  const rest = newsItems.filter((item) => item !== featured);

  return (
    <section id="news" className="bg-[#f6f1e8] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#8b5a2b] uppercase">
            News & Events
          </p>
          <h2 className="mt-2 font-serif text-3xl text-zinc-800 md:text-[2.5rem]">
            Latest News
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
            From the expo floor to the training bar — what we’re showing, teaching, and servicing.
          </p>
        </div>

        <article className="mt-10 overflow-hidden rounded-2xl bg-white shadow-[8px_18px_40px_rgba(80,50,20,0.12)]">
          <Link href={featured.href} className="grid md:grid-cols-2">
            <div className="relative min-h-[260px] md:min-h-[380px]">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center px-7 py-10 md:px-12 md:py-14">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#8b5a2b] px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                  {featured.tag}
                </span>
                <span className="text-xs tracking-wide text-zinc-400 uppercase">
                  {featured.date}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-3xl text-zinc-800 md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-7 text-zinc-500">
                {featured.excerpt}
              </p>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#8b5a2b]">
                Read the story
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-2xl bg-white shadow-[6px_12px_28px_rgba(80,50,20,0.08)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="relative h-48">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              <div className="px-6 py-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#c4a484] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white uppercase">
                    {item.tag}
                  </span>
                  <span className="text-xs tracking-wide text-zinc-400 uppercase">
                    {item.date}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl text-zinc-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
