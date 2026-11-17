import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { photos } from "../content/photos";
import { whatsappLink } from "../content/site";

const restaurantLink = whatsappLink("Olá, Angodeserto! Gostaria de saber mais sobre a visita ao restaurante em Caraculo.");

export default function Restaurant() {
  const { restaurant, plates, cooking } = photos;

  return (
    <section id="gastronomia" className="section section--restaurant" aria-labelledby="restaurant-title" tabIndex={-1}>
      <header className="container restaurant-heading">
        <div>
          <p className="eyebrow chapter-label">Restaurante e gastronomia</p>
          <h2 id="restaurant-title" className="chapter-heading">À mesa <em>com o Namibe.</em></h2>
        </div>
        <div className="restaurant-copy">
          <p className="section-text">Depois do passeio, há lugar à mesa. No restaurante da Angodeserto, os sabores locais e a hospitalidade de Caraculo fazem parte da visita.</p>
          <a className="text-link" href={restaurantLink} target="_blank" rel="noopener">Perguntar sobre o restaurante <FiArrowUpRight aria-hidden="true" /></a>
        </div>
      </header>
      <figure className="restaurant-lead">
        <div className="photo-frame restaurant-plates scene-reveal">
          <Image src={plates.src} alt={plates.alt} width={plates.width} height={plates.height} sizes="(min-width: 1370px) 1232px, (min-width: 760px) 93vw, 100vw" quality={85} />
        </div>
        <figcaption>{plates.caption}</figcaption>
      </figure>
      <div className="container restaurant-spread">
        <figure className="restaurant-dining">
          <div className="photo-frame restaurant-room scene-reveal">
            <Image src={restaurant.src} alt={restaurant.alt} width={restaurant.width} height={restaurant.height} sizes="(min-width: 1280px) 570px, (min-width: 760px) 46vw, 80vw" />
          </div>
          <figcaption>{restaurant.caption}</figcaption>
        </figure>
        <figure className="restaurant-preparation">
          <div className="photo-frame restaurant-kitchen scene-reveal">
            <Image src={cooking.src} alt={cooking.alt} width={cooking.width} height={cooking.height} sizes="(min-width: 1280px) 370px, (min-width: 760px) 32vw, 72vw" />
          </div>
          <figcaption>{cooking.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
