import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.angodeserto.com"),
  title: "Ango Deserto — Turismo no Coração do Namibe",
  description:
    "Experiências autênticas no deserto angolano: passeios de camelo, hospedagem em tendas tradicionais e imersão cultural no Namibe.",
  keywords: [
    "Turismo Namibe",
    "Deserto Angola",
    "Passeios de Camelo",
    "Viagens Angola",
    "Ecoturismo Namibe",
    "Caraculo",
    "Visitar Namibe",
  ],

  openGraph: {
    title: "Ango Deserto — Experiências no Deserto Angolano",
    description:
      "Descubra experiências culturais e naturais únicas no deserto do Namibe.",
    url: "https://www.angodeserto.com",
    siteName: "Ango Deserto",
    images: [
      {
        url: "https://www.angodeserto.com/images/share-preview.png",
        width: 1200,
        height: 630,
        alt: "Paisagem do deserto com camelos ao pôr do sol.",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ango Deserto — Turismo no Coração do Namibe",
    description:
      "Experiências autênticas no deserto angolano com cultura e natureza.",
    image: "https://www.angodeserto.com/images/share-preview.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${playfair.variable}`}>
      <head />
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
