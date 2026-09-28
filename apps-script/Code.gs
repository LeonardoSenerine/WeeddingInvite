/**
 * Backend do convite — Google Apps Script ligado a uma Planilha Google.
 *
 * Abas criadas automaticamente:
 *   Confirmações — uma linha por formulário enviado
 *   Convidados   — uma linha por pessoa (é esta que vai para o buffet)
 *   Presentes    — presentes reservados e por quem
 *
 * Instalação: veja apps-script/COMO-INSTALAR.md
 */

// Senha da página de administração (lista.html). TROQUE antes de publicar.
const SENHA_ADMIN = "troque-esta-senha";

// Presentes que várias pessoas podem escolher (não ficam indisponíveis)
const PRESENTES_ILIMITADOS = ["Vale-presente"];

const ABA_CONFIRMACOES = "Confirmações";
const ABA_CONVIDADOS = "Convidados";
const ABA_PRESENTES = "Presentes";

const CABECALHOS = {
  [ABA_CONFIRMACOES]: ["ID", "Data", "Nome", "Vai?", "Adultos", "Crianças", "Total de pessoas",
    "Acompanhantes", "Presentes", "Outro presente", "Recado", "Contato"],
  [ABA_CONVIDADOS]: ["ID", "Nome", "Tipo", "Idade", "Parentesco", "Convidado por", "Data"],
  [ABA_PRESENTES]: ["ID", "Presente", "Reservado por", "Data"],
};

// ---------------------------------------------------------------- HTTP

function doGet(e) {
  const acao = (e.parameter.acao || "presentes");
  if (acao === "presentes") return json({ ok: true, reservados: presentesReservados() });
  if (acao === "lista") {
    if (e.parameter.senha !== SENHA_ADMIN) return json({ ok: false, erro: "senha" });
    return json({
      ok: true,
      confirmacoes: linhas(ABA_CONFIRMACOES),
      convidados: linhas(ABA_CONVIDADOS),
      presentes: linhas(ABA_PRESENTES),
    });
  }
  return json({ ok: false, erro: "acao" });
}

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json({ ok: false, erro: "json" }); }
  if (!d || !d.id || !String(d.nome || "").trim()) return json({ ok: false, erro: "dados" });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const id = String(d.id).slice(0, 64);
    const nome = limpar(d.nome, 120);
    const vai = !!d.vai;
    // quem não vai também pode mandar presente
    const pedidos = uniq((d.presentes || []).map((p) => limpar(p, 120)).filter(Boolean));

    // Presentes já reservados por OUTRAS pessoas
    const ocupados = presentesReservados(id);
    const conflito = pedidos.filter((p) => ocupados.indexOf(p) >= 0);
    if (conflito.length) return json({ ok: false, erro: "indisponivel", itens: conflito, reservados: ocupados });

    // Reenvio do mesmo convidado (mesmo aparelho): substitui a resposta anterior
    removerPorId(id);

    const agora = new Date();
    const acomp = vai ? (d.acompanhantes || []).slice(0, 20).map((a) => ({
      nome: limpar(a.nome, 120),
      tipo: a.tipo === "crianca" ? "Criança" : "Adulto",
      parentesco: limpar(a.parentesco, 40),
      idade: a.idade === "" || a.idade == null ? "" : Number(a.idade),
    })) : [];
    const adultos = vai ? 1 + acomp.filter((a) => a.tipo === "Adulto").length : 0;
    const criancas = vai ? acomp.filter((a) => a.tipo === "Criança").length : 0;

    aba(ABA_CONFIRMACOES).appendRow([
      id, agora, nome, vai ? "Sim" : "Não", adultos, criancas, adultos + criancas,
      acomp.map((a) => `${a.nome} (${[a.parentesco, a.idade !== "" ? a.idade + " anos" : ""].filter(String).join(", ")})`).join("; "),
      pedidos.join("; "), limpar(d.presenteOutro, 200), limpar(d.recado, 1000), limpar(d.contato, 40),
    ]);

    if (vai) {
      const conv = aba(ABA_CONVIDADOS);
      conv.appendRow([id, nome, "Adulto", "", "Titular", nome, agora]);
      acomp.forEach((a) => conv.appendRow([id, a.nome, a.tipo, a.idade, a.parentesco, nome, agora]));
    }
    const pres = aba(ABA_PRESENTES);
    pedidos.forEach((p) => pres.appendRow([id, p, nome, agora]));

    return json({ ok: true, reservados: presentesReservados() });
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------- Planilha

function aba(nome) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(nome);
  if (!sh) {
    sh = ss.insertSheet(nome);
    sh.appendRow(CABECALHOS[nome]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, CABECALHOS[nome].length).setFontWeight("bold").setBackground("#f3e3cc");
  }
  return sh;
}

function linhas(nome) {
  const valores = aba(nome).getDataRange().getValues();
  const cab = valores.shift();
  return valores.map((l) => {
    const o = {};
    cab.forEach((c, i) => { o[c] = l[i] instanceof Date ? l[i].toISOString() : l[i]; });
    return o;
  });
}

// Lista de presentes reservados (ignorando os ilimitados e, se passado, os do próprio convidado)
function presentesReservados(excetoId) {
  return uniq(linhas(ABA_PRESENTES)
    .filter((l) => l.ID !== excetoId && PRESENTES_ILIMITADOS.indexOf(l.Presente) < 0)
    .map((l) => l.Presente));
}

function removerPorId(id) {
  [ABA_CONFIRMACOES, ABA_CONVIDADOS, ABA_PRESENTES].forEach((nome) => {
    const sh = aba(nome);
    const ids = sh.getDataRange().getValues().map((l) => l[0]);
    for (let i = ids.length - 1; i >= 1; i--) if (ids[i] === id) sh.deleteRow(i + 1);
  });
}

// ---------------------------------------------------------------- utilidades

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function limpar(v, max) {
  // evita que um texto vire fórmula na planilha
  let s = String(v == null ? "" : v).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
function uniq(a) { return a.filter((v, i) => a.indexOf(v) === i); }

// Rode esta função uma vez pelo editor para criar as abas e autorizar o script
function configurar() {
  [ABA_CONFIRMACOES, ABA_CONVIDADOS, ABA_PRESENTES].forEach(aba);
}
