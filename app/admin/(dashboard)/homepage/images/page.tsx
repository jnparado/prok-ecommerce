import { redirect } from "next/navigation";

export default function HomepageImagesPage() {
  redirect("/admin/media?assigned=homepage");
}
