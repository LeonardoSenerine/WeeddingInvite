// =============================================================
//  CONFIGURAÇÃO DO CONVITE — edite só este arquivo
// =============================================================
window.CONVITE = {
  // Nomes do casal
  noiva: "Isabella",
  noivo: "Murilo",

  // Data e hora da cerimônia — formato AAAA-MM-DDTHH:MM
  dataHora: "2026-11-07T16:30",

  // Data limite para confirmar presença — AAAA-MM-DD (vazio = não exibe)
  prazoConfirmacao: "",

  local: {
    nome: "Chácara Recanto Moenda",
    endereco: "", // TODO: endereço completo
    cidade: "",   // TODO: cidade / UF
    // Link do Google Maps (se vazio, é gerado a partir do nome + endereço)
    mapa: "",
  },

  // Traje (vazio = não exibe o card)
  traje: "",
  trajeObs: "",

  // Programação do dia — ícones: chegada, cerimonia, brinde, jantar, festa
  // TODO: confirmar os horários (só o da cerimônia é oficial)
  programa: [
    { hora: "16h00", nome: "Chegada", icone: "chegada", descricao: "Recepção dos convidados" },
    { hora: "16h30", nome: "Cerimônia", icone: "cerimonia", descricao: "O momento do nosso sim" },
    { hora: "17h30", nome: "Brinde", icone: "brinde", descricao: "Coquetel e fotos" },
    { hora: "19h00", nome: "Jantar", icone: "jantar", descricao: "Hora de comer bem" },
    { hora: "21h00", nome: "Festa", icone: "festa", descricao: "Pista aberta até o fim" },
  ],

  // Informações importantes — {hora}, {local} e {contatos} são preenchidos automaticamente
  // TODO: revisar os textos
  informacoes: [
    { titulo: "Chegue com antecedência", texto: "A cerimônia começa às {hora}. Chegue uns 30 minutos antes para estacionar, se acomodar e não perder a entrada da noiva." },
    { titulo: "Cerimônia e festa no mesmo lugar", texto: "Tudo acontece na {local}. Não precisa se deslocar entre a cerimônia e a recepção." },
    { titulo: "Confirme sua presença", texto: "Use o formulário desta página. Leva menos de um minuto e ajuda muito na organização de lugares e buffet." },
    { titulo: "Fotos e momentos", texto: "Fique à vontade para registrar a festa e compartilhar com a gente. Vamos adorar ver o dia pelo seu olhar." },
    { titulo: "Presentes", texto: "Sua presença já é o presente. Se quiser nos dar algo, as sugestões estão no final da página." },
    { titulo: "Dúvidas?", texto: "Fale com {contatos} pelo WhatsApp. Elas vão te ajudar com o que precisar." },
  ],


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
      itens: [
        "Liquidificador", "Air fryer", "Sanduicheira", "Cafeteira", "Chaleira elétrica",
        "Mixer", "Processador", "Batedeira", "Ferro de passar", "Aspirador de pó",
        "Ventilador", "Micro-ondas",
      ],
    },
    {
      titulo: "Para facilitar a rotina",
      itens: [
        "Cesto para roupa suja", "Varal de chão", "Kit de cabides",
        "Kit de organização para lavanderia", "Jogo de tapetes para banheiro",
        "Tapete para cozinha", "Balde e kit de limpeza", "Caixa organizadora",
      ],
    },
    {
      titulo: "Opções mais econômicas",
      itens: [
        "Potes herméticos", "Jogo de toalhas", "Jogo de cama", "Kit de facas",
        "Travessas de vidro", "Jogo de panelas", "Jogo de pratos", "Jogo de talheres",
        "Air fryer (se o orçamento permitir)", "Vale-presente",
      ],
    },
  ],

  dicaPresentes:
    "Antes de comprar eletrodomésticos ou jogos grandes, fale com a Amanda para saber o que o casal já ganhou. Assim você evita presentes repetidos.",

  // Fotos do casal (pasta assets/img)
  galeria: [
    { src: "assets/img/casal-noivos.jpg", alt: "Isabella e Murilo arrumados para uma festa" },
    { src: "assets/img/casal-retrato.jpg", alt: "O casal abraçado sorrindo" },
    { src: "assets/img/casal-por-do-sol.jpg", alt: "O casal de óculos escuros ao pôr do sol" },
    { src: "assets/img/casal-coco.jpg", alt: "O casal tomando água de coco" },
    { src: "assets/img/casal-oculos.jpg", alt: "O casal em uma selfie ao ar livre" },
  ],

  // Fotos que ficam trocando no topo (vazio = usa as da galeria)
  fotosTopo: [
    { src: "assets/img/casal-noivos.jpg", alt: "Isabella e Murilo arrumados para uma festa" },
    { src: "assets/img/casal-por-do-sol.jpg", alt: "O casal ao pôr do sol" },
    { src: "assets/img/casal-coco.jpg", alt: "O casal tomando água de coco" },
    { src: "assets/img/casal-oculos.jpg", alt: "O casal em uma selfie ao ar livre" },
  ],

  // Fotos do local (coloque os arquivos em assets/img/local/ e liste aqui)
  fotosLocal: [
    // { src: "assets/img/local/cerimonia.jpg", alt: "Espaço da cerimônia ao ar livre" },
  ],
};
