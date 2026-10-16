/* R12 主题切换：data-theme（缺省 = 鸢尾，不写属性）· localStorage · ?theme= */
(function(){
  var TS=window.UIDL_THEMES||[],root=document.documentElement;
  function get(id){for(var i=0;i<TS.length;i++)if(TS[i].id===id)return TS[i];return TS[0];}
  function cur(){return root.getAttribute('data-theme')||'iris';}
  function fill(){var cs=getComputedStyle(root);document.querySelectorAll('[data-tok]').forEach(function(el){var v=cs.getPropertyValue(el.getAttribute('data-tok')).trim();if(v)el.textContent=v.toUpperCase();});}
  function set(id){var t=get(id);if(t.id==='iris')root.removeAttribute('data-theme');else root.setAttribute('data-theme',t.id);window.UIDL_THEME=t.id;
    try{localStorage.setItem('uidl-theme',t.id);}catch(e){}
    try{var u=new URL(location.href);if(t.id==='iris')u.searchParams.delete('theme');else u.searchParams.set('theme',t.id);history.replaceState(null,'',u);}catch(e){}
    sync();document.dispatchEvent(new CustomEvent('uidl:theme',{detail:t.id}));}
  var w;
  function sync(){var t=get(cur());fill();
    if(w){w.querySelector('.ts-btn').innerHTML='<span class="ts-sw" style="background:'+t.t.primary+'"></span>主题 · '+t.name.split('·')[1]+' ▾';
      w.querySelectorAll('.ts-item').forEach(function(i){i.setAttribute('aria-checked',i.dataset.id===t.id);});}
    document.querySelectorAll('[data-themename]').forEach(function(e){e.textContent=t.name;});
    document.querySelectorAll('tr[data-theme-row]').forEach(function(r){r.classList.toggle('on',r.getAttribute('data-theme-row')===t.id);});
    document.querySelectorAll('a[data-keep-theme]').forEach(function(a){var h=a.getAttribute('href').split('?')[0];a.href=t.id==='iris'?h:h+'?theme='+t.id;});}
  window.UIDLTheme={set:set,list:TS};
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.uifb-submit');if(!b||cur()==='iris')return;
    var ta=document.querySelector('.uifb textarea');if(ta&&!/\[当前主题: /.test(ta.value))ta.value=(ta.value?ta.value+'\n':'')+'[当前主题: '+cur()+']';},true);
  function mount(){
    w=document.createElement('div');w.className='ts';
    w.innerHTML='<button type="button" class="ts-btn" aria-haspopup="menu" title="切换主题（默认：雾紫·鸢尾）"></button><div class="ts-menu" role="menu"><div class="h">默认</div>'+
      TS.map(function(t,i){return (i===1?'<div class="ts-sep"></div><div class="h">主题</div>':'')+'<button type="button" role="menuitemradio" class="ts-item" data-id="'+t.id+'"><span class="ts-sw" style="background:'+t.t.primary+'"></span>'+t.name+(t.mode==='dark'?'<em>深色</em>':t.sidebar==='light'?'<em>浅侧栏</em>':'')+'</button>';}).join('')+'</div>';
    var slot=document.querySelector('[data-theme-slot]');if(slot)slot.appendChild(w);else{w.style.cssText='position:fixed;top:10px;right:16px;z-index:600';document.body.appendChild(w);}
    w.querySelector('.ts-btn').onclick=function(e){e.stopPropagation();w.classList.toggle('open');};
    w.querySelectorAll('.ts-item').forEach(function(i){i.onclick=function(){set(i.dataset.id);w.classList.remove('open');};});
    document.addEventListener('click',function(e){if(!w.contains(e.target))w.classList.remove('open');});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')w.classList.remove('open');});
    document.querySelectorAll('[data-try-theme]').forEach(function(b){b.onclick=function(){set(b.getAttribute('data-try-theme'));};});
    sync();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
