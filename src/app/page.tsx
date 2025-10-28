import Hero from "../components/Hero";
import About from "../components/About";
import Experiences from "../components/Experiences";
import Lodging from "../components/Lodging";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="max-w-6xl mx-auto px-6">
        <About />
        <Experiences />
        <Lodging />
        <Gallery />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
