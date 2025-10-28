import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* TEXTO */}
        <div>
          <h2 className="font-display text-3xl mb-4">Sobre a Ango Deserto</h2>
          <p className="text-gray-700 leading-relaxed">
            Ango Deserto cria experiências turísticas únicas no coração do Namibe,
            unindo tradição, cultura local e ecoturismo. Oferecemos passeios com camelos,
            noites em tendas tradicionais e imersão na gastronomia e nas histórias locais.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Nosso objetivo é valorizar a comunidade e o ambiente, criando memórias autênticas
            e sustentáveis para visitantes nacionais e internacionais.
          </p>
        </div>

        {/* IMAGEM */}
        <div className="relative w-full h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/camelos.jpeg"
            alt="Passeio de camelo"
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}
