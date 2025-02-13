import type { Metadata } from "next";
import "./globals.css";
import Preloader from "../components/preLoader";
import type React from "react"; // Import React

export const metadata: Metadata = {
  title: "FFWPU-System",
  description: "Created to help the FFWPU organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
