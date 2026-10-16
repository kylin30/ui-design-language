/* R16 数字字体切换：data-figure（默认 geist）· localStorage 'uidl-figure' · ?figure= */
(function(){
  var FS=[
    {id:'geist',name:'Geist · 利落',font:'Geist Sans（自托管 · OFL）',line:'几何感、窄而清晰，1 和 7 干脆，600 字重做大数，表格 500。默认。'},
    {id:'inter',name:'Inter · 稳妥',font:'Inter（自托管 · OFL）',line:'最通用的界面数字，开口 4 / 6 / 9，-1.5% 字距，大数 600。'},
    {id:'sys',name:'系统 · 零下载',font:'SF Pro / Segoe UI（随系统）',line:'不下载任何字体：苹果用 SF Pro，Windows 用 Segoe UI，都开等宽数字。'},
    {id:'barlow',name:'Barlow · 仪表',font:'Barlow（自托管 · OFL，DIN 风）',line:'DIN 一样的窄方数字，像仪表盘和票据，字距略放 0.5%。'},
    {id:'plex',name:'Plex · 工程',font:'IBM Plex Sans（自托管 · OFL）',line:'有书写感的工程数字，0 带棱角，大数只用 500，安静。'},
    {id:'roboto',name:'Roboto · 安卓',font:'Roboto（自托管 · OFL）',line:'安卓和 Material 的默认数字，圆润中性，大数 500。'}
  ];
  var root=document.documentElement,DEF='geist';
  function get(id){for(var i=0;i<FS.length;i++)if(FS[i].id===id)return FS[i];return null;}
  function cur(){return root.getAttribute('data-figure')||DEF;}
  var q=null;try{q=new URL(location.href).searchParams.get('figure');}catch(e){}
  var s=null;try{s=localStorage.getItem('uidl-figure');}catch(e){}
  var init=(q&&get(q))?q:((s&&get(s))?s:DEF);
  root.setAttribute('data-figure',init);if(q&&get(q)){try{localStorage.setItem('uidl-figure',q);}catch(e){}}
  var w;
  function set(id){var f=get(id)||get(DEF);root.setAttribute('data-figure',f.id);try{localStorage.setItem('uidl-figure',f.id);}catch(e){}
    try{var u=new URL(location.href);if(f.id===DEF)u.searchParams.delete('figure');else u.searchParams.set('figure',f.id);history.replaceState(null,'',u);}catch(e){}
    sync();document.dispatchEvent(new CustomEvent('uidl:figure',{detail:f.id}));}
  function sync(){var f=get(cur());
    if(w){w.querySelector('.ts-btn').innerHTML='<span class="fs-a">12</span>数字 · '+f.name.split(' · ')[0]+' ▾';
      w.querySelectorAll('.ts-item').forEach(function(i){i.setAttribute('aria-checked',i.dataset.id===f.id);});}
    document.querySelectorAll('[data-figure-card]').forEach(function(c){c.classList.toggle('on',c.getAttribute('data-figure-card')===f.id);});
    document.querySelectorAll('[data-figname]').forEach(function(e){e.textContent=f.name;});}
  function adopt(id){var f=get(id);set(id);
    var p=document.querySelector('.uifb');if(p&&p.classList.contains('uifb-collapsed')){p.classList.remove('uifb-collapsed');try{localStorage.setItem('uifb-open','1');}catch(e){}}
    setTimeout(function(){var ta=document.querySelector('.uifb textarea');if(ta){ta.value='[选定数字字体: '+f.id+'] '+f.name+(ta.value&&!/^\[选定数字字体/.test(ta.value)?'\n'+ta.value:'');ta.focus();}},60);}
  window.UIDLFigure={set:set,list:FS,adopt:adopt,cur:cur};
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.uifb-submit');if(!b)return;
    var ta=document.querySelector('.uifb textarea');if(ta&&!/\[(当前|选定)数字字体: /.test(ta.value))ta.value=(ta.value?ta.value+'\n':'')+'[当前数字字体: '+cur()+']';},true);
  function mount(){
    w=document.createElement('div');w.className='ts fs';
    w.innerHTML='<button type="button" class="ts-btn" aria-haspopup="menu" title="切换数字字体"></button><div class="ts-menu" role="menu"><div class="h">数字字体</div>'+
      FS.map(function(f){return '<button type="button" role="menuitemradio" class="ts-item" data-id="'+f.id+'" data-figure-sample="'+f.id+'"><span class="fs-s">¥2,318.40</span>'+f.name+(f.id===DEF?'<em>默认</em>':'')+'</button>';}).join('')+
      '<div class="ts-sep"></div><a class="ts-item" href="figures.html" data-keep-theme>并排比较 →</a></div>';
    var slot=document.querySelector('[data-theme-slot]');if(slot)slot.parentNode.insertBefore(w,slot);else{w.style.cssText='position:fixed;top:10px;right:170px;z-index:600';document.body.appendChild(w);}
    w.querySelector('.ts-btn').onclick=function(e){e.stopPropagation();w.classList.toggle('open');};
    w.querySelectorAll('.ts-item[data-id]').forEach(function(i){i.onclick=function(){set(i.dataset.id);w.classList.remove('open');};});
    document.addEventListener('click',function(e){if(!w.contains(e.target))w.classList.remove('open');});
    document.querySelectorAll('[data-try-figure]').forEach(function(b){b.onclick=function(){set(b.getAttribute('data-try-figure'));};});
    document.querySelectorAll('[data-adopt-figure]').forEach(function(b){b.onclick=function(){adopt(b.getAttribute('data-adopt-figure'));};});
    sync();}
  /* 统一大数的写法：¥ 缩小上提，% 缩小，负号用 −（U+2212） */
  function deco(){document.querySelectorAll('.fig').forEach(function(el){Array.prototype.slice.call(el.childNodes).forEach(function(n){
    if(n.nodeType!==3||!/[¥%\-]/.test(n.nodeValue))return;var h=n.nodeValue.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/-(?=\d)/g,'−').replace(/¥/g,'<span class="cur">¥</span>').replace(/%/g,'<span class="pct">%</span>');
    var t=document.createElement('span');t.innerHTML=h;while(t.firstChild)el.insertBefore(t.firstChild,n);el.removeChild(n);});});}
  var dq;function later(){clearTimeout(dq);dq=setTimeout(deco,30);}
  document.addEventListener('DOMContentLoaded',function(){deco();try{new MutationObserver(later).observe(document.body,{childList:true,subtree:true});}catch(e){}});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
