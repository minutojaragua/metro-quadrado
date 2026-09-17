(function(){
function ev(n,r,c){try{if(typeof gtag==='function')gtag('event',n,{rotulo:r||'',categoria:c||''});}catch(e){}}
var t0=Date.now(),prof={},cam=location.pathname;
try{var j=JSON.parse(sessionStorage.getItem('mq_jornada')||'[]');
 var de=j.length?j[j.length-1]:'(entrada)';
 j.push(cam);if(j.length>30)j=j.slice(-30);
 sessionStorage.setItem('mq_jornada',JSON.stringify(j));
 ev('passo_jornada',(j.length>=3?'passo 3+':'passo '+j.length)+' | veio de '+de,cam);}catch(e){}
document.addEventListener('click',function(e){
 var a=e.target&&e.target.closest?e.target.closest('a,button,summary'):null;if(!a)return;
 var h=a.getAttribute('href')||'',txt=(a.textContent||'').trim().slice(0,60);
 var cm=(a.tagName==='A'&&a.pathname)?a.pathname:h;
 if(a.tagName==='SUMMARY'){var dt=a.parentElement;ev(dt&&dt.open?'fechar_dobra':'abrir_dobra',txt,cam);}
 else if(a.closest('.pg-btn')||(a.getAttribute('onclick')||'').indexOf('mqGeo')>=0){}
 else if(cm.indexOf('/bairro/')>=0){ev('ver_bairro',txt,cam);}
 else if(a.closest('.cidades'))ev('trocar_cidade',txt,cam);
 else if(a.closest('.tipos'))ev('trocar_tipo',txt,cam);
 else if(a.closest('.toggle'))ev('alternar_operacao',txt,cam);
 else if(h.indexOf('ig.me')>=0)ev('contato','direct_ig',cam);
 else if(h.indexOf('whatsapp.com/channel')>=0)ev('assinar_canal',txt,cam);
 else if(h.indexOf('wa.me/55')>=0&&h.indexOf('ALERTA')>=0)ev('alerta_bairro',txt,cam);
 else if(h.indexOf('wa.me/55')>=0&&a.dataset&&a.dataset.produto)ev('contato_comercial',a.dataset.produto+'|'+(a.dataset.cidade||''),cam);
 else if(h.indexOf('wa.me/55')>=0)ev('contato','whatsapp',cam);
 else if(h.indexOf('wa.me')>=0)ev('compartilhar','whatsapp',cam);
 else if(/anuncie/.test(h))ev('clique_anuncie',txt,cam);
 else if(h.indexOf('.csv')>=0||h.indexOf('.json')>=0)ev('baixar_dados',h.split('/').pop(),cam);
 else if(a.closest('.ferr')||a.closest('.dl'))ev('clique_ferramenta',txt,cam);
 else if(/copiar link/i.test(txt))ev('compartilhar','copiar link',cam);
 else if(a.closest('.cta-bairro')||a.closest('.porta'))ev('abrir_ferramenta',txt,cam);
 else if(/\/(casas|terrenos|salas|galpoes|apartamentos)\/?$/.test(cm))ev('trocar_tipo',txt+' (secao)',cam);
 else if(/\/corredores\/?$/.test(cm))ev('abrir_ferramenta','Corredores '+txt.slice(0,30),cam);
 else if(a.closest('table')&&a.tagName==='A'&&!/\.(pdf|csv)$/.test(cm))ev('trocar_cidade',txt+' (ranking)',cam);
 else if(a.closest('.indice')||(h.charAt(0)==='#'&&h.length>1))ev('indice',txt||h,cam);
 else if(/\.pdf$/.test(cm))ev('clique_ferramenta',txt||cm.split('/').pop(),cam);
 else if(a.closest('.marca')||cm==='./'||cm==='/')ev('clique','marca',cam);
 else if(a.tagName==='BUTTON'&&/topo/i.test(txt))ev('clique','topo',cam);
 else ev('clique',(txt||cm).slice(0,60),cam);},true);
function rol(){var d=document.documentElement,H=d.scrollHeight-d.clientHeight;if(H<=0)return;
 var p=Math.round(window.pageYOffset/H*100);
 [25,50,75,90].forEach(function(m){if(p>=m&&!prof[m]){prof[m]=1;ev('rolagem',m+'%',cam);}});}
window.addEventListener('scroll',rol,{passive:true});rol();
[15,30,60,120].forEach(function(s){setTimeout(function(){if(!document.hidden)ev('permanencia',s+'s',cam);},s*1000);});
var _saiu=0;document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden'&&!_saiu){_saiu=1;
 var mx=0;for(var k in prof){if(+k>mx)mx=+k;}
 var seg=Math.round((Date.now()-t0)/1000);
 var fx=seg<10?'0 a 10s':seg<30?'10 a 30s':seg<60?'30 a 60s':seg<180?'1 a 3min':'mais de 3min';
 ev('saida_pagina',fx+' | rolou '+mx+'%',cam);}});
})();