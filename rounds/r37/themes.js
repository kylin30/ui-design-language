/* R12 主题数据 + 首屏设定 data-theme（缺省 iris）。由 tools/build_r12.py 生成 */
window.UIDL_THEMES=[{"id": "iris", "name": "黑金·暖纸", "line": "暖纸面、近黑字与按钮、金色点睛、红色警示", "mode": "light", "sidebar": "dark", "t": {"frame": "#1C1A14", "bg": "#F2EEE6", "surface": "#FEFCF8", "primary": "#1C1A14", "danger": "#B81D2B"}}, {"id": "midnight", "name": "黑金·夜墨", "line": "暖墨底、金色主按钮与链接、红色警示", "mode": "dark", "sidebar": "dark", "t": {"frame": "#1C1A14", "bg": "#1C1A14", "surface": "#27241E", "primary": "#E6BE4F", "danger": "#FF6B6B"}}];
(function(){var ids=window.UIDL_THEMES.map(function(p){return p.id;}),q=null,s=null;try{q=new URLSearchParams(location.search).get('theme');}catch(e){}try{s=localStorage.getItem('uidl-theme');}catch(e){}
var id=ids.indexOf(q)>=0?q:(ids.indexOf(s)>=0?s:'iris');if(ids.indexOf(q)>=0){try{localStorage.setItem('uidl-theme',q);}catch(e){}}
if(id!=='iris')document.documentElement.setAttribute('data-theme',id);window.UIDL_THEME=id;})();
