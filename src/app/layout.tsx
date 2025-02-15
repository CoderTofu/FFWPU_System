import type { Metadata } from "next";
import "./globals.css";
import { useState } from "react";
import Preloader from "../components/Preloader";
import FooterPublic from "@/components/FooterPublic";
import NavbarPublic from "@/components/NavbarPublic";
import FooterPrivate from "@/components/FooterPrivate";
import NavbarPrivate from "@/components/NavbarPrivate";
import { useRef } from "react";

export const metadata: Metadata = {
  title: "FFWPU-System",
  description: "Created to help the FFWPU organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isLogin = false; // Temporary value

  return (
    <html lang="en">
      <link rel="icon" href="/icons/ffwpu_icon.svg" sizes="any" />
      <body className={`antialiased min-h-screen flex flex-col`}>
        <NavbarPublic />
        <Preloader />
        <main className="flex-grow">{children}</main>
        <FooterPublic />
      </body>
    </html>
  );
}
