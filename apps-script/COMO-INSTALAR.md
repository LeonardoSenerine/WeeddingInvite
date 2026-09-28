# Lista de confirmados + presentes reservados (Google Planilhas)

Com isto instalado:
- cada confirmação de presença vai direto para uma **Planilha Google**;
- o presente escolhido por um convidado **some da lista** (fica riscado) para os outros;
- a página **`lista.html`** mostra os totais e baixa a **lista para o buffet** (abre no Excel).

É gratuito e leva uns 10 minutos. Faça com a conta Google dos noivos.

## 1. Criar a planilha e colar o script
1. Acesse https://sheets.new e dê um nome, por exemplo **Casamento Isabella & Murilo**.
2. Menu **Extensões → Apps Script**.
3. Apague o que estiver no editor e cole todo o conteúdo de **`apps-script/Code.gs`**.
4. Na linha `const SENHA_ADMIN = "troque-esta-senha";` coloque uma senha só de vocês.
5. Clique em **Salvar** (ícone de disquete).

## 2. Autorizar e criar as abas
1. No topo do editor, ao lado de **Executar**, troque a função para **`configurar`** e clique em **Executar**.
   (Não execute `doGet` nem `doPost` pelo editor: elas só funcionam quando o site chama.)
2. O Google vai pedir autorização: **Revisar permissões → sua conta → Avançado →
   Acessar (não seguro) → Permitir**. (O aviso aparece porque o script é de vocês, não de uma empresa verificada.)
3. Volte para a planilha: devem aparecer as abas **Confirmações**, **Convidados** e **Presentes**.

## 3. Publicar como aplicativo da web
1. No Apps Script: **Implantar → Nova implantação**.
2. Em "Selecionar tipo" (engrenagem), escolha **App da Web**.
3. Preencha:
   - **Executar como:** Eu
   - **Quem pode acessar:** Qualquer pessoa
4. **Implantar** e copie o **URL do app da Web** (termina em `/exec`).

## 4. Ligar no site
No `config.js`, cole o URL em `planilhaUrl`:
```js
planilhaUrl: "https://script.google.com/macros/s/XXXXXXXX/exec",
```
Publique o site de novo (commit no GitHub). Pronto.

## Usando
- **Ver a lista:** abra `https://leonardosenerine.github.io/WeeddingInvite/lista.html` e digite a senha.
- **Buffet:** botão **Baixar lista para o buffet**: um arquivo `.csv` com uma linha por pessoa
  (nome, adulto/criança, idade, parentesco, quem convidou). Abre direto no Excel.
- Também dá para baixar pela própria planilha: **Arquivo → Fazer download → Microsoft Excel**.
- **Liberar um presente:** apague a linha dele na aba **Presentes**.
- **Remover uma confirmação:** apague as linhas com o mesmo **ID** nas três abas.
- Se o convidado enviar de novo pelo mesmo celular, a resposta antiga é **substituída** (não duplica).

## Alterou o `Code.gs` depois?
**Implantar → Gerenciar implantações → lápis (editar) → Versão: Nova versão → Implantar.**
O URL continua o mesmo.
