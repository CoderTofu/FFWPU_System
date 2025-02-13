import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
