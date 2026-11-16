import { getImageProps } from "next/image";
import { FiArrowDown, FiMapPin } from "react-icons/fi";
import { photos } from "../content/photos";

const desktopMedia = "(min-width: 900px)";
const mobileMedia = "(width < 900px)";
const desktopSizes = "(min-width: 1600px) 1010px, 59vw";
const mobileSizes = "100vw";
const desktopAvif = "/media/caraculo-camelos-hero-640.avif 640w, /media/caraculo-camelos-hero-960.avif 960w, /media/caraculo-camelos-hero-1200.avif 1200w";
const mobileAvif = "/media/rota-camelos-retrato-400.avif 400w, /media/rota-camelos-retrato-640.avif 640w, /media/rota-camelos-retrato-800.avif 800w";

export default function Hero() {
  const { heroDesktop, heroMobile } = photos;
  const alt = "Camelos da Angodeserto, no Namibe";
  const { props: { srcSet: desktopSources } } = getImageProps({
    src: heroDesktop.src,
    alt: heroDesktop.alt,
    width: heroDesktop.width,
    height: heroDesktop.height,
    sizes: desktopSizes,
    quality: 85,
  });
  const { props: mobile } = getImageProps({
    src: heroMobile.src,
    width: heroMobile.width,
    height: heroMobile.height,
    alt,
    sizes: mobileSizes,
    loading: "eager",
    fetchPriority: "high",
    quality: 80,
  });

  return (
    <section className="hero-band" aria-labelledby="hero-title">
      <link rel="preload" as="image" type="image/avif" media={desktopMedia} imageSrcSet={desktopAvif} imageSizes={desktopSizes} fetchPriority="high" />
      <link rel="preload" as="image" type="image/avif" media={mobileMedia} imageSrcSet={mobileAvif} imageSizes={mobileSizes} fetchPriority="high" />
      <div className="hero">
        <picture className="hero-visual">
          <source media={desktopMedia} type="image/avif" srcSet={desktopAvif} sizes={desktopSizes} />
          <source media={desktopMedia} srcSet={desktopSources} sizes={desktopSizes} />
          <source type="image/avif" srcSet={mobileAvif} sizes={mobileSizes} />
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
