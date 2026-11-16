import Image from "next/image";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { photos } from "../content/photos";
import { whatsappLink } from "../content/site";

const routeReservation = whatsappLink("Olá, Angodeserto! Gostaria de saber mais sobre a Rota dos Camelos e combinar uma visita.");

export default function CamelRoute() {
  const photo = photos.camelEncounter;

  return (
    <section id="rota-dos-camelos" className="route" aria-labelledby="route-title" tabIndex={-1}>
      <div className="route-layout">
        <div className="photo-frame route-photo">
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1600px) 860px, (min-width: 760px) 54vw, 100vw" />
        </div>
        <div className="route-copy">
          <p className="eyebrow">A experiência emblemática</p>
          <h2 id="route-title">A Rota <em>dos Camelos</em></h2>
          <p className="section-text">Veja Caraculo de outra perspetiva, ao ritmo dos camelos e na companhia de guias locais. Um passeio pelo deserto com tempo para observar a paisagem e conhecer os animais de perto.</p>
          <a className="button button--sand" href={routeReservation} rel="noopener" target="_blank">
            Pedir reserva na rota <FiArrowUpRight aria-hidden="true" />
          </a>
          <details className="route-film">
            <summary><FiPlay aria-hidden="true" /> Ver o filme da Rota</summary>
            <video controls playsInline preload="none" poster="/media/filme-rota-poster.webp" aria-label="Camelos a atravessar a planície de Caraculo, vídeo sem áudio">
              <source src="/media/filme-rota.mp4" type="video/mp4" />
              <a href="/media/filme-rota.mp4">Abrir o vídeo da Rota</a>
            </video>
            <p>Camelos atravessam a planície junto à montanha de Caraculo. Vídeo sem áudio.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
