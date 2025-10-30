"use client";
import Image from "next/image";
import { useState } from "react";

export default function Gallery() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16">
      <h3 className="font-display text-2xl mb-8">Galeria</h3>

      <div className="grid md:grid-cols-3 gap-6 items-start">

        {/* Vídeo principal */}
        <div className="relative md:col-span-2 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
          <video
            controls
            className="w-full h-[400px] object-cover"
            onPlay={() => setIsPlaying(true)}
          >
            <source src="/videos/video destaque.mp4" type="video/mp4" />
          </video>

          {!isPlaying && (
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] transition pointer-events-none" />
          )}
        </div>

        {/* Coluna lateral */}
        <div className="grid gap-4">
          <div
            className="relative h-[190px] rounded-2xl overflow-hidden shadow cursor-pointer"
            onClick={() => setSelectedImage("/images/galeria 1.jpeg")}
          >
            <Image
              src="/images/galeria 1.jpeg"
              alt="Camelos"
              fill
              className="object-cover hover:scale-105 transition duration-300"
            />
          </div>

          <div
            className="relative h-[190px] rounded-2xl overflow-hidden shadow cursor-pointer"
            onClick={() => setSelectedImage("/images/galeria 2.jpeg")}
          >
            <Image
              src="/images/galeria 2.jpeg"
              alt="Camelo no deserto"
              fill
              className="object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>

      {/* Mosaico inferior */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          "/images/galeria 3.jpeg",
          "/images/galeria 4.jpeg",
          "/images/galeria 5.jpeg",
          "/images/galeria 6.jpeg"
        ].map((img, index) => (
          <div
            key={index}
            className="relative h-40 rounded-lg overflow-hidden shadow cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* MODAL LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-[200]"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-3xl hover:text-red-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <div className="relative w-full h-[85vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <Image
                src={selectedImage}
                alt="Visualização ampliada"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
