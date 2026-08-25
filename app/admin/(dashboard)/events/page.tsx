"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function EventsAdminPage() {
  return (
    <EntityManager
      table="events"
      title="Events"
      description="Trade shows, trainings, and other events."
      assignedTo="events"
      labelKey="title"
      defaults={{
        title: "",
        description: "",
        image_src: "",
        event_date: "",
        start_time: "",
        end_time: "",
        location: "",
        category: "",
        registration_href: "",
        status: "published",
        featured: false,
        sort_order: 0,
      }}
      fields={[
        { name: "title", label: "Event title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image_src", label: "Event image", type: "image" },
        { name: "event_date", label: "Event date", type: "date" },
        { name: "start_time", label: "Start time", type: "text" },
        { name: "end_time", label: "End time", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "category", label: "Event category", type: "text" },
        { name: "registration_href", label: "Registration link", type: "text" },
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
        { name: "featured", label: "Featured event", type: "checkbox" },
      ]}
    />
  );
}
