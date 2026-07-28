import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chino Concepcion | Full Stack & AI Engineer",
  description:
    "Software developer building modern APIs, cloud-native platforms, and AI-powered systems.",
  keywords: [
    "Chino Concepcion",
    "Software Developer",
    "Full Stack Developer",
    "Backend Developer",
    "AI Engineer",
    "Next.js Portfolio",
  ],
  openGraph: {
    title: "Chino Concepcion | Full Stack & AI Engineer",
    description:
      "Explore a five-year journey through backend systems, modern web applications, cloud infrastructure, and AI engineering.",
    type: "website",
  },
  icons: {
    icon: "/cc-brand-mark.png",
    apple: "/cc-brand-mark.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#06110f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
