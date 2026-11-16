import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { photos } from "../content/photos";
import { whatsappLink } from "../content/site";

const restaurantLink = whatsappLink("Olá, Angodeserto! Gostaria de saber mais sobre a visita ao restaurante em Caraculo.");

export default function Restaurant() {
  const { restaurant, plates, cooking } = photos;

  return (
    <section id="gastronomia" className="section section--restaurant" aria-labelledby="restaurant-title" tabIndex={-1}>
      <div className="container restaurant-layout">
        <div className="restaurant-copy reveal">
          <p className="eyebrow">Restaurante e gastronomia</p>
          <h2 id="restaurant-title">À mesa <em>com o Namibe.</em></h2>
          <p className="section-text">Depois do passeio, há lugar à mesa. No restaurante da Angodeserto, os sabores locais e a hospitalidade de Caraculo fazem parte da visita.</p>
          <a className="text-link" href={restaurantLink} target="_blank" rel="noopener">Perguntar sobre o restaurante <FiArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="restaurant-photos reveal">
          <div className="photo-frame restaurant-room">
            <Image src={restaurant.src} alt={restaurant.alt} width={restaurant.width} height={restaurant.height} sizes="(min-width: 1200px) 410px, (min-width: 760px) 35vw, 57vw" />
          </div>
          <div className="photo-frame restaurant-plates">
            <Image src={plates.src} alt={plates.alt} width={plates.width} height={plates.height} sizes="(min-width: 1200px) 285px, (min-width: 760px) 24vw, 36vw" />
          </div>
          <div className="photo-frame restaurant-kitchen">
            <Image src={cooking.src} alt={cooking.alt} width={cooking.width} height={cooking.height} sizes="(min-width: 1200px) 285px, (min-width: 760px) 24vw, 36vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
