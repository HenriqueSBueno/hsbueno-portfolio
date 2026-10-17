import io

def ed(p, pairs):
    s = io.open(p, encoding="utf-8").read()
    for a, b in pairs:
        assert a in s, (p, a[:80])
        s = s.replace(a, b)
    io.open(p, "w", encoding="utf-8").write(s)

ed("index.html", [
("""<section class="hero on-red" aria-labelledby="h1">
  <div class="wrap">
    <div class="shelfrow">""", """<section class="hero on-red" aria-labelledby="h1">
  <div class="wrap">
    <div class="tops" aria-hidden="true"><i style="--c:var(--yellow)"><span class="dk">Advocacia</span></i><i style="--c:var(--berry)"><span>Pet shop</span></i><i style="--c:var(--green)"><span>Clínica</span></i><i style="--c:var(--orange)"><span>Marmoraria</span></i></div>
    <div class="shelfrow">"""),
(".shelfrow{display:flex;align-items:flex-end;gap:14px}", """.tops{display:flex;gap:6px;align-items:flex-end}
.tops i{flex:1;height:46px;background:var(--c);border:3px solid var(--navy);border-bottom:0;border-radius:6px 6px 0 0;display:grid;place-items:center;font-style:normal;overflow:hidden}
.tops span{font-family:var(--display);font-size:.8rem;color:var(--milk);-webkit-text-stroke:.06em var(--navy);paint-order:stroke fill;white-space:nowrap}
.tops span.dk{color:var(--navy);-webkit-text-stroke:0}
.tops+.shelfrow{border-top:10px solid var(--shelf);padding-top:16px}
.shelfrow{display:flex;align-items:flex-end;gap:14px}"""),
("  .peek{display:block}", "  .peek{display:block}\n  .tops{display:none}\n  .tops+.shelfrow{border-top:0;padding-top:0}"),
(".maze{margin-top:34px;display:grid;gap:18px;align-items:center}", """.panel{margin-top:30px;background:var(--milk);border:4px solid var(--navy);padding:22px 14px 26px;position:relative}
.panel::before{content:"";position:absolute;inset:8px;border:2px solid var(--navy);pointer-events:none}
.panel .ph{position:relative;font-family:var(--display);font-size:1.25rem;color:var(--red);text-align:center;margin-bottom:10px}
.maze{display:grid;gap:18px;align-items:center;position:relative}
.maze-route{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;display:none}
.maze>*:not(.maze-route){position:relative;z-index:1}
.montage{font-size:.72rem;color:var(--ink-soft);padding:2px 4px 0;font-stretch:80%}"""),
(".phone{background:var(--milk);border:3px solid var(--navy);border-radius:28px;padding:12px;width:100%;max-width:300px;margin:0 auto;box-shadow:0 18px 30px -16px rgba(13,43,106,.55)}",
 ".phone{background:var(--milk);border:3px solid var(--navy);border-radius:22px;padding:12px;width:100%;max-width:300px;margin:0 auto}"),
("""    <div class="maze">
      <figure class="phone">""", """    <div class="panel">
    <p class="ph">Ajude o cliente a chegar até o seu WhatsApp</p>
    <div class="maze">
      <svg class="maze-route" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M150 300V110H330V490H500V150H670V450H850V300" fill="none" stroke="#D11F1A" stroke-width="6" stroke-dasharray="14 10" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>
      <figure class="phone">"""),
("""        <figcaption class="ig-note">Antes: só quem já segue encontra.</figcaption>
      </figure>""", """        <figcaption class="ig-note">Antes: só quem já segue encontra.</figcaption>
        <p class="montage">Montagem de exemplo com fotos públicas do Google Maps e de banco de imagens.</p>
      </figure>"""),
("""        <figcaption class="ig-note">Depois: quem procura no Google encontra e chama no WhatsApp.</figcaption>
      </figure>
    </div>""", """        <figcaption class="ig-note">Depois: quem procura no Google encontra e chama no WhatsApp.</figcaption>
      </figure>
    </div>
    </div>"""),
("""          <figure><img src="img/rabito.jpg" alt="" loading="lazy"><figcaption>1º resultado</figcaption></figure>
          <figure><img src="img/polezi.jpg" alt="" loading="lazy"><figcaption>2º resultado</figcaption></figure>
          <figure><img src="img/della.jpg" alt="" loading="lazy"><figcaption>3º resultado</figcaption></figure>
          <figure><img src="img/atenas.jpg" alt="" loading="lazy"><figcaption>4º resultado</figcaption></figure>""",
 """          <figure><img src="img/p-chaveiro.jpg" alt="" loading="lazy"><figcaption>1º resultado</figcaption></figure>
          <figure><img src="img/p-acougue.jpg" alt="" loading="lazy"><figcaption>2º resultado</figcaption></figure>
          <figure><img src="img/p-padaria.jpg" alt="" loading="lazy"><figcaption>3º resultado</figcaption></figure>
          <figure><img src="img/p-barbearia.jpg" alt="" loading="lazy"><figcaption>4º resultado</figcaption></figure>"""),
("""          <figure><img src="img/hvet.jpg" alt="" loading="lazy"></figure>
          <figure><img src="img/mpesq.jpg" alt="" loading="lazy"></figure>
          <figure><img src="img/novva.jpg" alt="" loading="lazy"></figure>""",
 """          <figure><img src="img/p-oficina.jpg" alt="" loading="lazy"></figure>
          <figure><img src="img/p-esmalteria.jpg" alt="" loading="lazy"></figure>
          <figure><img src="img/p-construtora.jpg" alt="" loading="lazy"></figure>"""),
("""    <div class="why">""", """    <p class="rack-note">Exemplo ilustrativo montado com os protótipos fictícios desta página.</p>
    <div class="why">"""),
(".why{display:grid;gap:22px;margin-top:40px}", ".rack-note{font-size:.82rem;color:var(--ink-soft);margin-top:8px;font-stretch:85%}\n.why{display:grid;gap:22px;margin-top:34px}"),
("""    <ul class="boxes" id="s-new" aria-labelledby="sh-new"></ul>
    <div class="ledge" aria-hidden="true"></div>
""", """    <ul class="boxes" id="s-new" aria-labelledby="sh-new"></ul>
    <div class="ledge" aria-hidden="true"></div>

    <div class="shelf-head">
      <div><h3 id="sh-high">Protótipos: serviços de alto padrão</h3><p>Para quem vende serviço de ticket alto: marmoraria, advocacia, odontologia, energia solar, construtora e interiores. Também fictícios.</p></div>
      <div class="nav-btns"><button class="prev" type="button" data-shelf="s-high" aria-label="Voltar prateleira de alto padrão"><svg aria-hidden="true"><use href="#i-next"/></svg></button><button type="button" data-shelf="s-high" aria-label="Avançar prateleira de alto padrão"><svg aria-hidden="true"><use href="#i-next"/></svg></button></div>
    </div>
    <ul class="boxes" id="s-high" aria-labelledby="sh-high"></ul>
    <div class="ledge" aria-hidden="true"></div>
"""),
("""<div><h3 id="sh-new">Protótipos novos</h3>""", """<div><h3 id="sh-new">Protótipos: comércio do bairro</h3>"""),
("Seis estilos diferentes, criados para negócios fictícios: lista telefônica, encarte, corredor, talão, letreiro e cartela de cores.",
 "Seis estilos para negócios fictícios do dia a dia: lista telefônica, encarte, corredor, talão, letreiro e cartela de cores."),
("""].map(p => ({...p, url:"/prototipos/" + p.id + "/", img:"img/p-" + p.id + ".jpg", kind:"new"}));
""", """].map(p => ({...p, url:"/prototipos/" + p.id + "/", img:"img/p-" + p.id + ".jpg", kind:"new"}));

const HIGH = [
  {id:"marmoraria", seg:"Marmoraria", name:"Ateliê Pedra Fina", style:"Prancha de projeto", c:"#2F4A3F", has:"Desenho técnico, materiais, medição a laser"},
  {id:"advocacia", seg:"Advocacia", name:"Moraes Lacerda Advocacia", style:"Capa de autos", c:"#22385A", has:"Áreas de atuação, advogados, consulta"},
  {id:"odontologia", seg:"Odontologia", name:"Clínica Sorriso Pleno", style:"Odontograma", c:"#1D4ED8", has:"Plano de tratamento, equipe, avaliação"},
  {id:"energia-solar", seg:"Energia solar", name:"Sol Forte Energia", style:"Conta de luz", c:"#0B6E4F", has:"Simulação de economia, itens do projeto"},
  {id:"construtora", seg:"Construtora", name:"Alicerce Engenharia", style:"Placa de obra", c:"#0F6B3A", has:"Responsável técnico, andamento da obra"},
  {id:"interiores", seg:"Interiores", name:"Estúdio Linho", style:"Caderno de acabamentos", c:"#5B3A24", has:"Painel de materiais, etapas do projeto"}
].map(p => ({...p, url:"/prototipos/" + p.id + "/", img:"img/p-" + p.id + ".jpg", kind:"new"}));
"""),
("""document.getElementById("s-new").innerHTML = NEW.map(card).join("");""",
 """document.getElementById("s-new").innerHTML = NEW.map(card).join("");\ndocument.getElementById("s-high").innerHTML = HIGH.map(card).join("");"""),
("  .maze{grid-template-columns:1fr auto 1fr;gap:20px}", "  .maze{grid-template-columns:1fr auto 1fr;gap:20px}\n  .maze-route{display:block}\n  .panel{padding:30px 34px 34px}"),
])

# prototypes
ed("prototipos/barbearia/index.html", [
("""      <p class="caps top">Corte · Barba · Bigode</p>
      <h1 id="h1">Navalha</h1>
      <p class="caps sub">Barbearia de bairro</p>""", """      <h1 id="h1">Navalha</h1>
      <p class="caps sub">Barbearia de bairro</p>
      <p class="caps top">Corte · Barba · Bigode</p>"""),
(".board .caps.top{font-weight:700;font-size:.9rem;color:#9E2A22}", ".board .caps.top{font-weight:700;font-size:.9rem;color:#9E2A22;margin-top:8px}"),
])
s = io.open("prototipos/chaveiro/index.html", encoding="utf-8").read()
s = s.replace("""    <div class="ad-top"><span>Chaveiro Ponto Certo</span><span>Aberto 24h</span></div>
""", "")
s = s.replace("""    <div class="circle" aria-hidden="true">CHEGA EM<br>30 MIN</div>
  </article>""", """    <div class="circle" aria-hidden="true">CHEGA EM<br>30 MIN</div>
    <div class="ad-top"><span>Chaveiro Ponto Certo</span><span>Aberto 24h</span></div>
  </article>""")
s = s.replace(".ad-top{grid-column:1/-1}", ".ad-top{grid-column:1/-1;grid-row:2}")
s = s.replace(".circle{position:absolute;right:10px;top:-34px;", ".circle{position:absolute;right:10px;top:-30px;")
n = 1000
def phone(m):
    global n
    n += 137
    return "<span>(17) 3%03d-%04d</span>" % (n % 1000, (n * 7) % 10000)
import re
s = re.sub(r"<span>\(17\) [39]\.\.\.</span>", phone, s)
io.open("prototipos/chaveiro/index.html", "w", encoding="utf-8").write(s)

ed("prototipos/acougue/index.html", [
(".cut{margin:auto 0 0;height:74px;display:grid;place-items:end start}\n.cut svg{width:96px;height:70px}",
 ".cut{margin:8px 0 0;flex:1;min-height:90px;display:grid;place-items:center start}\n.cut svg{width:min(100%,150px);height:auto;aspect-ratio:3/2}"),
(".banner{background:var(--red);color:var(--yellow);text-align:center;padding:4px 0 26px}", ".banner{background:var(--red);color:var(--yellow);text-align:center;padding:22px 0 26px}"),
])
ed("prototipos/padaria/index.html", [
("""<div class="pkg peek" style="background:var(--berry)" aria-hidden="true"></div>""", """<div class="pkg peek" style="background:var(--berry)" aria-hidden="true"><span>Bolos</span></div>"""),
(".peek{width:28px;height:160px}", ".peek{width:34px;height:170px;position:relative}\n.peek span{position:absolute;top:10px;left:50%;transform:translateX(-50%) rotate(180deg);writing-mode:vertical-rl;font-family:\"Titan One\";color:var(--milk);font-size:1rem}"),
])
ed("prototipos/oficina/index.html", [
("""    <p class="lead">Mande foto ou áudio do problema pelo WhatsApp. A gente responde com o orçamento por escrito, peça por peça.</p>""",
 """    <p class="lead">Mande foto ou áudio do problema pelo WhatsApp. A gente responde com o orçamento por escrito, peça por peça.</p>
    <p style="margin:0 0 18px"><a class="btn wa" href="#"><svg aria-hidden="true"><use href="#wa"/></svg>Pedir meu orçamento</a></p>"""),
("""      <a class="btn wa" href="#"><svg aria-hidden="true"><use href="#wa"/></svg>Pedir meu orçamento</a>
      <div class="line-sig">""", """      <a class="btn wa" href="#"><svg aria-hidden="true"><use href="#wa"/></svg>Aprovar e agendar</a>
      <div class="line-sig">"""),
(".fine{font-size:.78rem;margin-top:12px}", ".fine{font-size:.78rem;margin-top:12px}\n.two>div+div{margin-top:26px}\n@media (min-width:760px){.two>div+div{margin-top:0}}"),
])
ed("prototipos/esmalteria/index.html", [
(".strip{grid-template-columns:1.6fr repeat(5,1fr);align-items:stretch}", ".strip{grid-template-columns:3.4fr repeat(5,1fr);align-items:stretch}"),
])
print("ok")
