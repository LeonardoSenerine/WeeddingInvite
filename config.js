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
    endereco: "Rua Antônio Carlos de Oliveira, 15 — Residencial Grêmio/Moenda, Bairro Moenda 1",
    cidade: "Itatiba/SP",
    // Link do Google Maps (se vazio, é gerado a partir do nome + endereço)
    mapa: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Rua Antônio Carlos de Oliveira, 15, Moenda, Itatiba - SP"),
  },

  // Traje (vazio = não exibe o card)
  traje: "",
  trajeObs: "",

  // Programação do dia — ícones: chegada, cerimonia, brinde, jantar, festa
  programa: [
    { hora: "16h30", nome: "Cerimônia", icone: "cerimonia", descricao: "O momento do nosso sim" },
    { hora: "Em seguida", nome: "Jantar", icone: "jantar", descricao: "Celebração com as pessoas que amamos" },
  ],

  // Informações importantes — {hora}, {local} e {contatos} são preenchidos automaticamente
  // TODO: revisar os textos
  informacoes: [
    { titulo: "Chegue com antecedência", texto: "A cerimônia começa às {hora}. Chegue uns 30 minutos antes para estacionar, se acomodar e não perder a entrada da noiva." },
    { titulo: "Cerimônia e jantar no mesmo lugar", texto: "Cerimônia e jantar acontecem na {local}. Não precisa se deslocar entre um e outro." },
    { titulo: "Acompanhantes", texto: "Pedimos que os acompanhantes sejam apenas familiares. Ao confirmar, informe o nome e o parentesco de cada um." },
    { titulo: "Confirme sua presença", texto: "Use o formulário desta página. Leva menos de um minuto e ajuda muito na organização de lugares e buffet." },
    { titulo: "Fotos e momentos", texto: "Fique à vontade para registrar a festa e compartilhar com a gente. Vamos adorar ver o dia pelo seu olhar." },
    { titulo: "Presentes", texto: "Sua presença já é o presente. Se quiser nos dar algo, as sugestões estão no final da página." },
    { titulo: "Dúvidas?", texto: "Fale com {contatos} pelo WhatsApp. Elas vão te ajudar com o que precisar." },
  ],


  // Endereço do "Aplicativo da Web" do Google Apps Script (veja apps-script/COMO-INSTALAR.md).
  // Com ele preenchido, as confirmações vão para a planilha e os presentes escolhidos
  // ficam indisponíveis para os outros. Vazio = confirmação só pelo WhatsApp.
  planilhaUrl: "https://script.google.com/macros/s/AKfycbyUx-iF3NzbNjefmPeAs8EzgTu4lkga4d40B-v1hH09StCYH_kdQ8YKFT7H-c2oHuPL/exec",

  contatos: [
    { nome: "Amanda", telefone: "5511989451945", exibicao: "(11) 98945-1945" },
    { nome: "Julia",  telefone: "5511999592726", exibicao: "(11) 99959-2726" },
  ],

  // Chave Pix para quem preferir presentear em dinheiro (deixe vazio para ocultar)
  pix: "",

  // Loja aberta quando o convidado escolhe um presente ({termo} = nome do presente).
  // Deixe busca vazia para não perguntar.
  lojaOnline: {
    nome: "Mercado Livre",
    busca: "https://lista.mercadolivre.com.br/{termo}",
    semLoja: ["Vale-presente"], // presentes que não abrem a pergunta
  },

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
    { src: "assets/img/local/cerimonia.jpg", alt: "A cerimônia ao ar livre, no gramado entre as árvores" },
    { src: "assets/img/local/salao-festas.jpg", alt: "O salão de festas, amplo e bem iluminado" },
    { src: "assets/img/local/area-externa.jpg", alt: "A área externa, com palmeiras e varanda" },
    { src: "assets/img/local/area-coberta.jpg", alt: "A área coberta com mesas" },
    { src: "assets/img/local/churrasqueira.jpg", alt: "A churrasqueira" },
    { src: "assets/img/local/piscina.jpg", alt: "A piscina" },
    { src: "assets/img/local/gramado.jpg", alt: "O gramado cercado de verde" },
    { src: "assets/img/local/dormitorio.jpg", alt: "O dormitório" },
    { src: "assets/img/local/entrada.jpg", alt: "A entrada da chácara" },
  ],
};
