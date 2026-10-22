# Henrique Bueno · Sistema visual sóbrio (22/10/2026)

Substitui o sistema "Corredor de Cereais" (arquivado em `DESIGN-corredor-de-cereais.md`; ainda vale para os protótipos em `prototipos/`).
Referências: Pentagram, Wolff Olins, Collins, Koto — tipografia como imagem, poucas cores, trabalho em primeiro plano, linhas finas e muito respiro.

## Cores
| Token | Valor | Uso |
|---|---|---|
| paper | `#F3F1EC` | fundo |
| paper-2 | `#EAE7E0` | fundo de imagens |
| ink | `#141414` | texto, botões |
| ink-2 | `#4A4844` | texto secundário |
| mute | `#7A7770` | rótulos, legendas |
| rule | `#D6D2C9` | linhas finas |
| night / night-text / night-mute | `#121212` / `#ECEAE4` / `#9C998F` | seções escuras (case, contato) |

Sem cor de destaque. O único ponto de cor é o marcador verde de "No ar".

## Tipografia
- Títulos: Instrument Serif 400 (itálico para a segunda metade da frase), tracking negativo, entrelinha 0,95.
- Texto: Inter Tight 400/500/600, 17px, entrelinha 1,55.
- Rótulos: Inter Tight 500, caixa alta, 0,78rem, tracking 0,08em.

## Layout
- Grade de 12 colunas, largura máxima 1360px, margem lateral `clamp(16px, 4vw, 48px)`.
- Cada seção abre com uma linha fina, um rótulo numerado (`01 · Case`) nas colunas 1–3 e o título nas colunas 4–12.
- Botões em pílula preta; secundário com contorno. Toda ação leva ao WhatsApp.
- Movimento discreto: revelação suave dos cards e zoom de 3% nas imagens; desligado com `prefers-reduced-motion`.

## Marca
Monograma "HB" em Instrument Serif. Os arquivos ficam em `marca/`:
- `logo-circulo.png`: foto de perfil.
- `logo-quadrado.png` e `logo-quadrado-claro.png`: versões quadradas.
- `capa-whatsapp.png`: capa (1920×1080).
- `og.jpg`: compartilhamento.
- `icon-512.png`: base do favicon.
