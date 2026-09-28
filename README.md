# Convite de Casamento

Site estático (HTML/CSS/JS, sem build) com contagem regressiva, programação do dia, informações,
confirmação de presença e lista de presentes.

## Lista de confirmados e presentes reservados
As confirmações podem ir para uma **Planilha Google** (grátis), e os presentes escolhidos
ficam indisponíveis para os outros convidados. A página **`lista.html`** (com senha) mostra os
totais e baixa a lista para o buffet em formato Excel.
Passo a passo: **[apps-script/COMO-INSTALAR.md](apps-script/COMO-INSTALAR.md)**.
Enquanto `planilhaUrl` estiver vazio no `config.js`, a confirmação continua só pelo WhatsApp.

## Como editar
Todos os dados ficam em **`config.js`**: nomes, data/hora, local, traje, programação, informações,
contatos do RSVP, chave Pix, lista de presentes e fotos. Itens marcados com `TODO` ainda precisam ser confirmados.

- Fotos do casal: `assets/img/` (listadas em `galeria` e `fotosTopo`)
- Fotos do local: coloque em `assets/img/local/` e liste em `fotosLocal` no `config.js`

## Rodar localmente
```bash
python3 .claude/serve.py
```
Abra http://localhost:8000

## Publicar (GitHub Pages)
Settings → Pages → Deploy from a branch → `main` e a pasta `/ (root)`.
