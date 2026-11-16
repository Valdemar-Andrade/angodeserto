export type Photo = {
  src: `/media/${string}.webp`;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const photos = {
  heroDesktop: {
    src: "/media/caraculo-camelos-hero.webp",
    width: 1200, height: 1032,
    alt: "Camelos no terreno arenoso, com montanhas ao fundo em Caraculo",
    caption: "Caraculo, no Namibe",
  },
  heroMobile: {
    src: "/media/rota-camelos-retrato.webp",
    width: 880, height: 1173,
    alt: "Dois visitantes próximos de um camelo, na Angodeserto",
    caption: "Um encontro na Rota dos Camelos",
  },
  arrival: {
    src: "/media/chegada-caraculo.webp",
    width: 1024, height: 1365,
    alt: "Estrada de terra e sinal da Angodeserto, com a montanha de Caraculo ao fundo",
    caption: "À chegada a Caraculo",
  },
  camelEncounter: {
    src: "/media/encontro-camelo.webp",
    width: 960, height: 1280,
    alt: "Visitante a acariciar um camelo em Caraculo",
    caption: "Um encontro na Rota dos Camelos",
  },
  gathering: {
    src: "/media/convivio-deserto.webp",
    width: 880, height: 1173,
    alt: "Grupo reunido à volta de uma mesa de madeira sob uma cobertura",
    caption: "Momentos de convívio",
  },
  campfire: {
    src: "/media/fogueira-namibe.webp",
    width: 880, height: 1173,
    alt: "Visitantes reunidos à noite em torno de uma fogueira",
    caption: "Uma noite à volta da fogueira",
  },
  restaurant: {
    src: "/media/mesa-restaurante.webp",
    width: 960, height: 1280,
    alt: "Mesa posta com loiça e copos, junto à parede de tijolo do restaurante",
    caption: "O restaurante da Angodeserto",
  },
  plates: {
    src: "/media/pratos-namibe.webp",
    width: 1120, height: 840,
    alt: "Três pratos servidos à mesa, vistos de cima",
    caption: "À mesa no Namibe",
  },
  cooking: {
    src: "/media/preparacao-pratos.webp",
    width: 900, height: 1165,
    alt: "Cozinheiros a preparar pratos numa bancada do restaurante",
    caption: "Na cozinha da Angodeserto",
  },
  doubleRoom: {
    src: "/media/quarto-casal.webp",
    width: 720, height: 1280,
    alt: "Cama de casal com manta estampada num quarto de paredes de tijolo",
    caption: "Quarto de casal",
  },
  doubleRoomDetail: {
    src: "/media/quarto-casal-detalhe.webp",
    width: 900, height: 1200,
    alt: "Vista lateral da cama de casal junto à parede de tijolo",
    caption: "Outro ângulo do quarto de casal",
  },
  bunkRoom: {
    src: "/media/quarto-beliches.webp",
    width: 720, height: 1280,
    alt: "Quarto remodelado com beliches de madeira e paredes de tijolo",
    caption: "Quarto com beliches",
  },
  bunkRoomDetail: {
    src: "/media/quarto-beliches-detalhe.webp",
    width: 720, height: 1280,
    alt: "Beliche de madeira junto a um armário alto",
    caption: "Outro ângulo do quarto com beliches",
  },
  roomEntrance: {
    src: "/media/quarto-entrada.webp",
    width: 720, height: 1280,
    alt: "Espelho e cortinas junto à entrada de um dos quartos",
    caption: "Entrada e espelho",
  },
  roomDrinks: {
    src: "/media/quarto-bebidas.webp",
    width: 720, height: 1280,
    alt: "Mesa de bebidas por baixo de um televisor, num dos quartos",
    caption: "Um detalhe do interior",
  },
  roomCorner: {
    src: "/media/quarto-canto.webp",
    width: 720, height: 1280,
    alt: "Cadeira de madeira e candeeiro junto à cortina de um dos quartos",
    caption: "Um canto para descansar",
  },
  washbasins: {
    src: "/media/quarto-lavatorios.webp",
    width: 900, height: 1200,
    alt: "Dois lavatórios brancos numa casa de banho de parede cinzenta",
    caption: "Detalhe da casa de banho",
  },
  towels: {
    src: "/media/quarto-toalhas.webp",
    width: 660, height: 880,
    alt: "Toalhas dobradas numa prateleira de madeira",
    caption: "Toalhas e acessórios",
  },
  visitors: {
    src: "/media/visitantes-camelo.webp",
    width: 900, height: 1200,
    alt: "Duas visitantes com lenços vermelhos junto a um camelo",
    caption: "Encontros na Rota dos Camelos",
  },
  tasting: {
    src: "/media/mesa-gastronomia.webp",
    width: 900, height: 1233,
    alt: "Pratos preparados, dispostos sobre uma bancada",
    caption: "Sabores da Angodeserto",
  },
  camelsAtDusk: {
    src: "/media/poente-camelos.webp",
    width: 1000, height: 1333,
    alt: "Camelos em contraluz sob o sol baixo no horizonte",
    caption: "Ao cair do dia",
  },
  lunchOutside: {
    src: "/media/refeicao-ao-ar-livre.webp",
    width: 900, height: 1200,
    alt: "Visitantes a partilhar uma refeição sob uma cobertura ao ar livre",
    caption: "Uma refeição ao ar livre",
  },
  camelRide: {
    src: "/media/passeio-camelo.webp",
    width: 1000, height: 1333,
    alt: "Visitante montado num camelo com uma manta vermelha",
    caption: "Um passeio de camelo",
  },
  sunset: {
    src: "/media/poente-caraculo.webp",
    width: 960, height: 1280,
    alt: "Sol a descer sobre as montanhas, visto de uma mesa ao ar livre",
    caption: "Pôr do sol em Caraculo",
  },
} as const satisfies Record<string, Photo>;
