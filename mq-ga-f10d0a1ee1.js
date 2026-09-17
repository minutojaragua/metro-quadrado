window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}try{if(localStorage.getItem('mq_optout')==='1')window['ga-disable-G-R0HV8VXVQZ']=true;}catch(e){}
gtag('js',new Date());try{if(/[?&]interno=1/.test(location.search))localStorage.setItem('mq_interno','1');}catch(e){}
var _mqInt=false;try{_mqInt=localStorage.getItem('mq_interno')==='1';}catch(e){}
// origem por navegador de app: o Instagram (e Threads/Facebook) abre o link no navegador
// interno DELE e apaga o referrer, entao o clique da bio caia no GA4 como "(direct)".
// O proprio app se identifica no user agent, entao da para creditar a origem sem sujar a
// URL com utm_ (decisao do Jales 29/08/2026: link da bio fica limpo).
var _mqApp=null;try{var _u=navigator.userAgent||'';
 if(/Instagram/i.test(_u))_mqApp='instagram';
 else if(/Barcelona/i.test(_u))_mqApp='threads';
 else if(/FBAN|FBAV|FB_IAB/i.test(_u))_mqApp='facebook';
 else if(/WhatsApp/i.test(_u))_mqApp='whatsapp';}catch(e){}
var _mqCfg=_mqInt?{anonymize_ip:true,traffic_type:'internal'}:{anonymize_ip:true};
// so credita se a URL nao trouxer utm_source: marcacao explicita sempre vence a deducao.
if(_mqApp&&!/[?&]utm_source=/.test(location.search)){_mqCfg.campaign_source=_mqApp;_mqCfg.campaign_medium='app';_mqCfg.campaign_name='perfil';}
gtag('config','G-R0HV8VXVQZ',_mqCfg);
// evento de uso das ferramentas (calculadora, onde-cabe, por-perto, MCMV, informe): antes só o comparador media uso.
window.mqEv=function(n,r,c){try{if(typeof gtag==='function')gtag('event',n,{rotulo:r||'',categoria:c||''});}catch(e){}};
// origem do clique em poucos baldes, de proposito: /joinville/bairro/costa-e-silva/ como categoria
// seriam centenas de valores distintos e o GA4 jogaria a cauda em "(other)".
window.mqOrigem=function(){try{var p=location.pathname.split('/').filter(Boolean);
if(!p.length)return 'home';if(p.indexOf('bairro')>=0)return 'bairro';
// 05/09/2026 (teste de clique): cidade de fora de SC mora em /<uf>/<cidade>/. Sem descartar a
// UF, Santos, Limeira, Piracicaba, Campinas e Sao Paulo viravam o MESMO "cidade:sp", as 11
// capitais viravam "cidade:se", "cidade:rn"... e /sp/sao-paulo/casas/ era contado como cidade
// em vez de segmento. Eram 16 das 35 cidades publicadas sem origem propria no relatorio.
var UF=['ac','al','ap','am','ba','ce','df','es','go','ma','mt','ms','mg','pa','pb','pr','pe','pi','rj','rn','rs','ro','rr','sc','sp','se','to'];
if(p.length>1&&UF.indexOf(p[0])>=0)p=p.slice(1);
var f=['calculadora','comparar','onde-cabe','por-perto','inquilino-ou-dono','minha-casa-minha-vida','informe','assistente','metodologia','historico','anuncie','ranking','quem-somos','privacidade','conector','imprensa','corredores'];
if(f.indexOf(p[0])>=0)return p[0];
var seg=['casas','terrenos','salas','galpoes','apartamentos'];
if(seg.indexOf(p[0])>=0||(p.length>1&&seg.indexOf(p[1])>=0))return 'segmento';
return 'cidade:'+p[0];}catch(e){return '';}};
if(_mqApp)try{gtag('event','origem_app',{rotulo:_mqApp,categoria:location.pathname});}catch(e){}
// marca de aparelho interno tambem como propriedade de usuario: assim o aparelho do Jales
// (inclusive o celular) fica separavel no relatorio depois de registrar a dimensao de escopo
// USUARIO chamada 'interno' no GA4. So o traffic_type nao basta, ele e inerte sem o filtro.
if(_mqInt)try{gtag('set','user_properties',{interno:'1'});}catch(e){}
// 12/09/2026 (farol): o GitHub Pages nao da log de acesso ao dono, entao o GA4 conta o robo
// mas nao diz QUAL robo e (o caso: 125 dos 421 acessos de 12/09 vindos da China). Uma batida
// no nosso proprio Worker registra o user-agent bruto de quem executa este script, que e
// exatamente a mesma populacao que o GA4 ve. Vai so o balde de rota, nunca a URL inteira;
// nao ha cookie nem identificador, e quem desligou a medicao ou e da redacao nao dispara.
try{if(!_mqInt&&localStorage.getItem('mq_optout')!=='1'){var _fj=JSON.stringify({r:(window.mqOrigem?mqOrigem():'')||'?'});
if(navigator.sendBeacon)navigator.sendBeacon('https://mcp.metroquadrado.workers.dev/farol',_fj);
else fetch('https://mcp.metroquadrado.workers.dev/farol',{method:'POST',body:_fj,keepalive:true,mode:'no-cors'});}}catch(e){}
// 13/09/2026 (cronometro do anuncio): o GA4 contou 0 s de tempo engajado para 89 visitas pagas,
// porque o navegador do Instagram fecha a pagina antes do evento de saida. So quando a visita vem
// de anuncio (utm_medium=paid), a pagina bate no nosso Worker a cada 5 s enquanto esta NA TELA.
// O codigo da visita fica so nesta aba (sessionStorage), entao segue do ranking para a calculadora.
try{if(!_mqInt&&localStorage.getItem('mq_optout')!=='1'){var _ca=null;try{_ca=JSON.parse(sessionStorage.getItem('mq_anuncio')||'null');}catch(e){}
 var _qs=location.search||'';
 if(!_ca&&/[?&]utm_medium=paid(&|$)/i.test(_qs)){var _qc=/[?&]utm_campaign=([^&]*)/.exec(_qs),_qo=/[?&]utm_source=([^&]*)/.exec(_qs);
  _ca={s:Math.random().toString(36).slice(2,12)+Date.now().toString(36),c:_qc?decodeURIComponent(_qc[1]).slice(0,40):'',o:_qo?decodeURIComponent(_qo[1]).slice(0,20):'',e:(window.mqOrigem?mqOrigem():'')||'?'};
  try{sessionStorage.setItem('mq_anuncio',JSON.stringify(_ca));}catch(e){}}
 if(_ca&&navigator.sendBeacon){var _cp=(window.mqOrigem?mqOrigem():'')||'?',_cv=0,_cu=Date.now(),_cn=0,_cvis=!document.hidden;
  var _crol=0;window.addEventListener('scroll',function(){var d=document.documentElement,H=d.scrollHeight-d.clientHeight;if(H>0)_crol=Math.max(_crol,Math.round(window.pageYOffset/H*100));},{passive:true});
  // 13/09/2026 (jornada do anuncio): pedido do Jales, saber tudo o que cada visita do anuncio faz.
  // Uma batida por acao: abriu, tocou no campo, preencheu/digitou (valor dos campos), clicou, rolou, saiu, voltou, fechou.
  if(!_ca.t){_ca.t=Date.now();try{sessionStorage.setItem('mq_anuncio',JSON.stringify(_ca));}catch(e){}}
  var _jq=0;try{_jq=+sessionStorage.getItem('mq_jseq')||0;}catch(e){}
  window.mqJornada=function(ac,dt){if(_jq>=400)return;_jq++;try{sessionStorage.setItem('mq_jseq',String(_jq));}catch(e){}
   try{navigator.sendBeacon('https://mcp.metroquadrado.workers.dev/jornada',JSON.stringify({s:_ca.s,n:_jq,t:Math.round((Date.now()-_ca.t)/1000),p:_cp,u:location.pathname.slice(0,80),a:ac,d:String(dt==null?'':dt).slice(0,150)}));}catch(e){}};
  var _jref='';try{var _jr=document.referrer?new URL(document.referrer):null;if(_jr&&_jr.host===location.host)_jref=' | veio de '+_jr.pathname;}catch(e){}
  mqJornada('abriu',(document.title||'').slice(0,70)+_jref+' | tela '+window.innerWidth+'x'+window.innerHeight);
  var _jnome=function(el){var l=el.id||el.name||'';if(!l&&el.labels&&el.labels[0])l=el.labels[0].textContent||'';return (l||el.tagName.toLowerCase()).trim().slice(0,30);};
  var _jval=function(el){if(el.tagName==='SELECT'){var o=el.options[el.selectedIndex];return o?o.text:'';}if(el.type==='checkbox'||el.type==='radio')return el.checked?'marcado':'desmarcado';return el.value;};
  var _jcampo=function(el){return el&&(el.tagName==='INPUT'||el.tagName==='SELECT'||el.tagName==='TEXTAREA');};
  var _jfoco={},_jdig={},_jrol={};
  document.addEventListener('focusin',function(e){var el=e.target;if(!_jcampo(el))return;var k=_jnome(el);if(_jfoco[k])return;_jfoco[k]=1;mqJornada('tocou no campo',k);},true);
  document.addEventListener('change',function(e){var el=e.target;if(!_jcampo(el))return;mqJornada('preencheu',_jnome(el)+' = '+_jval(el));},true);
  document.addEventListener('input',function(e){var el=e.target;if(!_jcampo(el)||el.tagName==='SELECT'||el.type==='checkbox'||el.type==='radio')return;var k=_jnome(el);clearTimeout(_jdig[k]);_jdig[k]=setTimeout(function(){mqJornada('digitou',k+' = '+el.value);},1200);},true);
  document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a,button,summary,label,[role=button]'):null;if(!a)return;var h=a.getAttribute('href')||'';mqJornada('clicou',(a.textContent||a.getAttribute('aria-label')||'').trim().slice(0,60)+(h?' -> '+h.slice(0,80):''));},true);
  window.addEventListener('scroll',function(){var d=document.documentElement,H=d.scrollHeight-d.clientHeight;if(H<=0)return;var p=Math.round(window.pageYOffset/H*100);[25,50,75,100].forEach(function(m){if(p>=m&&!_jrol[m]){_jrol[m]=1;mqJornada('rolou',m+'%');}});},{passive:true});
  var _cmanda=function(f){var a=Date.now();if(_cvis)_cv+=a-_cu;_cu=a;
   try{navigator.sendBeacon('https://mcp.metroquadrado.workers.dev/cronometro',JSON.stringify({s:_ca.s,c:_ca.c,o:_ca.o,e:_ca.e,p:_cp,v:Math.round(_cv/1000),r:window._mqResultado?1:0,f:f?1:0,a:Math.max(window._mqEtapa||0,window._mqResultado?5:0),l:_crol}));}catch(e){}};
  setTimeout(function(){_cmanda(0);},1500);
  setInterval(function(){if(_cvis&&_cn<360){_cn++;_cmanda(0);}},5000);
  document.addEventListener('visibilitychange',function(){if(document.hidden){_cmanda(1);_cvis=false;mqJornada('saiu da tela',Math.round(_cv/1000)+' s na tela');}else{_cu=Date.now();_cvis=true;mqJornada('voltou','');}});
  window.addEventListener('pagehide',function(){_cmanda(1);mqJornada('fechou a pagina',Math.round(_cv/1000)+' s na tela');});}}}catch(e){}