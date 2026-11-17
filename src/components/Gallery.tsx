import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import { photos } from "../content/photos";
import PhotoViewer from "./ui/PhotoViewer";

const gallery = [
  { photo: photos.camelRide, sizes: "(min-width: 1280px) 485px, (min-width: 760px) 40vw, 90vw" },
  { photo: photos.visitors, sizes: "(min-width: 1280px) 320px, (min-width: 760px) 28vw, 44vw" },
  { photo: photos.tasting, sizes: "(min-width: 1280px) 285px, (min-width: 760px) 24vw, 44vw" },
  { photo: photos.lunchOutside, sizes: "(min-width: 1280px) 315px, (min-width: 760px) 26vw, 44vw" },
  { photo: photos.camelsAtDusk, sizes: "(min-width: 1280px) 300px, (min-width: 760px) 26vw, 44vw" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section section--gallery" aria-labelledby="gallery-title" tabIndex={-1}>
      <div className="container">
        <div className="gallery-heading">
          <p className="eyebrow chapter-label">Galeria</p>
          <h2 id="gallery-title" className="chapter-heading">O Namibe, <em>de perto.</em></h2>
        </div>
        <PhotoViewer photos={gallery.map(({ photo }) => photo)} label="Galeria Angodeserto">
          <div className="gallery-grid">
            {gallery.map(({ photo, sizes }, index) => (
              <button className="photo-button photo-frame gallery-tile" key={photo.src} type="button" data-photo-index={index} aria-label={`Ampliar fotografia: ${photo.caption}`} aria-haspopup="dialog">
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} />
                <span className="photo-expand"><FiMaximize2 aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </PhotoViewer>
      </div>
    </section>
  );
}
