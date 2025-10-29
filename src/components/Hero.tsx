"use client";
import { motion } from "framer-motion";

export default function Hero(){
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#d8b98a] to-[#f4e6d1]">

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

      {/* miragem quente no ar (AGORA POR CIMA) */}
      <div className="mirage-layer z-20" />


      <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.9}} className="relative z-10 text-center px-6">
        <h1 className="font-display text-4xl md:text-6xl text-white font-bold drop-shadow-lg max-w-4xl mx-auto">
          Descubra a alma do deserto angolano
        </h1>
        <p className="mt-4 text-white/90 max-w-2xl mx-auto">
          Experiências autênticas entre dunas, camelos e a hospitalidade do Namibe.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="#experiences" className="btn-primary">Explorar experiências</a>
		  <a href="#gallery" className="inline-block px-6 py-3 rounded-2xl border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
			Ver galeria
			</a>
        </div>
      </motion.div>

      <svg className="absolute bottom-0 left-0 right-0 z-0" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,120 C200,90 400,200 720,140 C1000,90 1200,160 1440,120 L1440 200 L0 200 Z" fill="rgba(244,230,209,0.95)"/>
      </svg>
    </section>
  );
}
