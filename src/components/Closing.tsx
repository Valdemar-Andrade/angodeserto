import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { photos } from "../content/photos";
import { reservationLink } from "../content/site";

export default function Closing() {
  const photo = photos.sunset;

  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-layout">
        <div className="photo-frame closing-photo">
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1600px) 930px, (min-width: 760px) 58vw, 100vw" />
        </div>
        <div className="closing-copy">
          <p className="eyebrow">Caraculo, Angola</p>
          <h2 id="closing-title">Até breve, <em>no Namibe.</em></h2>
          <a className="button button--sand" href={reservationLink} target="_blank" rel="noopener">Pedir reserva <FiArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
