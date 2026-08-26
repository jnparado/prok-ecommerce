"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "@/components/media-image";
import Link from "next/link";

import { CatalogAd } from "@/components/ads/catalog-ad";
import { isPublished, mapTrainingRow, type TrainingCard } from "@/lib/cms/public";
import { trainingCourses } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";

const fallbackCourses: TrainingCard[] = trainingCourses.map((course, index) => ({
  id: `fallback-training-${index}`,
  title: course.title,
  description: course.description,
  src: course.src,
}));

export function TrainingPage({ query = "" }: { query?: string }) {
  const [value, setValue] = useState(query);
  const [search, setSearch] = useState(query);
  const [courses, setCourses] = useState<TrainingCard[]>(fallbackCourses);

  useEffect(() => {
    const supabase = createClient();
    void (async () => {
      const { data } = await supabase.from("training_courses").select("*").order("sort_order");
      const rows = ((data ?? []) as Record<string, unknown>[]).filter(isPublished);
      if (rows.length) setCourses(rows.map(mapTrainingRow));
    })();
  }, []);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
    );
  }, [courses, search]);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
        <div className="relative h-[220px] overflow-hidden rounded-xl md:h-[280px]">
          <Image
            src="/images/training-hero.png"
            alt="Barista training at an espresso bar"
            fill
            preload
            className="object-cover animate-ken-burns"
            sizes="(min-width: 1180px) 1180px, 100vw"
          />
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="animate-fade-up font-serif text-3xl font-semibold tracking-tight text-zinc-800 md:text-4xl">
              Available Courses
            </h1>
            <p className="mt-2 animate-fade-up text-sm text-zinc-400 [animation-delay:90ms]">
              Find the perfect course to advance your coffee expertise
            </p>
          </div>

          <form
            className="flex flex-col gap-2 sm:flex-row sm:items-end"
            onSubmit={(event) => {
              event.preventDefault();
              setSearch(value);
            }}
          >
            <label className="flex flex-col gap-1">
              <span className="text-sm text-zinc-600">Search Courses</span>
              <input
                type="search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-400 sm:w-56"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#6b3e24] px-4 text-sm font-medium text-white hover:bg-[#5a331e]"
            >
              Search Courses
            </button>
          </form>
        </div>

        {visible.length ? (
          <>
          <CatalogAd />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {visible.map((course) => (
              <article key={course.id} className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                <div className="relative aspect-[16/9] bg-[#f6efe6]">
                  <Image
                    src={course.src}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <div className="px-5 py-5">
                  {course.category ? (
                    <p className="text-xs tracking-[0.14em] text-[#8b5a2b] uppercase">{course.category}</p>
                  ) : null}
                  <h2 className="font-serif text-3xl font-bold text-[#c0392b]">{course.title}</h2>
                  <p className="mt-2 text-sm text-zinc-400">{course.description}</p>
                  {course.overview ? <p className="mt-3 text-sm leading-relaxed text-zinc-600">{course.overview}</p> : null}
                  {course.learning_outcomes ? (
                    <p className="mt-3 text-sm text-zinc-500">
                      <span className="font-medium text-zinc-700">You will learn: </span>
                      {course.learning_outcomes}
                    </p>
                  ) : null}
                  {course.requirements ? (
                    <p className="mt-2 text-sm text-zinc-500">
                      <span className="font-medium text-zinc-700">Requirements: </span>
                      {course.requirements}
                    </p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                    {course.duration ? <span>{course.duration}</span> : null}
                    {course.schedule ? <span>{course.schedule}</span> : null}
                    {course.instructor ? <span>{course.instructor}</span> : null}
                    {course.location ? <span>{course.location}</span> : null}
                    {course.price != null ? <span>₱ {course.price.toLocaleString("en-PH")}</span> : null}
                  </div>
                  {course.enrollment_href ? (
                    <Link href={course.enrollment_href} className="mt-4 inline-block text-sm font-medium text-[#82502a] hover:underline">
                      Register
                    </Link>
                  ) : null}
                  {course.contact_info ? <p className="mt-2 text-xs text-zinc-400">{course.contact_info}</p> : null}
                </div>
              </article>
            ))}
          </div>
          </>
        ) : (
          <p className="mt-12 text-sm text-zinc-400">No courses match that search.</p>
        )}
      </section>
    </main>
  );
}
