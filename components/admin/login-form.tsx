"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "setup"
      ? "Admin tables are not installed yet. Paste supabase/admin.sql into the Supabase SQL editor, run it, then sign in again."
      : searchParams.get("error") === "not-admin"
        ? "This account is not an admin. The first person to sign in becomes admin."
        : ""
  );
  const [busy, setBusy] = useState(false);
  const next = searchParams.get("next") || "/admin";

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
    if (signError) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setBusy(false);
        setError(signError.message);
        return;
      }
      const again = await supabase.auth.signInWithPassword({ email, password });
      if (again.error) {
        setBusy(false);
        setError("Account created. Confirm the email in Supabase Auth if required, then sign in.");
        return;
      }
    }
    const { error: claimError } = await supabase.rpc("claim_first_admin");
    if (claimError) {
      setBusy(false);
      setError(
        "Admin tables are not installed yet. Paste supabase/admin.sql into the Supabase SQL editor, run it, then sign in again."
      );
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={(event) => void onSubmit(event)} className="space-y-4">
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      <label className="block space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-10"
        />
      </label>
      <label className="block space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-10"
        />
      </label>
      <Button type="submit" className="h-10 w-full bg-[#82502a] text-white hover:bg-[#6b3e24]" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-xs leading-5 text-zinc-500">
        The first successful login becomes the site admin. After that, add more admins from Settings
        or in Supabase <code>admin_users</code>.
      </p>
    </form>
  );
}
