import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agence-geo.eu"),
  title: {
    default: "Agence-Geo.eu — Comparatif d'agences SEO, GEO & SEA",
    template: "%s — Agence-Geo.eu",
  },
  description:
    "Média indépendant sur le SEO, le GEO (Generative Engine Optimization) et le SEA : analyses, guides et comparatifs d'agences par région.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Agence-Geo.eu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
