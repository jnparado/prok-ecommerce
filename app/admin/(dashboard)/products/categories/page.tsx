"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function CategoriesPage() {
  return (
    <EntityManager
      table="categories"
      title="Categories"
      description="Product and content categories."
      labelKey="name"
      defaults={{ name: "", slug: "", kind: "product", sort_order: 0 }}
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "slug", label: "Slug", type: "text" },
        {
          name: "kind",
          label: "Type",
          type: "select",
          options: [
            { value: "product", label: "Product" },
            { value: "service", label: "Service" },
            { value: "training", label: "Training" },
            { value: "news", label: "News" },
            { value: "event", label: "Event" },
          ],
        },
        { name: "sort_order", label: "Display order", type: "number" },
      ]}
    />
  );
}
