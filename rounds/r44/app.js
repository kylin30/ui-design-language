/* R42 运行时：主题、图表、toast、抽屉、分段/标签切换 */
(function(){
var d=document.documentElement;
try{var t=localStorage.getItem('r44-theme');if(t==='dark')d.setAttribute('data-theme','dark')}catch(e){}
window.r44theme=function(){var dk=d.getAttribute('data-theme')==='dark';if(dk)d.removeAttribute('data-theme');else d.setAttribute('data-theme','dark');try{localStorage.setItem('r44-theme',dk?'light':'dark')}catch(e){}};
var tmr;window.toast=function(type,msg,undo){var el=document.getElementById('toast');if(!el)return;var ic={ok:'i-ok',warn:'i-warn',bad:'i-bad',info:'i-info'}[type];el.innerHTML='<svg class="ic '+type+'"><use href="#'+ic+'"/></svg><span>'+msg+'</span>'+(undo?'<button class="btn gho s28" type="button">撤销</button>':'');el.classList.add('show');var b=el.querySelector('button');if(b)b.onclick=function(){el.classList.remove('show');undo()};clearTimeout(tmr);tmr=setTimeout(function(){el.classList.remove('show')},3200)};
window.drawer=function(on){document.body.classList.toggle('open',on)};
document.addEventListener('click',function(e){var b=e.target.closest('.seg button');if(b){b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});if(b.dataset.k&&window.onSeg)window.onSeg(b.dataset.k)}
var tb=e.target.closest('.tabs a');if(tb){e.preventDefault();if(tb.classList.contains('on'))return;tb.parentNode.querySelectorAll('a').forEach(function(x){x.classList.toggle('on',x===tb)});var pn=tb.closest('.panel'),tbl=pn&&pn.querySelector('.tbl'),f=tb.dataset.f;if(tbl&&f)tabSwitch(tbl,f)}
var li=e.target.closest('.li[data-sel]');if(li){li.parentNode.querySelectorAll('.li').forEach(function(x){x.classList.toggle('on',x===li)});if(window.onSel){var dt=document.querySelector('[data-detail]');window.onSel(li.dataset.sel);if(dt&&!RM.matches&&dt.animate){dt.getAnimations().forEach(function(a){a.finish()});dt.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:200,easing:'cubic-bezier(.2,.6,.2,1)'})}}}});
var RM=window.matchMedia('(prefers-reduced-motion: reduce)'),seq=0,tmr2=null;
function tabSwitch(tbl,f){var cur=tbl.dataset.f||'all';if(cur===f)return;tbl.dataset.f=f;var bd=tbl.tBodies[0];
 var apply=function(){[].forEach.call(bd.rows,function(r){r.hidden=!(f==='all'||(' '+(r.dataset.c||'')+' ').indexOf(' '+f+' ')>=0)});footSync(tbl)};
 var before=[].map.call(bd.rows,function(r){return r.hidden}).join();var probe=[].map.call(bd.rows,function(r){return !(f==='all'||(' '+(r.dataset.c||'')+' ').indexOf(' '+f+' ')>=0)}).join();
 if(before===probe||RM.matches){apply();return}
 var id=++seq;clearTimeout(tmr2);tbl.classList.add('sk');bd.classList.add('loading');
 tmr2=setTimeout(function(){if(id!==seq)return;apply();bd.classList.remove('loading')},360)}
window.tabSwitch=tabSwitch;
function footSync(tbl){var pn=tbl.closest('.panel'),ft=pn&&pn.querySelector('[data-foot]');if(!ft)return;var n=[].filter.call(tbl.tBodies[0].rows,function(r){return !r.hidden}).length;var on=pn.querySelector('.tabs a.on .bdg');var tot=on?parseInt(on.textContent.replace(/,/g,''),10):n;ft.dataset.total=tot;ft.textContent=n?('显示 1–'+n+'，共 '+tot+' 条'):'暂无数据'}
var NS='http://www.w3.org/2000/svg';
function el(n,a,p){var x=document.createElementNS(NS,n);for(var k in a)if(a[k]!==null)x.setAttribute(k,a[k]);if(p)p.appendChild(x);return x}
window.lineChart=function(svg,cfg){var W=svg.clientWidth||svg.parentNode.clientWidth,H=+svg.getAttribute('height');svg.setAttribute('viewBox','0 0 '+W+' '+H);while(svg.firstChild)svg.removeChild(svg.firstChild);
var L=40,R=8,T=8,B=24,max=cfg.max,n=cfg.labels.length;var x=function(i){return L+(W-L-R)*i/(n-1)},y=function(v){return T+(H-T-B)*(1-v/max)};
for(var g=0;g<=4;g++){var v=max*g/4,yy=Math.round(y(v))+.5;el('line',{x1:L,x2:W-R,y1:yy,y2:yy,'class':'grid-l'},svg);var t=el('text',{x:L-8,y:Math.round(yy+4),'text-anchor':'end','class':'axis'},svg);t.textContent=cfg.fmt?cfg.fmt(v):v}
var step=Math.ceil(n/7);cfg.labels.forEach(function(l,i){if((i%step||n-1-i<step)&&i!==n-1)return;var t=el('text',{x:Math.round(x(i)),y:H-6,'text-anchor':i===0?'start':(i===n-1?'end':'middle'),'class':'axis'},svg);t.textContent=l});
cfg.series.forEach(function(s){var dd=s.data.map(function(v,i){return(i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join('');el('path',{d:dd,'class':'ln s'+s.c+(s.dash?' dash':''),'data-series':s.c},svg)});
var last=cfg.series.filter(function(s){return !s.dash})[0];el('circle',{cx:x(n-1),cy:y(last.data[n-1]),r:4,'class':'f'+last.c,'data-series':last.c},svg)};
window.barChart=function(svg,cfg){var W=svg.clientWidth||svg.parentNode.clientWidth,H=+svg.getAttribute('height');svg.setAttribute('viewBox','0 0 '+W+' '+H);while(svg.firstChild)svg.removeChild(svg.firstChild);
var L=40,R=8,T=8,B=24,n=cfg.labels.length,max=cfg.max,bw=(W-L-R)/n,y=function(v){return T+(H-T-B)*(1-v/max)};
for(var g=0;g<=4;g++){var v=max*g/4,yy=Math.round(y(v))+.5;el('line',{x1:L,x2:W-R,y1:yy,y2:yy,'class':'grid-l'},svg);var t=el('text',{x:L-8,y:Math.round(yy+4),'text-anchor':'end','class':'axis'},svg);t.textContent=v}
cfg.labels.forEach(function(l,i){var cx=Math.round(L+bw*i+bw/2),acc=0;cfg.series.forEach(function(s){var v=s.data[i];el('rect',{x:cx-8,width:16,y:y(acc+v),height:y(acc)-y(acc+v),'class':'f'+s.c,'data-series':s.c},svg);acc+=v});var t=el('text',{x:cx,y:H-6,'text-anchor':'middle','class':'axis'},svg);t.textContent=l})};
window.addEventListener('resize',function(){if(window.drawCharts)window.drawCharts()});
document.addEventListener('DOMContentLoaded',function(){if(window.drawCharts)window.drawCharts()});
})();
// 文字起点取整：middle/end 锚点会让字形起点落在半像素，改为 start + 整数 x
function snapText(svg){[].forEach.call(svg.querySelectorAll('text'),function(t){var a=t.getAttribute('text-anchor')||'start',w=t.getComputedTextLength(),x=+t.getAttribute('x');var s=a==='middle'?x-w/2:(a==='end'?x-w:x);t.setAttribute('x',Math.round(s));t.setAttribute('text-anchor','start');t.setAttribute('y',Math.round(+t.getAttribute('y')))})}
['lineChart','barChart'].forEach(function(k){var f=window[k];if(f)window[k]=function(svg,cfg){var r=f(svg,cfg);if(svg)snapText(svg);return r}});
