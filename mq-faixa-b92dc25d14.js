
/* 07/09/2026: a tabela da faixa padrao ja veio pronta do Python (vale para SEO e para quem esta
   sem JS); o clique so troca o corpo, lendo de BFX (so o faixas_m2 de cada bairro), que e
   emitido em toda pagina de apartamento: o B completo do comparador so existe na pagina indice. */
/* 02/10/2026 (lote 76): a secao #tamanho virou fragmento de site/parte/ carregado sob demanda. A barra,
   a tabela e os dados (BFX, num <script type="application/json" class="bfx">) chegam depois do load,
   entao o clique e escutado no documento e tudo e lido na hora; prefixo e cidade vem da propria barra. */
(function(){
  var FXR={"ate50": "até 50 m²", "50a70": "50 a 70 m²", "70a100": "70 a 100 m²", "100a150": "100 a 150 m²", "acima150": "acima de 150 m²"}, B=null, tb, lg, PREF, CID;
  function nb(n,d){d=d||0;return n.toLocaleString("pt-BR",{minimumFractionDigits:d,maximumFractionDigits:d});}
  function bdg(n){var c=n>=20?"alta":(n>=10?"media":"baixa"), r=n>=20?"alta":(n>=10?"média":"baixa");
    return '<span class="bdg '+c+'">n='+n+' · '+r+'</span>';}
  /* 02/10/2026 (lote 77): a linha fundida do celular (mesmo texto do _mobn do Python) */
  function mobn(e){var v=e.venda, a=e.aluguel, n=v.n||0, p=["apê típico R$ "+nb(v.valor)];
    if(a)p.push("aluguel R$ "+nb(a.m2,1)+"/m²"); if(e.yield_anual_pct)p.push("rende "+nb(e.yield_anual_pct,2)+"%");
    p.push("n="+n+" · "+(n>=20?"alta":(n>=10?"média":"baixa")));
    return '<small class="mobn">'+p.join(" · ")+'</small>';}
  /* mesma regra do slug() do Python (e do slugify das outras telas): tira acento, tira apostrofo,
     espaco vira hifen, o resto some. Nao usar collapse generico: "Agua D'Ouro" daria agua-d-ouro. */
  function sg(t){return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/['\u2019\u00b4`]/g,"").replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");}
  function pinta(k){
    var rs=[];
    /* 11/09/2026 (Jales: "nao permite trocar o tamanho, parece sem funcionalidade"): o Python emite
       BFX como {bairro:{faixa:{...}}}, mas aqui se lia B[b].faixas_m2[k] -- um nivel inexistente.
       rs ficava vazio, pinta() devolvia false e o clique nao fazia nada em NENHUMA das 61 paginas.
       Aceita as duas formas para nao depender da ordem de deploy do HTML e do JS. */
    for(var b in B){var d=B[b]||{}; var e=(d.faixas_m2||d)[k]||{}; if(e.venda) rs.push([b,e]);}
    if(rs.length<3) return false;
    rs.sort(function(x,y){return y[1].venda.m2-x[1].venda.m2;});
    tb.innerHTML=rs.map(function(r,i){
      var b=r[0], e=r[1], v=e.venda, a=e.aluguel;
      return '<tr><td class="rk">'+(i+1)+'º</td>'
        +'<td><a href="'+PREF+'bairro/'+sg(b)+'.html">'+b+'</a>'+mobn(e)+'</td>'
        +'<td class="num med">R$ '+nb(v.m2)+'</td>'
        +'<td class="num s">R$ '+nb(v.valor)+'</td>'
        +'<td class="num s">'+(a?"R$ "+nb(a.m2,1):"–")+'</td>'
        +'<td class="num s">'+(e.yield_anual_pct?nb(e.yield_anual_pct,2)+"%":"–")+'</td>'
        +'<td class="num s">'+bdg(v.n||0)+'</td></tr>';}).join("");
    if(lg)lg.innerHTML='Mostrando <b>'+FXR[k]+'</b>. Mínimo de 5 anúncios por bairro em cada faixa.';
    return true;}
  document.addEventListener("click",function(ev){
    var b=ev.target.closest&&ev.target.closest(".fxbar .fxb"); if(!b) return;
    var bar=b.closest(".fxbar"), raiz=bar.closest("section")||document;
    if(!B){var j=raiz.querySelector(".bfx"); try{B=JSON.parse(j?j.textContent:"{}");}catch(e){B={};}}
    tb=document.getElementById("tbfxb"); lg=document.getElementById("fxleg");
    PREF=bar.getAttribute("data-pref")||""; CID=bar.getAttribute("data-cid")||"";
    if(!tb||!pinta(b.dataset.k)) return;
    bar.querySelectorAll(".fxb").forEach(function(x){x.classList.remove("on");});
    b.classList.add("on");
    try{if(typeof gtag==="function")gtag("event","faixa_m2",{faixa:b.dataset.k,rotulo:FXR[b.dataset.k]+" ("+CID+")"});}catch(e){}
  });
})();
