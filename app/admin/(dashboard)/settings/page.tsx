"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type AdminRow = { user_id: string; email: string };

export default function SettingsPage() {
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const supabase = createClient();
    const { data, error: loadError } = await supabase.from("admin_users").select("user_id, email");
    if (loadError) setError(loadError.message);
    setAdmins((data as AdminRow[]) ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-[#3d2416]">Settings</h1>
      <p className="text-sm text-zinc-500">
        Admin access is stored in <code>admin_users</code>. The first login claims admin automatically.
        To add another admin, create their Auth user in Supabase, then insert their user id here via SQL.
      </p>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="text-sm text-[#165c38]">{message}</p> : null}
      <div className="rounded-xl border border-[#eadfce] bg-white p-5">
        <h2 className="font-serif text-xl">Current admins</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {admins.map((admin) => (
            <li key={admin.user_id}>{admin.email}</li>
          ))}
          {admins.length === 0 ? <li className="text-zinc-400">No admins loaded. Run the admin CMS SQL first.</li> : null}
        </ul>
      </div>
      <div className="rounded-xl border border-[#eadfce] bg-white p-5">
        <h2 className="font-serif text-xl">SQL to add an admin</h2>
        <p className="mt-2 text-sm text-zinc-500">Paste this in the Supabase SQL editor after they have signed in once:</p>
        <Input className="mt-3 h-10" placeholder="their@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        <pre className="mt-3 overflow-x-auto rounded-lg bg-[#3d2416] p-3 text-xs text-[#f6efe6]">
{`insert into public.admin_users (user_id, email)
select id, email from auth.users
where email = '${email || "admin@example.com"}'
on conflict (user_id) do nothing;`}
        </pre>
        <Button type="button" className="mt-3" onClick={() => setMessage("Copy the SQL above into Supabase.")}>
          Done
        </Button>
      </div>
    </div>
  );
}
