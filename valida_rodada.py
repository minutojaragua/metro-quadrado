#!/usr/bin/env python3
"""Health-check pós-gerar_dados: compara dados novos com o snapshot anterior.
Sai com código 1 (bloqueia push) se houver anomalia grave. Uso: python3 valida_rodada.py"""
import json, glob, os, sys

CIDADES=[("Jaraguá do Sul","site/dados.json"),("Guaramirim","site/guaramirim/dados.json"),
         ("Schroeder","site/schroeder/dados.json"),("Corupá","site/corupa/dados.json"),
         ("Massaranduba","site/massaranduba/dados.json"),("Joinville","site/joinville/dados.json")]
snaps=sorted(glob.glob("dados/snapshots/*/"))
erros=[]; avisos=[]

for nome,path in CIDADES:
    if not os.path.exists(path): continue
    d=json.load(open(path))
    # bairro suspeito
    for seg,S in d["segmentos"].items():
        for b in S["bairros"]:
            if len(b.strip())<3: erros.append(f"{nome}/{seg}: bairro suspeito {b!r}")
            if b!=b.strip(): erros.append(f"{nome}/{seg}: bairro com espaços {b!r}")
    if snaps:
        old_p=os.path.join(snaps[-1], os.path.basename(os.path.dirname(path)) or "jaragua", "dados.json")
        alt=os.path.join(snaps[-1], f"{os.path.basename(os.path.dirname(path)) or 'jaragua'}.json")
        prev=None
        for cand in (old_p,alt):
            if os.path.exists(cand): prev=json.load(open(cand)); break
        if prev:
            for seg,S in d["segmentos"].items():
                So=prev["segmentos"].get(seg,{})
                gv=S["geral"].get("venda",{}).get("mediana"); go=So.get("geral",{}).get("venda",{}).get("mediana")
                if gv and go and abs(gv/go-1)>0.20:
                    erros.append(f"{nome}/{seg}: mediana geral variou {gv/go-1:+.0%} vs snapshot ({go}→{gv})")
                perd=set(So.get("bairros",{}))-set(S["bairros"])
                if So.get("bairros") and len(perd)/max(len(So["bairros"]),1)>0.25:
                    erros.append(f"{nome}/{seg}: perdeu {len(perd)} bairros ({', '.join(sorted(perd)[:4])}…)")
                elif perd: avisos.append(f"{nome}/{seg}: saiu do ranking: {', '.join(sorted(perd))}")

# concentração de fontes
if os.path.exists("dados/concentracao.json"):
    for cid,c in json.load(open("dados/concentracao.json")).items():
        if c["top_pct"]>40: avisos.append(f"{cid}: fonte {c['top_fonte']} = {c['top_pct']}% da base ({c['fontes']} fontes)")

for a in avisos: print("AVISO:", a)
for e in erros: print("ERRO:", e)
print(f"valida_rodada: {len(erros)} erros, {len(avisos)} avisos", "| sem snapshot anterior p/ comparar" if not snaps else "")
sys.exit(1 if erros else 0)
