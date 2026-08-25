import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await requireAdmin();
  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
