import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import type { Photo } from "../content/photos";
import PhotoViewer from "./ui/PhotoViewer";

export default function SpecialHighlight({ title, photos }: { title: string; photos: readonly Photo[] }) {
  if (!photos.length) return null;

  return (
    <section id="special-highlight" className="section section--highlight" aria-labelledby="highlight-title">
      <div className="container">
        <header className="gallery-heading">
          {title && <p className="eyebrow chapter-label">Destaques Especiais</p>}
          <h2 id="highlight-title" className="chapter-heading">{title || "Destaques Especiais"}</h2>
        </header>
        <PhotoViewer photos={photos} label="Fotografias do destaque">
          <div className="highlight-photos" data-photo-count={photos.length}>
            {photos.map((photo, index) => (
              <button key={photo.src} type="button" className="photo-button photo-frame highlight-photo"
                data-photo-index={index} aria-label={`Ampliar fotografia: ${photo.alt}`} aria-haspopup="dialog">
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
                  sizes={index === 0 ? "(min-width: 1280px) 1168px, 90vw" : "(min-width: 760px) 33vw, 45vw"}
                  unoptimized={photo.unoptimized} />
                <span className="photo-expand"><FiMaximize2 aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </PhotoViewer>
      </div>
    </section>
  );
}
