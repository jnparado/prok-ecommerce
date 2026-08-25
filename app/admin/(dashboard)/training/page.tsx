"use client";

import { EntityManager } from "@/components/admin/entity-manager";

export default function TrainingAdminPage() {
  return (
    <EntityManager
      table="training_courses"
      title="Barista Training"
      description="Courses, schedule, instructor, and enrollment details."
      assignedTo="training"
      labelKey="title"
      defaults={{
        title: "",
        description: "",
        image_src: "",
        category: "",
        price: null,
        duration: "",
        schedule: "",
        instructor: "",
        location: "",
        status: "published",
        featured: false,
        overview: "",
        requirements: "",
        learning_outcomes: "",
        enrollment_href: "",
        contact_info: "",
        sort_order: 0,
      }}
      fields={[
        { name: "title", label: "Training title", type: "text" },
        { name: "description", label: "Short description", type: "textarea" },
        { name: "overview", label: "Training overview", type: "textarea" },
        { name: "requirements", label: "Requirements", type: "textarea" },
        { name: "learning_outcomes", label: "What students will learn", type: "textarea" },
        { name: "image_src", label: "Training image", type: "image" },
        { name: "category", label: "Category", type: "text" },
        { name: "price", label: "Price", type: "number" },
        { name: "duration", label: "Duration", type: "text" },
        { name: "schedule", label: "Schedule", type: "text" },
        { name: "instructor", label: "Instructor", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "enrollment_href", label: "Registration / enrollment link", type: "text" },
        { name: "contact_info", label: "Contact information", type: "text" },
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
        { name: "featured", label: "Featured training", type: "checkbox" },
      ]}
    />
  );
}
