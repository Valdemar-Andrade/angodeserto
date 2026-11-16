import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { photos } from "../content/photos";

export default function About() {
  const photo = photos.arrival;

  return (
    <section id="about" className="section section--about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="container about-layout">
        <div className="about-copy reveal">
          <p className="eyebrow">Descubra o Namibe</p>
          <h2 id="about-title">Há muito para viver <em>em Caraculo.</em></h2>
          <p className="section-text">Entre o chão de areia e as montanhas do Namibe, a Angodeserto convida-o a abrandar. Venha conhecer os camelos, sentar-se à mesa e descobrir o deserto pela mão de quem aqui o conhece.</p>
          <a className="text-link" href="#experiences">Conhecer as experiências <FiArrowRight aria-hidden="true" /></a>
        </div>
        <figure className="about-figure reveal">
          <div className="photo-frame about-photo">
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1200px) 520px, (min-width: 760px) 43vw, 92vw" />
          </div>
          <figcaption>{photo.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
