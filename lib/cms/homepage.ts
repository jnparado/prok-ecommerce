import { createClient } from "@/lib/supabase/server";

import type { HomepageSection } from "@/lib/cms/public";

export async function getHomepageSections(): Promise<Record<string, HomepageSection>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("homepage_sections")
      .select("slug, title, description, button_label, button_href, image_src, enabled")
      .order("sort_order");
    if (error || !data?.length) return {};
    return Object.fromEntries(
      (data as HomepageSection[]).map((row) => [row.slug, row])
    );
  } catch {
    return {};
  }
}

export function sectionOn(sections: Record<string, HomepageSection>, slug: string) {
  return sections[slug]?.enabled !== false;
}
