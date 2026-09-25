# Convite de Casamento

Site estático (HTML/CSS/JS, sem build) com contagem regressiva, programação do dia, informações,
confirmação de presença via WhatsApp (com escolha de presente) e lista de presentes.

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
