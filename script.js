(function () {
  const C = window.CONVITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Dados derivados ----------
  const data = new Date(C.dataHora);
  const fmt = (opts) => new Intl.DateTimeFormat("pt-BR", opts).format(data);
  const prazo = C.prazoConfirmacao ? new Date(C.prazoConfirmacao + "T12:00") : null;
  const enderecoCompleto = [C.local.endereco, C.local.cidade].filter(Boolean).join(" — ");
  const mapa = C.local.mapa ||
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent([C.local.nome, C.local.endereco, C.local.cidade].filter(Boolean).join(", "));

  const binds = {
    noiva: C.noiva,
    noivo: C.noivo,
    monograma: `${C.noiva[0]} & ${C.noivo[0]}`,
    diaSemanaCap: (() => { const t = fmt({ weekday: "long" }); return t[0].toUpperCase() + t.slice(1); })(),
    horaCurta: fmt({ hour: "2-digit", minute: "2-digit" }).replace(":", "h"),
    dataExtenso: (() => { const t = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }); return t[0].toUpperCase() + t.slice(1); })(),
    dataLonga: fmt({ day: "numeric", month: "long", year: "numeric" }),
    dataCurta: fmt({ day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " · "),
    hora: "às " + fmt({ hour: "2-digit", minute: "2-digit" }).replace(":", "h"),
    localNome: C.local.nome,
    localEndereco: enderecoCompleto || "Endereço em breve",
    prazo: prazo ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long" }).format(prazo) : "",
    dica: C.dicaPresentes,
    traje: C.traje,
    trajeObs: C.trajeObs,
  };
  $$("[data-bind]").forEach((el) => { el.textContent = binds[el.dataset.bind] ?? ""; });

  $("#mapLink").href = mapa;
  $("#prazoTexto").hidden = !prazo;
  $("#cardTraje").hidden = !C.traje;

  // Google Agenda
  const pad = (n) => String(n).padStart(2, "0");
  const gcal = (d) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const fim = new Date(data.getTime() + 6 * 3600 * 1000);
  $("#addCalendar").href =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(`Casamento ${C.noiva} & ${C.noivo}`) +
    "&dates=" + gcal(data) + "/" + gcal(fim) +
    "&location=" + encodeURIComponent([C.local.nome, enderecoCompleto].filter(Boolean).join(", "));

  // ---------- Navegação ----------
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.5);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const toggle = $("#navToggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("is-open"); });

  // ---------- Contagem regressiva ----------
  const cd = Object.fromEntries($$("[data-cd]").map((el) => [el.dataset.cd, el]));
  const cdLabel = Object.fromEntries($$("[data-cd-label]").map((el) => [el.dataset.cdLabel, el]));
  const nomes = { d: ["dia", "dias"], h: ["hora", "horas"], m: ["minuto", "minutos"], s: ["segundo", "segundos"] };
  const tick = () => {
    let diff = Math.max(0, data - new Date());
    const v = {};
    v.d = Math.floor(diff / 864e5); diff -= v.d * 864e5;
    v.h = Math.floor(diff / 36e5); diff -= v.h * 36e5;
    v.m = Math.floor(diff / 6e4); diff -= v.m * 6e4;
    v.s = Math.floor(diff / 1e3);
    for (const k in v) {
      const txt = k === "d" ? String(v[k]) : pad(v[k]);
      if (cd[k].textContent !== txt) {
        cd[k].textContent = txt;
        cd[k].classList.remove("is-tick"); void cd[k].offsetWidth; cd[k].classList.add("is-tick");
      }
      cdLabel[k].textContent = nomes[k][v[k] === 1 ? 0 : 1];
    }
  };
  tick(); setInterval(tick, 1000);

  // ---------- Programação ----------
  const icones = {
    chegada: '<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/><path d="M2 20h20"/>',
    cerimonia: '<path d="M12 2v4M10 4h4"/><path d="M6 21V11l6-5 6 5v10"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/><path d="M3 21h18"/>',
    brinde: '<path d="M8 3h4l-.5 6a2.5 2.5 0 0 1-3 0L8 3z" transform="rotate(-12 10 6)"/><path d="M12 3h4l-.5 6a2.5 2.5 0 0 1-3 0L12 3z" transform="rotate(12 14 6)"/><path d="M8.6 11.5 7.5 20M15.4 11.5l1.1 8.5M5.5 20h4M14.5 20h4"/>',
    jantar: '<circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="3"/><path d="M3 4v5a1.5 1.5 0 0 0 3 0V4M4.5 9v11"/><path d="M20.5 4c-1.5 1-2 3-2 5.5h2V20"/>',
    festa: '<path d="M12 2v3"/><circle cx="12" cy="12" r="7"/><path d="M5 12h14M12 5c2 2.2 2 11.8 0 14M12 5c-2 2.2-2 11.8 0 14M6.5 8h11M6.5 16h11"/>',
  };
  const prog = $("#programa");
  (C.programa || []).forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icones[p.icone] || icones.festa}</svg>
      <span class="timeline__time"></span><span class="timeline__name"></span><span class="timeline__desc"></span>`;
    $(".timeline__time", li).textContent = p.hora;
    $(".timeline__name", li).textContent = p.nome;
    $(".timeline__desc", li).textContent = p.descricao || "";
    prog.appendChild(li);
  });

  // ---------- Informações ----------
  const listaContatos = C.contatos.map((c) => c.nome).join(" ou ");
  const infos = $("#infos");
  (C.informacoes || []).forEach((i) => {
    const div = document.createElement("div");
    div.className = "info";
    div.innerHTML = "<h3></h3><p></p>";
    $("h3", div).textContent = i.titulo;
    $("p", div).textContent = i.texto
      .replace("{hora}", binds.horaCurta)
      .replace("{local}", C.local.nome)
      .replace("{contatos}", listaContatos);
    infos.appendChild(div);
  });

  // ---------- Galerias + lightbox ----------
  const lightbox = $("#lightbox"), lbImg = $("img", lightbox);
  const openLb = (src, alt) => { lbImg.src = src; lbImg.alt = alt; lightbox.hidden = false; };
  const closeLb = () => { lightbox.hidden = true; lbImg.src = ""; };
  lightbox.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

  const fillGallery = (el, fotos) => {
    fotos.forEach((f) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ampliar foto: " + f.alt);
      const img = document.createElement("img");
      img.src = f.src; img.alt = f.alt; img.loading = "lazy";
      b.appendChild(img);
      b.addEventListener("click", () => openLb(f.src, f.alt));
      el.appendChild(b);
    });
  };
  // ---------- Topo: fotos trocando sozinhas ----------
  const heroSlides = $("#heroSlides");
  const fotosTopo = C.fotosTopo && C.fotosTopo.length ? C.fotosTopo : C.galeria;
  fotosTopo.forEach((f, i) => {
    const img = document.createElement("img");
    img.src = f.src; img.alt = i === 0 ? f.alt : "";
    if (i === 0) img.classList.add("is-active");
    heroSlides.appendChild(img);
  });
  const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fotosTopo.length > 1 && !reduzMovimento) {
    let atual = 0;
    const imgs = $$("img", heroSlides);
    setInterval(() => {
      imgs[atual].classList.remove("is-active");
      atual = (atual + 1) % imgs.length;
      imgs[atual].classList.add("is-active");
    }, 5000);
  }

  // ---------- Carrossel da galeria ----------
  const carrossel = (root, fotos, aoMudar) => {
    const track = $(".carousel__track", root), dots = $(".carousel__dots", root);
    fotos.forEach((f, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel__slide";
      b.setAttribute("aria-label", `Foto ${i + 1} de ${fotos.length}: ${f.alt}`);
      const img = document.createElement("img");
      img.src = f.src; img.alt = f.alt; img.loading = i < 3 ? "eager" : "lazy"; img.draggable = false;
      b.appendChild(img);
      b.addEventListener("click", () => {
        if (i === indice) openLb(f.src, f.alt); else ir(i);
      });
      track.appendChild(b);
      const d = document.createElement("button");
      d.type = "button"; d.setAttribute("role", "tab");
      d.setAttribute("aria-label", `Ir para a foto ${i + 1}`);
      d.addEventListener("click", () => { ir(i); pausar(); });
      dots.appendChild(d);
    });
    const slides = $$(".carousel__slide", track), bolinhas = $$("button", dots);
    let indice = 0;
    const ir = (i) => {
      indice = (i + slides.length) % slides.length;
      const s = slides[indice];
      track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: reduzMovimento ? "auto" : "smooth" });
    };
    const marcar = () => {
      const centro = track.scrollLeft + track.clientWidth / 2;
      let melhor = 0, dist = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - centro);
        if (d < dist) { dist = d; melhor = i; }
      });
      if (aoMudar && melhor !== indice) aoMudar(fotos[melhor]);
      indice = melhor;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === melhor));
      bolinhas.forEach((b, i) => b.setAttribute("aria-selected", i === melhor));
    };
    let raf;
    track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(marcar); }, { passive: true });
    $(".carousel__arrow--prev", root).addEventListener("click", () => { ir(indice - 1); pausar(); });
    $(".carousel__arrow--next", root).addEventListener("click", () => { ir(indice + 1); pausar(); });

    // Arrastar com o mouse (no celular o toque já rola nativamente)
    let arrastando = false, x0 = 0, s0 = 0, moveu = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      arrastando = true; moveu = false; x0 = e.clientX; s0 = track.scrollLeft;
      track.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", (e) => {
      if (!arrastando) return;
      if (Math.abs(e.clientX - x0) > 4) moveu = true;
      track.scrollLeft = s0 - (e.clientX - x0);
    });
    window.addEventListener("pointerup", () => {
      if (!arrastando) return;
      arrastando = false; track.classList.remove("is-dragging");
      marcar(); ir(indice); pausar();
    });
    track.addEventListener("click", (e) => { if (moveu) { e.stopPropagation(); e.preventDefault(); moveu = false; } }, true);

    // Avanço automático
    let timer, pausadoAte = 0;
    const pausar = () => { pausadoAte = Date.now() + 8000; };
    const auto = () => {
      clearInterval(timer);
      if (reduzMovimento) return;
      timer = setInterval(() => {
        if (Date.now() < pausadoAte || root.matches(":hover")) return;
        ir(indice + 1);
      }, 3800);
    };
    track.addEventListener("touchstart", pausar, { passive: true });
    window.addEventListener("resize", () => ir(indice));
    requestAnimationFrame(() => { ir(0); marcar(); if (aoMudar) aoMudar(fotos[0]); });
    auto();
  };
  carrossel($("#galeria"), C.galeria);

  // ---------- Faixa de fotos passando ----------
  const ribbon = $("#ribbon");
  const fotosFaixa = [...C.galeria, ...C.galeria];
  [0, 1].forEach((copia) => {
    const grupo = document.createElement("div");
    grupo.className = "ribbon__group";
    if (copia) grupo.setAttribute("aria-hidden", "true");
    fotosFaixa.forEach((f) => {
      const img = document.createElement("img");
      img.src = f.src; img.alt = copia ? "" : f.alt; img.loading = "lazy";
      grupo.appendChild(img);
    });
    ribbon.appendChild(grupo);
  });
  if (C.fotosLocal.length) {
    $("#local").hidden = false;
    $("#mapLink2").href = mapa;
    const legenda = $("#venueCaption");
    carrossel($("#venue"), C.fotosLocal, (f) => { legenda.textContent = f.alt; });
  }

  // ---------- Presentes escolhidos (compartilhado entre a lista e o formulário) ----------
  const escolhidos = new Set();
  const onEscolha = [];
  const alternar = (item) => {
    escolhidos.has(item) ? escolhidos.delete(item) : escolhidos.add(item);
    onEscolha.forEach((fn) => fn());
  };

  // ---------- Lista de presentes ----------
  const tabs = $("#giftTabs"), list = $("#giftList");
  let catAtual = 0;
  const showCat = (i) => {
    catAtual = i;
    $$("button", tabs).forEach((b, j) => b.setAttribute("aria-selected", i === j));
    list.innerHTML = "";
    C.presentes[i].itens.forEach((item, k) => {
      const li = document.createElement("li");
      li.className = "gift";
      li.style.animationDelay = k * 20 + "ms";
      const nome = document.createElement("span");
      nome.className = "gift__name";
      nome.textContent = item;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "gift__pick";
      b.dataset.item = item;
      b.addEventListener("click", () => alternar(item));
      li.append(nome, b);
      list.appendChild(li);
    });
    marcarLista();
  };
  const marcarLista = () => {
    $$(".gift__pick", list).forEach((b) => {
      const on = escolhidos.has(b.dataset.item);
      b.textContent = on ? "Escolhido ✓" : "Vou dar";
      b.setAttribute("aria-pressed", on);
      b.closest(".gift").classList.toggle("is-picked", on);
    });
  };
  onEscolha.push(marcarLista);
  C.presentes.forEach((cat, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab");
    b.textContent = cat.titulo;
    b.addEventListener("click", () => showCat(i));
    tabs.appendChild(b);
  });
  showCat(0);

  // ---------- Presentes no formulário ----------
  const pickCats = $("#giftPickCats"), pickItems = $("#giftPickItems"), pickSummary = $("#giftPickSummary");
  const showPickCat = (i) => {
    $$("button", pickCats).forEach((b, j) => b.setAttribute("aria-selected", i === j));
    pickItems.innerHTML = "";
    C.presentes[i].itens.forEach((item) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.dataset.item = item;
      b.textContent = item;
      b.addEventListener("click", () => alternar(item));
      pickItems.appendChild(b);
    });
    marcarForm();
  };
  const marcarForm = () => {
    $$(".chip", pickItems).forEach((b) => b.setAttribute("aria-pressed", escolhidos.has(b.dataset.item)));
    pickSummary.innerHTML = "";
    if (!escolhidos.size) return;
    const t = document.createElement("span");
    t.textContent = escolhidos.size === 1 ? "Você escolheu:" : `Você escolheu ${escolhidos.size} presentes:`;
    pickSummary.appendChild(t);
    escolhidos.forEach((item) => {
      const x = document.createElement("button");
      x.type = "button";
      x.className = "chip chip--sel";
      x.setAttribute("aria-label", "Remover " + item);
      x.textContent = item + " ×";
      x.addEventListener("click", () => alternar(item));
      pickSummary.appendChild(x);
    });
  };
  onEscolha.push(marcarForm);
  C.presentes.forEach((cat, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab");
    b.textContent = cat.titulo;
    b.addEventListener("click", () => showPickCat(i));
    pickCats.appendChild(b);
  });
  showPickCat(0);

  if (C.pix) {
    $("#pixBox").hidden = false;
    $("#pixKey").textContent = C.pix;
    $("#copyPix").addEventListener("click", async (e) => {
      try { await navigator.clipboard.writeText(C.pix); e.target.textContent = "Copiado"; }
      catch { e.target.textContent = "Copie a chave acima"; }
    });
  }

  // ---------- RSVP via WhatsApp ----------
  const radios = $("#contatosRadios");
  C.contatos.forEach((c, i) => {
    const l = document.createElement("label");
    l.innerHTML = `<input type="radio" name="contato" value="${i}" ${i === 0 ? "checked" : ""} /><span></span>`;
    l.lastChild.textContent = c.nome;
    radios.appendChild(l);
  });
  $("#contatosTexto").textContent =
    "Dúvidas? Fale com " + C.contatos.map((c) => `${c.nome}, ${c.exibicao}`).join(" ou ") + ".";

  const form = $("#rsvpForm"), rowQtd = $("#rowQtd"), rowAcomp = $("#rowAcomp");
  form.addEventListener("change", () => {
    const nao = form.vai.value === "nao";
    rowQtd.hidden = nao;
    atualizarAcomp();
  });

  // Campos com o nome de cada acompanhante (aparecem conforme a quantidade)
  const acompList = $("#acompList");
  const valoresAcomp = {}; // guarda o que foi digitado mesmo se o campo sumir
  let idCampo = 0;
  const campoNome = (chave, rotulo) => {
    const id = "f-" + chave;
    const div = document.createElement("div");
    div.className = "field";
    div.innerHTML = `<input type="text" id="${id}" autocomplete="off" placeholder=" " /><label for="${id}"></label>`;
    const input = $("input", div);
    input.dataset.chave = chave;
    input.value = valoresAcomp[chave] || "";
    input.addEventListener("input", () => { valoresAcomp[chave] = input.value; div.classList.remove("is-invalid"); });
    $("label", div).textContent = rotulo;
    return div;
  };
  const parentescos = {
    adulto: [
      ["Cônjuge", ["Esposa", "Marido"]],
      ["Pais", ["Mãe", "Pai", "Madrasta", "Padrasto"]],
      ["Filhos", ["Filha", "Filho", "Enteada", "Enteado"]],
      ["Irmãos", ["Irmã", "Irmão"]],
      ["Avós", ["Avó", "Avô"]],
      ["Netos", ["Neta", "Neto"]],
      ["Tios", ["Tia", "Tio"]],
      ["Primos", ["Prima", "Primo"]],
      ["Sobrinhos", ["Sobrinha", "Sobrinho"]],
      ["Família do cônjuge", ["Sogra", "Sogro", "Cunhada", "Cunhado", "Nora", "Genro"]],
      ["Padrinhos", ["Madrinha", "Padrinho"]],
    ],
    crianca: [
      ["Filhos", ["Filha", "Filho", "Enteada", "Enteado"]],
      ["Irmãos", ["Irmã", "Irmão"]],
      ["Sobrinhos", ["Sobrinha", "Sobrinho"]],
      ["Netos", ["Neta", "Neto"]],
      ["Primos", ["Prima", "Primo"]],
    ],
  };
  let parAberto = null;
  const fecharPar = (foco) => {
    if (!parAberto) return;
    const { campo, painel, botao } = parAberto;
    campo.classList.remove("is-open"); botao.setAttribute("aria-expanded", "false");
    painel.classList.remove("is-open");
    painel.addEventListener("transitionend", () => { if (!painel.classList.contains("is-open")) painel.hidden = true; }, { once: true });
    if (foco) botao.focus();
    parAberto = null;
  };
  document.addEventListener("click", (e) => {
    if (parAberto && !parAberto.campo.contains(e.target) && !parAberto.painel.contains(e.target)) fecharPar();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharPar(true); });

  // Retorna [campo, painel]: o painel ocupa a largura toda do bloco do acompanhante
  const campoParentesco = (chave, tipo) => {
    const k = chave + "-par";
    const campo = document.createElement("div");
    campo.className = "field field--select";
    const botao = document.createElement("button");
    botao.type = "button"; botao.className = "par__btn";
    botao.setAttribute("aria-haspopup", "listbox"); botao.setAttribute("aria-expanded", "false");
    const valor = document.createElement("span"); valor.className = "par__val";
    botao.appendChild(valor);
    const label = document.createElement("span"); label.className = "par__label"; label.textContent = "Parentesco";
    campo.append(botao, label);

    const painel = document.createElement("div");
    painel.className = "par__panel"; painel.hidden = true;
    painel.setAttribute("role", "listbox"); painel.setAttribute("aria-label", "Parentesco");
    parentescos[tipo].forEach(([grupo, opcoes]) => {
      const linha = document.createElement("div"); linha.className = "par__group";
      const g = document.createElement("span"); g.className = "par__glabel"; g.textContent = grupo;
      const chips = document.createElement("div"); chips.className = "par__chips";
      opcoes.forEach((op) => {
        const c = document.createElement("button");
        c.type = "button"; c.className = "par__opt"; c.textContent = op;
        c.setAttribute("role", "option");
        c.addEventListener("click", () => { escolher(op); fecharPar(true); });
        chips.appendChild(c);
      });
      linha.append(g, chips); painel.appendChild(linha);
    });

    const escolher = (op) => {
      campo.dataset.valor = op; valor.textContent = op;
      valoresAcomp[k] = op;
      campo.classList.toggle("has-value", !!op); campo.classList.remove("is-invalid");
      $$(".par__opt", painel).forEach((c) => c.setAttribute("aria-selected", c.textContent === op));
    };
    escolher(valoresAcomp[k] || "");
    if (!valoresAcomp[k]) campo.classList.remove("has-value");

    botao.addEventListener("click", () => {
      const jaAberto = parAberto && parAberto.campo === campo;
      fecharPar();
      if (jaAberto) return;
      painel.hidden = false;
      requestAnimationFrame(() => painel.classList.add("is-open"));
      campo.classList.add("is-open"); botao.setAttribute("aria-expanded", "true");
      parAberto = { campo, painel, botao };
      ($(".par__opt[aria-selected=true]", painel) || $(".par__opt", painel)).focus({ preventScroll: true });
    });
    // setas para navegar entre as opções
    painel.addEventListener("keydown", (e) => {
      const ops = $$(".par__opt", painel), i = ops.indexOf(document.activeElement);
      if (i < 0) return;
      const passo = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (passo) { e.preventDefault(); ops[(i + passo + ops.length) % ops.length].focus(); }
    });
    return [campo, painel];
  };
  const atualizarAcomp = () => {
    const nao = form.vai.value === "nao";
    const adultos = nao ? 0 : Math.max(0, (+form.adultos.value || 1) - 1);
    const criancas = nao ? 0 : Math.max(0, +form.criancas.value || 0);
    rowAcomp.hidden = adultos + criancas === 0;
    const atuais = $$(".acomp__item", acompList).map((el) => el.dataset.chave);
    const desejados = [
      ...Array.from({ length: adultos }, (_, i) => "adulto-" + (i + 1)),
      ...Array.from({ length: criancas }, (_, i) => "crianca-" + (i + 1)),
    ];
    if (atuais.join() === desejados.join()) return;
    $$(".acomp__item", acompList).forEach((el) => { if (!desejados.includes(el.dataset.chave)) el.remove(); });
    desejados.forEach((chave, pos) => {
      let item = $(`.acomp__item[data-chave="${chave}"]`, acompList);
      if (!item) {
        const [tipo, n] = chave.split("-");
        item = document.createElement("div");
        item.className = "acomp__item acomp__item--" + tipo;
        item.dataset.chave = chave;
        const tag = document.createElement("span");
        tag.className = "acomp__tag";
        tag.textContent = tipo === "adulto" ? `Adulto ${+n + 1}` : `Criança ${n}`;
        item.appendChild(tag);
        item.appendChild(campoNome(chave, tipo === "adulto" ? "Nome completo" : "Nome da criança"));
        const [campoPar, painelPar] = campoParentesco(chave, tipo);
        item.appendChild(campoPar);
        if (tipo === "crianca") {
          const idade = document.createElement("div");
          idade.className = "field field--idade";
          const idI = "f-idade-" + n + "-" + idCampo++;
          idade.innerHTML = `<input type="number" id="${idI}" min="0" max="17" inputmode="numeric" placeholder=" " /><label for="${idI}">Idade</label>`;
          const ii = $("input", idade);
          ii.dataset.chave = chave + "-idade";
          ii.value = valoresAcomp[ii.dataset.chave] || "";
          ii.addEventListener("input", () => { valoresAcomp[ii.dataset.chave] = ii.value; });
          item.appendChild(idade);
        }
        item.appendChild(painelPar);
      }
      acompList.insertBefore(item, acompList.children[pos] || null);
    });
  };
  atualizarAcomp();

  // Steppers (adultos / crianças)
  $$(".stepper").forEach((st) => {
    const input = $("input", st), [menos, mais] = $$("button", st);
    const clamp = () => {
      const min = +input.min, max = +input.max;
      input.value = Math.min(max, Math.max(min, parseInt(input.value, 10) || min));
      menos.disabled = +input.value <= min; mais.disabled = +input.value >= max;
    };
    $$("button", st).forEach((b) => b.addEventListener("click", () => {
      input.value = (parseInt(input.value, 10) || 0) + +b.dataset.step; clamp(); atualizarAcomp();
    }));
    input.addEventListener("change", () => { clamp(); atualizarAcomp(); });
    clamp();
  });
  form.nome.addEventListener("input", () => form.nome.parentElement.classList.remove("is-invalid"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#formError");
    const nome = form.nome.value.trim();
    if (!nome) {
      err.textContent = "Coloque seu nome para a gente saber quem é.";
      form.nome.parentElement.classList.add("is-invalid"); form.nome.focus(); return;
    }
    const semNome = $$(".acomp__item .field:not(.field--idade):not(.field--select)", acompList).filter((f) => !$("input", f).value.trim());
    const semPar = $$(".acomp__item .field--select", acompList).filter((f) => !f.dataset.valor);
    if (form.vai.value === "sim" && (semNome.length || semPar.length)) {
      err.textContent = "Preencha o nome e o parentesco de todos os acompanhantes.";
      [...semNome, ...semPar].forEach((f) => f.classList.add("is-invalid"));
      $("input, button", [...semNome, ...semPar][0]).focus(); return;
    }
    err.textContent = "";
    const contato = C.contatos[+form.contato.value];
    const vai = form.vai.value === "sim";
    const linhas = [`Olá, ${contato.nome}! 💍`, ""];
    if (vai) {
      linhas.push(`Quero *confirmar minha presença* no casamento de ${C.noiva} & ${C.noivo}!`, "");
      linhas.push(`👤 Nome: ${nome}`);
      const nomesDe = (tipo) => $$(`.acomp__item--${tipo}`, acompList).map((item) => {
        const nomeA = $(".field:not(.field--idade) input", item).value.trim();
        const idade = $(".field--idade input", item)?.value.trim();
        const par = ($(".field--select", item).dataset.valor || "").toLowerCase();
        const extra = [par, idade ? `${idade} ${+idade === 1 ? "ano" : "anos"}` : ""].filter(Boolean).join(", ");
        return `${nomeA} (${extra})`;
      });
      const adultosNomes = nomesDe("adulto"), criancasNomes = nomesDe("crianca");
      linhas.push(`👥 Adultos: ${form.adultos.value || 1}`);
      linhas.push(`   • ${nome} (eu)`);
      adultosNomes.forEach((n) => linhas.push(`   • ${n}`));
      if (criancasNomes.length) {
        linhas.push(`🧒 Crianças: ${criancasNomes.length}`);
        criancasNomes.forEach((n) => linhas.push(`   • ${n}`));
      }
    } else {
      linhas.push(`Aqui é ${nome}. Infelizmente *não poderei comparecer* ao casamento de ${C.noiva} & ${C.noivo}. 😢`);
    }
    const presentes = [...escolhidos];
    if (form.presenteOutro.value.trim()) presentes.push(form.presenteOutro.value.trim());
    if (presentes.length) linhas.push("", `🎁 Presente: ${presentes.join(", ")}`);
    if (form.recado.value.trim()) linhas.push("", `💌 Recado: ${form.recado.value.trim()}`);
    const url = `https://wa.me/${contato.telefone}?text=${encodeURIComponent(linhas.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });

  // ---------- Animações ----------
  const semMov = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Nomes do topo aparecendo letra por letra
  let n = 0;
  $$(".hero__names > span, .hero__names > .amp").forEach((el) => {
    const letras = [...el.textContent];
    el.textContent = "";
    el.setAttribute("aria-label", letras.join(""));
    letras.forEach((ch) => {
      const l = document.createElement("span");
      l.className = "letra"; l.setAttribute("aria-hidden", "true");
      l.textContent = ch;
      l.style.setProperty("--d", 250 + n++ * 55 + "ms");
      el.appendChild(l);
    });
  });

  // Pétalas caindo no topo
  if (!semMov) {
    const petalas = document.createElement("div");
    petalas.className = "petalas"; petalas.setAttribute("aria-hidden", "true");
    const qtd = innerWidth < 600 ? 9 : 16;
    for (let i = 0; i < qtd; i++) {
      const p = document.createElement("span");
      const r = (a, b) => a + Math.random() * (b - a);
      p.style.cssText = `--x:${r(0, 100)}%;--s:${r(8, 16)}px;--t:${r(11, 20)}s;--atraso:-${r(0, 20)}s;--gira:${r(-360, 360)}deg;--vai:${r(-90, 90)}px;--o:${r(0.45, 0.85)}`;
      petalas.appendChild(p);
    }
    $(".hero").appendChild(petalas);
  }

  // Paralaxe leve nas flores do topo
  const floresTopo = $$(".hero .flor");
  if (!semMov) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight);
        floresTopo.forEach((f, i) => { f.style.translate = `0 ${y * (i ? -0.12 : 0.18)}px`; });
        ticking = false;
      });
    }, { passive: true });
  }

  // Entradas ao rolar
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".welcome__text, .section > .eyebrow, .section > .title, .section__inner > .eyebrow, .section__inner > .title, .rsvp-intro > *, .lead, .carousel, .rsvp, .tabs, .gifts__note, .tip, .subtitle, .ribbon__title, .local__map")
    .forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  $$(".rule").forEach((el) => { el.classList.add("reveal-rule"); io.observe(el); });
  // (a foto recortada não é detectada pelo observer, então observamos o bloco em volta)
  $$(".welcome__photo").forEach((el) => { el.classList.add("reveal-img"); io.observe(el.parentElement); });
  // Grupos que entram um item de cada vez
  $$(".details, .timeline, .infos, .countdown__grid").forEach((grupo) => {
    grupo.classList.add("stagger");
    [...grupo.children].forEach((c, i) => c.style.setProperty("--i", i));
    io.observe(grupo);
  });
})();
