import About from "../components/About";
import CamelRoute from "../components/CamelRoute";
import Closing from "../components/Closing";
import Contact from "../components/Contact";
import Experiences from "../components/Experiences";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Lodging from "../components/Lodging";
import Restaurant from "../components/Restaurant";

export default function Home() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <Hero />
      <About />
      <CamelRoute />
      <Experiences />
      <Restaurant />
      <Lodging />
      <Gallery />
      <Contact />
      <Closing />
    </main>
  );
}
