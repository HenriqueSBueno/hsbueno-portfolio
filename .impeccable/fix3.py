import io

def ed(p, pairs):
    s = io.open(p, encoding="utf-8").read()
    for a, b in pairs:
        assert a in s, (p, a[:80])
        s = s.replace(a, b)
    io.open(p, "w", encoding="utf-8").write(s)

ed("prototipos/construtora/index.html", [
(".pb h1{font-size:clamp(2.3rem,10vw,5rem);", ".pb h1{font-size:clamp(1.9rem,8.4vw,5rem);"),
])
ed("prototipos/interiores/index.html", [
("""    <span class="nm">Estúdio Linho · Interiores</span>
    <h1 id="h1">Cada material escolhido com você.</h1>
    <p class="lead">Projetos de interiores residenciais com caderno de acabamentos completo: madeira, pedra, tecido e metal definidos antes da obra.</p>""",
 """    <h1 id="h1">Cada material escolhido com você.</h1>
    <p class="lead">Projetos de interiores residenciais com caderno de acabamentos completo: madeira, pedra, tecido e metal definidos antes da obra.</p>
    <p class="nm">Estúdio Linho, arquitetura de interiores</p>"""),
(".title .nm{font-weight:700;font-size:.85rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft)}",
 ".title .nm{font-weight:700;font-size:.95rem;color:var(--ink);margin-top:14px;border-top:2px solid var(--ink);padding-top:8px;max-width:30ch}"),
("h1{font-weight:900;font-size:clamp(2.5rem,10vw,5rem);line-height:.95;letter-spacing:-.03em;margin:12px 0 12px}",
 "h1{font-weight:900;font-size:clamp(2.5rem,10vw,5rem);line-height:.95;letter-spacing:-.03em;margin:0 0 12px}"),
])
s = io.open("prototipos/marmoraria/index.html", encoding="utf-8").read()
top = """    <div class="top"><span>Ateliê Pedra Fina · Marmoraria</span><span>Prancha 01/01</span></div>
"""
assert top in s
s = s.replace(top, "")
s = s.replace("""    <div class="tb">""", top + """    <div class="tb">""", 1)
s = s.replace(".top{display:flex;justify-content:space-between;gap:12px;padding:20px 22px 0;", ".top{display:flex;justify-content:space-between;gap:12px;padding:0 22px 10px;")
s = s.replace(".hero{display:grid;gap:10px;padding:10px 22px 22px}", ".hero{display:grid;gap:10px;padding:26px 22px 18px}")
io.open("prototipos/marmoraria/index.html", "w", encoding="utf-8").write(s)
print("ok")
