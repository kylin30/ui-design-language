/* R42 运行时：主题、图表、toast、抽屉、分段/标签切换 */
(function(){
var d=document.documentElement;
try{var t=localStorage.getItem('r93-theme');if(t==='dark')d.setAttribute('data-theme','dark')}catch(e){}
window.r93theme=function(){var dk=d.getAttribute('data-theme')==='dark';if(dk)d.removeAttribute('data-theme');else d.setAttribute('data-theme','dark');try{localStorage.setItem('r93-theme',dk?'light':'dark')}catch(e){}};
var tmr;window.toast=function(type,msg,undo){var el=document.getElementById('toast');if(!el)return;var ic={ok:'i-ok',warn:'i-warn',bad:'i-bad',info:'i-info'}[type];el.innerHTML='<svg class="ic '+type+'"><use href="#'+ic+'"/></svg><span>'+msg+'</span>'+(undo?'<button class="btn gho s28" type="button">撤销</button>':'');el.classList.add('show');var b=el.querySelector('button');if(b)b.onclick=function(){el.classList.remove('show');undo()};clearTimeout(tmr);tmr=setTimeout(function(){el.classList.remove('show')},3200)};
window.drawer=function(on){document.body.classList.toggle('open',on)};
document.addEventListener('click',function(e){var b=e.target.closest('.seg button');if(b){b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});if(b.dataset.k&&window.onSeg)window.onSeg(b.dataset.k)}
var tb=e.target.closest('.tabs a');if(tb){e.preventDefault();if(tb.classList.contains('on'))return;tb.parentNode.querySelectorAll('a').forEach(function(x){x.classList.toggle('on',x===tb)});var scope=tb.closest('.chapter')||tb.closest('.panel'),tbl=scope&&scope.querySelector('.tbl'),f=tb.dataset.f;if(tbl&&f)tabSwitch(tbl,f)}
var fb=e.target.closest('.bar.filt.text .txt');if(fb&&!fb.classList.contains('mute')){var bar=fb.closest('.bar.filt');bar.querySelectorAll('.txt:not(.mute)').forEach(function(x){var on=x===fb;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on?'true':'false')});return}var li=e.target.closest('.li[data-sel]');if(li){li.parentNode.querySelectorAll('.li').forEach(function(x){var on=x===li;x.classList.toggle('on',on);if(on)x.setAttribute('aria-current','true');else x.removeAttribute('aria-current')});if(window.onSel){var dt=document.querySelector('[data-detail]');window.onSel(li.dataset.sel);if(dt&&!RM.matches&&dt.animate){dt.getAnimations().forEach(function(a){a.finish()});dt.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:200,easing:'cubic-bezier(.2,.6,.2,1)'})}if(dt&&(dt.closest('.ch-flow.drill')||window.matchMedia('(max-width:1280px)').matches)){var beh=RM.matches?'auto':'smooth';requestAnimationFrame(function(){try{dt.scrollIntoView({block:'start',behavior:beh})}catch(err){dt.scrollIntoView(true)}})}}}});
var RM=window.matchMedia('(prefers-reduced-motion: reduce)'),seq=0,tmr2=null;
function tabSwitch(tbl,f){var cur=tbl.dataset.f||'all';if(cur===f)return;tbl.dataset.f=f;var bd=tbl.tBodies[0];
 var apply=function(){[].forEach.call(bd.rows,function(r){r.hidden=!(f==='all'||(' '+(r.dataset.c||'')+' ').indexOf(' '+f+' ')>=0)});footSync(tbl)};
 var before=[].map.call(bd.rows,function(r){return r.hidden}).join();var probe=[].map.call(bd.rows,function(r){return !(f==='all'||(' '+(r.dataset.c||'')+' ').indexOf(' '+f+' ')>=0)}).join();
 if(before===probe||RM.matches){apply();return}
 var id=++seq;clearTimeout(tmr2);tbl.classList.add('sk');bd.classList.add('loading');
 tmr2=setTimeout(function(){if(id!==seq)return;apply();bd.classList.remove('loading')},360)}
window.tabSwitch=tabSwitch;
function footSync(tbl){var scope=tbl.closest('.chapter')||tbl.closest('.panel'),ft=scope&&scope.querySelector('[data-foot]');if(!ft)return;var n=[].filter.call(tbl.tBodies[0].rows,function(r){return !r.hidden}).length;var on=scope.querySelector('.tabs a.on .bdg');var tot=on?parseInt(on.textContent.replace(/,/g,''),10):n;ft.dataset.total=tot;ft.textContent=n?('显示 1–'+n+'，共 '+tot+' 条'):'暂无数据'}
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

/* R54 motion */
(function(){
var RM=window.matchMedia('(prefers-reduced-motion: reduce)');
function prepDraw(svg){
  if(RM.matches||!svg)return;
  [].forEach.call(svg.querySelectorAll('path.ln'),function(p){
    try{
      var len=p.getTotalLength();
      if(!len)return;
      p.classList.add('draw-once');
      p.style.strokeDasharray=String(len);
      p.style.strokeDashoffset=String(len);
      p.dataset.len=String(len);
    }catch(e){}
  });
}
function runDraw(svg){
  if(!svg||svg.dataset.drawn==='1')return;
  svg.dataset.drawn='1';
  if(RM.matches){
    [].forEach.call(svg.querySelectorAll('path.ln'),function(p){
      p.style.strokeDasharray='';p.style.strokeDashoffset='';
    });
    return;
  }
  prepDraw(svg);
  requestAnimationFrame(function(){
    [].forEach.call(svg.querySelectorAll('path.ln.draw-once'),function(p){
      p.style.transition='stroke-dashoffset 480ms cubic-bezier(.2,.6,.2,1)';
      p.style.strokeDashoffset='0';
    });
  });
}
function chartRoots(){
  var out=[];
  document.querySelectorAll('.chart').forEach(function(c){
    var s=c.tagName==='svg'?c:c.querySelector('svg');
    if(s)out.push({root:c.tagName==='svg'?c.parentNode||c:c,svg:s});
  });
  document.querySelectorAll('svg.chart').forEach(function(s){
    if(!out.some(function(o){return o.svg===s}))out.push({root:s.parentNode||s,svg:s});
  });
  return out;
}
function observeCharts(){
  var items=chartRoots();
  if(!items.length)return;
  if(!('IntersectionObserver' in window)||RM.matches){
    items.forEach(function(it){runDraw(it.svg)});
    return;
  }
  var io=new IntersectionObserver(function(ents){
    ents.forEach(function(en){
      if(!en.isIntersecting)return;
      var hit=items.find(function(it){return it.root===en.target||it.svg===en.target});
      if(!hit)return;
      runDraw(hit.svg);
      io.unobserve(en.target);
    });
  },{threshold:0.2,rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(it){
    prepDraw(it.svg);
    io.observe(it.root);
  });
}
function afterCharts(){
  // allow page drawCharts to finish, then arm observers (idempotent per svg)
  requestAnimationFrame(function(){requestAnimationFrame(observeCharts)});
}
document.addEventListener('DOMContentLoaded',function(){
  afterCharts();
  var _ts=window.tabSwitch;
  if(_ts)window.tabSwitch=function(tbl,f){
    _ts(tbl,f);
    if(RM.matches)return;
    var bd=tbl.tBodies[0];
    [].forEach.call(bd.rows,function(r){
      if(r.hidden)return;
      r.classList.remove('hl-pulse');
      void r.offsetWidth;
      r.classList.add('hl-pulse');
    });
    setTimeout(function(){[].forEach.call(bd.rows,function(r){r.classList.remove('hl-pulse')})},450);
  };
});
window.addEventListener('load',afterCharts);
// preserve resize redraw without re-animating
var _onResize=window.onresize;
window.addEventListener('resize',function(){
  document.querySelectorAll('svg[data-drawn="1"] path.ln').forEach(function(p){
    p.classList.remove('draw-once');
    p.style.transition='';
    p.style.strokeDasharray='';
    p.style.strokeDashoffset='';
  });
});
})();

/* R54: spark pathLength=1 so CSS spark-draw works; reduced-motion skips via CSS */
(function(){
  function armSpark(){
    document.querySelectorAll('.kpi .spark path').forEach(function(p){
      try{p.setAttribute('pathLength','1')}catch(e){}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',armSpark);
  else armSpark();

function bindListStick(list){var grps=[].slice.call(list.querySelectorAll(':scope > .grp'));if(grps.length<1)return;var tops;function measure(){var st=list.scrollTop;list.scrollTop=0;grps.forEach(function(g){g.classList.remove('is-stick')});var lr=list.getBoundingClientRect().top;tops=grps.map(function(g){return g.getBoundingClientRect().top-lr});list.scrollTop=st}measure();var tick=function(){var top=list.scrollTop,active=grps[0],i;for(i=0;i<grps.length;i++){if(tops[i]<=top+1)active=grps[i];else break}grps.forEach(function(g){g.classList.toggle('is-stick',g===active)})};list.addEventListener('scroll',tick,{passive:true});tick()}
function initListStick(){document.querySelectorAll('.list').forEach(bindListStick)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initListStick);else initListStick();

})();