import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { error: claimError } = await supabase.rpc("claim_first_admin");
  if (claimError) {
    redirect("/admin/login?error=setup");
  }

  const { data: admin, error } = await supabase
    .from("admin_users")
    .select("user_id, email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    redirect("/admin/login?error=setup");
  }

  if (!admin) {
    redirect("/admin/login?error=not-admin");
  }

  return { supabase, user, admin };
}
