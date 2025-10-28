"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; // Import Image from next/image

export default function Header(){
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-md border-b border-white/30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image src="/images/logotipo.jpg" alt="Ango Deserto logo" width={40} height={40} className="rounded-full object-cover bg-gray-100" />

            <div>
              <div className="font-display text-lg">Ango Deserto</div>
              <div className="text-xs text-gray-600 -mt-1">Rota dos Camelos</div>
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#about" className="hover:underline">Sobre</a>
          <a href="#experiences" className="hover:underline">Experiências</a>
          <a href="#lodging" className="hover:underline">Hospedagem</a>
          <a href="#gallery" className="hover:underline">Galeria</a>
          <a href="#contact" className="btn-primary">Contactar</a>
        </nav>

        <button className="md:hidden px-3 py-2" onClick={()=>setOpen(!open)} aria-label="menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="#2d2a26" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 border-t border-white/20">
          <div className="flex flex-col px-6 py-4 gap-3 text-sm">
            <a href="#about" onClick={()=>setOpen(false)}>Sobre</a>
            <a href="#experiences" onClick={()=>setOpen(false)}>Experiências</a>
            <a href="#lodging" onClick={()=>setOpen(false)}>Hospedagem</a>
            <a href="#gallery" onClick={()=>setOpen(false)}>Galeria</a>
            <a href="#contact" className="btn-primary inline-block text-center" onClick={()=>setOpen(false)}>Contactar</a>
          </div>
        </div>
      )}
    </header>
  );
}
