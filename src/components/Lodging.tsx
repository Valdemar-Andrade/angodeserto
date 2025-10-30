"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lodging() {
    const [isOpen, setIsOpen] = useState(false);

    const videos = [
    "/videos/quarto.mp4",
    "/videos/video 2.mp4",
    "/videos/video 3.mp4",
    "/videos/video 4.mp4"
    ];

    const [current, setCurrent] = useState(0);
    const next = () => setCurrent((current + 1) % videos.length);
    const prev = () => setCurrent((current - 1 + videos.length) % videos.length);

    return (
    <section id="lodging" className="py-16">
        <h3 className="font-display text-2xl mb-6">Hospedagem</h3>

        {/* Imagens lado a lado */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
                >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
                <Image
                    src="/images/tenda 1.jpeg"
                    alt="Tenda no deserto"
                    width={800}
                    height={450}
                    className="w-full h-72 object-cover"
                    priority
                />
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
                <Image
                    src="/images/casa de hospede.jpeg"
                    alt="Repouso no deserto"
                    width={800}
                    height={450}
                    className="w-full h-72 object-cover"
                />
            </motion.div>
        </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <article className="bg-[#f5e6d3] rounded-2xl shadow-lg p-6">
          <h4 className="font-semibold text-xl">Em Tendas Tradicionais</h4>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Viver a noite no deserto com conforto e autenticidade. As tendas são preparadas
            por membros da comunidade local, criando uma experiência cultural única.
          </p>
        </article>

        <article className="bg-[#f5e6d3] rounded-2xl shadow-lg p-6 flex flex-col">
          <h4 className="font-semibold text-xl">Casa de Hóspedes</h4>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Para quem prefere maior conforto, a casa de hóspedes oferece quartos aconchegantes
            e serviço local acolhedor.
          </p>

            <button
                onClick={() => setIsOpen(true)}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#d9b78f] to-[#c49a68] shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
                >
                <span>Ver quartos</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

        </article>
      </div>

    {/* MODAL */}
    <AnimatePresence>
    {isOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-[100]"
        >
        <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl p-6 max-w-3xl w-full shadow-2xl border border-[#d9b78f]/50 overflow-hidden max-h-[90vh] flex flex-col"
        >

            {/* Botão fechar */}
            <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-3 text-3xl text-gray-700 hover:text-black"
            >
            ×
            </button>

            <h4 className="text-xl font-semibold mb-4 text-center text-[#2d2a26]">
            Casa de Hóspedes — Interior
            </h4>

            {/* Player principal */}
            <div className="relative rounded-xl overflow-hidden border border-[#d9b78f]/60 bg-black shadow-lg flex-1">
            <div className="relative w-full h-full min-h-[40vh] md:min-h-[55vh]">
                <video
                key={videos[current]}
                controls
                className="absolute inset-0 w-full h-full object-contain bg-black"
                >
                <source src={videos[current]} type="video/mp4" />
                </video>
            </div>

            {/* Navegação */}
            <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg backdrop-blur-md z-20"
            >
                ‹
            </button>

            <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg backdrop-blur-md z-20"
            >
                ›
            </button>
            </div>

            {/* Indicadores (bolinhas) */}
            <div className="flex justify-center gap-2 mt-4 pb-2">
            {videos.map((_, i) => (
                <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-[#d9b78f]" : "bg-gray-300"
                }`}
                />
            ))}
            </div>

        </motion.div>
        </motion.div>
    )}
    </AnimatePresence>

    </section>
  );
}
