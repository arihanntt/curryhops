"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to determine active styles
  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true;
    if (path !== "/admin" && pathname.includes(path)) return true;
    return false;
  };

  const navItems = [
    { name: "Dashboard",    href: "/admin" },
    { name: "Menu Editor",  href: "/admin/menu-editor" },
    { name: "Popup Banner", href: "/admin/popup-banner" },
    { name: "PDF",          href: "/admin/pdf" },
    { name: "Bookings",     href: "/admin/bookings" },
  ];

  return (
    // Glassmorphic container with a very subtle (cute) bottom border
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Back Button & Divider */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => router.back()}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all duration-200 shadow-sm"
            title="Go Back"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          {/* Vertical Divider (The "Cute" Line) */}
          <div className="h-6 w-[1px] bg-slate-200 rounded-full hidden md:block" />
          
          {/* Logo / Brand Context (Optional, good for visuals) */}
          <span className="font-semibold text-slate-800 tracking-tight hidden md:block">
            Admin<span className="text-amber-500">Panel</span>
          </span>
        </div>

        {/* Center/Right: Navigation Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${isActive(item.href)
                  ? "bg-amber-100 text-amber-700 shadow-sm ring-1 ring-amber-500/20"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Spacer or Action (Keeps layout balanced) */}
        <div className="w-10 md:block hidden" />
      </div>
    </nav>
  );
}