"use client";

import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import Header from "./Header";
import Footer from "./Footer";
import PopupBanner from "./PopupBanner";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* Preloader can stay global */}
      

      {/* Header only on NON-home & NON-admin pages */}
      {!isHome && !isAdmin && <Header />}

      <main>{children}</main>

      {/* Popup Banner — shown on all public pages (manages its own visibility) */}
      {!isAdmin && <PopupBanner />}

      {/* Footer only on NON-home & NON-admin pages */}
      {!isHome && !isAdmin && <Footer />}
    </>
  );
}
