"use client";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <h3 className="font-display text-3xl mb-6">Contacto & Reservas</h3>

      <p className="text-gray-700 max-w-2xl">
        Para informações, datas disponíveis e reservas, fale conosco diretamente
        pelo WhatsApp ou acompanhe as nossas redes sociais para ver experiências
        reais no deserto.
      </p>

      <div className="grid lg:grid-cols-2 gap-12 mt-10 items-center">
        {/* BLOCO DE CONTACTOS */}
        <div className="space-y-6">
          {/* WhatsApp — Botão Destaque */}
          <a
            href="https://wa.me/+244923745178"
            target="_blank"
            className="flex items-center gap-4 p-4 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all bg-gradient-to-r from-[#d8b98a] to-[#c49a68] text-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-inner">
              <FaWhatsapp className="text-3xl" />
            </div>
            <span className="text-lg font-semibold">Conversar no WhatsApp</span>
          </a>

          {/* Redes Sociais */}
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/angodeserto"
              target="_blank"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#d9b78f] bg-white shadow-sm hover:shadow-lg hover:scale-[1.04] transition-all group"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d9b78f] to-[#bfa27a] text-white shadow-md group-hover:brightness-110 transition">
                <FaInstagram className="text-xl" />
              </div>
              <span className="font-medium text-gray-800 group-hover:text-[#b58a58] transition">
                Instagram
              </span>
            </a>

            <a
              href="https://www.tiktok.com/@angodeserto"
              target="_blank"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#d9b78f] bg-white shadow-sm hover:shadow-lg hover:scale-[1.04] transition-all group"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d9b78f] to-[#bfa27a] text-white shadow-md group-hover:brightness-110 transition">
                <FaTiktok className="text-xl" />
              </div>
              <span className="font-medium text-gray-800 group-hover:text-[#b58a58] transition">
                TikTok
              </span>
            </a>
          </div>

          <p className="text-sm text-gray-600">
            Atendimento todos os dias — 08h às 20h
          </p>
        </div>

        {/* MAPA */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Localização Ango Deserto"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7706.92157282621!2d12.646797896300393!3d-15.022608429872806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ba3985bac510665%3A0xcd6f0321be1e54b5!2sCaraculo!5e0!3m2!1spt-PT!2sao!4v1761742193503!5m2!1spt-PT!2sao"
            className="w-full h-72 border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
