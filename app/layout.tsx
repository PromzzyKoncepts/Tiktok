import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Tiktok Clone",
  description: "Tiktok Clone web app built with nextjs + react + typescript + tailwind + zustand and appwrite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
