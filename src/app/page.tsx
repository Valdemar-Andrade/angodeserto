import About from "../components/About";
import CamelRoute from "../components/CamelRoute";
import Closing from "../components/Closing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Lodging from "../components/Lodging";
import Restaurant from "../components/Restaurant";
import SpecialHighlight from "../components/SpecialHighlight";
import { displayPhotos } from "../content/editorial";
import { publicEditorial } from "../server/admin/editorial-store";

export const revalidate = 120;

export default async function Home() {
  const [gallery, highlight] = await Promise.all([publicEditorial("gallery"), publicEditorial("highlight")]);
  return (
    <>
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <CamelRoute />
        <Restaurant />
        <Lodging />
        <SpecialHighlight title={highlight.title} photos={displayPhotos(highlight.photos)} />
        <Gallery photos={displayPhotos(gallery.photos)} />
        <Contact />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
