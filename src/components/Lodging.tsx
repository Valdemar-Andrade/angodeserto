import Image from "next/image";
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi";
import { photos } from "../content/photos";
import { whatsappLink } from "../content/site";
import PhotoViewer from "./ui/PhotoViewer";

const roomPhotos = [
  photos.doubleRoom,
  photos.doubleRoomDetail,
  photos.bunkRoom,
  photos.bunkRoomDetail,
  photos.roomEntrance,
  photos.roomDrinks,
  photos.roomCorner,
  photos.washbasins,
  photos.towels,
];

const rooms = [
  {
    title: "Quarto de casal", cover: photos.doubleRoom, detail: photos.doubleRoomDetail, start: 0,
    coverSizes: "(min-width: 1280px) 481px, (min-width: 760px) 38vw, (max-width: 430px) 64vw, 78vw",
  },
  {
    title: "Quarto com beliches", cover: photos.bunkRoom, detail: photos.bunkRoomDetail, start: 2,
    coverSizes: "(min-width: 1280px) 370px, (min-width: 760px) 32vw, (max-width: 430px) 60vw, 72vw",
  },
];

const lodgingLink = whatsappLink("Olá, Angodeserto! Gostaria de saber mais sobre a hospedagem e consultar a disponibilidade dos quartos.");

export default function Lodging() {
  return (
    <section id="lodging" className="section section--lodging dark-chapter" aria-labelledby="lodging-title" tabIndex={-1}>
      <div className="container">
        <header className="lodging-heading">
          <div>
            <p className="eyebrow chapter-label">Hospedagem remodelada</p>
            <h2 id="lodging-title" className="chapter-heading">Tempo <em>para descansar.</em></h2>
          </div>
          <div>
            <p className="section-text">Depois de um dia no deserto, conheça os quartos remodelados da casa de hóspedes em Caraculo.</p>
            <a className="text-link" href={lodgingLink} target="_blank" rel="noopener">Consultar hospedagem <FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </header>
        <PhotoViewer photos={roomPhotos} label="Fotografias da hospedagem">
          <div className="rooms-grid">
            {rooms.map(({ title, cover, detail, start, coverSizes }) => (
              <article className="room" key={title}>
                <div className="room-photos">
                  <button className="photo-button photo-frame room-cover" type="button" data-photo-index={start} aria-label={`Ampliar fotografia: ${title}`} aria-haspopup="dialog">
                    <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes={coverSizes} quality={80} />
                    <span className="photo-expand"><FiMaximize2 aria-hidden="true" /></span>
                  </button>
                  <button className="photo-button photo-frame room-inset" type="button" data-photo-index={start + 1} aria-label={`Ver outro ângulo: ${title}`} aria-haspopup="dialog">
                    <Image src={detail.src} alt={detail.alt} width={detail.width} height={detail.height} sizes="(min-width: 1280px) 170px, (min-width: 760px) 14vw, (max-width: 430px) 24vw, 27vw" />
                  </button>
                </div>
                <div className="room-caption">
                  <h3>{title}</h3>
                  <button className="text-link" type="button" data-photo-index={start} aria-label={`Abrir álbum: ${title}`} aria-haspopup="dialog">
                    Abrir álbum <FiMaximize2 aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </PhotoViewer>
      </div>
    </section>
  );
}
