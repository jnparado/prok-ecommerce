import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin/login-form";
import Image from "@/components/media-image";

export const metadata = {
  title: "Admin Login | Prokrate",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-full items-center justify-center bg-[#d3b99b] px-4 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_18px_40px_rgba(80,50,20,0.16)]">
        <Image
          src="/images/logo-prokrate.png"
          alt="Prokrate International Trading Corporation"
          width={457}
          height={124}
          className="h-12 w-auto"
        />
        <h1 className="mt-4 font-serif text-3xl text-[#3d2416]">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-500">Manage homepage, products, brands, and media.</p>
        <p className="mt-3 rounded-lg bg-[#faf6ef] px-3 py-2 text-xs leading-5 text-[#6b3e24]">
          First-time setup: run <code>supabase/admin.sql</code> in the{" "}
          <a
            href="https://supabase.com/dashboard/project/xmehubjlmawiuaaaqqcm/sql/new"
            className="font-medium underline"
            target="_blank"
            rel="noreferrer"
          >
            Supabase SQL editor
          </a>
          . Then sign in here — the first account becomes admin.
        </p>
        <div className="mt-6">
          <Suspense>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
