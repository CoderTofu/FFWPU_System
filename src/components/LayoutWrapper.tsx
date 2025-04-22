"use client";

import { usePathname } from "next/navigation";
import NavbarPublic from "@/components/NavbarPublic";
import NavbarPrivate from "@/components/NavbarPrivate";
import FooterPublic from "@/components/FooterPublic";
import FooterPrivate from "@/components/FooterPrivate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {isPublic ? <NavbarPublic /> : <NavbarPrivate />}
      <main className="min-h-screen flex-grow">{children}</main>
      {isPublic ? <FooterPublic /> : <FooterPrivate />}
    </QueryClientProvider>
  );
}
