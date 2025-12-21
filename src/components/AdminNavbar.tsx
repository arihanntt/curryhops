"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Back button (mobile friendly) */}
        <button
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white text-lg"
        >
          ⬅
        </button>

        {/* Navigation links */}
        <div className="flex gap-4 text-sm font-medium">
          <Link
            href="/admin"
            className={`${
              pathname === "/admin"
                ? "text-amber-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/menu-editor"
            className={`${
              pathname.includes("menu-editor")
                ? "text-amber-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Menu
          </Link>

          <Link
            href="/admin/pdf"
            className={`${
              pathname.includes("pdf")
                ? "text-amber-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            PDF
          </Link>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-6" />
      </div>
    </div>
  );
}
