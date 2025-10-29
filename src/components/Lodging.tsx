"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lodging() {
  const [isOpen, setIsOpen] = useState(false);

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
            src="/images/repouso.jpeg"
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
            className="mt-4 self-start text-sm font-medium text-indigo-600 hover:underline"
          >
            Ver quartos
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
              className="relative bg-white rounded-2xl p-5 max-w-4xl w-full shadow-2xl overflow-hidden border border-[#d9b78f]/50"
            >
            	{/* Fechar */}
				<button
					onClick={() => setIsOpen(false)}
					className="absolute right-4 top-3 text-3xl text-gray-700 hover:text-black"
				>
                ×
              	</button>

              	<div className="grid md:grid-cols-2 gap-4 mt-8">

					{/* IMAGENS COM BORDAS DOURADAS SUAVES */}
					<div className="relative h-60 md:h-72 rounded-xl overflow-hidden shadow-lg border border-[#d9b78f]/60">
					<Image
						src="/images/casa de hospede.jpeg"
						alt="Casa de hóspedes"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#d9b78f]/25 pointer-events-none" />
					</div>

					<div className="relative h-60 md:h-72 rounded-xl overflow-hidden shadow-lg border border-[#d9b78f]/60">
					<Image
						src="/images/cama.PNG"
						alt="Cama"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#d9b78f]/25 pointer-events-none" />
					</div>

					{/* VIDEO RESPONSIVO SEM ZOOM */}
					<div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg border border-[#d9b78f]/60 mt-2">
						<div className="relative w-full" style={{ paddingTop: "56.25%" }}>
							<video
							controls
							className="absolute inset-0 w-full h-full object-contain bg-black"
							>
							<source src="/images/quarto.mp4" type="video/mp4" />
							</video>
						</div>
					</div>

              	</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
