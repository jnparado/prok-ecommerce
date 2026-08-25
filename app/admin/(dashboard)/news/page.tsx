"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function NewsAdminPage() {
  return (
    <EntityManager
      table="news"
      title="News"
      description="News stories for the homepage and News & Events."
      assignedTo="news"
      labelKey="title"
      defaults={{
        title: "",
        excerpt: "",
        content: "",
        image_src: "",
        alt: "",
        tag: "News",
        category: "News",
        author: "",
        date_label: "",
        published_at: "",
        href: "/#news",
        status: "published",
        featured: false,
        sort_order: 0,
      }}
      fields={[
        { name: "title", label: "News title", type: "text" },
        { name: "excerpt", label: "Short description", type: "textarea" },
        { name: "content", label: "Full content", type: "textarea" },
        { name: "image_src", label: "Featured image", type: "image" },
        { name: "alt", label: "Alt text", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "tag", label: "Tag", type: "text" },
        { name: "author", label: "Author", type: "text" },
        { name: "published_at", label: "Publish date", type: "date" },
        { name: "date_label", label: "Date label", type: "text" },
        { name: "href", label: "Link", type: "text" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ],
        },
        { name: "sort_order", label: "Display order", type: "number" },
        { name: "featured", label: "Featured news", type: "checkbox" },
      ]}
    />
  );
}
