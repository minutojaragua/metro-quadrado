window.mqGeo=(function(){
var K='mq_cidade',BASE='https://acorridadosbairros.com.br/';
var TZ={'America/Manaus':'am/manaus','America/Cuiaba':'mt/cuiaba','America/Campo_Grande':'ms/campo-grande','America/Porto_Velho':'ro/porto-velho','America/Rio_Branco':'ac/rio-branco','America/Eirunepe':'ac/rio-branco','America/Boa_Vista':'rr/boa-vista','America/Recife':'pe/recife','America/Araguaina':'to/palmas','America/Bahia':'ba/salvador','America/Belem':'pa/belem','America/Maceio':'al/maceio'};
var UFN={AC:'no Acre',AL:'em Alagoas',AP:'no Amapá',AM:'no Amazonas',BA:'na Bahia',CE:'no Ceará',DF:'no Distrito Federal',ES:'no Espírito Santo',GO:'em Goiás',MA:'no Maranhão',MT:'em Mato Grosso',MS:'em Mato Grosso do Sul',MG:'em Minas',PA:'no Pará',PB:'na Paraíba',PR:'no Paraná',PE:'em Pernambuco',PI:'no Piauí',RJ:'no Rio de Janeiro',RN:'no Rio Grande do Norte',RS:'no Rio Grande do Sul',RO:'em Rondônia',RR:'em Roraima',SC:'em Santa Catarina',SP:'em São Paulo',SE:'em Sergipe',TO:'no Tocantins'};
var _L=null;
function ev(n,r,c){try{if(typeof gtag==='function')gtag('event',n,{rotulo:r||'',categoria:c||''});}catch(e){}}
function ler(){try{var v=JSON.parse(localStorage.getItem(K)||'null');if(v&&v.slug&&(Date.now()-(v.t||0))<90*864e5)return v;}catch(e){}return null;}
function guardar(slug,nome,via){try{var v=ler();if(v&&v.via==='geo'&&via==='nav')return;localStorage.setItem(K,JSON.stringify({slug:slug,nome:nome,via:via,t:Date.now()}));}catch(e){}}
function cidades(){if(_L)return Promise.resolve(_L);return fetch(BASE+'cidades_geo.json',{cache:'force-cache'}).then(function(r){return r.json();}).then(function(j){_L=j;return j;});}
function acha(slug){if(!_L)return null;for(var i=0;i<_L.length;i++)if(_L[i].slug===slug)return _L[i];return null;}
function atual(){try{var p=location.pathname.split('/').filter(Boolean);var UF=['ac','al','ap','am','ba','ce','df','es','go','ma','mt','ms','mg','pa','pb','pr','pe','pi','rj','rn','rs','ro','rr','sp','se','to'];
 if(!p.length)return 'jaragua';if(UF.indexOf(p[0])>=0)return p.length>1?p[0]+'/'+p[1]:null;return p[0];}catch(e){return null;}}
function fuso(){try{var z=Intl.DateTimeFormat().resolvedOptions().timeZone;return TZ[z]||null;}catch(e){return null;}}
function dist(a,b,c,d){var R=6371,x=(c-a)*Math.PI/180,y=(d-b)*Math.PI/180;var s=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(s));}
function localizar(){return new Promise(function(res,rej){if(!navigator.geolocation){rej('sem_geo');return;}
 var cam=(typeof mqOrigem==='function')?mqOrigem():'';ev('geo_pedido','toque',cam);
 navigator.geolocation.getCurrentPosition(function(pos){cidades().then(function(L){var best=null;
   for(var i=0;i<L.length;i++){var c=L[i],d=dist(pos.coords.latitude,pos.coords.longitude,c.lat,c.lon);if(!best||d<best.km)best={slug:c.slug,nome:c.nome,uf:c.uf,url:c.url,km:Math.round(d)};}
   ev('geo_ok',best.nome+' '+(best.km<30?'ate 30km':best.km<150?'30 a 150km':'mais de 150km'),cam);guardar(best.slug,best.nome,'geo');res(best);}).catch(function(){rej('sem_lista');});},
  function(e){ev('geo_negado',String(e&&e.code),cam);rej('negado');},{timeout:9000,maximumAge:600000});});}
function ufNome(uf){return UFN[uf]||('em '+uf);}
function inicia(rest){cidades().then(function(){var antes=ler(),a=atual(),c=a&&acha(a);monta(antes);if(c&&!rest)guardar(c.slug,c.nome,'nav');}).catch(function(){});}
document.addEventListener('DOMContentLoaded',function(){inicia(false);});
window.addEventListener('pageshow',function(e){if(e&&e.persisted)inicia(true);});
document.addEventListener('change',function(e){var s=e.target;if(!s||s.tagName!=='SELECT'||(s.id!=='cid'&&s.id!=='alvo'))return;var v=s.value;if(!v||v.indexOf('__')===0)return;
 var c=acha(v);guardar(v,c?c.nome:s.options[s.selectedIndex].text.replace(/^Morar em /,''),'sel');},true);
function monta(lem){var box=document.getElementById('porta-geo');if(!box)return;var a=atual(),sug=null,via='';
 if(lem&&lem.slug!==a&&acha(lem.slug)){sug=acha(lem.slug);via=lem.via==='geo'?'geo_lembrada':'lembrada';}
 else if(!lem){var f=fuso();if(f&&f!==a&&acha(f)){sug=acha(f);via='fuso';}}
 if(sug){ev('sugestao_cidade',sug.nome,via);
  var pre=via==='fuso'?'Você está '+ufNome(sug.uf)+'? ':via==='geo_lembrada'?'Mais perto de você: ':'Você viu '+sug.nome+' por último. ';
  box.innerHTML='<span class="pg-txt">'+pre+'</span><a class="pg-link" href="'+sug.url+'" onclick="try{mqGeo.aceita(\''+sug.nome.replace(/'/g,'')+'\',\''+via+'\')}catch(e){}">Ver '+sug.nome+' →</a> <button type="button" class="pg-btn pg-min" onclick="mqGeo.toque(this)">📍 perto de mim</button>';}
 else{box.innerHTML='<button type="button" class="pg-btn" onclick="mqGeo.toque(this)">📍 Ver a cidade mais perto de mim</button>';}}
function aceita(nome,via){ev('sugestao_cidade_aceita',nome,via);}
function toque(btn){var box=document.getElementById('porta-geo');if(!box)return;var a=atual();btn.disabled=true;btn.textContent='📍 localizando…';
 localizar().then(function(b){if(b.slug===a){box.innerHTML='<span class="pg-txt">Você já está na cidade mais perto de você'+(b.km>150?' (a '+b.km+' km; ainda não medimos a sua)':'')+'.</span>';return;}
  box.innerHTML='<span class="pg-txt">Mais perto de você: <b>'+b.nome+'</b>'+(b.km>150?' (a '+b.km+' km; ainda não medimos a sua cidade)':'')+'. </span><a class="pg-link" href="'+b.url+'" onclick="try{mqGeo.aceita(\''+b.nome.replace(/'/g,'')+'\',\'geo\')}catch(e){}">Ver '+b.nome+' →</a>';})
 .catch(function(m){box.innerHTML='<span class="pg-txt">'+(m==='negado'?'Sem permissão de localização; tudo bem, escolha a cidade na lista abaixo.':'Não deu para localizar agora; escolha a cidade na lista abaixo.')+'</span>';});}
function preSel(id,q){try{var s=document.getElementById(id);if(!s||(q&&q.get(id)))return false;var v=ler();if(!v)return false;
 for(var i=0;i<s.options.length;i++)if(s.options[i].value===v.slug){s.value=v.slug;ev('cidade_lembrada',v.nome,v.via);return true;}}catch(e){}return false;}
function botao(id,depois){var s=document.getElementById(id);if(!s||document.getElementById(id+'-geo'))return;var b=document.createElement('button');b.type='button';b.id=id+'-geo';b.className='pg-btn pg-min';b.style.cssText='border:1px solid #bbb;background:#fff;color:#333;border-radius:999px;padding:6px 12px;font-size:.82rem;cursor:pointer;margin-left:6px;min-height:32px';b.textContent='📍 perto de mim';b.title='Usa a localização do aparelho só quando você toca; o cálculo é feito aqui, nada é enviado';
 b.onclick=function(){b.disabled=true;b.textContent='📍 localizando…';localizar().then(function(x){b.disabled=false;b.textContent='📍 perto de mim';var ok=false;for(var i=0;i<s.options.length;i++)if(s.options[i].value===x.slug){s.value=x.slug;ok=true;}
   if(ok){s.dispatchEvent(new Event('change',{bubbles:true}));if(depois)depois(x);}else{b.textContent='📍 '+x.nome+' ainda não está na lista';}}).catch(function(m){b.disabled=false;b.textContent=m==='negado'?'📍 sem permissão':'📍 não deu agora';});};
 s.insertAdjacentElement('afterend',b);}
return {ler:ler,guardar:guardar,fuso:fuso,localizar:localizar,cidades:cidades,atual:atual,aceita:aceita,toque:toque,preSel:preSel,botao:botao};})();