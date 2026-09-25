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
    monograma: `${C.noiva[0]}&${C.noivo[0]}`,
    diaSemana: fmt({ weekday: "long" }).replace("-feira", ""),
    dia: fmt({ day: "2-digit" }),
    mes: fmt({ month: "long" }),
    horaCurta: "às " + fmt({ hour: "2-digit", minute: "2-digit" }).replace(":", "h"),
    dataExtenso: (() => { const t = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }); return t[0].toUpperCase() + t.slice(1); })(),
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
  document.title = `${C.noiva} & ${C.noivo} · Convite de Casamento`;

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

  // ---------- Envelope ----------
  const envelope = $("#envelope");
  document.body.classList.add("locked");
  $("#abrir").addEventListener("click", () => {
    envelope.classList.add("is-open");
    document.body.classList.remove("locked");
  });

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
  const tick = () => {
    let diff = Math.max(0, data - new Date());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    cd.d.textContent = d; cd.h.textContent = pad(h); cd.m.textContent = pad(m); cd.s.textContent = pad(s);
  };
  tick(); setInterval(tick, 1000);

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
  fillGallery($("#galeria"), C.galeria);
  if (C.fotosLocal.length) {
    $("#venue").hidden = false;
    fillGallery($("#venueGrid"), C.fotosLocal);
  }

  // ---------- Lista de presentes ----------
  const tabs = $("#giftTabs"), list = $("#giftList");
  const showCat = (i) => {
    $$("button", tabs).forEach((b, j) => b.setAttribute("aria-selected", i === j));
    list.innerHTML = "";
    C.presentes[i].itens.forEach((item, k) => {
      const div = document.createElement("div");
      div.className = "gift";
      div.style.animationDelay = k * 25 + "ms";
      div.textContent = item;
      list.appendChild(div);
    });
  };
  C.presentes.forEach((cat, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("role", "tab");
    b.textContent = `${cat.icone} ${cat.titulo}`;
    b.addEventListener("click", () => showCat(i));
    tabs.appendChild(b);
  });
  showCat(0);

  if (C.pix) {
    $("#pixBox").hidden = false;
    $("#pixKey").textContent = C.pix;
    $("#copyPix").addEventListener("click", async (e) => {
      try { await navigator.clipboard.writeText(C.pix); e.target.textContent = "Copiado! ✓"; }
      catch { e.target.textContent = "Copie a chave acima"; }
    });
  }

  // ---------- RSVP via WhatsApp ----------
  const radios = $("#contatosRadios");
  C.contatos.forEach((c, i) => {
    const l = document.createElement("label");
    l.innerHTML = `<input type="radio" name="contato" value="${i}" ${i === 0 ? "checked" : ""} /> `;
    l.append(`${c.nome}`);
    radios.appendChild(l);
  });
  $("#contatosTexto").textContent =
    "Dúvidas? Fale com " + C.contatos.map((c) => `${c.nome} ${c.exibicao}`).join(" ou ") + ".";

  const form = $("#rsvpForm"), rowQtd = $("#rowQtd");
  form.addEventListener("change", () => {
    rowQtd.hidden = form.vai.value === "nao";
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#formError");
    const nome = form.nome.value.trim();
    if (!nome) { err.textContent = "Por favor, informe seu nome."; form.nome.focus(); return; }
    err.textContent = "";
    const contato = C.contatos[+form.contato.value];
    const vai = form.vai.value === "sim";
    const linhas = [`Olá, ${contato.nome}! 💍`, ""];
    if (vai) {
      linhas.push(`Quero *confirmar minha presença* no casamento de ${C.noiva} & ${C.noivo}!`, "");
      linhas.push(`👤 Nome: ${nome}`);
      linhas.push(`👥 Adultos: ${form.adultos.value || 1}`);
      if (+form.criancas.value > 0) linhas.push(`🧒 Crianças: ${form.criancas.value}`);
      if (form.acompanhantes.value.trim()) linhas.push(`📝 Acompanhantes: ${form.acompanhantes.value.trim()}`);
    } else {
      linhas.push(`Aqui é ${nome}. Infelizmente *não poderei comparecer* ao casamento de ${C.noiva} & ${C.noivo}. 😢`);
    }
    if (form.recado.value.trim()) linhas.push("", `💌 Recado: ${form.recado.value.trim()}`);
    const url = `https://wa.me/${contato.telefone}?text=${encodeURIComponent(linhas.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });

  // ---------- Animações ao rolar ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$(".section > *").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
})();
