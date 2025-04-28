import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
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
      <body className="antialiased min-h-screen flex flex-col bg-[#f8fafc]">
        <Preloader />
<<<<<<< HEAD
        <LayoutWrapper>{children}</LayoutWrapper>
=======

        <AlertProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AlertProvider>
>>>>>>> 22a6cef (IN PROGRESS: UI Update)
      </body>
    </html>
  );
}
