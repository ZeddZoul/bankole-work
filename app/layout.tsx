import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gbenga Bankole - Videographer",
  description:
    "Worldwide Photographer And Storyteller specializing in travel and lifestyle photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
