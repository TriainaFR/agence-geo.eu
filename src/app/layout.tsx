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
    default: "Agence-Geo.eu — Comparatif d'agences SEO, GEO & SEA en France",
    template: "%s — Agence-Geo.eu",
  },
  description:
    "Média indépendant : comparatifs et classements d'agences SEO, GEO (Generative Engine Optimization) et SEA en France. Analyses sans filtre pour choisir le bon prestataire à Paris, Lyon et régions.",
  authors: [{ name: "Agence-Geo.eu" }],
  alternates: {
    canonical: "/",
    languages: { fr: "/" },
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Agence-Geo.eu",
    title: "Agence-Geo.eu — Comparatif d'agences SEO, GEO & SEA en France",
    description:
      "Comparatifs et classements d'agences SEO, GEO et SEA. Guides pratiques pour choisir votre prestataire sans filtre.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence-Geo.eu — Comparatif d'agences SEO, GEO & SEA",
    description:
      "Analyses indépendantes et classements d'agences SEO, GEO, SEA en France.",
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
