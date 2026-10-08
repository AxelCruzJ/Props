const STORAGE_KEY='mis-propinas-v1';
let records=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
let tipMode='percent';
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(n)||0);
const number=v=>Number(String(v).replace(',','.'))||0;
const todayKey=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const isToday=r=>r.date===todayKey();
function calculate(){const bill=number($('billTotal').value), raw=number($('tipValue').value), tip=tipMode==='percent'?bill*raw/100:raw, house=bill*.05;return {bill,tip,house,net:tip-house,percent:bill?tip/bill*100:0};}
function renderLive(){const c=calculate();$('liveHouse').textContent=money(c.house);$('liveNet').textContent=money(c.net);$('liveNet').classList.toggle('negative',c.net<0);}
function render(){const todays=records.filter(isToday);const tips=todays.reduce((s,r)=>s+r.tip,0), house=todays.reduce((s,r)=>s+r.house,0), net=tips-house;$('summaryTitle').innerHTML=`${money(net)} <span>neto</span>`;$('summaryTips').textContent=money(tips);$('summaryHouse').textContent=money(house);$('summaryCount').textContent=todays.length;$('todayLabel').textContent=new Intl.DateTimeFormat('es-MX',{day:'numeric',month:'short'}).format(new Date());$('clearButton').classList.toggle('hidden',!records.length);$('emptyState').classList.toggle('hidden',!!todays.length);$('history').innerHTML=todays.map(r=>`<article class="history-item"><div><div class="title">${money(r.bill)} de cuenta</div><div class="detail">${r.percent.toFixed(1).replace('.0','')}% propina · ${money(r.house)} caja</div></div><div><div class="net ${r.net<0?'negative':''}">${money(r.net)}</div><div class="time">${r.time}</div></div></article>`).join('');}
document.querySelectorAll('.segment').forEach(b=>b.addEventListener('click',()=>{tipMode=b.dataset.mode;document.querySelectorAll('.segment').forEach(x=>x.classList.toggle('active',x===b));$('tipPrefix').textContent=tipMode==='percent'?'%':'$';$('tipValue').placeholder=tipMode==='percent'?'0':'0.00';$('tipHelp').textContent=tipMode==='percent'?'Escribe el porcentaje que te dejaron.':'Escribe cuánto dinero te dejaron de propina.';renderLive();}));
['billTotal','tipValue'].forEach(id=>$(id).addEventListener('input',renderLive));
$('tipForm').addEventListener('submit',e=>{e.preventDefault();const c=calculate();if(c.bill<=0||c.tip<0){showToast('Revisa los datos ingresados');return}records.unshift({id:Date.now(),date:todayKey(),time:new Intl.DateTimeFormat('es-MX',{hour:'numeric',minute:'2-digit'}).format(new Date()),...c});localStorage.setItem(STORAGE_KEY,JSON.stringify(records));e.target.reset();renderLive();render();showToast('Registro guardado');});
$('clearButton').addEventListener('click',()=>{if(confirm('¿Borrar todos los registros guardados en este dispositivo?')){records=[];localStorage.removeItem(STORAGE_KEY);render();showToast('Historial borrado');}});
function showToast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
$('howButton').addEventListener('click',()=>$('howDialog').showModal());$('closeDialog').addEventListener('click',()=>$('howDialog').close());
let deferredPrompt;$('installButton').addEventListener('click',async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('installButton').classList.add('hidden')}});window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('installButton').classList.remove('hidden')});
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');renderLive();render();
