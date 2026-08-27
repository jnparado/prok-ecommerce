import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[#f6f1e8] px-5 py-24 text-center">
      <p className="text-[11px] font-medium tracking-[0.18em] text-[#8b5a2b] uppercase">
        404
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-[#3d2416]">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-zinc-600">
        That address is not in our catalog. Head back to the shop to keep browsing machines,
        grinders, and coffee.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-full bg-[#82502a] px-5 text-sm font-medium text-white hover:bg-[#6d4123]"
      >
        Back to home
      </Link>
    </main>
  );
}
