export type HomepageSection = {
  slug: string;
  title: string | null;
  description: string | null;
  button_label: string | null;
  button_href: string | null;
  image_src: string | null;
  enabled: boolean;
};

export type NewsCard = {
  id: string;
  featured: boolean;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  src: string;
  alt: string;
};

export type TrainingCard = {
  id: string;
  title: string;
  description: string;
  src: string;
  category?: string;
  price?: number | null;
  duration?: string;
  schedule?: string;
  instructor?: string;
  location?: string;
  overview?: string;
  requirements?: string;
  learning_outcomes?: string;
  enrollment_href?: string;
  contact_info?: string;
};

export type ServiceCard = {
  id: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  price?: number | null;
  category?: string;
};

export type EventCard = {
  id: string;
  title: string;
  description: string;
  src: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  category: string;
  registration_href: string;
  featured: boolean;
};

export function mapNewsRow(row: Record<string, unknown>): NewsCard {
  return {
    id: String(row.id ?? `news-${row.title}`),
    featured: Boolean(row.featured),
    tag: String(row.tag || row.category || "News"),
    date: String(row.date_label || row.published_at || ""),
    title: String(row.title ?? ""),
    excerpt: String(row.excerpt || row.content || ""),
    href: String(row.href || "/news-events"),
    src: String(row.image_src || "/images/news-wofex-mindanao.png"),
    alt: String(row.alt || row.title || ""),
  };
}

export function mapTrainingRow(row: Record<string, unknown>): TrainingCard {
  return {
    id: String(row.id ?? `training-${row.title}`),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    src: String(row.image_src || "/images/training-course-thumb.png"),
    category: row.category ? String(row.category) : undefined,
    price: typeof row.price === "number" ? row.price : row.price ? Number(row.price) : null,
    duration: row.duration ? String(row.duration) : undefined,
    schedule: row.schedule ? String(row.schedule) : undefined,
    instructor: row.instructor ? String(row.instructor) : undefined,
    location: row.location ? String(row.location) : undefined,
    overview: row.overview ? String(row.overview) : undefined,
    requirements: row.requirements ? String(row.requirements) : undefined,
    learning_outcomes: row.learning_outcomes ? String(row.learning_outcomes) : undefined,
    enrollment_href: row.enrollment_href ? String(row.enrollment_href) : undefined,
    contact_info: row.contact_info ? String(row.contact_info) : undefined,
  };
}

export function mapServiceRow(row: Record<string, unknown>): ServiceCard {
  return {
    id: String(row.id ?? `service-${row.name || row.title}`),
    title: String(row.name || row.title || ""),
    body: String(row.description || row.body || ""),
    src: String(row.image_src || "/images/service-diagnostics.png"),
    alt: String(row.name || row.title || "Service"),
    price: typeof row.price === "number" ? row.price : row.price ? Number(row.price) : null,
    category: row.category ? String(row.category) : undefined,
  };
}

export function mapEventRow(row: Record<string, unknown>): EventCard {
  return {
    id: String(row.id ?? `event-${row.title}`),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    src: String(row.image_src || "/images/news-wofex-mindanao.png"),
    date: String(row.event_date || ""),
    start_time: String(row.start_time || ""),
    end_time: String(row.end_time || ""),
    location: String(row.location || ""),
    category: String(row.category || "Event"),
    registration_href: String(row.registration_href || ""),
    featured: Boolean(row.featured),
  };
}

export function isPublished(row: Record<string, unknown>) {
  return row.status !== "draft" && row.enabled !== false;
}

export function uniqueByTitle<T extends { title: string; featured?: boolean }>(items: T[]): T[] {
  const seen = new Map<string, T>();
  for (const item of items) {
    const key = item.title.trim().toLowerCase();
    const existing = seen.get(key);
    if (!existing || (item.featured && !existing.featured)) {
      seen.set(key, item);
    }
  }
  return [...seen.values()];
}
