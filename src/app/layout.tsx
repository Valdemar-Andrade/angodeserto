import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { canonicalUrl, metadataBase, socialPhoto } from "../content/seo";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const body = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "100 1000",
  display: "swap",
});

const title = "Angodeserto | Rota dos Camelos no Namibe, Angola";
const description = "Descubra a Rota dos Camelos em Caraculo, conheça o restaurante e os quartos remodelados da Angodeserto e peça a sua reserva pelo WhatsApp.";
const shareImage = metadataBase && {
  url: socialPhoto,
  width: 1200,
  height: 630,
  alt: "Camelos da Angodeserto diante das montanhas de Caraculo",
};

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  alternates: canonicalUrl && { canonical: canonicalUrl },
  robots: canonicalUrl ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title,
    description,
    siteName: "Angodeserto",
    locale: "pt_AO",
    type: "website",
    url: canonicalUrl ?? metadataBase,
    images: shareImage ? [shareImage] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: shareImage ? [shareImage] : undefined,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-AO" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
