# Advocacia Aline R. Silva

Site da Dra. Aline R. Silva ([@alinersilva.adv](https://www.instagram.com/alinersilva.adv/)): advocacia e consultoria jurídica há 23 anos, em Santa Bárbara d'Oeste (SP), com atendimento on-line em todo o Brasil.

Prévia: https://azeugral.github.io/aline-silva/ (com `noindex` e `robots.txt` bloqueando até ter domínio).

## Identidade

Duas versões no mesmo código; as cores e as fontes são variáveis no topo do `site.css`.

### v2 · Tinta & Cobre (padrão, 12/10/2026)

- **Cores:** azul-tinta `#0d1422` (fundo escuro), azul-noite `#1c2a45` (seção de destaque), pergaminho `#ece5d8`, marfim `#f3eee4` e cobre `#c48558` (`#94532c` sobre o claro).
- **Fontes:** Imbue nos títulos, uma Didone condensada com eixo óptico, formal e editorial. Os títulos usam `--escala` (1,18) e `--escala-xl` (1,32), porque a fonte é estreita. Instrument Sans no texto e JetBrains Mono nas legendas.

### v1 · Grafite, Oliva & Latão (`?tema=v1`)

Tirada do retrato dela: grafite `#141216`, oliva `#3b4428` (o blazer), latão `#c0a06a` (os brincos) e papel `#ebe6db`. Bodoni Moda + IBM Plex Sans/Mono. As fontes da v1 só carregam com `?tema=v1`.

Para comparar: https://azeugral.github.io/aline-silva/ e https://azeugral.github.io/aline-silva/?tema=v1

### Comum às duas

- **Detalhes:** monograma AS em moldura dupla; cada área termina com a base legal em mono (`§ STJ, Súmula 479`), como nota de rodapé de petição; losangos de latão nas listas e nas etapas.
- **Botões:** retos, rótulo + célula da seta; no hover o fundo desliza da esquerda (latão no claro, marfim no contorno).
- **Movimento:** curva `cubic-bezier(.16,.84,.32,1)` do LRGZ. Abertura com o título subindo por máscara linha a linha, a foto revelada de baixo para cima e o contador dos 23 anos; revelação ao rolar, índice fixo das áreas com marcador que acompanha a seção, linha das etapas que se desenha e dúvidas com altura animada. Tudo respeita `prefers-reduced-motion`.

## Estrutura

| Arquivo | O que é |
|---|---|
| `index.html` | Abertura, áreas de atuação (índice fixo), quem o escritório atende, o escritório, como funciona, dúvidas, contato com mapa |
| `assets/js/site.js` | `CONFIG.whatsapp` e o comportamento. Todo link `.js-zap` vira `wa.me` com a mensagem do `data-msg` |
| `tools/og.html`, `tools/icone.html` | Fontes da prévia de link (`og-aline.jpg`) e dos ícones. Gerar com Edge headless (`--screenshot`) |

## Publicidade (OAB)

Segue o Código de Ética e o Provimento 205/2021: sem promessa de resultado, sem valores de causa, sem preço e sem "consulta gratuita". Linguagem informativa, com a base legal citada. As avaliações do Google (5,0) ficaram de fora até a cliente decidir.

## CONFIRMAR com a cliente

1. **Número da OAB/SP**. Obrigatório na publicidade; aparece como "nº a confirmar" na abertura, no escritório e no rodapé.
2. **Horário**: o Google só diz que abre às 9h. Faltam os dias e o fechamento.
3. **"Exclusão da inscrição do CRC no sistema do Banco Central"**: entendi como o **SCR** (Sistema de Informações de Crédito). Confirmar o termo.
4. **Recuperação tributária para médicos**: qual tese ela usa (ex.: equiparação hospitalar)? O texto está genérico de propósito.
5. **O (19) 3026-6446 é WhatsApp Business?** A bio diz que sim; todos os botões usam `wa.me/551930266446`.
6. **Outra foto**: o escritório repete o retrato da abertura. Ideal: foto no escritório ou de meio corpo.
7. **Logo**: se ela tiver identidade própria, substitui o monograma AS.
8. **Texto do escritório**: "começou pelo direito de família e foi somando as áreas" é uma leitura da descrição do Google; validar a história.
9. **Avaliações do Google**: mostrar ou não (checar com a OAB/SP).
10. **Domínio**: definir e trocar as URLs do `og:image` e tirar o `noindex`/`robots.txt`.
