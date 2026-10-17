/* 站内打分留言：直接写入 Supabase（RLS：匿名只可插入/读取），提交后立刻刷新列表，无跳转、无需登录。
   百分制（2026-10-17 起）：拖动滑块 0–100。数据库 score 列受约束 1–10，所以：
   - notes 存 JSON：{"v":2,"score100":87,"text":"备注原文"}；
   - score 列存兼容值 max(1, round(score100/10))，旧工具仍能读出大致分数。
   读取时：notes 是 v2 JSON → 用 score100；否则视为旧制 1–10，显示为 score×10 并标「旧制」。 */
(function(){
  var me=document.currentScript;
  var round=(me&&me.getAttribute('data-round'))||'';
  var C=window.UIFB_CONFIG||{};
  var ok=!!(C.url&&C.anonKey);
  var EP=ok?C.url.replace(/\/$/,'')+'/rest/v1/feedback':'';
  var H=ok?{apikey:C.anonKey,Authorization:'Bearer '+C.anonKey,'Content-Type':'application/json'}:{};
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  /* 统一解析一行反馈 → {score100, legacy, legacyScore, text} */
  function parse(x){
    var n=x&&x.notes||'';
    if(n.charAt(0)==='{'){try{var j=JSON.parse(n);if(j&&j.v===2&&typeof j.score100==='number'&&j.score100>=0&&j.score100<=100)
      return {score100:Math.round(j.score100),legacy:false,text:String(j.text||'')};}catch(e){}}
    var s=+x.score||0;return {score100:s*10,legacy:true,legacyScore:s,text:n};
  }
  function encode(score100,text){
    var t=String(text||''),j;
    do{j=JSON.stringify({v:2,score100:score100,text:t});if(j.length<=2000)break;t=t.slice(0,t.length-Math.max(20,j.length-2000));}while(t.length);
    return j;
  }
  function fetchAll(){
    if(!ok)return Promise.resolve(null);
    return fetch(EP+'?select=round,score,notes,page,created_at&order=created_at.desc&limit=500',{headers:H})
      .then(function(r){if(!r.ok)throw 0;return r.json();}).catch(function(){return null;});
  }
  function filter(rows,id){return (rows||[]).filter(function(x){return x.round===id;});}
  function fmt(t){var d=new Date(t);return isNaN(d)?'':d.toLocaleString('zh-CN',{hour12:false,month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});}
  function scoreHTML(p){return '<b>'+p.score100+'</b>/100'+(p.legacy?' <span class="uifb-legacy" title="旧制 1–10 分，按 ×10 换算">旧制 '+p.legacyScore+'/10</span>':'');}
  function summaryHTML(list,max){
    if(!list.length)return '<span>还没有反馈。</span>';
    var ps=list.map(parse),anyOld=ps.some(function(p){return p.legacy;});
    var avg=Math.round(ps.reduce(function(a,p){return a+p.score100;},0)/ps.length);
    return '<div><b>'+list.length+'</b> 条反馈 · 平均 <b>'+avg+'</b>/100'+(anyOld?' <span class="uifb-legacy">含旧制 ×10 换算</span>':'')+'</div><ul>'+list.slice(0,max||20).map(function(x,i){var p=ps[i];
      return '<li>'+scoreHTML(p)+' '+esc(p.text||'（无备注）')+' <span style="opacity:.6">'+esc(fmt(x.created_at))+'</span></li>';}).join('')+'</ul>';
  }
  function submit(id,score100,text,page){
    score100=Math.max(0,Math.min(100,Math.round(+score100)));
    return fetch(EP,{method:'POST',headers:Object.assign({Prefer:'return=minimal'},H),
      body:JSON.stringify({round:id,score:Math.max(1,Math.round(score100/10)),notes:encode(score100,text),page:String(page||'').slice(0,300)})})
      .then(function(r){if(!r.ok)return r.text().then(function(t){throw new Error(r.status+' '+t);});});
  }
  window.UIFeedback={configured:ok,fetchAll:fetchAll,filter:filter,summaryHTML:summaryHTML,submit:submit,parse:parse,scale:100};
  if(!round)return;
  function mount(){
    var p=document.createElement('aside');p.className='uifb';
    if(localStorage.getItem('uifb-open')==='0')p.classList.add('uifb-collapsed');
    p.innerHTML='<button type="button" class="uifb-head"><span>['+round.toUpperCase()+'] 打分 & 留言</span><span class="uifb-tog"></span></button>'+
      '<div class="uifb-body"><div class="uifb-scores">'+
        '<div class="uifb-read"><output class="uifb-num" aria-hidden="true">—</output><span class="uifb-of">/ 100</span><span class="uifb-cap">拖动评分</span></div>'+
        '<input type="range" class="uifb-range unset" min="0" max="100" step="1" value="50" aria-label="评分，0 到 100" aria-valuetext="未评分">'+
        '<div class="uifb-ticks" aria-hidden="true"><span>0</span><span>50</span><span>100</span></div></div>'+
      '<textarea rows="4" maxlength="1800" placeholder="喜欢什么 / 不喜欢什么 / 其他想法"></textarea>'+
      '<button type="button" class="uifb-submit" disabled>先拖动滑块打分</button>'+
      '<p class="uifb-hint" role="status"></p>'+
      '<div class="uifb-list">已有反馈加载中…</div></div>';
    document.body.appendChild(p);
    var sel=null,sub=p.querySelector('.uifb-submit'),ta=p.querySelector('textarea'),hint=p.querySelector('.uifb-hint'),list=p.querySelector('.uifb-list'),
        rg=p.querySelector('.uifb-range'),num=p.querySelector('.uifb-num'),cap=p.querySelector('.uifb-cap');
    function load(){fetchAll().then(function(a){list.innerHTML=!ok?'反馈服务尚未配置。':a===null?'暂时无法读取反馈，请稍后刷新。':summaryHTML(filter(a,round));});}
    function paint(){rg.style.setProperty('--uifb-pct',rg.value+'%');}
    function setVal(){sel=+rg.value;rg.classList.remove('unset');num.textContent=sel;cap.textContent='';rg.setAttribute('aria-valuetext',sel+' 分');paint();
      sub.disabled=!ok;sub.textContent=ok?'提交 '+sel+' 分':'反馈服务尚未配置';}
    function reset(){sel=null;rg.value=50;rg.classList.add('unset');num.textContent='—';cap.textContent='拖动评分';rg.setAttribute('aria-valuetext','未评分');paint();sub.disabled=true;sub.textContent='先拖动滑块打分';}
    rg.addEventListener('input',setVal);
    rg.addEventListener('keydown',function(e){if(sel===null&&/^(Arrow|Home|End|Page)/.test(e.key)){/* 第一次按键即视为评分 */setTimeout(setVal,0);}});
    p.querySelector('.uifb-head').onclick=function(){p.classList.toggle('uifb-collapsed');localStorage.setItem('uifb-open',p.classList.contains('uifb-collapsed')?'0':'1');};
    sub.onclick=function(){if(sel===null||!ok)return;sub.disabled=true;sub.textContent='提交中…';hint.className='uifb-hint';hint.textContent='';
      submit(round,sel,ta.value.trim(),location.href.split('#')[0]).then(function(){
        hint.className='uifb-hint uifb-ok';hint.textContent='已收到 '+sel+' 分，谢谢！';ta.value='';reset();load();
      }).catch(function(){hint.className='uifb-hint uifb-err';hint.textContent='提交失败，请稍后再试（内容已保留）。';sub.disabled=false;sub.textContent='重试提交 '+sel+' 分';});};
    reset();load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
