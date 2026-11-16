import Image from "next/image";
import { photos } from "../content/photos";

export default function Experiences() {
  const { gathering, campfire } = photos;

  return (
    <section id="experiences" className="section section--experiences" aria-labelledby="experiences-title" tabIndex={-1}>
      <div className="container">
        <div className="section-heading experiences-heading reveal">
          <div>
            <p className="eyebrow">Experiências</p>
            <h2 id="experiences-title">O deserto <em>em boa companhia.</em></h2>
          </div>
          <p className="section-text">Há dias que ficam na memória pela companhia, pelas conversas e pelo tempo passado juntos.</p>
        </div>
        <div className="experiences-grid">
          <article className="experience reveal">
            <div className="photo-frame experience-photo experience-photo--gathering">
              <Image src={gathering.src} alt={gathering.alt} width={gathering.width} height={gathering.height} sizes="(min-width: 1200px) 600px, (min-width: 760px) 51vw, 92vw" />
            </div>
            <h3>Momentos de convívio</h3>
            <p>Partilhe o passeio e a mesa com família ou amigos.</p>
          </article>
          <article className="experience experience--night reveal">
            <div className="photo-frame experience-photo experience-photo--night">
              <Image src={campfire.src} alt={campfire.alt} width={campfire.width} height={campfire.height} sizes="(min-width: 1200px) 450px, (min-width: 760px) 39vw, 92vw" />
            </div>
            <h3>Quando o sol se põe</h3>
            <p>O deserto abranda e as conversas continuam à volta da fogueira.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
