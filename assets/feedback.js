/* 站内打分留言：直接写入 Supabase（RLS：匿名只可插入/读取），提交后立刻刷新列表，无跳转、无需登录 */
(function(){
  var me=document.currentScript;
  var round=(me&&me.getAttribute('data-round'))||'';
  var C=window.UIFB_CONFIG||{};
  var ok=!!(C.url&&C.anonKey);
  var EP=ok?C.url.replace(/\/$/,'')+'/rest/v1/feedback':'';
  var H=ok?{apikey:C.anonKey,Authorization:'Bearer '+C.anonKey,'Content-Type':'application/json'}:{};
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function fetchAll(){
    if(!ok)return Promise.resolve(null);
    return fetch(EP+'?select=round,score,notes,page,created_at&order=created_at.desc&limit=500',{headers:H})
      .then(function(r){if(!r.ok)throw 0;return r.json();}).catch(function(){return null;});
  }
  function filter(rows,id){return (rows||[]).filter(function(x){return x.round===id;});}
  function fmt(t){var d=new Date(t);return isNaN(d)?'':d.toLocaleString('zh-CN',{hour12:false,month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});}
  function summaryHTML(list,max){
    if(!list.length)return '<span>还没有反馈。</span>';
    var avg=(list.reduce(function(a,x){return a+x.score;},0)/list.length).toFixed(1);
    return '<div><b>'+list.length+'</b> 条反馈 · 平均 <b>'+avg+'</b>/10</div><ul>'+list.slice(0,max||20).map(function(x){
      return '<li><b>'+x.score+'/10</b> '+esc(x.notes||'（无备注）')+' <span style="opacity:.6">'+esc(fmt(x.created_at))+'</span></li>';}).join('')+'</ul>';
  }
  function submit(id,sc,text,page){
    return fetch(EP,{method:'POST',headers:Object.assign({Prefer:'return=minimal'},H),
      body:JSON.stringify({round:id,score:sc,notes:text.slice(0,2000),page:page.slice(0,300)})})
      .then(function(r){if(!r.ok)return r.text().then(function(t){throw new Error(r.status+' '+t);});});
  }
  window.UIFeedback={configured:ok,fetchAll:fetchAll,filter:filter,summaryHTML:summaryHTML,submit:submit};
  if(!round)return;
  function mount(){
    var p=document.createElement('aside');p.className='uifb';
    if(localStorage.getItem('uifb-open')==='0')p.classList.add('uifb-collapsed');
    var btns='';for(var i=1;i<=10;i++)btns+='<button type="button" data-v="'+i+'">'+i+'</button>';
    p.innerHTML='<button type="button" class="uifb-head"><span>['+round.toUpperCase()+'] 打分 & 留言</span><span class="uifb-tog"></span></button>'+
      '<div class="uifb-body"><div class="uifb-scores">'+btns+'</div>'+
      '<textarea rows="4" maxlength="2000" placeholder="喜欢什么 / 不喜欢什么 / 其他想法"></textarea>'+
      '<button type="button" class="uifb-submit" disabled>先选一个分数</button>'+
      '<p class="uifb-hint" role="status"></p>'+
      '<div class="uifb-list">已有反馈加载中…</div></div>';
    document.body.appendChild(p);
    var sel=null,sub=p.querySelector('.uifb-submit'),ta=p.querySelector('textarea'),hint=p.querySelector('.uifb-hint'),list=p.querySelector('.uifb-list');
    function load(){fetchAll().then(function(a){list.innerHTML=!ok?'反馈服务尚未配置。':a===null?'暂时无法读取反馈，请稍后刷新。':summaryHTML(filter(a,round));});}
    p.querySelector('.uifb-head').onclick=function(){p.classList.toggle('uifb-collapsed');localStorage.setItem('uifb-open',p.classList.contains('uifb-collapsed')?'0':'1');};
    p.querySelectorAll('.uifb-scores button').forEach(function(b){b.onclick=function(){sel=+b.dataset.v;
      p.querySelectorAll('.uifb-scores button').forEach(function(x){x.classList.toggle('on',x===b);});
      sub.disabled=!ok;sub.textContent='提交 '+sel+'/10';};});
    sub.onclick=function(){if(!sel||!ok)return;sub.disabled=true;sub.textContent='提交中…';hint.className='uifb-hint';hint.textContent='';
      submit(round,sel,ta.value.trim(),location.href.split('#')[0]).then(function(){
        hint.className='uifb-hint uifb-ok';hint.textContent='已收到，谢谢！';ta.value='';sel=null;
        p.querySelectorAll('.uifb-scores button').forEach(function(x){x.classList.remove('on');});
        sub.textContent='先选一个分数';load();
      }).catch(function(){hint.className='uifb-hint uifb-err';hint.textContent='提交失败，请稍后再试（内容已保留）。';sub.disabled=false;sub.textContent='重试提交 '+sel+'/10';});};
    load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
