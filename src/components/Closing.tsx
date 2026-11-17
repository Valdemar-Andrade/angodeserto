import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { photos } from "../content/photos";
import { reservationLink } from "../content/site";

export default function Closing() {
  const photo = photos.horizon;

  return (
    <section className="closing dark-chapter" aria-labelledby="closing-title">
      <div className="photo-frame closing-photo scene-depth">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1280px) 1280px, 100vw" quality={85} />
      </div>
      <div className="container closing-copy">
        <p className="eyebrow chapter-label">Caraculo, Angola</p>
        <h2 id="closing-title" className="chapter-heading">Até breve, <em>no Namibe.</em></h2>
        <a className="button button--sand" href={reservationLink} target="_blank" rel="noopener">Pedir reserva <FiArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}
