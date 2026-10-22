---
name: Henrique Bueno · Corredor de Cereais
description: Landing pages for small local businesses, sold as the cereal box pulled proud of a supermarket shelf.
colors:
  cereal-red: "#D11F1A"
  cereal-red-deep: "#A8160F"
  sunrise-yellow: "#FFD400"
  box-navy: "#0D2B6A"
  navy-ink: "#0A1F4D"
  whatsapp-green: "#1B7A34"
  tangerine: "#FF8A00"
  sky-box: "#89C9FF"
  grape-berry: "#6B2FA0"
  milk: "#FFFFFF"
  aisle: "#EEF2F7"
  aisle-back: "#DDE3EC"
  shelf: "#C3CAD4"
  shelf-dark: "#98A2B1"
  ink: "#14182B"
  ink-soft: "#3B4160"
  navy-mist: "#C9D4EE"
  navy-frost: "#DCE4F7"
typography:
  display:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 12vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 6vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline-plain:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.05
  panel-head:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2.1rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  fact-row:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 500
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 80"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 700
    lineHeight: 1.3
    fontVariation: "'wdth' 80"
  fine:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.4
    fontVariation: "'wdth' 75"
  button:
    fontFamily: "Lilita One, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.01em"
rounded:
  tag: "3px"
  sm: "6px"
  box: "8px"
  window: "10px"
  box-hero: "12px"
  phone: "22px"
  pill: "999px"
spacing:
  gutter: "16px"
  gutter-wide: "28px"
  shelf-gap: "16px"
  block: "30px"
  section-y: "80px"
components:
  button-primary:
    backgroundColor: "{colors.cereal-red}"
    textColor: "{colors.milk}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.5em"
    height: "54px"
  button-yellow:
    backgroundColor: "{colors.sunrise-yellow}"
    textColor: "{colors.box-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.5em"
    height: "54px"
  button-small:
    backgroundColor: "{colors.cereal-red}"
    textColor: "{colors.milk}"
    rounded: "{rounded.pill}"
    padding: "0.45em 1em"
    height: "42px"
  chip-live:
    backgroundColor: "{colors.sunrise-yellow}"
    textColor: "{colors.box-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
    height: "40px"
  chip-flip:
    backgroundColor: "{colors.milk}"
    textColor: "{colors.box-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
    height: "40px"
  shelf-tag:
    backgroundColor: "{colors.sunrise-yellow}"
    textColor: "{colors.box-navy}"
    rounded: "{rounded.tag}"
    padding: "1px 8px"
  box-face-front:
    backgroundColor: "{colors.cereal-red}"
    textColor: "{colors.milk}"
    rounded: "{rounded.box}"
    padding: "14px 12px"
    width: "262px"
    height: "440px"
  box-face-back:
    backgroundColor: "{colors.milk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.box}"
    padding: "14px 12px"
    width: "262px"
    height: "440px"
  nutrition-panel:
    backgroundColor: "{colors.milk}"
    textColor: "{colors.ink}"
    typography: "{typography.fact-row}"
    padding: "14px 16px 16px"
  shelf-nav-button:
    backgroundColor: "{colors.sunrise-yellow}"
    textColor: "{colors.box-navy}"
    rounded: "{rounded.pill}"
    size: "46px"
  nav-strip:
    backgroundColor: "{colors.box-navy}"
    textColor: "{colors.navy-frost}"
    height: "60px"
  fab-whatsapp:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.milk}"
    rounded: "{rounded.pill}"
    size: "58px"
  tier-label:
    backgroundColor: "{colors.milk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
---

# Design System: Henrique Bueno · Corredor de Cereais

## Overview

**Creative North Star: "Corredor de Cereais"**

The page is a supermarket cereal aisle under cool fluorescent light, and Henrique's offer is the box pulled proud of the shelf. Every surface is a piece of printed packaging or store fixture: coated-board box fronts in flat saturated ink, a milk-white nutrition panel on the side of the box, grey steel shelf ledges, starburst price violators, a back-of-box activity maze. The metaphor does the selling: the box at eye level sells more, and Google ranks the same way.

The density is retail, not editorial. Objects are outlined in heavy navy keylines, sit flush on shelf ledges with open bottoms, and carry their information in two voices: a fat rounded cereal logotype for anything that shouts, and a condensed nutrition-table grotesque for anything that has to be checked (prices, deadlines, credentials). Depth comes from print extrusion (straight-down navy offsets) and from the shelf itself, not from floating cards.

The confirmed rejections are the dark-SaaS hero with a glowing green CTA, the generic grid of icon + heading + text cards, and a warm cream ground (the build moved to a cool aisle grey after the cream read as an AI default).

Scope: this system governs `index.html`. The twelve pages under `prototipos/` are separate fictitious demo surfaces, each with its own one-off world; they neither inherit nor contribute tokens. Their screenshots appear here only as product shots inside box windows, and their per-segment box colours are open-slot fills, not system colours.

**Key Characteristics:**
- Flat coated-board fills (red, yellow, navy, milk) on a cool aisle ground; no gradients except lighting on a turned box face.
- Navy keylines (2–4px) around every object that sits on a shelf.
- Lilita One logotype with navy stroke and straight-down navy extrusion.
- Archivo at narrow widths (62–85%) with heavy rule bars for every factual table.
- Boxes are rounded at the top only and rest on grey shelf ledges.
- Starburst violators carry price and status (DE/POR, NOVO!, DEMO, NO AR).
- One action: every primary pill leads to WhatsApp.

## Colors

A cereal-box print palette: two loud inks (red, yellow), a navy that is both outline and night ground, and cool fluorescent greys for the store itself.

### Primary
- **Cereal Red** (#D11F1A): the hero box front, the offer section ground, the default action pill, maze route, step dots, the "24h" chip and the strike-through colour on old prices. It is the brand box.
- **Cereal Red Deep** (#A8160F): the box-top flap band across the hero front; a print shade of the red, never used as a fill on its own.

### Secondary
- **Sunrise Yellow** (#FFD400): starburst violators, the "Como funciona" back-panel ground, the action pill when it sits on red, "Ver página" chips, shelf price tags, the eye-level highlight ring and the `::selection` fill. Accent words inside a cereal headline turn yellow.

### Tertiary
- **Box Navy** (#0D2B6A): the ink of the world. Every keyline, every extrusion, display stroke, focus ring on light grounds, and the ground of the header strip, the portfolio aisle and the closing section.
- **Navy Ink** (#0A1F4D): navy one step deeper, used for keylines on navy grounds (box faces in the portfolio rack, shelf-nav buttons) and the footer ground.

### Neighbour Box Fills
Fills for the other boxes on the shelf (peeks, box tops, portfolio faces). They decorate neighbours, never the offer.
- **WhatsApp Green** (#1B7A34): the floating WhatsApp button, the final route step, the "NO AR" starburst. Green means "live / talk now"; it never glows.
- **Tangerine** (#FF8A00), **Sky Box** (#89C9FF), **Grape Berry** (#6B2FA0): neighbour-box fills. Grape Berry also marks the Instagram avatar ring and the "off the shelf" tier.

### Neutral
- **Milk** (#FFFFFF): nutrition panel, box backs, maze panel, maker section ground, display letter fill.
- **Aisle** (#EEF2F7): page ground and the "Por que o Google" / FAQ sections; cool fluorescent floor.
- **Aisle Back** (#DDE3EC): shelving back wall behind the hero box and inside the rack.
- **Shelf** (#C3CAD4) and **Shelf Dark** (#98A2B1): ledge face and its 3px top edge; Shelf Dark also outlines the rack and the dimmed lower-tier goods.
- **Ink** (#14182B): body text and the nutrition-table rules on milk.
- **Ink Soft** (#3B4160): secondary copy, captions, struck old prices.
- **Navy Mist** (#C9D4EE): secondary copy on navy grounds. **Navy Frost** (#DCE4F7): nav and footer links on navy.

### Named Rules
**The Coated Board Rule.** Every section ground is one flat ink from the box: red, yellow, navy, milk or aisle. No tints, no section gradients, no textures. The only gradient in the system is lighting on the turned side panel (#E9EDF3 to milk).

**The Navy Keyline Rule.** Anything that stands on a shelf or can be pressed wears a navy outline (3–4px on boxes and pills, 2px on chips and tags). On a navy ground the keyline drops to Navy Ink.

**The Aisle Light Rule.** The store is lit by fluorescent tubes: grounds stay cool grey-blue (#EEF2F7, #DDE3EC). Warm cream is out.

## Typography

**Display Font:** Lilita One (with system-ui, sans-serif)
**Body Font:** Archivo variable, width 62–125 and weight 400–800 (with system-ui, sans-serif)

**Character:** A fat rounded cereal logotype that shouts paired with a narrow grotesque that reads like the legal side of the box. The display face sells; the condensed face proves.

### Hierarchy
- **Display** (Lilita One 400, clamp(2.8rem, 12vw, 6rem), line-height 0.95): the hero headline only, max 8.5ch, milk fill with yellow accent words, navy stroke 0.09em, navy extrusion 0.07em.
- **Headline** (Lilita One 400, clamp(2.1rem, 6vw, 3.6rem), 0.95): section heads on coloured grounds (yellow, navy, red), stroked at 0.065em, balanced wrap.
- **Headline Plain** (Lilita One 400, clamp(1.9rem, 5vw, 3rem), 1): section heads on aisle or milk grounds, solid navy with no stroke.
- **Title** (Lilita One 400, 1.25–2rem, 1.05–1.1): shelf names (yellow on navy), "why" points (red), tier labels (navy), step numbers.
- **Panel Head** (Archivo 800, width 62%, 1.7–2.1rem, 1, uppercase, -0.01em): "Informação da oferta", "Fabricado por", "Verso"; always sits on a 7–9px ink rule bar.
- **Fact Row** (Archivo, width 80%, 0.92–0.98rem; label 500, value 800 right-aligned, tabular numerals): nutrition tables, spec table, box backs, with 1px ink row rules.
- **Body** (Archivo 400, 17px, 1.5): running copy, 44–62ch.
- **Lead** (Archivo 500, 1.1–1.25rem): hero lead and section intros, 30–58ch; key nouns go 800 with a 4px yellow underline.
- **Label** (Archivo 600–800, width 80–85%, 0.88rem): chips, nav links, FAQ questions (800, 1.1rem), maker byline.
- **Fine** (Archivo 400–700, width 75–80%, 0.7–0.82rem): disclaimers, montage credits, figcaptions on goods.
- **Button** (Lilita One 400, 1.2rem, 0.01em): action pills.

### Named Rules
**The Cereal Stroke Rule.** Display type on a coloured ground is milk or yellow with a navy stroke painted behind the fill (`paint-order: stroke fill`) and a straight-down navy extrusion. On a light ground the same face goes solid navy without stroke or extrusion.

**The Nutrition Label Rule.** Any checkable claim (price, deadline, domain, credentials, segment details) is set in condensed Archivo in a ruled table: heavy bar under the head, 1px rows, values right-aligned at 800 with tabular numerals, old prices struck through in red.

## Layout

Single column at phone width with a 16px gutter (28px from 760px); content is capped at 1180px. Sections stack as full-bleed grounds with 72–90px vertical padding (80px is the norm). Breakpoints: 760px brings the desktop arrangement (nav links, peeking neighbour boxes, two-column grids), 1100px widens the peeks to 120px and locks the hero headline at 6rem.

The hero is a shelf row: on desktop a red box front (fluid) beside a 330px nutrition side panel turned 13° in perspective, flanked by two 96–120px neighbour boxes of different heights; on mobile the neighbours collapse into a row of 46px box tops above a 10px shelf edge. Every hero ends on a 22px shelf ledge carrying a yellow unit-price tag.

Portfolio boxes live on horizontal scroll-snap shelves (snap to start, 262px columns, 16px gaps; min(76%, 262px) on phones), each shelf closed by a full-bleed grey ledge. Two-column splits (maker, offer) use 1.2fr / 1fr and 1fr / 1fr with 48–56px gaps; the "why" trio is three columns divided only by a 4px navy top rule.

**The Shelf Edge Rule.** Products rest on a grey ledge (#C3CAD4 face, 3px #98A2B1 top). A row of boxes or goods ends on a ledge, never on empty space.

## Elevation & Depth

Depth is printed, not lit. Objects either sit on a shelf (open bottom, flush to the ledge) or rise off it with a straight-down navy extrusion, as if die-cut from the box. Soft shadows appear only as a short companion tail under things that physically stand off the ground (pills, the floating button, the coupon), and the tail is navy-tinted or neutral black at low alpha.

### Shadow Vocabulary
- **Pill extrusion** (`box-shadow: 0 5px 0 #0D2B6A, 0 12px 22px -10px rgba(13,43,106,.55)`): action pills at rest. Hover lifts to `0 7px 0` with a longer tail; active presses down to `0 1px 0` with `translateY(4px)`.
- **Small extrusion** (`box-shadow: 0 3px 0 #0D2B6A`): small header pill and shelf-nav buttons (Navy Ink on navy).
- **Type extrusion** (`text-shadow: 0 .07em 0 #0D2B6A`): cereal display type; 0.06em on box segment names.
- **Starburst drop** (`filter: drop-shadow(0 3px 0 #0D2B6A)`): violators; 6px on the offer price burst, 2px on box badges.
- **Floating button** (`box-shadow: 0 4px 0 #0D2B6A, 0 12px 22px -8px rgba(0,0,0,.45)`).
- **Coupon tail** (`box-shadow: 0 14px 26px -14px rgba(0,0,0,.45)`): the support add-on coupon on red.
- **Highlight ring** (`box-shadow: 0 0 0 3px #FFD400`): the eye-level tier label; 6px ring around the maker portrait.
- **Ledge shade** (`box-shadow: inset 0 -6px 0 rgba(0,0,0,.08)`): underside of the hero shelf ledge.

### Named Rules
**The Straight-Down Extrusion Rule.** Offsets are vertical only and always in the keyline colour (navy, or Navy Ink on navy). They belong to outlined objects (display type, pills, starbursts, the floating button). Never diagonal, never on panels, box faces or sections.

## Shapes

Packaging geometry. Boxes are rounded at the top corners only (8px faces and peeks, 12px hero front, 6px box tops) with the bottom border removed so they sit into the ledge. Pills are fully round (999px) and outlined. Starbursts are a 22-point polygon with a 6px navy stroke, rotated 9–10°. Small stickers rotate (−4° "Aqui é o seu lugar"). Screens shown inside boxes sit in 10px windows; the Instagram phone is 22px. Nutrition and spec panels are square-cornered. The focus ring itself is rounded 6px.

**The Open Bottom Rule.** A box that stands on a shelf drops its bottom border and its bottom radius; only free-standing objects (pills, coupon, phone, chips) are rounded all round.

## Components

### Buttons
Chunky, pressable, toy-like.
- **Shape:** full pill (999px) with a 3px navy keyline, min height 54px.
- **Primary:** Cereal Red fill, milk Lilita One label at 1.2rem, padding 0.8em 1.5em, WhatsApp or Instagram glyph at 1.25em leading.
- **On red grounds:** the pill turns Sunrise Yellow with navy label (hero, offer).
- **Small:** 0.95rem, 42px min height, 3px extrusion (header "Orçamento").
- **Hover / Active / Focus:** hover lifts 2px and deepens the extrusion; active presses 4px into a 1px extrusion; both 0.25s on the house ease. Focus is a 3px navy outline offset 3px (yellow on red and navy grounds).

### Chips
- **Live chip ("Ver página"):** yellow fill, 2px navy keyline, Archivo 800 at width 80%, 0.88rem, 40px min height.
- **Flip chip ("Virar a caixa" / "Voltar"):** milk fill (aisle on the box back), same shape, with a 16px flip glyph.
- **Shelf tag:** yellow price tag, 2px navy keyline, 3px radius, Archivo 800 width 80%, tabular numerals; clips onto the ledge.
- **Sticker:** red pill with milk Lilita One, 2px navy keyline, rotated −4° ("Aqui é o seu lugar").

### Box Face (signature)
The portfolio card is a cereal box. Front: segment-coloured fill (`--c`, default Cereal Red), 3px Navy Ink keyline, open bottom, 8px top radius, 440px min height, segment name in stroked Lilita One at 1.65rem, a 76px starburst badge rotated 10° at the top-right corner, a 10px-radius window showing the page screenshot, and a chip row. Back ("Verso"): milk panel in the Nutrition Label voice listing business, style or city and status. Tapping the flip chip rotates the box 180° on Y over 0.7s in 1200px perspective; focus moves to the visible face and the hidden face leaves the tab order. Reduced motion removes the transition.

### Starburst Violator (signature)
A 22-point yellow burst with 6px navy stroke and a straight-down drop, rotated 9–10°, holding Lilita One and struck-through Archivo prices. Sizes: 124px (hero, mobile), 176px (hero, desktop), up to 420px (offer price), 76px (box badge). Badge text is NOVO! for prototypes, DEMO for demonstrations, NO AR (green burst, milk text) for live sites. The hero violator stamps in (scale 0.6 → 1.08 → 1 over 0.6s, 0.7s delay).

### Nutrition Panel (signature)
Milk panel with 4px navy keyline (3px ink on the spec card), panel head on a 9px ink bar, a 4px-ruled "porção" line, fact rows with 1px rules, a "big" price row at 1.35rem closed by another 9px bar, and fine print beneath. On desktop the hero panel is the side of the box, turned 13° in perspective and lit by the only gradient in the system.

### Shelf Rack
Horizontal scroll-snap rows of boxes on navy, each headed by a yellow Lilita One shelf name with a Navy Mist description, and on desktop a pair of 46px yellow round nav buttons (Navy Ink keyline, small extrusion) that scroll two boxes at a time. The rack ends on a full-bleed ledge. Scrollbar is thin, yellow on navy.

### Navigation
A sticky 60px navy strip: yellow Lilita One wordmark with a condensed Navy Mist tagline, Archivo 600 width 85% links in Navy Frost turning yellow on hover (shown from 760px), and the small red action pill at the right.

### Fine Print (FAQ)
Disclosure rows separated by 2px navy rules; questions in Archivo 800 width 85% navy at 1.1rem; a plus glyph rotates 45° on open (0.3s); answers in Ink Soft, max 62ch.

### Floating WhatsApp Button
58px green circle, 3px navy keyline, extrusion plus tail, fixed bottom-right at 14px. It fades and drops 12px out of the way while the hero CTA, the closing section or the footer is on screen.

### Back-Panel Maze
A milk panel with a double keyline (4px outer, 2px inset at 8px) holding a before/after phone pair joined by a navy maze and a dashed red route, with numbered red-ring step dots; the last dot is green. On phones the maze compresses to a small strip above the steps.

## Do's and Don'ts

### Do:
- **Do** set every section ground in one flat box ink (#D11F1A, #FFD400, #0D2B6A, #FFFFFF, #EEF2F7).
- **Do** outline every shelf object and pressable in navy (3–4px boxes and pills, 2px chips) and stand boxes on a grey ledge with an open bottom.
- **Do** set cereal headlines in Lilita One with navy stroke and a straight-down navy extrusion on coloured grounds, and solid navy without stroke on light grounds.
- **Do** put every checkable fact (price, deadline, credentials, page status) in a condensed Archivo nutrition table with heavy rule bars and tabular numerals.
- **Do** mark every portfolio box with its starburst status (NOVO!, DEMO, NO AR) so demonstrations never read as client work.
- **Do** use the house ease `cubic-bezier(.16,1,.3,1)` and honour `prefers-reduced-motion` (no pull-in, no stamp, no flip transition).
- **Do** keep action pills at 54px and chips at 40px minimum height.

### Don't:
- **Don't** build a dark-SaaS hero with a glowing green CTA; green is the WhatsApp/live signal, flat and outlined.
- **Don't** lay out icon + heading + text card grids; points stand on a navy top rule, products stand on shelves.
- **Don't** use a warm cream ground; the aisle is cool fluorescent grey-blue.
- **Don't** cast diagonal or blurred-only shadows on panels, box faces or sections; extrusions go straight down in the keyline colour.
- **Don't** use gradients for decoration; the only gradient lights the turned side of the box.
- **Don't** add kickers or eyebrow labels above headings; the shelf name, sticker or violator carries that job.
- **Don't** pull the prototypes' own fonts, colours or layouts into this system.
