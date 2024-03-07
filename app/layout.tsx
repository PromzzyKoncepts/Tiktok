import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "tiktok Clone",
  description: "Tiktok Clone web app built with nextjs + react + typescript + tailwind + zustand and appwrite",
  icons: {
    icon: "/images/tiktok-logo.png"
  },
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
