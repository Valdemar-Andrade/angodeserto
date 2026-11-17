import Image from "next/image";
import { photos } from "../content/photos";

export default function Experiences() {
  const { gathering, campfire } = photos;

  return (
    <section id="experiences" className="route-experiences" aria-labelledby="experiences-title" tabIndex={-1}>
      <header className="container experiences-heading">
        <p className="eyebrow chapter-label">A vivência</p>
        <h3 id="experiences-title" className="chapter-heading">O deserto <em>em boa companhia.</em></h3>
        <p className="section-text">Partilhe o passeio e a mesa com família ou amigos. Ao cair da noite, as conversas continuam à volta da fogueira.</p>
      </header>
      <div className="container experiences-spread">
        <figure className="experience-gathering">
          <div className="photo-frame experience-gathering-photo scene-reveal">
            <Image src={gathering.src} alt={gathering.alt} width={gathering.width} height={gathering.height} sizes="(min-width: 1280px) 690px, (min-width: 760px) 55vw, 92vw" />
          </div>
          <figcaption>{gathering.caption}</figcaption>
        </figure>
        <figure className="experience-campfire">
          <div className="photo-frame experience-campfire-photo scene-reveal">
            <Image src={campfire.src} alt={campfire.alt} width={campfire.width} height={campfire.height} sizes="(min-width: 1280px) 350px, (min-width: 760px) 29vw, 73vw" />
          </div>
          <figcaption>{campfire.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
