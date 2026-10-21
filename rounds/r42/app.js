/* R42 运行时：主题、图表、toast、抽屉、分段/标签切换 */
(function(){
var d=document.documentElement;
try{var t=localStorage.getItem('r42-theme');if(t==='dark')d.setAttribute('data-theme','dark')}catch(e){}
window.r42theme=function(){var dk=d.getAttribute('data-theme')==='dark';if(dk)d.removeAttribute('data-theme');else d.setAttribute('data-theme','dark');try{localStorage.setItem('r42-theme',dk?'light':'dark')}catch(e){}};
var tmr;window.toast=function(type,msg,undo){var el=document.getElementById('toast');if(!el)return;var ic={ok:'i-ok',warn:'i-warn',bad:'i-bad',info:'i-info'}[type];el.innerHTML='<svg class="ic '+type+'"><use href="#'+ic+'"/></svg><span>'+msg+'</span>'+(undo?'<button class="btn gho s28" type="button">撤销</button>':'');el.classList.add('show');var b=el.querySelector('button');if(b)b.onclick=function(){el.classList.remove('show');undo()};clearTimeout(tmr);tmr=setTimeout(function(){el.classList.remove('show')},3200)};
window.drawer=function(on){document.body.classList.toggle('open',on)};
document.addEventListener('click',function(e){var b=e.target.closest('.seg button');if(b){b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});if(b.dataset.k&&window.onSeg)window.onSeg(b.dataset.k)}
var tb=e.target.closest('.tabs a');if(tb){e.preventDefault();tb.parentNode.querySelectorAll('a').forEach(function(x){x.classList.toggle('on',x===tb)})}
var li=e.target.closest('.li[data-sel]');if(li){li.parentNode.querySelectorAll('.li').forEach(function(x){x.classList.toggle('on',x===li)});if(window.onSel)window.onSel(li.dataset.sel)}});
var NS='http://www.w3.org/2000/svg';
function el(n,a,p){var x=document.createElementNS(NS,n);for(var k in a)x.setAttribute(k,a[k]);if(p)p.appendChild(x);return x}
window.lineChart=function(svg,cfg){var W=svg.clientWidth||svg.parentNode.clientWidth,H=+svg.getAttribute('height');svg.setAttribute('viewBox','0 0 '+W+' '+H);while(svg.firstChild)svg.removeChild(svg.firstChild);
var L=40,R=8,T=8,B=24,max=cfg.max,n=cfg.labels.length;var x=function(i){return L+(W-L-R)*i/(n-1)},y=function(v){return T+(H-T-B)*(1-v/max)};
for(var g=0;g<=4;g++){var v=max*g/4,yy=Math.round(y(v))+.5;el('line',{x1:L,x2:W-R,y1:yy,y2:yy,'class':'grid-l'},svg);var t=el('text',{x:L-8,y:yy+4,'text-anchor':'end','class':'axis'},svg);t.textContent=cfg.fmt?cfg.fmt(v):v}
var step=Math.ceil(n/7);cfg.labels.forEach(function(l,i){if((i%step||n-1-i<step)&&i!==n-1)return;var t=el('text',{x:x(i),y:H-6,'text-anchor':i===0?'start':(i===n-1?'end':'middle'),'class':'axis'},svg);t.textContent=l});
cfg.series.forEach(function(s){var dd=s.data.map(function(v,i){return(i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join('');el('path',{d:dd,'class':'ln s'+s.c+(s.dash?' dash':''),'data-series':s.c},svg)});
var last=cfg.series.filter(function(s){return !s.dash})[0];el('circle',{cx:x(n-1),cy:y(last.data[n-1]),r:4,'class':'f'+last.c,'data-series':last.c},svg)};
window.barChart=function(svg,cfg){var W=svg.clientWidth||svg.parentNode.clientWidth,H=+svg.getAttribute('height');svg.setAttribute('viewBox','0 0 '+W+' '+H);while(svg.firstChild)svg.removeChild(svg.firstChild);
var L=40,R=8,T=8,B=24,n=cfg.labels.length,max=cfg.max,bw=(W-L-R)/n,y=function(v){return T+(H-T-B)*(1-v/max)};
for(var g=0;g<=4;g++){var v=max*g/4,yy=Math.round(y(v))+.5;el('line',{x1:L,x2:W-R,y1:yy,y2:yy,'class':'grid-l'},svg);var t=el('text',{x:L-8,y:yy+4,'text-anchor':'end','class':'axis'},svg);t.textContent=v}
cfg.labels.forEach(function(l,i){var cx=L+bw*i+bw/2,acc=0;cfg.series.forEach(function(s){var v=s.data[i];el('rect',{x:cx-8,width:16,y:y(acc+v),height:y(acc)-y(acc+v),'class':'f'+s.c,'data-series':s.c},svg);acc+=v});var t=el('text',{x:cx,y:H-6,'text-anchor':'middle','class':'axis'},svg);t.textContent=l})};
window.addEventListener('resize',function(){if(window.drawCharts)window.drawCharts()});
document.addEventListener('DOMContentLoaded',function(){if(window.drawCharts)window.drawCharts()});
})();
