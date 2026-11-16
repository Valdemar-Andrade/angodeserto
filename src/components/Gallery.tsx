import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import { photos } from "../content/photos";
import PhotoViewer from "./ui/PhotoViewer";

const gallery = [photos.visitors, photos.tasting, photos.camelsAtDusk, photos.lunchOutside, photos.camelRide];

export default function Gallery() {
  return (
    <section id="gallery" className="section section--gallery" aria-labelledby="gallery-title" tabIndex={-1}>
      <div className="container">
        <div className="gallery-heading reveal">
          <p className="eyebrow">Galeria</p>
          <h2 id="gallery-title">O Namibe, <em>de perto.</em></h2>
        </div>
        <PhotoViewer photos={gallery} label="Galeria Angodeserto">
          <div className="gallery-grid">
            {gallery.map((photo, index) => (
              <button className="photo-button photo-frame gallery-tile reveal" key={photo.src} type="button" data-photo-index={index} aria-label={`Ampliar fotografia: ${photo.caption}`} aria-haspopup="dialog">
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={index === 0 ? "(min-width: 1200px) 470px, (min-width: 760px) 38vw, 92vw" : "(min-width: 1200px) 340px, (min-width: 760px) 29vw, 46vw"} />
                <span className="photo-expand"><FiMaximize2 aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </PhotoViewer>
      </div>
    </section>
  );
}
