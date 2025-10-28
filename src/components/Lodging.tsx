import Image from "next/image";

export default function Lodging(){
  return (
    <section id="lodging" className="py-16">
        <h3 className="font-display text-2xl mb-6">Hospedagem</h3>
        <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl overflow-hidden shadow">
              <Image
                src="/images/tenda 1.jpeg"
                alt="Tenda no deserto"
                width={800}
                height={400}
                className="w-full h-64 object-cover"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow">
                <Image
                  src="/images/repouso.jpeg"
                  alt="Repouso no deserto"
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                  style={{ objectFit: "cover" }}
                />
            </div>
        </div>
        <div>
          <h4 className="font-semibold text-xl">Tendas Tradicionais</h4>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Viver a noite no deserto com conforto e autenticidade. As tendas são preparadas
            por membros da comunidade local para proporcionar uma experiência imersiva.
          </p>

          <h4 className="font-semibold text-xl mt-6">Casa de Hóspedes</h4>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Para quem prefere maior conforto, a casa de hóspedes oferece quartos aconchegantes
            e serviço local.
          </p>

          <p className="mt-4 text-sm text-gray-500">Observação: informações sobre valores e reservas são tratadas privadamente através do contacto com a agência.</p>
        </div>
    </section>
  );
}
