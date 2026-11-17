import { FiArrowUp } from "react-icons/fi";
import Brand from "./ui/Brand";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Brand />
        <p>© {new Date().getFullYear()} Angodeserto · Rota dos Camelos</p>
        <a className="footer-top" href="#conteudo">Voltar ao início <FiArrowUp aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
