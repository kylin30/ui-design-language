/* R18 方向切换：data-direction · localStorage 'uidl-direction' · ?direction= */
(function(){
  var DS=[{id:'a',name:'精简'},{id:'b',name:'卡片'},{id:'c',name:'深色工作台'},{id:'d',name:'信息密集'}];
  window.UIDL_DIRECTIONS=DS;
  var root=document.documentElement,DEF='a';
  function ok(id){return DS.some(function(d){return d.id===id;});}
  var q=null;try{q=new URL(location.href).searchParams.get('direction');}catch(e){}
  var s=null;try{s=localStorage.getItem('uidl-direction');}catch(e){}
  var cur=ok(q)?q:(ok(s)?s:DEF);root.setAttribute('data-direction',cur);
  if(window.top!==window.self)root.classList.add('framed');
  window.UIDLDirection={list:DS,cur:function(){return root.getAttribute('data-direction');},set:function(id){if(!ok(id))return;root.setAttribute('data-direction',id);try{localStorage.setItem('uidl-direction',id);}catch(e){}try{var u=new URL(location.href);u.searchParams.set('direction',id);history.replaceState(null,'',u);}catch(e){}document.dispatchEvent(new CustomEvent('uidl:direction',{detail:id}));}};
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.uifb-submit');if(!b)return;var ta=document.querySelector('.uifb textarea');if(ta&&!/\[(当前|选定)方向: /.test(ta.value))ta.value=(ta.value?ta.value+'\n':'')+'[当前方向: '+root.getAttribute('data-direction')+']';},true);
})();
