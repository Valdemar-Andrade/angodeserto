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
  title: "Ango Deserto | Rota dos Camelos",
  description: "Turismo ecológico e cultural no deserto angolano — Ango Deserto.",
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
