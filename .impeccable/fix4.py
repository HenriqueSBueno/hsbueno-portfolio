import io

def ed(p, pairs):
    s = io.open(p, encoding="utf-8").read()
    for a, b in pairs:
        assert a in s, (p, a[:90])
        s = s.replace(a, b)
    io.open(p, "w", encoding="utf-8").write(s)

WALLS = ("M0 70H250V190M110 190H250M0 530H190V410M90 410H190M330 0V170M330 300V600"
         "M670 0V230M670 360V600M790 70H1000M790 70V210M900 210H1000M760 530H1000M880 530V400")
ROUTE = "M150 300H290V245H500V355H710V300H850"

ed("index.html", [
# desktop maze: walls + weaving path
("""<svg class="maze-route" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M150 300V110H330V490H500V150H670V450H850V300" fill="none" stroke="#D11F1A" stroke-width="6" stroke-dasharray="14 10" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>""",
 """<svg class="maze-route" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="%s" fill="none" stroke="#0D2B6A" stroke-width="5" stroke-linecap="square" vector-effect="non-scaling-stroke"/><path d="%s" fill="none" stroke="#D11F1A" stroke-width="6" stroke-dasharray="14 10" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>""" % (WALLS, ROUTE)),
# steps column: no border card, sits on the board
("  .mid{background:var(--milk);padding:12px 10px;border:2px solid var(--navy);border-radius:14px}",
 "  .mid{background:var(--milk);padding:12px 10px}\n  .mstrip{display:none}\n  .arrow{display:block}"),
# mobile maze strip instead of plain arrow
("""        <svg class="arrow" viewBox="0 0 150 64" aria-hidden="true">""",
 """        <svg class="mstrip" viewBox="0 0 160 120" aria-hidden="true"><path d="M10 10H70V40M100 10H150M30 40H70M10 70H60V110M100 40H150V80M90 80H120V110M150 110H140" fill="none" stroke="#0D2B6A" stroke-width="5" stroke-linecap="square"/><path d="M85 0V25H40V55H85V95H75V112" fill="none" stroke="#D11F1A" stroke-width="5" stroke-dasharray="9 7"/><path d="M64 104l11 14 11-14z" fill="#D11F1A"/></svg>
        <svg class="arrow" viewBox="0 0 150 64" aria-hidden="true">"""),
(".arrow{width:120px;height:64px;color:var(--red);transform:rotate(90deg);margin:6px 0}",
 ".arrow{width:150px;height:64px;color:var(--red);margin:6px 0;display:none}\n.mstrip{width:160px;height:120px;display:block;margin:4px 0}"),
("  .arrow{transform:none;width:150px}", ""),
# mobile hero burst strike legibility
(".violator s{display:block;font-family:var(--text);font-weight:800;font-size:.82rem;color:var(--navy);text-decoration-color:var(--navy);text-decoration-thickness:2px}",
 ".violator s{display:block;font-family:var(--text);font-weight:800;font-size:.9rem;color:var(--navy);text-decoration-color:var(--red);text-decoration-thickness:1.5px}"),
])

# odontologia: chart fits mobile (two rows of eight per jaw), patient fields
ed("prototipos/odontologia/index.html", [
(".chart svg{display:block;min-width:560px;width:100%;height:auto}", ".chart svg{display:block;width:100%;height:auto}"),
("""          <svg viewBox="0 0 560 170" role="img" aria-label="Odontograma ilustrativo com dentes numerados de 18 a 28 e de 48 a 38">""",
 """          <svg id="odo" viewBox="0 0 560 170" role="img" aria-label="Odontograma ilustrativo com dentes numerados de 18 a 28 e de 48 a 38">"""),
("""function row(g,list,y,flip){list.forEach((n,i)=>{const x=12+i*34+(i>7?8:0);""",
 """const narrow=window.innerWidth<560;
if(narrow){document.getElementById("odo").setAttribute("viewBox","0 0 300 330")}
function row(g,list,y,flip){list.forEach((n,i)=>{let x=12+i*34+(i>7?8:0);let yy=y;
  if(narrow){x=10+(i%8)*35;yy=y+(i>7?(flip?74:74):0)}"""),
("""r.setAttribute("x",x);r.setAttribute("y",y);""", """r.setAttribute("x",x);r.setAttribute("y",yy);"""),
("""c.setAttribute("cy",y+20);""", """c.setAttribute("cy",yy+20);"""),
("""t.setAttribute("y",flip?y+58:y-8);""", """t.setAttribute("y",flip?yy+58:yy-8);"""),
("""row(document.getElementById("up"),up,22,false);row(document.getElementById("lo"),lo,96,true);""",
 """if(narrow){row(document.getElementById("up"),up,22,false);row(document.getElementById("lo"),lo,182,true)}else{row(document.getElementById("up"),up,22,false);row(document.getElementById("lo"),lo,96,true)}"""),
("""        <a class="btn wa" href="#"><svg aria-hidden="true"><use href="#wa"/></svg>Agendar avaliação</a>
      </div>""", """        <a class="btn wa" href="#"><svg aria-hidden="true"><use href="#wa"/></svg>Agendar avaliação</a>
        <dl class="pf"><div><dt>Paciente</dt><dd>você</dd></div><div><dt>Queixa</dt><dd>falta de um ou mais dentes</dd></div><div><dt>Conduta</dt><dd>avaliação com tomografia</dd></div></dl>
      </div>"""),
(".legend{", ".pf{margin-top:22px;border-top:2px solid var(--ink)}\n.pf div{display:grid;grid-template-columns:96px 1fr;gap:10px;border-bottom:1px solid var(--rule);padding:7px 0}\n.pf dt{font-family:\"Red Hat Mono\";font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);padding-top:3px}\n.pf dd{font-weight:600}\n.legend{"),
])

ed("prototipos/marmoraria/index.html", [
("""<text class="dim" x="556" y="150" transform="rotate(90 556 150)" text-anchor="middle">1100</text>""",
 """<text class="dim" x="524" y="150" transform="rotate(-90 524 150)" text-anchor="middle">1100</text>"""),
])
ed("prototipos/advocacia/index.html", [
(""".capa::after{content:"";position:absolute;right:22px;top:-12px;width:92px;height:14px;background:var(--tab);border-radius:3px 3px 0 0}""",
 """.capa::after{content:"AUTOS Nº 0042";position:absolute;right:22px;top:-22px;padding:4px 12px 3px;background:var(--tab);color:var(--ink);border-radius:3px 3px 0 0;font-family:"Archivo Narrow";font-weight:700;font-size:.75rem;letter-spacing:.1em}"""),
])
ed("prototipos/energia-solar/index.html", [
("SIMULAÇÃO GRATUITA · 00190.00009 02612.345678 90000.000000 1 00000000000000", "SIMULAÇÃO GRATUITA · CÓDIGO DE EXEMPLO 12345.67890 12345.678901"),
])
ed("prototipos/construtora/index.html", [
(".etapas .pct{font-family:\"Archivo Black\";font-size:1.4rem;color:var(--green);min-width:3.2ch}", ".etapas .pct{font-family:\"Archivo Black\";font-size:1.4rem;color:var(--green);width:4.2ch}"),
("""      <p class="fine">Cronograma ilustrativo.</p>
    </div>""", """      <p class="fine" style="margin-bottom:34px">Cronograma ilustrativo.</p>
    </div>"""),
])
ed("prototipos/interiores/index.html", [
("""    <div class="s" style="background:#E9E3D6"><i class="pin"></i><span>Linho cru</span></div>""",
 """    <div class="s" style="background:#E9E3D6"><i class="pin"></i><span>Linho cru</span></div>
    <div class="s" style="background:#8E8B84"><i class="pin"></i><span>Cimento queimado</span></div>"""),
(".s.round{border-radius:50%;align-items:center;justify-content:center}", ".s.round{border-radius:50%;align-items:center;justify-content:center;margin:4px}"),
])
print("ok")
