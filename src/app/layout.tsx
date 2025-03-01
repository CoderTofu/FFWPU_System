import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/preLoader";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "FFWPU-System",
  description: "Created to help the FFWPU organization",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icons/ffwpu_icon.svg" sizes="any" />
      <body className="antialiased min-h-screen flex flex-col bg-[#f1f1f1]">
        <Preloader />
      <body className="antialiased min-h-screen flex flex-col">
        {/* <Preloader /> */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
