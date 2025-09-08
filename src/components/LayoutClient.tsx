"use client";

import { usePathname } from "next/navigation";
import Preloader from "./Preloader";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Preloader />
      {!isHome && <Header />}
      <main>{children}</main>
      {!isHome && <Footer />}
    </>
  );
}
