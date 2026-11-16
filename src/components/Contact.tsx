import { FiArrowUpRight, FiInstagram, FiMapPin } from "react-icons/fi";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { reservationLink, site } from "../content/site";

export default function Contact() {
  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="container contact-layout">
        <div className="contact-copy reveal">
          <p className="eyebrow">Contactos e reservas</p>
          <h2 id="contact-title">Vamos planear <em>a sua visita?</em></h2>
          <p className="section-text">Fale connosco sobre a Rota dos Camelos, o restaurante ou os quartos. A nossa equipa ajuda a organizar a sua visita a Caraculo.</p>
        </div>
        <div className="contact-options">
          <a className="contact-option contact-option--whatsapp" href={reservationLink} target="_blank" rel="noopener">
            <FaWhatsapp aria-hidden="true" />
            <span><strong>Pedir reserva pelo WhatsApp</strong><small>{site.phoneLabel}</small></span>
            <FiArrowUpRight className="contact-arrow" aria-hidden="true" />
          </a>
          <a className="contact-option" href={site.map} target="_blank" rel="noopener">
            <FiMapPin aria-hidden="true" />
            <span><strong>Como chegar</strong><small>{site.location}</small></span>
            <FiArrowUpRight className="contact-arrow" aria-hidden="true" />
          </a>
          <div className="contact-socials">
            <a href={site.instagram} target="_blank" rel="noopener"><FiInstagram aria-hidden="true" /> Instagram</a>
            <a href={site.tiktok} target="_blank" rel="noopener"><FaTiktok aria-hidden="true" /> TikTok</a>
          </div>
        </div>
      </div>
    </section>
  );
}
