export const site = {
  name: "Angodeserto",
  location: "Caraculo, Namibe, Angola",
  whatsapp: "244923745178",
  phoneLabel: "+244 923 745 178",
  instagram: "https://www.instagram.com/angodeserto",
  tiktok: "https://www.tiktok.com/@angodeserto",
  map: "https://www.google.com/maps/search/?api=1&query=Caraculo%2C%20Namibe%2C%20Angola",
};

export const navigation = [
  { href: "#about", label: "O Namibe" },
  { href: "#rota-dos-camelos", label: "Rota dos Camelos" },
  { href: "#gastronomia", label: "Restaurante" },
  { href: "#lodging", label: "Hospedagem" },
  { href: "#gallery", label: "Galeria" },
] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const reservationLink = whatsappLink("Olá, Angodeserto! Gostaria de saber mais sobre as experiências e pedir uma reserva.");
