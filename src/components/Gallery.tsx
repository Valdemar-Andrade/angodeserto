import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import type { Photo } from "../content/photos";
import PhotoViewer from "./ui/PhotoViewer";

const sizes = [
  "(min-width: 1280px) 485px, (min-width: 760px) 40vw, 90vw",
  "(min-width: 1280px) 320px, (min-width: 760px) 28vw, 44vw",
  "(min-width: 1280px) 285px, (min-width: 760px) 24vw, 44vw",
  "(min-width: 1280px) 315px, (min-width: 760px) 26vw, 44vw",
  "(min-width: 1280px) 300px, (min-width: 760px) 26vw, 44vw",
];

function tileSize(count: number, index: number) {
  if (count === 1) return "(min-width: 1280px) 1168px, 90vw";
  if (count === 2) return `(min-width: 1280px) ${index === 0 ? 670 : 480}px, (min-width: 760px) ${index === 0 ? 50 : 37}vw, 90vw`;
  if (count === 3 && index > 0) return "(min-width: 1280px) 630px, (min-width: 760px) 50vw, 44vw";
  if (count === 4 && index === 3) return "(min-width: 1280px) 630px, (min-width: 760px) 50vw, 90vw";
  return sizes[index];
}

export default function Gallery({ photos }: { photos: readonly Photo[] }) {
  return (
    <section id="gallery" className="section section--gallery" aria-labelledby="gallery-title" tabIndex={-1}>
      <div className="container">
        <div className="gallery-heading">
          <p className="eyebrow chapter-label">Galeria</p>
          <h2 id="gallery-title" className="chapter-heading">O Namibe, <em>de perto.</em></h2>
        </div>
        <PhotoViewer photos={photos} label="Galeria Angodeserto">
          <div className="gallery-grid" data-photo-count={photos.length}>
            {photos.map((photo, index) => (
              <button className="photo-button photo-frame gallery-tile" key={photo.src} type="button" data-photo-index={index} aria-label={`Ampliar fotografia: ${photo.caption}`} aria-haspopup="dialog">
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={tileSize(photos.length, index)} unoptimized={photo.unoptimized} />
                <span className="photo-expand"><FiMaximize2 aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </PhotoViewer>
      </div>
    </section>
  );
}
