import Image from "next/image";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { photos } from "../content/photos";
import { whatsappLink } from "../content/site";
import Experiences from "./Experiences";

const routeReservation = whatsappLink("Olá, Angodeserto! Gostaria de saber mais sobre a Rota dos Camelos e combinar uma visita.");

export default function CamelRoute() {
  const { routeLandscape, camelEncounter, camelDetail } = photos;

  return (
    <section id="rota-dos-camelos" className="route dark-chapter" aria-labelledby="route-title" tabIndex={-1}>
      <div className="route-stage">
        <div className="photo-frame route-stage-photo scene-depth">
          <Image src={routeLandscape.src} alt={routeLandscape.alt} width={routeLandscape.width} height={routeLandscape.height} sizes="(min-width: 1280px) 1280px, 100vw" quality={85} />
        </div>
        <div className="container route-stage-copy">
          <p className="eyebrow chapter-label">O cenário</p>
          <h2 id="route-title" className="chapter-heading">A Rota <em>dos Camelos</em></h2>
          <p className="section-text">A planície abre-se aos pés das montanhas. É aqui que começa a travessia pelo deserto de Caraculo.</p>
        </div>
      </div>
      <div className="container route-encounter">
        <figure className="encounter-lead">
          <div className="photo-frame encounter-photo scene-reveal">
            <Image src={camelEncounter.src} alt={camelEncounter.alt} width={camelEncounter.width} height={camelEncounter.height} sizes="(min-width: 1280px) 565px, (min-width: 760px) 46vw, 88vw" />
          </div>
        </figure>
        <div className="encounter-aside">
          <div className="encounter-copy">
            <p className="eyebrow chapter-label">O encontro</p>
            <h3 className="chapter-heading">Ao ritmo <em>dos camelos.</em></h3>
            <p className="section-text">Na companhia de guias locais, há tempo para observar a paisagem e conhecer os animais de perto.</p>
          </div>
          <figure className="encounter-detail">
            <div className="photo-frame encounter-detail-photo scene-reveal">
              <Image src={camelDetail.src} alt={camelDetail.alt} width={camelDetail.width} height={camelDetail.height} sizes="(min-width: 1280px) 330px, (min-width: 760px) 29vw, 70vw" />
            </div>
            <figcaption>{camelDetail.caption}</figcaption>
          </figure>
        </div>
      </div>
      <Experiences />
      <div className="container route-actions">
        <a className="button button--sand" href={routeReservation} rel="noopener" target="_blank">
          Pedir reserva na rota <FiArrowUpRight aria-hidden="true" />
        </a>
        <details className="route-film">
          <summary><FiPlay aria-hidden="true" /> Ver o filme da Rota</summary>
          <video controls playsInline preload="none" aria-label="Camelos a atravessar a planície de Caraculo, vídeo sem áudio">
            <source src="/media/filme-rota.mp4" type="video/mp4" />
            <a href="/media/filme-rota.mp4">Abrir o vídeo da Rota</a>
          </video>
          <p>Camelos atravessam a planície junto à montanha de Caraculo. Vídeo sem áudio.</p>
        </details>
      </div>
    </section>
  );
}
