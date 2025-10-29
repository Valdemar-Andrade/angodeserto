"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const experiences = [
  { id:1, title: "Passeios com Camelos", desc:"Percorra as dunas ao pôr do sol acompanhado por guias locais.", img:"/images/pessoa no camelo 2.jpeg" },
  { id:2, title: "Noites nas Tendas", desc:"Hospede-se em tendas tradicionais com conforto e autenticidade.", img:"/images/tenda 2.jpeg" },
  { id:3, title: "Gastronomia Local", desc:"Sabores locais preparados com ingredientes regionais.", img:"/images/amigos.jpeg" },
];

export default function Experiences(){
  return (
    <section id="experiences" className="py-16">
      <h3 className="font-display text-2xl mb-6">Experiências</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {experiences.map(exp => ( 
          <motion.article key={exp.id} whileHover={{y:-6}} className="bg-white rounded-2xl overflow-hidden shadow">
            <div className="relative h-44 w-full overflow-hidden">
              <Image src={exp.img} alt={exp.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h4 className="font-semibold mb-2">{exp.title}</h4>
              <p className="text-sm text-gray-600">{exp.desc}</p>
              <br></br>
              <br></br>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
