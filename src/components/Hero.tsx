import { getImageProps } from "next/image";
import { FiArrowDown, FiMapPin } from "react-icons/fi";
import { photos } from "../content/photos";

export default function Hero() {
  const { heroDesktop, heroMobile } = photos;
  const alt = "Camelos da Angodeserto, no Namibe";
  const { props: { srcSet: desktopSources } } = getImageProps({
    src: heroDesktop.src,
    alt: heroDesktop.alt,
    width: heroDesktop.width,
    height: heroDesktop.height,
    sizes: "(min-width: 1600px) 1010px, 59vw",
    quality: 85,
  });
  const { props: mobile } = getImageProps({
    src: heroMobile.src,
    width: heroMobile.width,
    height: heroMobile.height,
    alt,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
    quality: 80,
  });

  return (
    <section className="hero-band" aria-labelledby="hero-title">
      <div className="hero">
        <picture className="hero-visual">
          <source media="(min-width: 900px)" srcSet={desktopSources} sizes="(min-width: 1600px) 1010px, 59vw" />
          <img {...mobile} alt={alt} className="hero-photo" />
        </picture>
        <div className="hero-copy">
          <p className="eyebrow hero-location"><FiMapPin aria-hidden="true" /> Caraculo, Namibe</p>
          <h1 id="hero-title">O deserto <em>chama por si.</em></h1>
          <p className="hero-description">Siga a Rota dos Camelos e descubra o Namibe entre montanhas, paisagens abertas e encontros com quem vive o deserto.</p>
          <a className="button button--sand" href="#rota-dos-camelos">
            Explorar a Rota <FiArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
