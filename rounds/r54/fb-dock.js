/* r19+ (r20 继承): demo pages — feedback panel starts as a pill; when open, reserve right-side space so it never covers the consequence bar */
(function(){
  function sync(p){var open=!p.classList.contains('uifb-collapsed');document.body.classList.toggle('fb-open',open);document.body.classList.add('fb-docked');}
  function hook(p){
    if(localStorage.getItem('uifb-open')!=='1')p.classList.add('uifb-collapsed');
    sync(p);new MutationObserver(function(){sync(p);}).observe(p,{attributes:true,attributeFilter:['class']});
  }
  function find(){var p=document.querySelector('.uifb');if(p){hook(p);return true;}return false;}
  document.addEventListener('DOMContentLoaded',function(){
    if(find())return;
    var mo=new MutationObserver(function(){if(find())mo.disconnect();});mo.observe(document.body,{childList:true});
  });
})();
