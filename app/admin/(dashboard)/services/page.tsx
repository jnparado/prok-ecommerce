"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function ServicesAdminPage() {
  return (
    <EntityManager
      table="services"
      title="Services"
      description="Machine services shown on the public Services page."
      assignedTo="services"
      labelKey="name"
      defaults={{
        name: "",
        slug: "",
        description: "",
        price: null,
        image_src: "",
        category: "",
        status: "published",
        featured: false,
        sort_order: 0,
      }}
      fields={[
        { name: "name", label: "Service name", type: "text" },
        { name: "slug", label: "Slug", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "price", label: "Price", type: "number" },
        { name: "image_src", label: "Service image", type: "image" },
        { name: "category", label: "Category", type: "text" },
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
        { name: "featured", label: "Featured service", type: "checkbox" },
      ]}
    />
  );
}
