"use client";

import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import Header from "./Header";
import Footer from "./Footer";

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
      <Preloader />

      {/* Header only on NON-home & NON-admin pages */}
      {!isHome && !isAdmin && <Header />}

      <main>{children}</main>

      {/* Footer only on NON-home & NON-admin pages */}
      {!isHome && !isAdmin && <Footer />}
    </>
  );
}
