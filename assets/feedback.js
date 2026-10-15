/* 无后端反馈面板：打分 → 打开预填好的 GitHub New Issue；只读展示已有反馈 */
(function(){
  var REPO='kylin30/ui-design-language';
  var API='https://api.github.com/repos/'+REPO+'/issues?state=all&per_page=100';
  var me=document.currentScript;
  var round=(me&&me.getAttribute('data-round'))||'';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function tag(id){return '['+id.toUpperCase()+']';}
  function num(id){return id.replace(/\D/g,'');}
  function fetchIssues(){
    return fetch(API,{headers:{Accept:'application/vnd.github+json'}})
      .then(function(r){if(!r.ok)throw 0;return r.json();})
      .then(function(a){return a.filter(function(i){return !i.pull_request;});})
      .catch(function(){return null;});
  }
  function filter(issues,id){var t=tag(id);return (issues||[]).filter(function(i){return i.title.indexOf(t)===0;});}
  function score(i){var m=i.title.match(/(\d+)\s*\/\s*10/);return m?+m[1]:null;}
  function notes(i){var b=i.body||'';var m=b.match(/### 备注\s*\n([\s\S]*?)(\n### |$)/);return (m?m[1]:b).trim().slice(0,240);}
  function summaryHTML(list){
    if(!list.length)return '<span>还没有反馈。</span>';
    var s=list.map(score).filter(function(x){return x!=null;});
    var avg=s.length?(s.reduce(function(a,b){return a+b;},0)/s.length).toFixed(1):'—';
    return '<div><b>'+list.length+'</b> 条反馈 · 平均 <b>'+avg+'</b>/10</div><ul>'+list.slice(0,5).map(function(i){
      return '<li><a href="'+esc(i.html_url)+'" target="_blank" rel="noopener">'+(score(i)!=null?score(i)+'/10':'—')+'</a> '+esc(notes(i)||'（无备注）')+' <span style="opacity:.6">'+esc((i.created_at||'').slice(0,10))+'</span></li>';}).join('')+'</ul>';
  }
  function issueURL(id,sc,text,page){
    var body='### 评分\n'+sc+'/10\n\n### 备注\n'+(text||'（无）')+'\n\n### 页面\n'+page+'\n\n### 轮次\n'+id+'\n';
    var q=new URLSearchParams({title:tag(id)+' 评分 '+sc+'/10',body:body,labels:'feedback,round-'+num(id)});
    return 'https://github.com/'+REPO+'/issues/new?'+q.toString();
  }
  window.UIFeedback={fetchIssues:fetchIssues,filter:filter,summaryHTML:summaryHTML,issueURL:issueURL};
  if(!round)return;
  function mount(){
    var p=document.createElement('aside');p.className='uifb';
    var open=localStorage.getItem('uifb-open')!=='0';if(!open)p.classList.add('uifb-collapsed');
    var btns='';for(var i=1;i<=10;i++)btns+='<button type="button" data-v="'+i+'">'+i+'</button>';
    p.innerHTML='<button type="button" class="uifb-head"><span>'+tag(round)+' 打分 & 留言</span><span class="uifb-tog"></span></button>'+
      '<div class="uifb-body"><div class="uifb-scores">'+btns+'</div>'+
      '<textarea rows="4" placeholder="喜欢什么 / 不喜欢什么 / 其他想法"></textarea>'+
      '<button type="button" class="uifb-submit" disabled>去 GitHub 提交</button>'+
      '<p class="uifb-hint">提交会打开 GitHub 新建 Issue 页面（需登录），内容已预填，点「Submit」即完成。</p>'+
      '<div class="uifb-list">已有反馈加载中…</div></div>';
    document.body.appendChild(p);
    var sel=null,sub=p.querySelector('.uifb-submit');
    p.querySelector('.uifb-head').onclick=function(){p.classList.toggle('uifb-collapsed');localStorage.setItem('uifb-open',p.classList.contains('uifb-collapsed')?'0':'1');};
    p.querySelectorAll('.uifb-scores button').forEach(function(b){b.onclick=function(){sel=+b.dataset.v;
      p.querySelectorAll('.uifb-scores button').forEach(function(x){x.classList.toggle('on',x===b);});sub.disabled=false;sub.textContent='去 GitHub 提交 '+sel+'/10';};});
    sub.onclick=function(){if(!sel)return;
      window.open(issueURL(round,sel,p.querySelector('textarea').value.trim(),location.href.split('#')[0]),'_blank','noopener');};
    fetchIssues().then(function(a){var l=p.querySelector('.uifb-list');
      l.innerHTML=a===null?'暂时无法读取已有反馈（GitHub 接口受限），不影响提交。':summaryHTML(filter(a,round));});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
