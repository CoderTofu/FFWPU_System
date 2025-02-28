"use client";

import { usePathname } from "next/navigation";
import NavbarPublic from "@/components/navbarPublic";
import NavbarPrivate from "@/components/navbarPrivate";
import FooterPublic from "@/components/footerPublic";
import FooterPrivate from "@/components/footerPrivate";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define private routes
  const isPublic =
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/login") ||
    pathname.endsWith("/"); // Home page

  return (
    <>
      {isPublic ? <NavbarPublic /> : <NavbarPrivate />}
      <main className="min-h-screen flex-grow">{children}</main>
      {isPublic ? <FooterPublic /> : <FooterPrivate />}
    </>
  );
}
