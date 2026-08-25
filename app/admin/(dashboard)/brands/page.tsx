"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function BrandsAdminPage() {
  return (
    <EntityManager
      table="brands"
      title="Brands"
      description="Brand name, logo, description, order, and featured status."
      assignedTo="brands"
      labelKey="name"
      defaults={{
        name: "",
        slug: "",
        logo_src: "",
        description: "",
        status: "published",
        featured: false,
        sort_order: 0,
      }}
      fields={[
        { name: "name", label: "Brand name", type: "text" },
        { name: "slug", label: "Slug", type: "text" },
        { name: "logo_src", label: "Brand logo", type: "image" },
        { name: "description", label: "Description", type: "textarea" },
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
        { name: "featured", label: "Featured brand", type: "checkbox" },
      ]}
    />
  );
}
