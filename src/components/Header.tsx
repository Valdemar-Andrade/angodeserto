import { FiArrowUpRight } from "react-icons/fi";
import { navigation, reservationLink } from "../content/site";
import Brand from "./ui/Brand";
import MobileNavigation from "./ui/MobileNavigation";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-navigation" aria-label="Navegação principal">
          {navigation.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-reserve" href={reservationLink} target="_blank" rel="noopener">
          Pedir reserva <FiArrowUpRight aria-hidden="true" />
        </a>
        <MobileNavigation />
      </div>
    </header>
  );
}
