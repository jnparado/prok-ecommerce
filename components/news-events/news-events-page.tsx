"use client";

import { useEffect, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";

import { AdSlot } from "@/components/ads/ad-slot";
import { isPublished, mapEventRow, mapNewsRow, uniqueByTitle, type EventCard, type NewsCard } from "@/lib/cms/public";
import { newsItems } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";

const fallbackNews: NewsCard[] = newsItems.map((item, index) => ({
  id: `fallback-news-${index}`,
  featured: item.featured,
  tag: item.tag,
  date: item.date,
  title: item.title,
  excerpt: item.excerpt,
  href: item.href,
  src: item.src,
  alt: item.alt,
}));

export function NewsEventsPage() {
  const [news, setNews] = useState<NewsCard[]>(fallbackNews);
  const [events, setEvents] = useState<EventCard[]>([]);

  useEffect(() => {
    const supabase = createClient();
    void (async () => {
      const newsQuery = await supabase.from("news").select("*").order("sort_order");
      const newsRows = ((newsQuery.data ?? []) as Record<string, unknown>[]).filter(isPublished);
      if (newsRows.length) setNews(uniqueByTitle(newsRows.map(mapNewsRow)));
      const eventQuery = await supabase.from("events").select("*").order("sort_order");
      const eventRows = ((eventQuery.data ?? []) as Record<string, unknown>[]).filter(isPublished);
      setEvents(uniqueByTitle(eventRows.map(mapEventRow)));
    })();
  }, []);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-14">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#8b5a2b] uppercase">Prokrate</p>
        <h1 className="mt-2 font-serif text-4xl text-[#3d2416]">News & Events</h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-500">Trade shows, academy dates, and stories from the bar.</p>

        <h2 className="mt-12 font-serif text-2xl text-[#3d2416]">News</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {news.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-[6px_12px_28px_rgba(80,50,20,0.08)]">
              <div className="relative h-52">
                <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#8b5a2b] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white uppercase">
                    {item.tag}
                  </span>
                  <span className="text-xs text-zinc-400 uppercase">{item.date}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl text-zinc-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.excerpt}</p>
                <Link href={item.href} className="mt-4 inline-block text-sm font-medium text-[#82502a] hover:underline">
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <AdSlot placement="article" />
        </div>

        <h2 className="mt-14 font-serif text-2xl text-[#3d2416]">Events</h2>
        {events.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {events.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-[6px_12px_28px_rgba(80,50,20,0.08)]">
                <div className="relative h-52">
                  <Image src={item.src} alt={item.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#c4a484] px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs text-zinc-400 uppercase">{item.date}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-zinc-800">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.description}</p>
                  <p className="mt-3 text-xs text-zinc-500">
                    {[item.start_time, item.end_time].filter(Boolean).join(" – ")}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  {item.registration_href ? (
                    <Link href={item.registration_href} className="mt-4 inline-block text-sm font-medium text-[#82502a] hover:underline">
                      Register
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-400">No upcoming events yet.</p>
        )}
      </section>
    </main>
  );
}
