/* R12 主题数据 + 首屏设定 data-theme（缺省 iris）。由 tools/build_r12.py 生成 */
window.UIDL_THEMES=[{"id": "iris", "name": "海军·冷灰", "line": "冷灰面、近黑字与按钮、金色点睛、红色警示", "mode": "light", "sidebar": "dark", "t": {"frame": "#13151D", "bg": "#E8EAF0", "surface": "#F9FAFD", "primary": "#13151D", "danger": "#B81D2B"}}, {"id": "midnight", "name": "海军·夜蓝", "line": "海军夜蓝底、长春花蓝主按钮", "mode": "dark", "sidebar": "dark", "t": {"frame": "#13151D", "bg": "#13151D", "surface": "#1C1E29", "primary": "#5C75D9", "danger": "#FF6B6B"}}];
(function(){var ids=window.UIDL_THEMES.map(function(p){return p.id;}),q=null,s=null;try{q=new URLSearchParams(location.search).get('theme');}catch(e){}try{s=localStorage.getItem('uidl-theme');}catch(e){}
var id=ids.indexOf(q)>=0?q:(ids.indexOf(s)>=0?s:'iris');if(ids.indexOf(q)>=0){try{localStorage.setItem('uidl-theme',q);}catch(e){}}
if(id!=='iris')document.documentElement.setAttribute('data-theme',id);window.UIDL_THEME=id;})();
