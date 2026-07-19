import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agence-geo.eu"),
  title: {
    default: "Agence-Geo.eu — Comparatif d'agences SEO, GEO & SEA en France",
    template: "%s — Agence-Geo.eu",
  },
  description:
    "Comparatifs et classements d'agences SEO, GEO (Generative Engine Optimization) et SEA en France. Guides et analyses pour choisir le bon prestataire à Paris, Lyon et en région.",
  authors: [{ name: "Agence-Geo.eu" }],
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
      "Comparatifs et classements d'agences SEO, GEO et SEA. Guides pratiques pour choisir votre prestataire en marketing digital.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Agence-Geo.eu — Comparatif d'agences SEO, GEO & SEA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence-Geo.eu — Comparatif d'agences SEO, GEO & SEA",
    description:
      "Analyses et classements d'agences SEO, GEO, SEA en France.",
    images: ["/og-default.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
