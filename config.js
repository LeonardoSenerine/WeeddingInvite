// =============================================================
//  CONFIGURAÇÃO DO CONVITE — edite só este arquivo
// =============================================================
window.CONVITE = {
  // Nomes do casal (TODO: confirmar)
  noiva: "Noiva",
  noivo: "Noivo",

  // Data e hora da cerimônia — formato AAAA-MM-DDTHH:MM (TODO: confirmar)
  dataHora: "2027-04-04T16:00",

  // Data limite para confirmar presença (TODO: confirmar)
  prazoConfirmacao: "2027-03-01",

  local: {
    nome: "Rancho das Pedras",
    endereco: "", // TODO: endereço completo
    cidade: "",   // TODO: cidade / UF
    // Link do Google Maps (se vazio, é gerado a partir do nome + endereço)
    mapa: "",
  },

  // Traje (TODO: confirmar)
  traje: "Esporte fino",
  trajeObs: "A cerimônia é ao ar livre, na grama — prefira saltos grossos.",

  // Contatos para confirmação de presença (WhatsApp)
  contatos: [
    { nome: "Amanda", telefone: "5511989451945", exibicao: "(11) 98945-1945" },
    { nome: "Julia",  telefone: "5511999592726", exibicao: "(11) 99959-2726" },
  ],

  // Chave Pix para quem preferir presentear em dinheiro (deixe vazio para ocultar)
  pix: "",

  // Lista de presentes (sugestões)
  presentes: [
    {
      titulo: "Coisas para a casa",
      icone: "🏡",
      itens: [
        "Jogo de toalhas de banho e rosto", "Jogo de cama", "Edredom ou cobertor",
        "Protetor de colchão", "Travesseiros bons", "Jogo de panelas",
        "Frigideira antiaderente", "Assadeira ou refratário de vidro", "Travessas para servir",
        "Potes herméticos", "Jogo de pratos", "Jogo de copos", "Jogo de talheres",
        "Escorredor de louça", "Lixeira para cozinha", "Organizador de mantimentos",
        "Tábua de corte", "Kit de facas", "Panos de prato de boa qualidade",
      ],
    },
    {
      titulo: "Eletros",
      icone: "☕",
      itens: [
        "Liquidificador", "Air fryer", "Sanduicheira", "Cafeteira", "Chaleira elétrica",
        "Mixer", "Processador", "Batedeira", "Ferro de passar", "Aspirador de pó",
        "Ventilador", "Micro-ondas",
      ],
    },
    {
      titulo: "Para facilitar a rotina",
      icone: "🧺",
      itens: [
        "Cesto para roupa suja", "Varal de chão", "Kit de cabides",
        "Kit de organização para lavanderia", "Jogo de tapetes para banheiro",
        "Tapete para cozinha", "Balde e kit de limpeza", "Caixa organizadora",
      ],
    },
    {
      titulo: "Opções mais econômicas",
      icone: "🎁",
      itens: [
        "Potes herméticos", "Jogo de toalhas", "Jogo de cama", "Kit de facas",
        "Travessas de vidro", "Jogo de panelas", "Jogo de pratos", "Jogo de talheres",
        "Air fryer (se o orçamento permitir)", "Vale-presente",
      ],
    },
  ],

  dicaPresentes:
    "Antes de comprar eletrodomésticos ou jogos grandes, fale com a Amanda ou a Julia para saber o que o casal já ganhou. Assim você evita presentes repetidos.",

  // Fotos do casal (pasta assets/img)
  galeria: [
    { src: "assets/img/casal-retrato.jpg", alt: "O casal abraçado sorrindo" },
    { src: "assets/img/casal-por-do-sol.jpg", alt: "O casal de óculos escuros ao pôr do sol" },
    { src: "assets/img/casal-coco.jpg", alt: "O casal tomando água de coco" },
    { src: "assets/img/casal-oculos.jpg", alt: "O casal em uma selfie ao ar livre" },
  ],

  // Fotos do local (coloque os arquivos em assets/img/local/ e liste aqui)
  fotosLocal: [
    // { src: "assets/img/local/cerimonia.jpg", alt: "Espaço da cerimônia ao ar livre" },
  ],
};
