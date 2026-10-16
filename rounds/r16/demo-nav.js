/* R13 演示页共享导航 */
(function(){var D=[['demo.html','运营待办'],['demo-orders.html','订单售后'],['demo-analytics.html','数据看板'],['demo-ops.html','运维告警'],['demo-crm.html','客户管理'],['demo-content.html','内容审核']];
var here=location.pathname.split('/').pop()||'demo.html',q=location.search;
function mount(){var s=document.querySelector('[data-demo-nav]');if(!s)return;s.className='dnav';s.setAttribute('role','navigation');s.setAttribute('aria-label','演示');
s.innerHTML=D.map(function(d){return '<a href="'+d[0]+'" data-keep-theme'+(d[0]===here?' class="on" aria-current="page"':'')+'>'+d[1]+'</a>';}).join('')+'<a href="demos.html" data-keep-theme title="全部演示">⋯</a>';
var t=window.UIDL_THEME;if(t&&t!=='iris')s.querySelectorAll('a').forEach(function(a){a.href=a.getAttribute('href')+'?theme='+t;});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();})();
