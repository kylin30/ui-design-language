/* R11 配色选择器：即时切换（data-palette）· localStorage · ?palette= · 「设为我的默认」写入页内反馈 */
(function(){
  var PS=window.UIDL_PALETTES||[],root=document.documentElement;
  function get(id){for(var i=0;i<PS.length;i++)if(PS[i].id===id)return PS[i];return PS[0];}
  function cur(){return root.getAttribute('data-palette')||'cobalt';}
  function dot(p){return '<span class="pp-dot" aria-hidden="true"><i style="background:'+p.t.frame+'"></i><i style="background:'+p.t.primary+'"></i><i style="background:'+p.t.bg+'"></i><i style="background:'+p.t.surface+'"></i></span>';}
  function fillTokens(){var cs=getComputedStyle(root);
    document.querySelectorAll('[data-tok]').forEach(function(el){var v=cs.getPropertyValue(el.getAttribute('data-tok')).trim();if(v)el.textContent=v.toUpperCase();});}
  function set(id,silent){var p=get(id);root.setAttribute('data-palette',p.id);window.UIDL_PALETTE=p.id;
    try{localStorage.setItem('uidl-palette',p.id);}catch(e){}
    try{var u=new URL(location.href);u.searchParams.set('palette',p.id);history.replaceState(null,'',u);}catch(e){}
    sync();if(!silent)document.dispatchEvent(new CustomEvent('uidl:palette',{detail:p.id}));}
  var box;
  function sync(){var p=get(cur());fillTokens();
    if(box){box.querySelector('.pp-btn').innerHTML=dot(p)+'配色 · '+p.name+' ▾';
      box.querySelectorAll('.pp-chip').forEach(function(c){c.classList.toggle('on',c.dataset.id===p.id);c.setAttribute('aria-checked',c.dataset.id===p.id);});}
    document.querySelectorAll('.palcard').forEach(function(c){c.classList.toggle('on',c.dataset.id===p.id);});
    document.querySelectorAll('[data-palname]').forEach(function(e){e.textContent=p.name;});
    document.querySelectorAll('a[data-keep-palette]').forEach(function(a){a.href=a.getAttribute('href').split('?')[0]+'?palette='+p.id;});}
  function tagOf(id){return '[选定配色: '+id+']';}
  function chooseDefault(id){id=id||cur();set(id,true);var p=get(id);
    var fb=document.querySelector('.uifb');if(!fb){alert('反馈面板未加载，请稍后再试');return;}
    fb.classList.remove('uifb-collapsed');try{localStorage.setItem('uifb-open','1');}catch(e){}
    var ta=fb.querySelector('textarea'),rest=ta.value.replace(/\[(选定|当前)配色: [a-z]+\]\s*/g,'');
    ta.value=tagOf(id)+' '+p.name+'\n'+rest;ta.dispatchEvent(new Event('input',{bubbles:true}));
    var h=fb.querySelector('.uifb-hint');if(h){h.className='uifb-hint';h.textContent='已填好「'+p.name+'」。再点一个分数，提交即可（备注里可以补一句理由）。';}
    fb.classList.add('pp-flash');setTimeout(function(){fb.classList.remove('pp-flash');},1300);
    var sc=fb.querySelector('.uifb-scores button');if(sc)sc.focus();if(box)box.classList.remove('open');}
  window.UIDLPicker={set:set,chooseDefault:chooseDefault,list:PS};
  // 每次提交都附上当前配色（若备注里没有选定标签），方便读取
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.uifb-submit');if(!b)return;
    var ta=document.querySelector('.uifb textarea');if(ta&&!/\[(选定|当前)配色: /.test(ta.value))ta.value=(ta.value?ta.value+'\n':'')+'[当前配色: '+cur()+']';},true);
  function mount(){
    box=document.createElement('div');box.className='pp';
    box.innerHTML='<button type="button" class="pp-btn" aria-haspopup="true"></button><div class="pp-panel" role="radiogroup" aria-label="配色">'+
      PS.map(function(p){return '<button type="button" role="radio" class="pp-chip" data-id="'+p.id+'">'+dot(p)+'<span><b>'+p.name+'</b><small>'+p.line+'</small></span></button>';}).join('')+
      '<div class="pp-foot"><button type="button" class="pp-act p" data-act="default">设为我的默认</button><a class="pp-act" href="palettes.html" data-keep-palette>并排对比</a><span>←→ 键也能切换</span></div></div>';
    document.body.appendChild(box);
    box.querySelector('.pp-btn').onclick=function(){box.classList.toggle('open');};
    box.querySelectorAll('.pp-chip').forEach(function(c){c.onclick=function(){set(c.dataset.id);};});
    box.querySelector('[data-act=default]').onclick=function(){chooseDefault();};
    document.addEventListener('click',function(e){if(!box.contains(e.target))box.classList.remove('open');});
    document.addEventListener('keydown',function(e){if(e.target.closest&&e.target.closest('input,textarea,[contenteditable]'))return;
      if(e.key==='Escape')box.classList.remove('open');
      if((e.key==='ArrowRight'||e.key==='ArrowLeft')&&box.classList.contains('open')){var i=PS.indexOf(get(cur()));i=(i+(e.key==='ArrowRight'?1:PS.length-1))%PS.length;set(PS[i].id);e.preventDefault();}});
    var g=document.getElementById('palgrid');
    if(g){g.innerHTML=PS.map(function(p){return '<button type="button" class="palcard" data-id="'+p.id+'">'+dot(p)+'<span><b>'+p.name+'</b><small>'+p.line+'</small></span></button>';}).join('');
      g.querySelectorAll('.palcard').forEach(function(c){c.onclick=function(){set(c.dataset.id);};});}
    document.querySelectorAll('[data-choose]').forEach(function(b){b.onclick=function(){chooseDefault(b.getAttribute('data-choose'));};});
    document.querySelectorAll('[data-preview]').forEach(function(b){b.onclick=function(){set(b.getAttribute('data-preview'));};});
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
