import { getImageProps } from "next/image";
import { FiArrowDown, FiMapPin } from "react-icons/fi";
import { photos } from "../content/photos";

const desktopMedia = "(min-width: 760px)";
const mobileMedia = "(width < 760px)";
const desktopSizes = "100vw";
const mobileSizes = "(min-width: 640px) 100vw, 640px";
const heroAlt = "Camelos da Angodeserto no Namibe";
const desktopAvif = "/media/caraculo-camelos-hero-640.avif 640w, /media/caraculo-camelos-hero-960.avif 960w, /media/caraculo-camelos-hero-1200.avif 1200w";
const mobileAvif = "/media/rota-camelos-retrato-400.avif 400w, /media/rota-camelos-retrato-640.avif 640w, /media/rota-camelos-retrato-800.avif 800w";

export default function Hero() {
  const { heroDesktop, heroMobile } = photos;
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
    alt: heroAlt,
    sizes: mobileSizes,
    loading: "eager",
    fetchPriority: "high",
    quality: 80,
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <link rel="preload" as="image" type="image/avif" media={desktopMedia} imageSrcSet={desktopAvif} imageSizes={desktopSizes} fetchPriority="high" />
      <link rel="preload" as="image" type="image/avif" media={mobileMedia} imageSrcSet={mobileAvif} imageSizes={mobileSizes} fetchPriority="high" />
      <picture className="hero-visual">
        <source media={desktopMedia} type="image/avif" srcSet={desktopAvif} sizes={desktopSizes} />
        <source media={desktopMedia} srcSet={desktopSources} sizes={desktopSizes} />
        <source type="image/avif" srcSet={mobileAvif} sizes={mobileSizes} />
        <img {...mobile} alt={heroAlt} className="hero-photo" />
      </picture>
      <div className="container hero-copy">
        <p className="eyebrow hero-location"><FiMapPin aria-hidden="true" /> Caraculo, Namibe</p>
        <h1 id="hero-title">O deserto <em>chama por si.</em></h1>
        <p className="hero-description">Descubra o Namibe ao ritmo dos camelos.</p>
        <a className="button button--sand" href="#rota-dos-camelos">
          Explorar a Rota <FiArrowDown aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
