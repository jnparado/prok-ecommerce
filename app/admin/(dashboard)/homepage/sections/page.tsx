"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function SectionsPage() {
  return (
    <EntityManager
      table="homepage_sections"
      title="Homepage Sections"
      description="Titles, descriptions, images, and links for homepage blocks."
      assignedTo="homepage"
      labelKey="title"
      defaults={{
        slug: "",
        title: "",
        description: "",
        button_label: "",
        button_href: "",
        image_src: "",
        enabled: true,
        sort_order: 0,
      }}
      fields={[
        { name: "title", label: "Section title", type: "text" },
        { name: "slug", label: "Section key", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image_src", label: "Section image", type: "image" },
        { name: "button_label", label: "Button label", type: "text" },
        { name: "button_href", label: "Button link", type: "text" },
        { name: "sort_order", label: "Display order", type: "number" },
        { name: "enabled", label: "Enabled", type: "checkbox" },
      ]}
    />
  );
}
