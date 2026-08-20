"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { trainingCourses } from "@/lib/site";

export function TrainingPage({ query = "" }: { query?: string }) {
  const [value, setValue] = useState(query);
  const [search, setSearch] = useState(query);

  const courses = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [...trainingCourses];
    return trainingCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <main className="flex-1 bg-[#f6f1e8]">
      <section className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
        <div className="relative h-[220px] overflow-hidden rounded-xl md:h-[280px]">
          <Image
            src="/images/training-hero.png"
            alt="Barista training at an espresso bar"
            fill
            preload
            className="object-cover"
            sizes="(min-width: 1180px) 1180px, 100vw"
          />
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-zinc-800 md:text-4xl">
              Available Courses
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
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

        {courses.length ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.title}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white"
              >
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
                  <h2 className="font-serif text-3xl font-bold text-[#c0392b]">
                    {course.title}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">{course.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-zinc-400">No courses match that search.</p>
        )}
      </section>
    </main>
  );
}
