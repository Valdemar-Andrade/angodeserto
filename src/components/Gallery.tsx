import Image from 'next/image';

export default function Gallery(){
  return (
    <section id="gallery" className="py-16">
      <h3 className="font-display text-2xl mb-6">Galeria</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Image src="/images/leite camelo.jpeg" alt="galeria 1" width={400} height={160} className="w-full h-40 object-cover rounded-lg shadow"/>
        <Image src="/images/camelo por do sol.jpeg" alt="galeria 2" width={400} height={160} className="w-full h-40 object-cover rounded-lg shadow"/>
        <Image src="/images/camelo 3.jpg" alt="galeria 3" width={400} height={160} className="w-full h-40 object-cover rounded-lg shadow"/>
        <Image src="/images/por do sol.jpeg" alt="galeria 4" width={400} height={160} className="w-full h-40 object-cover rounded-lg shadow"/>
      </div>
    </section>
  );
}
