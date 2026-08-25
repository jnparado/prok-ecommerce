"use client";

import Link from "next/link";

import { EntityManager } from "@/components/admin/entity-manager";

export default function SlidersPage() {
  return (
    <div className="space-y-4">
      <Link href="/" target="_blank" className="text-sm font-medium text-[#82502a] hover:underline">
        Preview homepage slider
      </Link>
      <EntityManager
      table="hero_slides"
      title="Homepage Sliders"
      description="Add, edit, reorder, and enable homepage hero slides."
      assignedTo="homepage"
      labelKey="title"
      defaults={{
        title: "",
        brand: "",
        subtitle: "",
        image_src: "",
        alt: "",
        fit: "cover",
        button_label: "Shop Now",
        button_href: "/espresso-machines",
        enabled: true,
        sort_order: 0,
      }}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "brand", label: "Subtitle / brand", type: "text" },
        { name: "subtitle", label: "Supporting text", type: "text" },
        { name: "image_src", label: "Slider image", type: "image" },
        { name: "alt", label: "Alt text", type: "text" },
        {
          name: "fit",
          label: "Image fit",
          type: "select",
          options: [
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
          ],
        },
        { name: "button_label", label: "Button label", type: "text" },
        { name: "button_href", label: "Button link", type: "text" },
        { name: "sort_order", label: "Display order", type: "number" },
        { name: "enabled", label: "Enabled", type: "checkbox" },
      ]}
    />
    </div>
  );
}
