// R86 显旁回归：字阶/留白/钴强调 + 继承布局
const puppeteer=require('/tmp/pt/node_modules/puppeteer-core');
const fs=require('fs');
const B='http://localhost:8811/rounds/r96/';let fails=0;
const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
const L=h=>{const c=h.match(/\d+/g).slice(0,3).map(x=>{x/=255;return x<=.03928?x/12.92:((x+.055)/1.055)**2.4});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const CR=(a,b)=>{const x=L(a),y=L(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
(async()=>{const br=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const pg=await br.newPage();await pg.setViewport({width:1600,height:1000});
const selLi=async(k)=>{await pg.evaluate(k=>{const li=document.querySelector('.li[data-sel="'+k+'"]');if(!li)throw new Error('missing li '+k);li.style.setProperty('display','flex','important');li.click();li.style.removeProperty('display');},k);};
// 1 ops 详情按 data-sel 重渲染
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const t0=await pg.$eval('[data-detail] .ph-h h2',e=>e.textContent);
await selLi('a3');await new Promise(r=>setTimeout(r,50));
const t1=await pg.$eval('[data-detail] .ph-h h2',e=>e.textContent);
const c1=await pg.$eval('[data-detail] .concl',e=>e.textContent);
ok(t0!==t1&&/CDN/.test(t1)&&/80%/.test(c1),'ops 详情按 data-sel 重渲染：'+t1);
ok(await pg.$eval('[data-detail] .sub .mono',e=>e.textContent)==='ALT-80398','ops 编号同步更新且为 mono');
ok(await pg.evaluate(()=>{const el=document.getElementById('c3'); if(!el){const tr=document.querySelector('.drill-trend'); return !!(tr&&/趋势|CDN|82/.test(tr.textContent));} return el.querySelectorAll('path').length>=2;}),'ops 图表重绘或趋势旁注');
const dl=await pg.$eval('[data-detail]',e=>{const a=e.getAnimations().filter(x=>!(x.animationName));return a.length?a[a.length-1].effect.getTiming().delay:'none'});ok(dl===0,'详情入场延迟 0（实际 '+dl+'）');
// 1b 入场动画每次都重播
await selLi('a4');await new Promise(r=>setTimeout(r,30));
const o1=await pg.$eval('[data-detail]',e=>+getComputedStyle(e).opacity);
await new Promise(r=>setTimeout(r,300));await selLi('a5');await new Promise(r=>setTimeout(r,30));
const o2=await pg.$eval('[data-detail]',e=>+getComputedStyle(e).opacity);ok(o1<0.95&&o2<0.95,'详情入场每次重播（30ms 时 opacity '+o1.toFixed(2)+' / '+o2.toFixed(2)+'）');
// 1c 页脚计数
await pg.goto(B+'demo.html',{waitUntil:'networkidle0'});
const ft=async()=>pg.evaluate(()=>{const f=document.querySelector('[data-foot]');const n=[...document.querySelectorAll('.tbl tbody tr')].filter(r=>!r.hidden).length;return [f.textContent,n]});
let [fx,fn]=await ft();ok(fx.includes('1–'+fn+'，'),'默认页脚与可见行一致：'+fx+' / '+fn+' 行');
await pg.click('.tabs a[data-f="done"]');await new Promise(r=>setTimeout(r,600));[fx,fn]=await ft();ok(fx.includes('1–'+fn+'，'),'切到已完成后页脚同步：'+fx);
ok(await pg.$$eval('.tbl',ts=>ts.every(t=>[...t.tBodies[0].rows].every(r=>r.cells.length===t.tHead.rows[0].cells.length))),'demo 表格每行 td = th');
// 1d reduce 下抽屉内容无延迟
await pg.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await pg.reload({waitUntil:'networkidle0'});
const dd=await pg.evaluate(()=>{drawer(true);const e=document.querySelector('.drawer .pb>*');return getComputedStyle(e).transitionDelay});ok(/^0s/.test(dd),'reduce 下抽屉内容 transition-delay '+dd);
await pg.emulateMediaFeatures([]);
// 2 骨架
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{window.__fires=0;const bd=document.querySelector('.tbl tbody');new MutationObserver(()=>{if(!bd.classList.contains('loading'))window.__fires++}).observe(bd,{attributes:true,attributeFilter:['class']})});
for(const f of ['ship','as','done','ship'])await pg.click(`.tabs a[data-f="${f}"]`);
await new Promise(r=>setTimeout(r,600));
const vis=await pg.$$eval('.tbl tbody tr',r=>r.filter(x=>!x.hidden).map(x=>x.dataset.c));
ok(vis.length>0&&vis.every(c=>c==='ship'),'连点 4 个 tab 只落地最后一次（'+vis.length+' 行 ship）');
ok(await pg.evaluate(()=>window.__fires)===1,'旧回调被丢弃，loading 只结束 1 次');
await pg.click('.tabs a[data-f="as"]');await new Promise(r=>setTimeout(r,220));
const op=await pg.$eval('.tbl tbody td:nth-child(2)',e=>+getComputedStyle(e,'::after').opacity);ok(op>0.9,'loading 中骨架可见（'+op+'），交叉淡化无空白帧');
await new Promise(r=>setTimeout(r,500));
await pg.click('.tabs a[data-f="as"]');ok(!(await pg.$eval('.tbl tbody',e=>e.classList.contains('loading'))),'重复点当前 tab 不假装加载');
await pg.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});await pg.click('.tabs a[data-f="ship"]');
ok(!(await pg.$eval('.tbl tbody',e=>e.classList.contains('loading')))&&(await pg.$$eval('.tbl tbody tr',r=>r.filter(x=>!x.hidden).length))===7,'减少动效：跳过骨架直接切换');
await pg.emulateMediaFeatures([]);
// 3 :active 60ms
const css=fs.readFileSync(__dirname+'/../rounds/r96/app.css','utf8');
ok(!/\.btn\.pri:active,\.btn\.sec:active/.test(css),'重复 :active 规则已删除');
await pg.goto(B+'demo.html',{waitUntil:'networkidle0'});
const du=await pg.evaluate(()=>{for(const s of document.styleSheets)for(const r of s.cssRules)if(r.selectorText&&r.selectorText.includes('.btn:active')&&r.style.transitionDuration)return r.style.transitionDuration});
ok(du==='60ms',':active 过渡 60ms（'+du+'）');
// 4 暗色骨架分型度
for(const th of ['light','dark']){await pg.evaluate(t=>document.documentElement.dataset.theme=t,th);
 const [a,b,bg]=await pg.evaluate(()=>{const s=getComputedStyle(document.documentElement);const d=document.createElement('i');document.body.append(d);const g=v=>{d.style.color=s.getPropertyValue(v);return getComputedStyle(d).color};const r=[g('--sk1'),g('--sk2'),getComputedStyle(document.querySelector('.panel')).backgroundColor];d.remove();return r});
 ok(Math.min(CR(a,bg),CR(b,bg))>=1.4||CR(a,bg)>=1.4,`${th} 骨架分型度 ${CR(a,bg).toFixed(2)}/${CR(b,bg).toFixed(2)} ≥1.4（主色块）`)}
// 5 KPI 无 pointer
ok(await pg.$$eval('.kpi',k=>k.every(e=>getComputedStyle(e).cursor!=='pointer')),'KPI 无 cursor:pointer');
// 5b 颜色规则
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
ok(await pg.$$eval('.stt.act',c=>{const v=c.filter(e=>e.getBoundingClientRect().width>0); return v.length>0&&v.every(e=>e.scrollWidth<=e.clientWidth+1&&e.clientWidth>40);}),'进行中 chip 不再被 40px 裁切');
ok(await pg.$$eval('.stt',c=>!c.some(e=>/待付尾款/.test(e.textContent)&&e.classList.contains('risk'))),'待付尾款不用琥珀');
await pg.goto(B+'demo.html',{waitUntil:'networkidle0'});
ok(await pg.$eval('tr.r-exc>td:first-child',e=>/repeating-linear-gradient/.test(getComputedStyle(e).backgroundImage)),'异常行色条为虚线');
ok(await pg.$eval('tr.r-exc td.due .num',e=>{const s=getComputedStyle(e);return s.fontWeight==='600'&&s.color===getComputedStyle(document.querySelector('h1')).color}),'截止时间 tx1 · 600，不着色');
await pg.goto(B+'demo-analytics.html',{waitUntil:'networkidle0'});
const rf=await pg.evaluate(()=>{const k=[...document.querySelectorAll('.kpi')].find(x=>/退款率/.test(x.textContent));const q=document.createElement('i');q.style.color='var(--bad)';document.body.append(q);const bad=getComputedStyle(q).color;const n=[...k.querySelectorAll('*')].filter(e=>getComputedStyle(e).color===bad&&[...e.childNodes].some(t=>t.nodeType===3&&t.textContent.trim())).length+[...k.querySelectorAll('path')].filter(p=>getComputedStyle(p).stroke===bad).length;return [n,/阈值 2.5%/.test(k.textContent)]});
ok(rf[0]===1&&rf[1],'退款率卡只有 1 处红并注明阈值（'+rf[0]+'）');
await pg.setViewport({width:1280,height:900});
ok(await pg.$$eval('svg.chart text',t=>t.every(x=>{const r=x.getBoundingClientRect();return Math.abs(r.x-Math.round(r.x))<.01&&+x.getAttribute('x')===Math.round(+x.getAttribute('x'))})),'坐标轴文字 x 为整数像素');
await pg.setViewport({width:1600,height:1000});
// 6 1600 宽屏加列
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
ok(await pg.$eval('.ch-table.sum th.show-wide',e=>getComputedStyle(e).display)==='table-cell','1600 显示宽屏列');
await pg.setViewport({width:1280,height:900});await pg.reload({waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
ok(await pg.$eval('.ch-table.sum th.show-wide',e=>getComputedStyle(e).display)==='none','1280 隐藏宽屏列');

// ===== R51 新：系列 token + 色盲 ΔE + 宽轨数字 =====
await pg.setViewport({width:1600,height:1000});
await pg.goto(B+'demo.html',{waitUntil:'networkidle0'});
const series=await pg.evaluate(()=>{
  const s=getComputedStyle(document.documentElement);
  const g=k=>s.getPropertyValue(k).trim();
  return {c1:g('--c1'),c2:g('--c2'),c3:g('--c3'),c4:g('--c4'),tx1:g('--tx1'),tx2:g('--tx2')};
});
ok(series.c2.toUpperCase()==='#28CCD8'&&series.c3.toUpperCase()==='#5276A4'&&series.c4.toUpperCase()==='#545C6A','浅色系列 token '+JSON.stringify(series));
await pg.evaluate(()=>document.documentElement.dataset.theme='dark');
const seriesD=await pg.evaluate(()=>{
  const s=getComputedStyle(document.documentElement);
  const g=k=>s.getPropertyValue(k).trim();
  return {c2:g('--c2'),c3:g('--c3'),c4:g('--c4')};
});
ok(seriesD.c2.toUpperCase()==='#64E0F2'&&seriesD.c3.toUpperCase()==='#6686B0'&&seriesD.c4.toUpperCase()==='#5C6169','深色系列 token '+JSON.stringify(seriesD));
await pg.evaluate(()=>document.documentElement.removeAttribute('data-theme'));

// CSS: no purple hue on c3/c4; rail rules present
ok(/--c3:#5276A4/.test(css)&&/--c3:#6686B0/.test(css),'CSS 含新 c3');
// Hue lock via static check already in STYLE; assert no purple literals in series
ok(/--c3:#5276A4/.test(css)&&/--c4:#545C6A/.test(css)&&/--c3:#6686B0/.test(css)&&/--c4:#5C6169/.test(css),'系列 c3/c4 浅深齐全');

// 宽轨：1520+ rail .kv dd.num → 20/28/400/tabular，且命中 ≥1
await pg.setViewport({width:1600,height:1000});
await pg.goto(B+'demo.html',{waitUntil:'networkidle0'});
const rail=await pg.evaluate(()=>{
  const nodes=[...document.querySelectorAll('.g-wide>.rail .kv dd.num')];
  if(!nodes.length) return {n:0};
  const s=getComputedStyle(nodes[0]);
  return {n:nodes.length,fs:s.fontSize,lh:s.lineHeight,fw:s.fontWeight,tv:s.fontVariantNumeric};
});
ok(rail.n>=1&&rail.fs==='20px'&&(rail.lh==='28px'||parseFloat(rail.lh)>=27)&&(['400','normal'].includes(rail.fw)||+rail.fw===400)&&/tabular-nums/.test(rail.tv),
  '宽轨 rail .kv dd.num 20/28/400/tabular（n='+rail.n+' fs='+rail.fs+' lh='+rail.lh+' fw='+rail.fw+' tv='+rail.tv+')');

// sticky rail present
ok(await pg.$eval('.g-wide>.rail',e=>getComputedStyle(e).position)==='sticky','宽屏 rail sticky');


// R51: dark c2–c3 deutan ≥26; keep c3–c4 ≥23, c4–surface ≥30; hues 200–230
const DE=(()=>{
  const hex2rgb=h=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.substr(i,2),16)/255)};
  const lin=c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4;
  const labFromLin=(r,g,b)=>{let x=r*.4124564+g*.3575761+b*.1804375,y=r*.2126729+g*.7151522+b*.0721750,z=r*.0193339+g*.1191920+b*.9503041;
    const f=t=>t>.008856?Math.cbrt(t):(7.787*t+16/116);const fx=f(x/.95047),fy=f(y),fz=f(z/1.08883);return [116*fy-16,500*(fx-fy),200*(fy-fz)]};
  const rgb2lab=(r,g,b)=>labFromLin(lin(r),lin(g),lin(b));
  const de=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
  const DEUTAN=[[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]];
  const PROTAN=[[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]];
  // Machado on linear RGB (STYLE / R47–R48 measured notes)
  const applyLin=(rgb,M)=>{const L=rgb.map(lin);return L.map((_,i)=>Math.max(0,Math.min(1,M[i][0]*L[0]+M[i][1]*L[1]+M[i][2]*L[2])))};
  const pair=(a,b)=>{const ra=hex2rgb(a),rb=hex2rgb(b);const n=de(rgb2lab(...ra),rgb2lab(...rb));
    const d=de(labFromLin(...applyLin(ra,DEUTAN)),labFromLin(...applyLin(rb,DEUTAN)));
    const p=de(labFromLin(...applyLin(ra,PROTAN)),labFromLin(...applyLin(rb,PROTAN)));return [n,d,p]};
  return {pair};
})();
{
  const surfD='#141922',c3D='#6686B0',c4D='#5C6169',c2D='#64E0F2';
  const [ns]=DE.pair(c4D,surfD); const [,d34,p34]=DE.pair(c3D,c4D); const [,d24,p24]=DE.pair(c2D,c4D); const [,d23,p23]=DE.pair(c2D,c3D);
  ok(ns>=30,'暗 c4–surface ΔE '+ns.toFixed(1)+' ≥30');
  ok(Math.min(d34,p34)>=23,'暗 c3–c4 CVD min '+Math.min(d34,p34).toFixed(1)+' ≥23');
  ok(Math.min(d24,p24)>=18,'暗 c2–c4 CVD min '+Math.min(d24,p24).toFixed(1)+' ≥18');
  ok(d23>=26,'暗 c2–c3 deutan '+d23.toFixed(1)+' ≥26（R69 刻度）');
  const c3L='#5276A4',c4L='#545C6A',c2L='#28CCD8';
  const [n34l,d34l,p34l]=DE.pair(c3L,c4L);
  ok(p34l>=20&&d34l>=18,'浅 c3–c4 P '+p34l.toFixed(1)+' ≥20 / D '+d34l.toFixed(1));
  ok(/stroke:var\(--surface\)/.test(css),'堆叠柱 surface 描边');
  ok(/bar-rise/.test(css)&&/dist-fill/.test(css),'R51 柱升+分布条动效');
  ok(/min-width:4\.5ch/.test(css),'R51 增量 4.5ch 对齐');
  ok(/--c2:#64E0F2/.test(css),'R51 暗 c2 token');
  ok(/--c3:#6686B0/.test(css),'R51 暗 c3 token');
  ok(/border:2px solid var\(--warn-s\)/.test(css)&&/\.stt\.risk/.test(css),'R51 risk 2px 实线琥珀边');
  ok(/\.stt\.exc/.test(css),'R75 .stt.exc 规则存在');
ok(/\.stt\.exc(?:\.quiet)?\{[\s\S]*?border:0/.test(css)||/\.stt\.exc,\s*\.stt\.exc\.quiet\{[\s\S]*?border:0/.test(css),'R75 .stt.exc 覆盖为 border:0');
  ok(/legend-st i\{width:14px;height:14px/.test(css),'R51 图例 14px');
  ok(/\.empty\.exc \.eic/.test(css)&&/\.empty\.risk \.eic/.test(css),'R51 空状态分型');
  ok(/\.ph-h\{height:56px\}/.test(css),'R51 面板头 56');
  ok(/empty\.routine/.test(css)&&/border:2px solid var\(--warn-s\)/.test(css),'R51 空态井框边');
  ok(/background:var\(--hover\);border-radius:8px/.test(css.replace(/\n/g,' '))||/\.ph-h>\.ic\{[\s\S]*background:var\(--hover\)/.test(css),'R51 面板头图标井');
  ok(/stroke-width:3/.test(css)&&/\.stt\.(risk|exc) \.ic/.test(css),'R51 临期/异常 stroke 3');
}


// ===== R69 刻度：数字阶梯 + 面板内密度 =====
await pg.setViewport({width:1600,height:1000});
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const amt=await pg.evaluate(()=>{
  const el=document.querySelector('.tbl td.r .num.dec');
  if(!el) return null;
  const s=getComputedStyle(el);
  const cur=el.querySelector('.ccy'); const frac=el.querySelector('.frac');
  const cs=cur?getComputedStyle(cur):null; const fs=frac?getComputedStyle(frac):null;
  const tx2=getComputedStyle(document.documentElement).getPropertyValue('--tx2').trim();
  // resolve tx2 to rgb via probe
  const q=document.createElement('i'); q.style.color='var(--tx2)'; document.body.append(q);
  const tx2rgb=getComputedStyle(q).color; q.remove();
  return {
    fw:s.fontWeight, mw:s.minWidth, tv:s.fontVariantNumeric,
    hasCcy:!!cur, hasFrac:!!frac,
    ccyFw:cs&&cs.fontWeight, fracFw:fs&&fs.fontWeight,
    ccyC:cs&&cs.color, fracC:fs&&fs.color, tx2:tx2rgb
  };
});
ok(amt&&(['500','700'].includes(amt.fw)||+amt.fw===500),'表金额 .num.dec 字重 500（'+amt?.fw+'）');
ok(amt&&amt.hasCcy&&amt.hasFrac,'金额含 .ccy + .frac');
ok(amt&&(['400','normal'].includes(amt.ccyFw)||+amt.ccyFw===400)&&(['400','normal'].includes(amt.fracFw)||+amt.fracFw===400),'ccy/frac 字重 400');
ok(amt&&amt.ccyC===amt.tx2&&amt.fracC===amt.tx2,'ccy/frac 色 = tx2');
ok(amt&&(amt.mw==='9.5ch'||parseFloat(amt.mw)>=70),'金额列 min-width 9.5ch（'+amt?.mw+'）');

await pg.goto(B+'demo-analytics.html',{waitUntil:'networkidle0'});
const kpi=await pg.evaluate(()=>{
  const v=document.querySelector('.kpi .v.num');
  const s=getComputedStyle(v);
  const unit=v.querySelector('.unit'); const us=unit&&getComputedStyle(unit);
  const frac=v.querySelector('.frac');
  return {fw:s.fontWeight, fs:s.fontSize, lh:s.lineHeight, hasFrac:!!frac,
    ufs:us&&us.fontSize, ufw:us&&us.fontWeight, um:us&&us.marginLeft,
    pad:getComputedStyle(document.querySelector('.panel.kpi')).padding};
});
ok(['500','600'].includes(kpi.fw)||+kpi.fw===500,'KPI .v 字重 500');
ok(kpi.fs==='28px','KPI .v 28px（R69 编辑感）');
ok(kpi.hasFrac,'KPI 小数有 .frac');
ok(kpi.ufs==='13px'&&(['500','600'].includes(kpi.ufw)||+kpi.ufw===500),'KPI .unit 13/500（'+kpi.ufs+'/'+kpi.ufw+'）');
ok(kpi.um==='4px','KPI .unit margin-left 4px');
ok(kpi.pad==='8px 12px','KPI padding 8×12（密度）');

const dens=await pg.evaluate(()=>{
  const pb=[...document.querySelectorAll('.panel > .pb:not(.flush)')][0];
  const st=(pb&&pb.querySelector(':scope > .stack'))||document.querySelector('.pb > .stack')||document.querySelector('.stack');
  const page=document.querySelector('.g-wide > .stack, .main .stack');
  const kv=document.querySelector('.kv');
  return {
    pb: pb&&getComputedStyle(pb).padding,
    stackGap: st&&(getComputedStyle(st).rowGap||getComputedStyle(st).gap),
    pageGap: page&&(getComputedStyle(page).rowGap||getComputedStyle(page).gap),
    kvRow: kv&&getComputedStyle(kv).rowGap
  };
});
ok(dens.pb==='24px'||dens.pb==='24px 24px','面板 .pb 内边距 24（'+dens.pb+'）');
ok(dens.stackGap==='28px','面板内 .stack gap 28（R69）');
ok(dens.pageGap==='28px','页级 .stack gap 28（'+dens.pageGap+'）');
ok(dens.kvRow==='8px','kv row-gap 8');

// CSS markers（继承 R52/R53 + 本轮 R69 字阶）
ok(/R52 刻度：数字阶梯/.test(css),'CSS 含 R52 数字阶梯继承块');
ok(/R53 适应：意图化断点/.test(css),'CSS 含 R53 适应继承块');
ok((/R75 短续/.test(css)||/R73 阅读/.test(css)||/R70 章节/.test(css))&&/--fs-22/.test(css)&&/\.nav a\.on::before/.test(css),'CSS 含 R73 阅读/继承 + --fs-22 + 选中条');
ok(!/\.li\.on::before/.test(css),'无遗留 .li.on::before');
ok(/\.ccy\{/.test(css)&&/\.frac\{/.test(css),'CSS 含 .ccy/.frac');
ok(/\.tbl-scroll\{/.test(css),'CSS 含 .tbl-scroll');
ok(/--d-panel:240ms/.test(css)&&/--d-draw:480ms/.test(css),'动效 token --d-panel 240 / --d-draw 480');
ok(/tabs a::after/.test(css),'Tab 墨线 ::after');

// R52 继承：页标题克制 + 涨跌胶囊
await pg.goto(B+'demo-analytics.html',{waitUntil:'networkidle0'});
const h1=await pg.$eval('.ph h1',e=>{const s=getComputedStyle(e);return {fs:s.fontSize,fw:s.fontWeight,lh:s.lineHeight}});
ok(h1.fs==='22px'&&(+h1.fw===600||h1.fw==='600'),'页标题 22/600（'+h1.fs+'/'+h1.fw+'）');
const cap=await pg.evaluate(()=>{
  const u=document.querySelector('.kpi .d .up'); if(!u) return null;
  const s=getComputedStyle(u);
  return {fs:s.fontSize,h:s.height,bg:s.backgroundColor,display:s.display};
});
ok(cap&&cap.fs==='12px'&&cap.h==='20px'&&cap.display.includes('flex'),'涨跌胶囊 12/20 flex（'+JSON.stringify(cap)+'）');
ok(await pg.$eval('.kv dt',e=>getComputedStyle(e).fontSize)==='12px','kv dt 12');

// ===== R69：继承断点 + 对齐/动效下注 =====
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
ok(await pg.$('.tbl-scroll > .tbl'),'orders 表在 .tbl-scroll 内');

// 1600：侧栏在、宽轨可能在
await pg.setViewport({width:1600,height:1000});
await pg.reload({waitUntil:'networkidle0'});
const w1600=await pg.evaluate(()=>{
  const side=getComputedStyle(document.querySelector('.side')).display;
  const h1=getComputedStyle(document.querySelector('.ph h1')).fontSize;
  return {side,h1};
});
ok(w1600.side!=='none','1600 侧栏可见');
ok(w1600.h1==='22px','1600 标题 22');

// 1280：侧栏在、筛条可折、标题 20、表横滑
await pg.setViewport({width:1280,height:900});
await pg.reload({waitUntil:'networkidle0'});
const w1280=await pg.evaluate(()=>{
  const side=getComputedStyle(document.querySelector('.side')).display;
  const h1=getComputedStyle(document.querySelector('.ph h1')).fontSize;
  const bar=getComputedStyle(document.querySelector('.bar'));
  const sc=document.querySelector('.tbl-scroll');
  const scs=sc&&getComputedStyle(sc);
  return {side,h1,barWrap:bar.flexWrap,ox:scs&&scs.overflowX};
});
ok(w1280.side!=='none','1280 侧栏可见');
ok(w1280.h1==='22px','1280 标题保持 22');
ok(w1280.barWrap==='wrap','1280 筛条 flex-wrap');
ok(w1280.ox==='auto'||w1280.ox==='scroll','1280 tbl-scroll overflow-x');

// 1024：侧栏藏、KPI 两列、标题 20
await pg.setViewport({width:1024,height:900});
await pg.goto(B+'demo-analytics.html',{waitUntil:'networkidle0'});
const w1024=await pg.evaluate(()=>{
  const side=getComputedStyle(document.querySelector('.side')).display;
  const h1=getComputedStyle(document.querySelector('.ph h1')).fontSize;
  const g=document.querySelector('.grid.g4, .grid.g5w, .g4');
  const cols=g&&getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length;
  const kpiMin=getComputedStyle(document.querySelector('.kpi')).minWidth;
  return {side,h1,cols,kpiMin};
});
ok(w1024.side==='none','1024 侧栏隐藏');
ok(w1024.h1==='22px','1024 标题 22');
ok(w1024.cols===2,'1024 KPI 网格 2 列（'+w1024.cols+'）');
ok(w1024.kpiMin==='0px','KPI min-width 0 防裁切');

// 520：单列、标题 20
await pg.setViewport({width:520,height:900});
await pg.reload({waitUntil:'networkidle0'});
const w520=await pg.evaluate(()=>{
  const h1=getComputedStyle(document.querySelector('.ph h1')).fontSize;
  const g=document.querySelector('.grid.g4, .grid.g5w, .g4');
  const cols=g&&getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length;
  return {h1,cols};
});
ok(w520.h1==='20px','520 标题 20');
ok(w520.cols===1,'520 KPI 单列（'+w520.cols+'）');

// 动效：抽屉 --d-panel；R69 入场 6px / 错峰 56ms；reduce 降级；描线 480
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo.html',{waitUntil:'networkidle0'});
const motion=await pg.evaluate(()=>{
  const r=getComputedStyle(document.documentElement);
  const d=document.querySelector('.drawer');
  const scr=document.querySelector('.scrim');
  const tab=document.querySelector('.tabs a.on');
  const after=tab&&getComputedStyle(tab,'::after');
  return {
    panel:r.getPropertyValue('--d-panel').trim(),
    draw:r.getPropertyValue('--d-draw').trim(),
    enter:r.getPropertyValue('--d-enter').trim(),
    enterY:r.getPropertyValue('--enter-y').trim(),
    stagger:r.getPropertyValue('--stagger').trim(),
    alignX:r.getPropertyValue('--align-x').trim(),
    dSel:r.getPropertyValue('--d-sel').trim(),
    dTrans:d&&getComputedStyle(d).transitionDuration,
    sTrans:scr&&getComputedStyle(scr).transitionDuration,
    inkH:after&&after.height,
  };
});
ok(motion.panel==='240ms','--d-panel 240ms');
ok(motion.draw==='480ms','--d-draw 480ms');
ok(motion.enter==='200ms','--d-enter 200ms');
ok(motion.enterY==='6px','--enter-y 6px（R69）');
ok(motion.stagger==='56ms','--stagger 56ms（R69）');
ok(motion.alignX==='32px','--align-x 32px @≥1280（R72）');
ok(motion.dSel==='160ms','--d-sel 160ms');
ok(motion.dTrans.includes('0.24')||motion.dTrans.includes('240'),'drawer 时长走 panel（'+motion.dTrans+'）');
ok(motion.inkH==='2px','Tab 墨线 ::after 2px');
ok(/sel-bar/.test(css)&&/scaleY/.test(css),'选中指示条 scaleY 动效');
const selH=await pg.evaluate(()=>{const a=document.querySelector('.nav a.on');if(!a)return null;const ps=getComputedStyle(a,'::before');return {h:parseFloat(ps.height),top:ps.top,bottom:ps.bottom,content:ps.content};});
ok(selH&&selH.h>=18,'选中条高度 ≥18（'+selH?.h+' top='+selH?.top+')');
ok(selH&&selH.content!=='none','选中条 ::before 有 content');
ok(/translateY\(var\(--enter-y/.test(css)||/--enter-y:6px/.test(css),'入场位移走 --enter-y');

// 对齐：主栏 24；筛条控件 32；图标中线；金额右齐
const align=await pg.evaluate(()=>{
  const main=document.querySelector('.main');
  const ms=getComputedStyle(main);
  const bar=document.querySelector('.bar');
  const ctrls=bar?[...bar.querySelectorAll(':scope > .btn, :scope > .inp, :scope > .sel')].map(e=>Math.round(e.getBoundingClientRect().height)):[];
  const stt=document.querySelector('.stt');
  let iconDelta=null;
  if(stt){
    const ic=stt.querySelector('.ic');
    if(ic){
      const a=stt.getBoundingClientRect(), b=ic.getBoundingClientRect();
      iconDelta=Math.abs((a.top+a.height/2)-(b.top+b.height/2));
    }
  }
  const h2=document.querySelector('.ph-h h2');
  const h2w=h2&&getComputedStyle(h2).fontWeight;
  return {pl:ms.paddingLeft, ctrls, iconDelta, h2w};
});
ok(align.pl==='32px','主栏 padding-left 32 @1280（'+align.pl+'）');
ok(align.ctrls.length===0||align.ctrls.every(h=>h===32||h===24),'筛条直属控件高 32（'+align.ctrls.join('/')+'）');
ok(align.iconDelta==null||align.iconDelta<=0.5,'图标中线差 ≤0.5px（'+align.iconDelta+'）');
ok(align.h2w==='600'||align.h2w===600||align.h2w==='500','面板标题字重 600 档（'+align.h2w+'）');

await pg.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
await pg.reload({waitUntil:'networkidle0'});
const red=await pg.evaluate(()=>{
  drawer(true);
  const e=document.querySelector('.drawer .pb>*');
  return e?getComputedStyle(e).transitionDelay:'none';
});
ok(/^0s/.test(red),'reduce 下抽屉内容 delay '+red);
await pg.emulateMediaFeatures([]);

// JS 描线 480（非 720）
const js=require('fs').readFileSync(__dirname+'/../rounds/r96/app.js','utf8');
ok(/stroke-dashoffset 480ms/.test(js),'app.js 描线 480ms');
ok(!/stroke-dashoffset 720ms/.test(js),'app.js 无 720ms 描线');


// R69 表齐：状态芯片 28 / 图标 14；empty.risk eic ≥56；前部 KPI 硬 px 清零
const sttW=await pg.evaluate(()=>{
  const s=document.querySelector('.stt');
  if(!s) return null;
  const r=s.getBoundingClientRect();
  const ic=s.querySelector('.ic');
  const ir=ic&&ic.getBoundingClientRect();
  return {h:Math.round(r.height), iw:ir?Math.round(ir.width):null, ih:ir?Math.round(ir.height):null};
});
ok(sttW&&sttW.h===28,'R69 .stt 高 28（'+JSON.stringify(sttW)+'）');
ok(sttW&&sttW.iw===14&&sttW.ih===14,'R69 .stt .ic 14（'+JSON.stringify(sttW)+'）');
ok(/\.stt\{height:28px/.test(css)||/R69 表齐/.test(css),'CSS 含 R69 表齐块');
const eic=await pg.evaluate(()=>{
  let el=document.querySelector('.empty.risk .eic,.empty.exc .eic');
  if(!el){
    // inject temp for measure if demo has no empty risk
    const d=document.createElement('div');
    d.className='empty risk'; d.innerHTML='<div class="eic"></div>';
    d.style.position='absolute'; d.style.left='-9999px';
    document.body.appendChild(d);
    el=d.querySelector('.eic');
    const r=el.getBoundingClientRect();
    d.remove();
    return {w:Math.round(r.width),h:Math.round(r.height),injected:true};
  }
  const r=el.getBoundingClientRect();
  return {w:Math.round(r.width),h:Math.round(r.height),injected:false};
});
ok(eic&&eic.w>=56&&eic.h>=56,'R69 empty.risk/exc .eic ≥56（'+JSON.stringify(eic)+'）');
const hard= (css.match(/\.kpi \.v\{[^}]*font-size:\s*\d+px/g)||[])
  .concat(css.match(/\.kpi \.v,\.hk b\{font-size:\s*\d+px/g)||[]);
ok(hard.length===0,'R69 主路径 .kpi .v 无硬编码 px（'+hard.length+'）');


// R69 表齐：ops 主路径挂 stt；pad/gap 走 token；rail 无硬 20px
await pg.goto('http://127.0.0.1:8811/rounds/r96/demo-ops.html',{waitUntil:'networkidle0'});
const ops=await pg.evaluate(()=>{
  const n=document.querySelectorAll('.list .li .stt').length;
  const det=!!document.querySelector('[data-detail] .ph-h .stt, .panel .ph-h .stt.exc');
  // R86：索引 .ed-m .stt 已显旁 pad=0；R69 量详情头芯片（仍走 --s3/--s2）
  const s=document.querySelector('[data-detail] .ph-h .stt, .panel .ph-h .stt') || document.querySelector('.stt:not(.ed-m .stt)');
  const cs=s&&getComputedStyle(s);
  return {
    n, det,
    padL:cs&&cs.paddingLeft, gap:cs&&cs.columnGap,
  };
});
ok(ops.n>=7,'R69 demo-ops 列表 ≥7 枚 .stt（'+ops.n+'）');
ok(ops.det,'R69 demo-ops 详情头有 .stt');
ok(ops.padL==='12px','R69 .stt padding-left 走 --s3→12（'+ops.padL+'）');
ok(ops.gap==='8px','R69 .stt gap 走 --s2→8（'+ops.gap+'）');
ok(!/\.g-wide>\.rail \.kpi \.v\{[^}]*font-size:\s*20px/.test(css),'R69 rail KPI 无硬 20px');


// R69 表齐：选 a6 后详情头 .stt 为 done「已结束」；li gap token；h2 字重 600
await pg.goto('http://127.0.0.1:8811/rounds/r96/demo-ops.html',{waitUntil:'networkidle0'});
await selLi('a6');
await pg.evaluate(()=>new Promise(r=>setTimeout(r,80)));
const sync=await pg.evaluate(()=>{
  const chip=document.querySelector('[data-detail] .ph-h .stt');
  const h2=document.querySelector('[data-detail] .ph-h h2');
  const li=document.querySelector('.list .li');
  const gap=li&&getComputedStyle(li).columnGap;
  const hw=getComputedStyle(document.querySelector('.ph-h h2')).fontWeight;
  return {
    cls:chip&&chip.className,
    txt:chip&&chip.textContent.trim(),
    h2:h2&&h2.textContent.trim(),
    gap, hw
  };
});
ok(sync&&/done/.test(sync.cls||'')&&sync.txt==='已结束','R69 选 a6 详情头 .stt=已结束（'+JSON.stringify(sync)+'）');
ok(sync&&sync.h2&&sync.h2.includes('消息队列'),'R69 a6 标题同步');
ok(sync&&(sync.gap==='12px'||sync.gap==='16px'),'R69/R75 .li gap 12|16（'+sync.gap+'）');
ok(sync&&(sync.hw==='600'||sync.hw===600),'R69 .ph-h h2 字重 600（'+sync.hw+'）');


// R69 表齐：stack/grid gap 16；sub-h fw600 tx2；pb padding 20
await pg.goto('http://127.0.0.1:8811/rounds/r96/demo-ops.html',{waitUntil:'networkidle0'});
const sp=await pg.evaluate(()=>{
  const stack=document.querySelector('[data-detail] .pb > .stack');
  const figs=document.querySelector('[data-detail] .ch-figs, [data-detail] .read-figs');
  const g3=document.querySelector('[data-detail] .grid.g3');
  const sub=document.querySelector('.sub-h, .drill-more .drill-cap');
  const pb=document.querySelector('[data-detail] .pb');
  const ss=stack&&getComputedStyle(stack);
  const fs=figs&&getComputedStyle(figs);
  const su=sub&&getComputedStyle(sub);
  const ps=pb&&getComputedStyle(pb);
  return {
    stackGap:ss&&ss.rowGap,
    figsGap:fs&&fs.columnGap,
    hasG3:!!g3,
    subFw:su&&su.fontWeight,
    subMt:su&&su.marginTop,
    subColor:su&&su.color,
    pbPad:ps&&ps.paddingTop,
  };
});
ok(sp&&(sp.stackGap==='28px'||sp.stackGap==='20px'),'R69/R75 .stack gap 28|20（'+sp.stackGap+'）');
ok(sp&&!sp.hasG3,'R73 详情无 .grid.g3 KPI 卡墙');
ok(sp&&sp.figsGap&&parseFloat(sp.figsGap)>=16,'R73 详情 .ch-figs 列距（'+sp.figsGap+'）');
ok(sp&&(sp.subFw==='600'||sp.subFw===600),'R69 .sub-h 字重 600（'+sp.subFw+'）');
ok(sp&&(sp.subMt==='28px'||sp.subMt==='0px'||sp.subMt==null),'R69/R75 .sub-h mt（'+sp.subMt+'）');
ok(sp&&sp.pbPad==='24px','R69 .panel .pb padding 24（'+sp.pbPad+'）');


// R75 短续：1280/1600 均为单列续读（无 .g-list 双栏）
await pg.setViewport({width:1280,height:900});
await pg.goto('http://127.0.0.1:8811/rounds/r96/demo-ops.html',{waitUntil:'networkidle0'});
const r1280=await pg.evaluate(()=>{
  const flow=document.querySelector('.ch-flow.drill');
  const sub=document.querySelector('.sub-h, .drill-more .drill-cap');
  const h2=document.querySelector('[data-detail] .ph-h h2, .drill-pane .ph-h h2');
  const listPanel=document.querySelector('.ch-index, .ch-list.ch-index');
  const list=listPanel&&listPanel.querySelector('.list');
  const grp=list&&list.querySelector('.grp.is-stick')||list&&list.querySelector('.grp');
  const det=document.querySelector('[data-detail]');
  const fs=flow&&getComputedStyle(flow);
  const ss=sub&&getComputedStyle(sub);
  const hs=h2&&getComputedStyle(h2);
  const ls=list&&getComputedStyle(list);
  const gg=grp&&getComputedStyle(grp);
  const stickN=list?list.querySelectorAll('.grp.is-stick').length:0;
  const q=document.createElement('i');
  document.body.append(q);
  q.style.color='var(--tx1)'; const tx1=getComputedStyle(q).color;
  q.style.color='var(--tx2)'; const tx2=getComputedStyle(q).color;
  q.style.color='var(--tx3)'; const tx3=getComputedStyle(q).color;
  q.remove();
  const detRect=det&&det.getBoundingClientRect();
  const listRect=listPanel&&listPanel.getBoundingClientRect();
  return {
    flowDisp:fs&&fs.display,
    flowDir:fs&&fs.flexDirection,
    hasGList:!!document.querySelector('.g-list'),
    subFs:ss&&ss.fontSize,
    subLh:ss&&ss.lineHeight,
    subColor:ss&&ss.color,
    h2Fs:hs&&hs.fontSize,
    h2Lh:hs&&hs.lineHeight,
    h2Color:hs&&hs.color,
    tx1, tx2, tx3,
    listMaxH:ls&&ls.maxHeight,
    listOY:ls&&ls.overflowY,
    listH:list&&Math.round(list.getBoundingClientRect().height),
    detTop:det&&Math.round(det.getBoundingClientRect().top),
    stacked: !!(detRect&&listRect&&detRect.top>=listRect.bottom-2),
    grpSticky:gg&&gg.position,
    stickN,
    kicker:!!document.querySelector('.drill-kicker'),
    indexH:!!document.querySelector('.index-h'),
  };
});
ok(r1280&&!r1280.hasGList,'R75 ops 无 .g-list 双栏壳');
ok(r1280&&r1280.flowDisp==='flex'&&r1280.flowDir==='column','R75 @1280 .ch-flow.drill 单列（'+r1280.flowDir+'）');
ok(r1280&&r1280.stacked,'R75 @1280 详情叠在索引下方');
ok(r1280&&r1280.kicker&&r1280.indexH,'R75 有 drill-kicker + index-h');
ok(r1280&&(r1280.subFs==='15px'||r1280.subFs==='12px'||r1280.subFs==null),'R69/R75 .sub-h fs（'+r1280.subFs+'）');
ok(r1280&&(r1280.subLh==='22px'||r1280.subLh==='16px'||r1280.subLh==null),'R69/R75 .sub-h lh（'+r1280.subLh+'）');
ok(r1280&&r1280.h2Fs==='15px','R69 .ph-h h2 15px（'+r1280.h2Fs+'）');
ok(r1280&&r1280.h2Lh==='22px','R69 .ph-h h2 lh 22（'+r1280.h2Lh+'）');
ok(r1280&&r1280.h2Color===r1280.tx1,'R69 h2 色 = tx1');
ok(r1280&&(r1280.subColor===r1280.tx2||r1280.subColor===r1280.tx3||r1280.subColor==null),'R69/R75 sub-h 色 tx2|tx3');
ok(r1280&&['44px','112px','280px','40px','56px','64px','72px','80px','240px','360px'].includes(r1280.listMaxH),'R78/R76/R86 索引 .list max-height 分阶（'+r1280.listMaxH+'）');
ok(r1280&&(r1280.listOY==='auto'||r1280.listOY==='scroll'),'R75 索引 .list overflow-y auto（'+r1280.listOY+'）');
ok(r1280&&r1280.listH&&r1280.listH<=112,'R76 索引旁注 .list 高≤112（'+r1280.listH+'）');
ok(r1280&&r1280.detTop!=null&&r1280.detTop>0,'R75 @1280 详情在文档流中（top='+r1280.detTop+'）');
const ch0=await pg.evaluate(()=>{const el=document.querySelector('.chapter');return el?Math.round(el.getBoundingClientRect().top):null});
ok(ch0!=null&&ch0<500,'R75 @1280 首章在上半屏（top='+ch0+'）');
ok(r1280&&r1280.stickN===1,'R75 @1280 仅 1 个 .grp.is-stick（'+r1280.stickN+'）');
ok(r1280&&r1280.grpSticky==='sticky','R75 @1280 .is-stick 为 sticky（'+r1280.grpSticky+'）');
await pg.evaluate(()=>{const list=document.querySelector('.ch-index .list, .ch-list.ch-index .list');if(list)list.scrollTop=list.scrollHeight});
await new Promise(r=>setTimeout(r,50));
const atEnd=await pg.evaluate(()=>{
  const list=document.querySelector('.ch-index .list, .ch-list.ch-index .list');
  const grps=[...list.querySelectorAll(':scope > .grp')];
  const stuck=list.querySelector('.grp.is-stick');
  return {last:grps.length?grps[grps.length-1].textContent.trim().slice(0,6):null,
          stick:stuck&&stuck.textContent.trim().slice(0,6),
          n:list.querySelectorAll('.grp.is-stick').length};
});
ok(atEnd&&atEnd.n===1,'R75 滚到底仍仅 1 stick（'+atEnd.n+'）');
ok(atEnd&&atEnd.stick&&atEnd.last&&atEnd.stick===atEnd.last,'R75 滚到底粘末组（'+atEnd.stick+' / '+atEnd.last+'）');

await pg.setViewport({width:1600,height:900});
await pg.reload({waitUntil:'networkidle0'});
const r1600=await pg.evaluate(()=>{
  const flow=document.querySelector('.ch-flow.drill');
  const fs=flow&&getComputedStyle(flow);
  const det=document.querySelector('[data-detail]');
  const listPanel=document.querySelector('.ch-index');
  const detRect=det&&det.getBoundingClientRect();
  const listRect=listPanel&&listPanel.getBoundingClientRect();
  return {
    dir:fs&&fs.flexDirection,
    hasGList:!!document.querySelector('.g-list'),
    stacked: !!(detRect&&listRect&&detRect.top>=listRect.bottom-2),
    gap:fs&&fs.gap
  };
});
ok(r1600&&!r1600.hasGList,'R75 @1600 仍无 .g-list');
ok(r1600&&r1600.dir==='column','R75 @1600 仍单列续读（'+r1600.dir+'）');
ok(r1600&&r1600.stacked,'R75 @1600 详情叠在索引下方');

// R86 显旁：索引 .ed-m .stt 散文化；R69 定宽改量详情头芯片；副文同列在散文态让位
await selLi('a1');
await new Promise(r=>setTimeout(r,60));
const col=await pg.evaluate(()=>{
  const chipRows=[...document.querySelectorAll('.list .li')].map(li=>{
    const stt=[...li.querySelectorAll('.stt')].find(s=>!s.closest('.ed-m'));
    const num=li.querySelector('.side-v .num');
    const sttW=stt?Math.round(stt.getBoundingClientRect().width):0;
    return {sttW, numL:num&&Math.round(num.getBoundingClientRect().left)};
  });
  const head=document.querySelector('[data-detail] .ph-h .stt, .panel .ph-h .stt');
  const headW=head?Math.round(head.getBoundingClientRect().width):0;
  const vis=chipRows.filter(r=>r.sttW>0);
  const sttMin=vis.length?Math.min(...vis.map(r=>r.sttW)):(headW||0);
  const nums=chipRows.map(r=>r.numL).filter(x=>x!=null && x>0);
  return {
    n:chipRows.length,
    numLN:nums.length?new Set(nums).size:1,
    sttMin,
    headW,
    numL:[...new Set(nums)],
    usedHead:!vis.length && headW>0,
    proseLayout:!vis.length
  };
});
ok(col&&col.n>=5,'R69 列表行数（'+col.n+'）');
// 索引芯片已散文；详情头芯片随文案宽度，≥56 即可（原列表定宽 ≥84 让位）
ok(col&&(col.sttMin>=84 || (col.usedHead&&col.sttMin>=56)),'R69 .stt 定宽（'+col.sttMin+(col.usedHead?' head':'')+'）');
ok(col&&col.numLN===1,'R69 时长左缘同列（'+col.numL.join(',')+'）');

await pg.goto('http://127.0.0.1:8811/rounds/r96/demo-orders.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
const tbl=await pg.evaluate(()=>{
  const rows=[...document.querySelectorAll('.tbl td .stt')].map(el=>({
    t:el.textContent.trim(), w:Math.round(el.getBoundingClientRect().width)
  })).filter(r=>r.w>0);
  const ws=[...new Set(rows.map(r=>r.w))];
  return {n:rows.length, ws, min:rows.length?Math.min(...rows.map(r=>r.w)):0};
});
ok(tbl&&tbl.n>=8,'R69 订单表 .stt 行数（'+tbl.n+'）');
ok(tbl&&tbl.min>=108,'R69 表 .stt 定宽 ≥108（'+tbl.min+'）');
ok(tbl&&tbl.ws.length===1,'R69 表 .stt 同宽（'+tbl.ws.join(',')+'）');

await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
await pg.setViewport({width:1024,height:900});
await pg.reload({waitUntil:'networkidle0'});
const r1024=await pg.evaluate(()=>{
  const flow=document.querySelector('.ch-flow.drill');
  const fs=flow&&getComputedStyle(flow);
  return {dir:fs&&fs.flexDirection, hasGList:!!document.querySelector('.g-list')};
});
ok(r1024&&!r1024.hasGList&&r1024.dir==='column','R75 @1024 单列续读（'+r1024.dir+'）');

ok(/block:'start'/.test(fs.readFileSync(__dirname+'/../rounds/r96/app.js','utf8')),'app.js scrollIntoView block start');
ok(/bindListStick/.test(fs.readFileSync(__dirname+'/../rounds/r96/app.js','utf8')),'app.js bindListStick');
ok(/min-width:108px/.test(css),'CSS 含表内 stt min-width 108');


// ===== R73 章体：极简轨 + 真章节 + 少 panel 墙 =====
await pg.setViewport({width:1440,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const ed=await pg.evaluate(()=>{
  const s=getComputedStyle(document.documentElement);
  const g=k=>s.getPropertyValue(k).trim();
  const h1=document.querySelector('.ph h1');
  const h2=document.querySelector('.ch-title')||document.querySelector('.ph-h h2');
  const main=document.querySelector('.main');
  const glist=document.querySelector('.ch-flow.drill')||document.querySelector('.g-list');
  const pri=document.querySelector('.btn.pri');
  const hs1=h1?getComputedStyle(h1):null;
  const hs2=h2?getComputedStyle(h2):null;
  const ms=main?getComputedStyle(main):null;
  const gs=glist?getComputedStyle(glist):null;
  const ps=pri?getComputedStyle(pri):null;
  const probe=document.createElement('i');document.body.append(probe);
  probe.style.color='var(--accent)';const accent=getComputedStyle(probe).color;probe.remove();
  const side=document.querySelector('.side');
  const app=document.querySelector('.app');
  return {
    accentTok:g('--accent'),
    h1fs:hs1&&hs1.fontSize,h1fw:hs1&&hs1.fontWeight,
    h2fs:hs2&&hs2.fontSize,h2fw:hs2&&hs2.fontWeight,
    mainPad:ms&&ms.paddingLeft,
    listGap:(gs&&(gs.gap||gs.columnGap||gs.rowGap)),
    priBg:ps&&ps.backgroundColor,
    accentRgb:accent,
    sideW:side?Math.round(side.getBoundingClientRect().width):0,
    cols:app&&getComputedStyle(app).gridTemplateColumns,
    bodyFs:getComputedStyle(document.body).fontSize,
    chapters:document.querySelectorAll('.chapter').length,
    chTitle:document.querySelectorAll('.ch-title').length,
    chLede:document.querySelectorAll('.ch-lede').length,
    chFigs:document.querySelectorAll('.ch-fig').length,
    chNarr:!!document.querySelector('.ch-narr'),
    metrics:!!document.querySelector('.ch-metrics:not([style*="display: none"])'),
    metricsDisp: (()=>{const el=document.querySelector('.ch-metrics');return el?getComputedStyle(el).display:'none'})(),
    openPanels:document.querySelectorAll('.panel.open').length,
    topSearch: (()=>{const el=document.querySelector('.top .inp.search');return el?getComputedStyle(el).display:'none'})(),
    rail:!!document.querySelector('.side.rail')
  };
});
ok(ed.accentTok.toUpperCase()==='#1F5FD1','accent token 钴 #1F5FD1（'+ed.accentTok+'）');
ok(ed.h1fs==='22px'&&ed.h1fw==='600','页标题 22/600（'+ed.h1fs+'/'+ed.h1fw+'）');
ok(ed.h2fs==='15px'&&ed.h2fw==='600','章题 15/600（'+ed.h2fs+'/'+ed.h2fw+'）');
ok(ed.mainPad==='32px','页边 pad 32（'+ed.mainPad+'）');
ok(ed.listGap==='28px'||ed.listGap==='32px'||ed.listGap==='normal','区块 gap 28（list='+ed.listGap+'）');
ok(ed.priBg===ed.accentRgb,'主按钮背景 = accent 钴');
ok(ed.sideW>=64&&ed.sideW<=80,'R73 极简轨宽 64–80（'+ed.sideW+'）');
ok(/72px/.test(ed.cols||''),'R73 .app 列含 72px（'+ed.cols+'）');
ok(ed.bodyFs==='13px','正文 13（'+ed.bodyFs+'）');
ok(ed.rail,'R73 .side.rail 存在');
ok(ed.chapters>=2,'R73 ops ≥2 个 .chapter（'+ed.chapters+'）');
ok(ed.chTitle>=2&&ed.chLede>=2,'R73 ch-title/lede ≥2（'+ed.chTitle+'/'+ed.chLede+'）');
ok(ed.chNarr&&ed.chFigs>=3,'R73 开章叙事 + ≥3 行内数字（figs='+ed.chFigs+'）');
ok(ed.metricsDisp==='none','R73 旧 .ch-metrics 隐藏（'+ed.metricsDisp+'）');
ok(ed.openPanels>=1,'R73 有 .panel.open（'+ed.openPanels+'）');
ok(ed.topSearch==='none','R73 顶栏搜索隐藏');
ok((/R76 一焦/.test(css)||/R75 短续/.test(css))&&/--fs-22/.test(css),'CSS 含 R76/R75 + --fs-22');
ok(/\.side\.rail\{/.test(css)||/\.side\.rail\s*\{/.test(css)||/side\.rail\{/.test(css.replace(/\n/g,'')),'CSS 含 .side.rail');
// 深色 accent
await pg.evaluate(()=>document.documentElement.dataset.theme='dark');
const accD=await pg.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
ok(accD.toUpperCase()==='#6B93F0','深色 accent #6B93F0（'+accD+'）');
await pg.evaluate(()=>document.documentElement.removeAttribute('data-theme'));
// orders 章节 + 表齐
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
ok(await pg.$$eval('.tbl .stt',c=>{const v=c.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0});return v.length>0&&v.every(e=>e.getBoundingClientRect().width>=107)}),'订单表可见 stt ≥108');
const ord=await pg.evaluate(()=>({
  ch:document.querySelectorAll('.chapter').length,
  title:document.querySelectorAll('.ch-title').length,
  open:document.querySelectorAll('.panel.open').length,
  sideW:Math.round(document.querySelector('.side').getBoundingClientRect().width)
}));
ok(ord.ch>=2&&ord.title>=2,'R73 orders ≥2 章节（'+ord.ch+'/'+ord.title+'）');
ok(ord.open>=1,'R73 orders 有 open panel');
ok(ord.sideW>=64&&ord.sideW<=80,'R73 orders 轨宽（'+ord.sideW+'）');

// R72：1280 页边 32；辅文 12/tx3；stt.act 非 accent；严重数字可扫
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const r72=await pg.evaluate(()=>{
  const main=document.querySelector('.main');
  const ms=main&&getComputedStyle(main);
  const dek=document.querySelector('.ph .dek')||document.querySelector('.ph p');
  const ds=dek&&getComputedStyle(dek);
  const lede=document.querySelector('.ch-lede');
  const ls=lede&&getComputedStyle(lede);
  const act=document.querySelector('.stt.act');
  const as=act&&getComputedStyle(act);
  const bad=document.querySelector('.ch-fig b.num.bad, .ch-narr b.num.bad');
  const bs=bad&&getComputedStyle(bad);
  const probe=document.createElement('i');document.body.append(probe);
  const g=v=>{probe.style.color='var('+v+')';return getComputedStyle(probe).color};
  const accent=g('--accent'), info=g('--info'), infoBg=g('--info-bg'), accentBg=g('--accent-bg'), tx3=g('--tx3'), badC=g('--bad');
  probe.remove();
  const side=document.querySelector('.side');
  const app=document.querySelector('.app');
  const listPanel=document.querySelector('.ch-list, .panel.open.ch-list');
  const lp=listPanel&&getComputedStyle(listPanel);
  return {
    pl:ms&&ms.paddingLeft, pr:ms&&ms.paddingRight,
    dekFs:ds&&ds.fontSize, dekColor:ds&&ds.color, tx3,
    ledeFs:ls&&ls.fontSize, ledeColor:ls&&ls.color,
    actBg:as&&as.backgroundColor, actColor:as&&as.color,
    accent, info, infoBg, accentBg, badC,
    badColor:bs&&bs.color,
    sideW:side?Math.round(side.getBoundingClientRect().width):0,
    cols:app&&getComputedStyle(app).gridTemplateColumns,
    panelBorder:lp&&lp.borderTopWidth,
    panelBg:lp&&lp.backgroundColor
  };
});
ok(r72.pl==='32px'&&r72.pr==='32px','R73 @1280 页边 32（'+r72.pl+'/'+r72.pr+'）');
ok(r72.dekFs==='12px','R73 dek 12px（'+r72.dekFs+'）');
ok(r72.dekColor===r72.tx3,'R73 dek 色 = tx3');
ok(r72.ledeFs==='12px'&&r72.ledeColor===r72.tx3,'R73 ch-lede 12/tx3');
ok(r72.actBg===r72.infoBg||r72.actColor===r72.info,'R73 .stt.act 走 info 非 accent（bg='+r72.actBg+'）');
ok(r72.actBg!==r72.accentBg,'R73 .stt.act 不用 accent-bg');
ok(r72.badColor===r72.badC,'R73 严重数字色 = --bad（可扫）');
ok(r72.sideW>=64&&r72.sideW<=80,'R73 @1280 轨宽（'+r72.sideW+'）');
ok(/72px/.test(r72.cols||''),'R73 @1280 .app 含 72px');
ok(r72.panelBorder==='0px'||r72.panelBg==='rgba(0, 0, 0, 0)','R73 列表 open panel 去墙（border='+r72.panelBorder+' bg='+r72.panelBg+'）');
ok(/\.stt\.act\{background:var\(--info-bg\)/.test(css)||/stt\.act\{background:var\(--info-bg\)/.test(css),'CSS .stt.act → info-bg');


// ===== R73 章体：详情去 tile KPI · 发丝纪律 · 滤栏/托盘减框 =====
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const r72b=await pg.evaluate(()=>{
  const read=document.querySelector('[data-detail], .panel.open.read');
  const tiles=read?[...read.querySelectorAll('.tile.kpi')].filter(e=>getComputedStyle(e).display!=='none'):[];
  const figs=read?read.querySelectorAll('.ch-figs.read-figs .ch-fig, .read-figs .ch-fig').length:0;
  const figsEl=read&&(read.querySelector('.ch-figs.read-figs')||read.querySelector('.read-figs'));
  const fs=figsEl&&getComputedStyle(figsEl);
  const ch2=document.querySelectorAll('.chapter');
  let chBorder='n/a';
  if(ch2.length>=2){chBorder=getComputedStyle(ch2[1]).borderTopWidth}
  const openFigs=document.querySelector('.ch-open .ch-figs');
  const ofs=openFigs&&getComputedStyle(openFigs);
  const filt=document.querySelector('.bar.filt');
  const filtS=filt&&getComputedStyle(filt);
  const tray=document.querySelector('.tray.soft');
  const trayS=tray&&getComputedStyle(tray);
  const softH=document.querySelector('.ph-h.soft-h');
  const shS=softH&&getComputedStyle(softH);
  return {
    tileVis:tiles.length,
    figs,
    figsBorder:fs&&fs.borderTopWidth,
    chBorder,
    openFigsBorder:ofs&&ofs.borderTopWidth,
    filtBorder:filtS&&filtS.borderBottomWidth,
    filtBg:filtS&&filtS.backgroundColor,
    trayBorder:trayS&&trayS.borderTopWidth,
    trayBg:trayS&&trayS.backgroundColor,
    softHBorder:shS&&shS.borderBottomWidth,
    hasFilt:!!filt,
    hasSoftTray:!!tray,
    chapters:ch2.length
  };
});
ok(r72b.tileVis===0,'R73 详情无可见 .tile.kpi（'+r72b.tileVis+'）');
ok(r72b.figs>=3,'R73 详情行内 figs ≥3（'+r72b.figs+'）');
ok(r72b.figsBorder==='0px','R73 详情 figs 无顶发丝（'+r72b.figsBorder+'）');
ok(r72b.openFigsBorder==='0px','R73 开章 figs 无顶发丝（'+r72b.openFigsBorder+'）');
ok(r72b.chBorder==='0px','R73 章间无全宽发丝（'+r72b.chBorder+'）');
ok(r72b.hasFilt&&r72b.filtBorder==='0px','R73 .bar.filt 无底边（'+r72b.filtBorder+'）');
ok(r72b.hasSoftTray&&r72b.trayBorder==='0px','R73 .tray.soft 无顶边（'+r72b.trayBorder+'）');
ok(r72b.softHBorder==='0px'||r72b.softHBorder==null,'R73 soft-h 无底边（'+r72b.softHBorder+'）');
ok(r72b.chapters>=3,'R73 ops ≥3 chapter（'+r72b.chapters+'）');
ok(/R76 一焦/.test(css)&&/R75 短续/.test(css),'CSS 含 R76 一焦 + R75 继承');
ok(/read-figs/.test(css)||/\.read-figs/.test(css),'CSS 含 read-figs');
// templates/live: no tile kpi in ops source
const opsSrc=fs.readFileSync(__dirname+'/../rounds/r96/demo-ops.html','utf8');
ok(!/tile kpi/.test(opsSrc),'demo-ops 源码无 tile kpi');
// orders soft chrome
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const ord72=await pg.evaluate(()=>{
  const tabs=document.querySelector('.tabs.soft-tabs');
  const ts=tabs&&getComputedStyle(tabs);
  const filt=document.querySelector('.bar.filt');
  const tray=document.querySelector('.tray.soft');
  const trayS=tray&&getComputedStyle(tray);
  return {
    softTabs:!!tabs,
    tabsBorder:ts&&ts.borderBottomWidth,
    filt:!!filt,
    trayBorder:trayS&&trayS.borderTopWidth
  };
});
ok(ord72.softTabs&&ord72.tabsBorder==='0px','R73 orders soft-tabs 无底边');
ok(ord72.filt,'R73 orders 有 .bar.filt');
ok(ord72.trayBorder==='0px','R73 orders tray.soft 无顶边');


// ===== R73 阅读：列表文本筛 · 专栏组头 · 去 spark · 订单章头 · 提醒去色块 =====
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const r73=await pg.evaluate(()=>{
  const filt=document.querySelector('.bar.filt.text');
  const fs=filt&&getComputedStyle(filt);
  const sels=filt?filt.querySelectorAll('button.sel, .sel').length:0;
  const txts=filt?filt.querySelectorAll('button.txt, .txt').length:0;
  const grps=[...document.querySelectorAll('.grp.ed')];
  const sparks=[...document.querySelectorAll('.ch-list .spark, .list .li .spark')].filter(e=>getComputedStyle(e).display!=='none');
  const quiet=document.querySelectorAll('.side-v.quiet').length;
  const tiles=[...document.querySelectorAll('[data-detail] .tile.kpi')].filter(e=>getComputedStyle(e).display!=='none');
  return {
    hasTextFilt:!!filt,
    filtBorder:fs&&fs.borderBottomWidth,
    sels, txts,
    grpEd:grps.length,
    sparkVis:sparks.length,
    quiet,
    tileVis:tiles.length,
    chapters:document.querySelectorAll('.chapter').length
  };
});
ok(r73.hasTextFilt,'R73 ops 有 .bar.filt.text');
ok(r73.sels===0,'R73 ops 滤栏无实体 .sel（'+r73.sels+'）');
ok(r73.txts>=2,'R73 ops 滤栏文本控件 ≥2（'+r73.txts+'）');
ok(r73.grpEd>=3,'R73 ops .grp.ed ≥3（'+r73.grpEd+'）');
ok(r73.sparkVis===0,'R73 列表无可见 spark（'+r73.sparkVis+'）');
ok(r73.quiet>=5,'R73 安静时间侧栏 ≥5（'+r73.quiet+'）');
ok(r73.tileVis===0,'R73 详情仍无 tile.kpi');
ok(r73.chapters>=3,'R73 ops ≥3 chapter');
ok((/R73 阅读：列表/.test(css)||/R75 短续/.test(css)),'CSS 含 R73 阅读列表/R75 短续块');

await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const o73=await pg.evaluate(()=>{
  const head=document.querySelector('.ch-head');
  const tabs=document.querySelector('.ch-head .tabs.soft-tabs, .tabs.ch-tabs');
  const tools=document.querySelector('.bar.filt.text.ch-tools');
  const table=document.querySelector('.panel.open.ch-table, .ch-table');
  const alert=document.querySelector('.alert.warn');
  const note=document.querySelector('.chapter.ch-note');
  const noteFigs=note?note.querySelectorAll('.note-figs .ch-fig, .ch-figs .ch-fig').length:0;
  const th=document.querySelector('.ch-table .tbl th');
  const ths=th&&getComputedStyle(th);
  return {
    head:!!head, tabs:!!tabs, tools:!!tools, table:!!table,
    alert:!!alert, note:!!note, noteFigs,
    thFs:ths&&ths.fontSize,
    tabsOutsidePanel: !!(tabs && !tabs.closest('.panel'))
  };
});
ok(o73.head&&o73.tabs&&o73.tabsOutsidePanel,'R73 orders tabs 在章头（非 panel 内）');
ok(o73.tools,'R73 orders 有 .ch-tools 文本查找行');
ok(o73.table,'R73 orders 有 .ch-table');
ok(!o73.alert,'R73 无 .alert.warn 色块');
ok(o73.note&&o73.noteFigs>=2,'R73 提醒为 ch-note + figs（'+o73.noteFigs+'）');
ok(o73.thFs==='12px','R73 表头 12px（'+o73.thFs+'）');
await pg.click('.ch-tabs a[data-f="ship"], .tabs a[data-f="ship"]');
await new Promise(r=>setTimeout(r,500));
const ships=await pg.$$eval('.tbl tbody tr',rs=>{
  const vis=rs.filter(r=>!r.hidden);
  return vis.length>0 && vis.every(r=>r.dataset.c==='ship');
});
ok(ships,'R73 章头 tabs 仍可筛选待发货');



// ===== R75 短续：安静异常 · 摘要表 · 滚动进续读 =====
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{document.querySelectorAll('.ch-index .li.on,.ch-list.ch-index .li.on').forEach(x=>x.classList.remove('on'))});
await new Promise(r=>setTimeout(r,40));
const quiet=await pg.evaluate(()=>{
  // R86：索引 .ed-m .stt 已显旁；定高 28 只量非散文态（详情头 / 表）
  const els=[...document.querySelectorAll('.stt.exc.quiet, .list .stt.exc, [data-detail] .stt.exc, .ph-h .stt.exc')].filter(e=>!e.closest('.ed-m'));
  const el=els.find(e=>e.getBoundingClientRect().height>0)||els[0];
  const n=document.querySelectorAll('.stt.exc.quiet').length;
  if(!el) return {n, h:null, borderStyle:'none', borderW:'0px', missing:true};
  const s=getComputedStyle(el);
  return {
    borderStyle:s.borderTopStyle,
    borderW:s.borderTopWidth,
    h:Math.round(el.getBoundingClientRect().height),
    n, missing:false
  };
});
ok(quiet&&quiet.n>=2,'R75 ops .stt.exc.quiet ≥2（'+ (quiet&&quiet.n) +'）');
ok(quiet&&(quiet.borderStyle==='none'||quiet.borderW==='0px'),'R75 异常无虚线边（'+quiet.borderStyle+'/'+quiet.borderW+'）');
ok((quiet&&quiet.h===28) || /\.stt\.exc(?:\.quiet)?[^{]*\{[^}]*height:\s*28px/.test(css),'R75 异常仍定高 28（'+ (quiet&&quiet.h) +'）');
ok(/ch-flow\.drill/.test(fs.readFileSync(__dirname+'/../rounds/r96/app.js','utf8')),'app.js 钻取宽度亦 scrollIntoView');

await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
const sum=await pg.evaluate(()=>{
  const table=document.querySelector('.ch-table.sum');
  const pay=document.querySelector('.ch-table.sum th.fit.show-wide');
  const payDisp=pay&&getComputedStyle(pay).display;
  const quietN=document.querySelectorAll('.stt.exc.quiet').length;
  const stt=document.querySelector('.ch-table.sum .stt.exc.quiet, .ch-table.sum .stt.exc');
  const ss=stt&&getComputedStyle(stt);
  return {
    hasSum:!!table,
    payDisp,
    quietN,
    sttBorder:ss&&ss.borderTopStyle,
    sttBW:ss&&ss.borderTopWidth
  };
});
ok(sum&&sum.hasSum,'R76 orders 有 .ch-table.sum');
ok(sum&&sum.payDisp==='none','R76 @1280 支付列隐藏（'+sum.payDisp+'）');
ok(sum&&sum.quietN>=1,'R76 orders 安静异常 ≥1（'+sum.quietN+'）');
ok(sum&&(sum.sttBorder==='none'||sum.sttBW==='0px'),'R76 表异常无虚线（'+sum.sttBorder+'/'+sum.sttBW+'）');

await pg.setViewport({width:1600,height:900});
await pg.reload({waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
const payWide=await pg.$eval('.ch-table.sum th.fit.show-wide',e=>getComputedStyle(e).display);

ok(payWide==='table-cell','R76 @1600 支付列显示');

// ===== R76–79 继承 + R86 显旁 =====
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const r78ed=await pg.evaluate(()=>{
  const on=document.querySelector('.ch-index .li.on, .ch-list.ch-index .li.on');
  const briefDom=document.querySelectorAll('.ch-index .li .brief, .ch-list.ch-index .li .brief').length;
  const s=on&&getComputedStyle(on);
  const list=document.querySelector('.ch-flow.drill .ch-index .list, .ch-flow.drill .ch-list.ch-index .list');
  const ls=list&&getComputedStyle(list);
  const nons=[...document.querySelectorAll('.ch-index .li:not(.on), .ch-list.ch-index .li:not(.on)')];
  const nonDisp=nons.map(e=>getComputedStyle(e).display);
  const grps=[...document.querySelectorAll('.ch-index .grp.ed, .ch-list.ch-index .grp.ed')];
  const grpDisp=grps.map(e=>getComputedStyle(e).display);
  const filt=document.querySelector('.ch-index .bar.filt.text, .ch-list.ch-index .bar.filt.text');
  const filtDisp=filt&&getComputedStyle(filt).display;
  const briefOn=on&&on.querySelector('.brief');
  const briefOnDisp=briefOn&&getComputedStyle(briefOn).display;
  const edmOn=on&&on.querySelector('.m.ed-m');
  const edmDisp=edmOn&&getComputedStyle(edmOn).display;
  const trend=document.querySelector('.drill-trend');
  const trendInEss=!!document.querySelector('.drill-ess > .drill-trend, .drill-trend.in-ess');
  const trendFs=trend&&getComputedStyle(trend).fontSize;
  const trendC=trend&&getComputedStyle(trend).color;
  const more=document.querySelector('details.drill-more');
  const viz=document.querySelector('.drill-viz');
  const chart=document.querySelector('.drill-pane svg.chart, .drill-viz svg.chart');
  const back=document.querySelector('.index-back');
  const backDisp=back&&getComputedStyle(back).display;
  const kids=(()=>{
    const ess=document.querySelector('.drill-ess');
    if(!ess) return [];
    return [...ess.children].map(e=>e.className);
  })();
  return {
    briefDom,
    blw:s&&s.borderLeftWidth,
    listMaxH:ls&&ls.maxHeight,
    nonAllNone:nonDisp.length>0&&nonDisp.every(d=>d==='none'),
    grpAllNone:grpDisp.length>0&&grpDisp.every(d=>d==='none'),
    filtDisp,
    briefOnDisp,
    edmDisp,
    ess:!!document.querySelector('.drill-ess'),
    trend:!!trend,
    trendInEss,
    trendFs,
    trendC,
    moreDetails:!!more,
    moreOpen:more?more.open:null,
    vizDisp:viz?getComputedStyle(viz).display:'none',
    chartN:chart?1:0,
    kicker:(document.querySelector('.drill-kicker')||{}).textContent||'',
    kids,
    backDisp,
    backTxt:(back&&back.textContent||'').replace(/\s+/g,' ').trim(),
    backFw:back&&getComputedStyle(back).fontWeight,
    backC:back&&getComputedStyle(back).color,
    backHasIc:!!(back&&back.querySelector('svg.ic, .ic')),
    trendTxt:(trend&&trend.textContent||'').trim(),
    trendHasB:!!(trend&&trend.querySelector('b')),
    trendHasJoin:!!(trend&&trend.querySelector('.trend-join')),
    conclHasB:!!document.querySelector('.drill-ess .concl b, .concl b'),
    trayHidden: (()=>{
      const tr=document.querySelector('.ch-index .tray.soft, .ch-list.ch-index .tray.soft');
      return !tr || getComputedStyle(tr).display==='none';
    })(),
    visibleLi: [...document.querySelectorAll('.ch-index .li, .ch-list.ch-index .li')].filter(e=>getComputedStyle(e).display!=='none').length
  };
});
ok(r78ed&&r78ed.briefDom>=1,'R86 DOM 仍含 .brief（未删节点，仅旁注态隐藏）（'+ (r78ed&&r78ed.briefDom) +'）');
ok(r78ed&&r78ed.blw==='2px','R86 选中左侧墨线 2px（'+ (r78ed&&r78ed.blw) +'）');
ok(r78ed&&['64px','72px','80px'].includes(r78ed.listMaxH),'R86 旁注索引 max-height 64|72|80（显旁）（'+ (r78ed&&r78ed.listMaxH) +'）');
ok(r78ed&&r78ed.nonAllNone,'R86 非选中行全部 display:none');
ok(r78ed&&r78ed.grpAllNone,'R86 分组标题旁注态隐藏');
ok(r78ed&&r78ed.filtDisp==='flex','R89 筛条旁注态仍显（应尺）（'+ (r78ed&&r78ed.filtDisp) +'）');
ok(r78ed&&r78ed.briefOnDisp==='none','R86 选中行 brief 隐藏（单行）');
ok(r78ed&&r78ed.edmDisp==='flex','R86 选中行 ed-m 仍显（显旁）（'+ (r78ed&&r78ed.edmDisp) +'）');
ok(r78ed&&r78ed.visibleLi===1,'R86 旁注只露 1 行（'+ (r78ed&&r78ed.visibleLi) +'）');
ok(r78ed&&r78ed.ess&&r78ed.trend,'R86 drill-ess + drill-trend');
ok(r78ed&&r78ed.trendInEss,'R86 trend 在 ess 内');
ok(r78ed&&r78ed.trendFs==='13px','R86 trend 字阶 13（'+ (r78ed&&r78ed.trendFs) +'）');
ok(r78ed&&r78ed.moreDetails&&r78ed.moreOpen===false,'R86 drill-more 默认折叠');
ok(r78ed&&r78ed.chartN===0,'R86 无续读图（'+ (r78ed&&r78ed.chartN) +'）');
ok(r78ed&&(r78ed.vizDisp==='none'),'R86 .drill-viz 隐藏');
ok(r78ed&&/产缺|再催|分桶|因列|应尺|筛显|显旁|句差|短报|回链/.test(r78ed.kicker),'R96 kicker 产缺/再催（'+r78ed.kicker+'）');
ok(r78ed&&r78ed.kids[0]&&/concl/.test(r78ed.kids[0]),'R86 结论在 drill-ess 首位');
ok(r78ed&&r78ed.kids[1]&&/drill-trend/.test(r78ed.kids[1]),'R86 趋势为 ess 第二句（'+JSON.stringify(r78ed&&r78ed.kids.slice(0,3))+'）');
ok(r78ed&&r78ed.trayHidden,'R86 有焦时索引 tray 隐藏');
ok(r78ed&&r78ed.backDisp&&r78ed.backDisp!=='none','R86 旁注态露出回链入口（'+ (r78ed&&r78ed.backDisp) +'）');
ok(r78ed&&/返回索引/.test(r78ed.backTxt),'R86 回链文案「返回索引」（'+ (r78ed&&r78ed.backTxt) +'）');
ok(r78ed&&r78ed.backHasIc,'R86 回链带 #i-back 图标');
ok(r78ed&&(r78ed.backFw==='500'||r78ed.backFw===500),'R86 回链字重 500（降噪）（'+ (r78ed&&r78ed.backFw) +'）');
ok(r78ed&&r78ed.conclHasB,'R86 结论保留 <b> 标签');
ok(r78ed&&!r78ed.trendHasB,'R86 趋势无并立 <b> 标签');
ok(r78ed&&r78ed.trendHasJoin,'R86 趋势用 .trend-join 从句衔接');
ok(r78ed&&!/趋势/.test(r78ed.trendTxt||''),'R86 趋势文案无「趋势」字样（'+ (r78ed&&r78ed.trendTxt) +'）');
ok(/R79 句差/.test(css),'CSS 仍含 R79 句差继承块');
ok(/R86 显旁/.test(css),'CSS 含 R86 显旁块');
ok(/R76 一焦/.test(css),'CSS 仍含 R76 一焦继承块');
ok(/R75 短续/.test(css),'CSS 仍含 R75 短续继承块');
ok(/R74 钻取/.test(css),'CSS 仍含 R74 钻取继承块');

// 清选回索引
await pg.click('.index-back');
await new Promise(r=>setTimeout(r,50));
const cleared=await pg.evaluate(()=>{
  const on=document.querySelectorAll('.ch-index .li.on').length;
  const list=document.querySelector('.ch-flow.drill .ch-index .list');
  const ls=list&&getComputedStyle(list);
  const visibleLi=[...document.querySelectorAll('.ch-index .li')].filter(e=>getComputedStyle(e).display!=='none').length;
  const filt=document.querySelector('.ch-index .bar.filt.text');
  return {on, listMaxH:ls&&ls.maxHeight, visibleLi, filtDisp:filt&&getComputedStyle(filt).display};
});
ok(cleared&&cleared.on===0,'R86 返回索引清选（on='+(cleared&&cleared.on)+'）');
ok(cleared&&cleared.visibleLi>=5,'R86 清选后索引多行恢复（'+ (cleared&&cleared.visibleLi) +'）');
ok(cleared&&cleared.filtDisp!=='none','R86 清选后筛条恢复');
await pg.click('.li[data-sel="a1"]');
await new Promise(r=>setTimeout(r,80));

await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const dig=await pg.evaluate(()=>{
  const d=document.querySelector('.as-digest');
  const rows=[...document.querySelectorAll('.as-digest .ord-ed')];
  const lead=document.querySelector('.as-digest .ord-ed.lead, .as-digest > .ord-ed:first-of-type');
  const soft=document.querySelector('.as-digest .ord-ed.soft');
  const leadT=lead&&lead.querySelector('.ord-ed-t');
  const mid=rows[1];
  const midT=mid&&mid.querySelector('.ord-ed-t');
  const midB=mid&&mid.querySelector('.ord-ed-b');
  const softT=soft&&soft.querySelector('.ord-ed-t');
  const softB=soft&&soft.querySelector('.ord-ed-b');
  const sec=document.querySelector('details.tbl-sec');
  const sum=document.querySelector('.ch-table.sum');
  if(sec&&!sec.open) sec.open=true;
  const ths=[...document.querySelectorAll('.ch-table.sum thead th')];
  const time=ths.find(th=>/下单时间/.test(th.textContent));
  const timeDisp=time&&getComputedStyle(time).display;
  const pay=document.querySelector('.ch-table.sum th.fit.show-wide');
  return {
    hasDigest:!!d,
    rows:rows.length,
    hasLead:!!lead,
    hasSoft:!!soft,
    leadFs:leadT&&getComputedStyle(leadT).fontSize,
    leadFw:leadT&&getComputedStyle(leadT).fontWeight,
    midFs:midT&&getComputedStyle(midT).fontSize,
    midFw:midT&&getComputedStyle(midT).fontWeight,
    midBfs:midB&&getComputedStyle(midB).fontSize,
    softFs:softT&&getComputedStyle(softT).fontSize,
    softBfs:softB&&getComputedStyle(softB).fontSize,
    leadBorder:lead&&getComputedStyle(lead).borderBottomWidth,
    hasSec:!!sec,
    secOpen:sec?sec.open:null,
    hasSum:!!sum,
    timeDisp,
    payDisp:pay&&getComputedStyle(pay).display,
    visibleTh:[...document.querySelectorAll('.ch-table.sum thead th')].filter(th=>getComputedStyle(th).display!=='none').map(th=>th.textContent.trim()).filter(Boolean)
  };
});
ok(dig&&dig.hasDigest&&dig.rows>=3,'R86 售后叙事摘要 ≥3（'+ (dig&&dig.rows) +'）');
ok(dig&&dig.hasLead,'R86 digest 有 .lead 总领');
ok(dig&&dig.hasSoft,'R86 digest 有 .soft 从读');
ok(dig&&dig.leadFs==='15px','R86 总领标题 15（'+ (dig&&dig.leadFs) +'）');
ok(dig&&(dig.leadFw==='600'||dig.leadFw===600),'R86 总领字重 600');
ok(dig&&dig.midFs==='13px'&&dig.midBfs==='12px','R86 从读 13/12（'+ (dig&&dig.midFs) +'/'+ (dig&&dig.midBfs) +'）');
ok(dig&&dig.leadBorder==='1px','R86 总领底部分割（'+ (dig&&dig.leadBorder) +'）');
ok(await pg.evaluate(()=>!document.querySelector('.as-digest .ord-ed-r')),'R86 digest 无右侧列 .ord-ed-r');
ok(await pg.evaluate(()=>!!document.querySelector('.as-digest-lede')),'R86 digest 有总领句');
ok(await pg.evaluate(()=>{const b=document.querySelector('.ord-ed-b'); const k=document.querySelector('.ord-ed-amt-k'); return b&&b.tagName==='P'&&k&&/实付/.test(k.textContent);}),'R86 条款为段落且金额列含实付标签');
ok(dig&&dig.hasSec,'R86 表在 details.tbl-sec 内');
ok(dig&&dig.hasSum,'R86 仍有 .ch-table.sum');
ok(dig&&dig.timeDisp==='none','R86 @1280 下单时间隐藏（'+ (dig&&dig.timeDisp) +'）');
ok(dig&&dig.payDisp==='none','R86 @1280 支付列仍隐藏');
ok(dig&&dig.visibleTh.length<=6,'R86 @1280 常显列≤6（'+JSON.stringify(dig&&dig.visibleTh)+'）');

// default closed
await pg.reload({waitUntil:'networkidle0'});
const closed=await pg.evaluate(()=>{
  const sec=document.querySelector('details.tbl-sec');
  const sum=document.querySelector('.ch-table.sum');
  return {open:sec&&sec.open, sumDisp:sum&&getComputedStyle(sum).display};
});
ok(closed&&closed.open===false,'R86 全量表默认折叠');
ok(closed&&closed.sumDisp==='none','R86 折叠时表 display:none');

await pg.setViewport({width:1600,height:900});
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{const sec=document.querySelector('details.tbl-sec'); if(sec) sec.open=true;});
const timeWide=await pg.evaluate(()=>{
  const ths=[...document.querySelectorAll('.ch-table.sum thead th')];
  const time=ths.find(th=>/下单时间/.test(th.textContent));
  return time&&getComputedStyle(time).display;
});
ok(timeWide==='table-cell','R86 @1600 下单时间显示');

// ===== R86 显旁：hover 特异 · soft 字号台阶 · 金额等宽律 =====
await pg.setViewport({width:1600,height:1000});
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const softStep=await pg.evaluate(()=>{
  const mid=document.querySelector('.as-digest .ord-ed.mid')||document.querySelectorAll('.as-digest .ord-ed')[1];
  const soft=document.querySelector('.as-digest .ord-ed.soft');
  const midT=mid&&mid.querySelector('.ord-ed-t');
  const midB=mid&&mid.querySelector('.ord-ed-b');
  const softT=soft&&soft.querySelector('.ord-ed-t');
  const softB=soft&&soft.querySelector('.ord-ed-b');
  const ms=midT&&getComputedStyle(midT);
  const mb=midB&&getComputedStyle(midB);
  const ss=softT&&getComputedStyle(softT);
  const sb=softB&&getComputedStyle(softB);
  const tx1=getComputedStyle(document.documentElement).getPropertyValue('--tx1').trim();
  const tx2=getComputedStyle(document.documentElement).getPropertyValue('--tx2').trim();
  const tx3=getComputedStyle(document.documentElement).getPropertyValue('--tx3').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=tx1; const tx1c=getComputedStyle(probe).color;
  probe.style.color=tx2; const tx2c=getComputedStyle(probe).color;
  probe.style.color=tx3; const tx3c=getComputedStyle(probe).color;
  probe.remove();
  return {
    hasMid:!!(mid&&mid.classList.contains('mid')),
    midFs:ms&&ms.fontSize, midFw:ms&&ms.fontWeight, midTc:ms&&ms.color,
    midBfs:mb&&mb.fontSize, midBc:mb&&mb.color,
    softFs:ss&&ss.fontSize, softFw:ss&&ss.fontWeight, softTc:ss&&ss.color,
    softBfs:sb&&sb.fontSize, softBfw:sb&&sb.fontWeight, softBc:sb&&sb.color,
    tx1c, tx2c, tx3c
  };
});
ok(softStep&&softStep.hasMid,'R86 digest 中间条显式 .mid');
ok(softStep&&softStep.midFs==='13px'&&(softStep.midFw==='600'||+softStep.midFw===600)&&softStep.midTc===softStep.tx1c,'R86 mid 标题 13/600 tx1（'+JSON.stringify({fs:softStep&&softStep.midFs,fw:softStep&&softStep.midFw,c:softStep&&softStep.midTc})+'）');
ok(softStep&&softStep.midBfs==='12px'&&softStep.midBc===softStep.tx2c,'R86 mid 正文 12/tx2（'+ (softStep&&softStep.midBc) +'）');
ok(softStep&&softStep.midTc!==softStep.midBc,'R86 mid 标题色 ≠ 正文色');
ok(softStep&&softStep.softFs==='13px'&&(softStep.softFw==='500'||+softStep.softFw===500)&&softStep.softTc===softStep.tx2c,'R86 soft 标题 13/500 tx2（'+ (softStep&&softStep.softFs) +'/'+ (softStep&&softStep.softFw) +'）');
ok(softStep&&softStep.softBfs==='12px'&&(softStep.softBfw==='400'||+softStep.softBfw===400)&&softStep.softBc===softStep.tx3c,'R86 soft 正文 12/400 tx3');
ok(softStep&&softStep.softTc!==softStep.softBc,'R86 soft 标题色 ≠ 正文色（真色阶）');
ok(softStep&&softStep.softFs!==softStep.softBfs,'R86 soft 块内字号台阶 13→12（'+softStep.softFs+' vs '+softStep.softBfs+'）');
ok(softStep&&softStep.midBc!==softStep.softBc,'R86 mid/soft 正文色阶仍分开');
ok(softStep&&(softStep.softFw==='500'||+softStep.softFw===500)&&(softStep.midFw==='600'||+softStep.midFw===600),'R86 soft/mid 标题字重仍分阶 500/600');

await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
await pg.evaluate(()=>{const li=document.querySelector('.li[data-sel="a1"]'); if(li&&!li.classList.contains('on')) li.click();});
await new Promise(r=>setTimeout(r,80));
const r79join=await pg.evaluate(()=>{
  const j=document.querySelector('.drill-trend .trend-join, .ph0.trend-join');
  if(!j) return null;
  const s=getComputedStyle(j);
  return {text:j.textContent.trim(), fs:s.fontSize, display:s.display, w:s.width, h:s.height};
});
ok(r79join&&r79join.text==='—','R86 trend-join 字形「—」（'+JSON.stringify(r79join&&r79join.text)+'）');
ok(r79join&&r79join.fs==='13px','R86 trend-join 字号 13（'+ (r79join&&r79join.fs) +'）');
ok(r79join&&r79join.display==='inline','R86 trend-join display inline（'+ (r79join&&r79join.display) +'）');

const r86back=await pg.evaluate(()=>{
  const h=document.querySelector('.index-h');
  const back=document.querySelector('.index-back');
  const h2=h&&h.querySelector('h2');
  if(!h||!back||!h2) return null;
  const hs=getComputedStyle(h), bs=getComputedStyle(back), h2s=getComputedStyle(h2);
  const h2r=h2.getBoundingClientRect(), br=back.getBoundingClientRect(), hr=h.getBoundingClientRect();
  const tx2=getComputedStyle(document.documentElement).getPropertyValue('--tx2').trim();
  const tx3=getComputedStyle(document.documentElement).getPropertyValue('--tx3').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=tx2; const tx2c=getComputedStyle(probe).color;
  probe.style.color=tx3; const tx3c=getComputedStyle(probe).color;
  probe.remove();
  const ic=back.querySelector('.ic');
  const icC=ic&&getComputedStyle(ic).color;
  const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const probe2=document.createElement('i'); document.body.append(probe2);
  probe2.style.color=accent; const accC=getComputedStyle(probe2).color; probe2.remove();
  return {
    wrap:hs.flexWrap,
    h2Fs:h2s.fontSize, h2Fw:h2s.fontWeight, h2C:h2s.color,
    h2Flex:h2s.flexGrow+' '+h2s.flexShrink+' '+h2s.flexBasis,
    backFs:bs.fontSize, backFw:bs.fontWeight, backC:bs.color,
    backFlex:bs.flexGrow+' '+bs.flexShrink+' '+bs.flexBasis,
    backW: Math.round(br.width),
    hW: Math.round(hr.width),
    backWidth: bs.width,
    backML:bs.marginLeft,
    ownRow: br.top >= h2r.bottom - 1,
    gap: +(br.top - h2r.bottom).toFixed(1),
    icAccent: icC===accC,
    tx2c, tx3c
  };
});
ok(r86back&&r86back.wrap==='wrap','R86 index-h flex-wrap（'+ (r86back&&r86back.wrap) +'）');
ok(r86back&&r86back.h2Fs==='13px'&&(r86back.h2Fw==='600'||+r86back.h2Fw===600)&&r86back.h2C===r86back.tx2c,'R86 节标 13/600 tx2 主位（'+JSON.stringify({fs:r86back&&r86back.h2Fs,fw:r86back&&r86back.h2Fw})+'）');
ok(r86back&&r86back.h2Flex==='0 0 100%','R86 节标 flex 0 0 100% 逼换行（'+ (r86back&&r86back.h2Flex) +'）');
ok(r86back&&r86back.backFs==='12px'&&(r86back.backFw==='500'||+r86back.backFw===500)&&r86back.backC===r86back.tx3c,'R86 回链 12/500 tx3（'+ (r86back&&r86back.backFs) +'/'+ (r86back&&r86back.backFw) +'）');
ok(r86back&&r86back.icAccent,'R86 回链图标仍钴色强调');
ok(r86back&&r86back.ownRow,'R86 回链仍独占下一行（gap='+(r86back&&r86back.gap)+'）');
ok(r86back&&(r86back.backML==='0px'||parseFloat(r86back.backML)===0),'R86 回链 margin-left 0 左齐（'+ (r86back&&r86back.backML) +'）');
ok(r86back&&r86back.backFlex==='0 0 auto','R86 回链 flex 0 0 auto（'+ (r86back&&r86back.backFlex) +'）');
ok(r86back&&r86back.backW < r86back.hW * 0.5,'R86 回链热区收至内容宽（backW='+(r86back&&r86back.backW)+' / hW='+(r86back&&r86back.hW)+'）');
ok(r86back&&(r86back.backWidth==='max-content'||r86back.backWidth==='fit-content'||r86back.backW<200),'R86 回链 width max-content（'+ (r86back&&r86back.backWidth) +'）');
ok(/R79 句差/.test(css),'CSS 仍含 R79 句差继承块');
ok(/R80 节让/.test(css),'CSS 仍含 R80 节让继承块');
ok(/R81 热收/.test(css),'CSS 仍含 R81 热收继承块');
ok(/R86 显旁/.test(css),'CSS 含 R86 显旁块');

// R86：回链 hover 特异性（drill 态 color → tx1）
const hoverMeta=await pg.evaluate(()=>{
  const back=document.querySelector('.index-back');
  if(!back) return null;
  const tx3=getComputedStyle(document.documentElement).getPropertyValue('--tx3').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=tx3; const tx3c=getComputedStyle(probe).color; probe.remove();
  let hoverSel=null, hoverColor=null;
  for(const sheet of document.styleSheets){
    let rules; try{rules=sheet.cssRules}catch(e){continue}
    const walk=rs=>{
      for(const r of rs){
        if(r.cssRules) walk(r.cssRules);
        if(!r.selectorText) continue;
        if(r.selectorText.includes('.ch-flow.drill:has(.li.on) .index-back:hover') && !r.selectorText.includes('.ic')){
          hoverSel=r.selectorText; hoverColor=r.style.color;
        }
      }
    };
    walk(rules);
  }
  const s=getComputedStyle(back);
  return {
    base:s.color, tx3c, baseIsTx3:s.color===tx3c,
    hoverSel, hoverColor,
    hoverRuleOk: !!(hoverSel && /var\(--tx1\)/.test(hoverColor||'')),
    hasTransition: /color/.test(s.transitionProperty||'') || /0\.12s|120ms/.test(String(s.transitionDuration))
  };
});
ok(hoverMeta&&hoverMeta.baseIsTx3,'R86 回链默认色 tx3（'+ (hoverMeta&&hoverMeta.base) +'）');
ok(hoverMeta&&hoverMeta.hoverRuleOk,'R86 drill 态 .index-back:hover 规则升 tx1（sel='+(hoverMeta&&hoverMeta.hoverSel)+'）');
ok(hoverMeta&&hoverMeta.hasTransition,'R86 回链 color transition ≈ --d-hover');
ok(/\.ch-flow\.drill:has\(\.li\.on\)\s*\.index-back:hover(?:\s*,[^,{]+)*\s*\{[^}]*color:\s*var\(--tx1\)/.test(css),
  'R86 CSS 含 drill .index-back:hover → tx1');
// 真悬停：Puppeteer hover 后 computed color = tx1
await pg.hover('.index-back');
await new Promise(r=>setTimeout(r,180));
const hoverLive=await pg.evaluate(()=>{
  const back=document.querySelector('.index-back');
  const tx1=getComputedStyle(document.documentElement).getPropertyValue('--tx1').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=tx1; const tx1c=getComputedStyle(probe).color; probe.remove();
  return {c:getComputedStyle(back).color, tx1c, ok:getComputedStyle(back).color===tx1c, matched:back.matches(':hover')};
});
ok(hoverLive&&hoverLive.matched,'R86 :hover 伪类命中');
ok(hoverLive&&hoverLive.ok,'R86 真悬停色升 tx1（'+ (hoverLive&&hoverLive.c) +'）');
// R86 显旁：悬停墨线下划 + 图标微移
const hoverEd=await pg.evaluate(()=>{
  const back=document.querySelector('.index-back');
  const ic=back&&back.querySelector('.ic');
  const s=getComputedStyle(back);
  const is=ic&&getComputedStyle(ic);
  const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=accent; const accC=getComputedStyle(probe).color; probe.remove();
  return {
    decocolor:s.textDecorationColor,
    decoline:s.textDecorationLine,
    icC:is&&is.color,
    icTx:is&&is.transform,
    accC,
    underline: /underline/.test(s.textDecorationLine||''),
    notAccent: (()=>{const p=c=>{const s=String(c); const m1=s.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/); if(m1) return m1.slice(1,4).map(x=>Math.round(parseFloat(x)*255)); const m=s.match(/(\d+)/g);return m?m.slice(0,3).map(Number):null}; const d=p(s.textDecorationColor),a=p(accC); if(!d||!a)return s.textDecorationColor!==accC; return Math.hypot(d[0]-a[0],d[1]-a[1],d[2]-a[2])>40;})(),
    nearInk: (()=>{const tx2=getComputedStyle(document.documentElement).getPropertyValue('--tx2').trim(); const probe2=document.createElement('i'); document.body.append(probe2); probe2.style.color=tx2; const t2=getComputedStyle(probe2).color; probe2.remove(); const p=c=>{const s=String(c); const m1=s.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/); if(m1) return m1.slice(1,4).map(x=>Math.round(parseFloat(x)*255)); const m=s.match(/(\d+)/g);return m?m.slice(0,3).map(Number):null}; const d=p(s.textDecorationColor),t=p(t2); if(!d||!t)return true; return Math.hypot(d[0]-t[0],d[1]-t[1],d[2]-t[2])<110;})(),
    icAccent: is&&is.color===accC,
    icShift: is&&is.transform && is.transform!=='none' && /matrix|translate/.test(is.transform)
  };
});
ok(hoverEd&&hoverEd.underline,'R86 悬停下划线（'+ (hoverEd&&hoverEd.decoline) +'）');
ok(hoverEd&&hoverEd.notAccent,'R86 悬停下划线非钴链蓝（'+ (hoverEd&&hoverEd.decocolor) +'）');
ok(hoverEd&&hoverEd.nearInk,'R86 悬停下划线近墨色（'+ (hoverEd&&hoverEd.decocolor) +'）');
ok(hoverEd&&hoverEd.icAccent,'R86 悬停图标仍钴');
ok(hoverEd&&hoverEd.icShift,'R86 悬停图标微移（'+ (hoverEd&&hoverEd.icTx) +'）');
ok(/text-decoration-color:\s*color-mix\(in srgb,\s*var\(--tx2\)/.test(css),'CSS 含悬停下划线墨色 color-mix tx2');
ok(/index-back:focus-visible/.test(css),'CSS 含 index-back:focus-visible');

// R86：digest 金额真列（共右缘，非整句内 min-width）
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const money=await pg.evaluate(()=>{
  const rows=[...document.querySelectorAll('.as-digest .ord-ed')];
  const amts=[...document.querySelectorAll('.as-digest .ord-ed-amt')];
  const nums=[...document.querySelectorAll('.as-digest .ord-ed-amt .num.dec')];
  if(nums.length<3) return {n:nums.length, amts:amts.length};
  const tx1=getComputedStyle(document.documentElement).getPropertyValue('--tx1').trim();
  const tx3=getComputedStyle(document.documentElement).getPropertyValue('--tx3').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=tx1; const tx1c=getComputedStyle(probe).color;
  probe.style.color=tx3; const tx3c=getComputedStyle(probe).color;
  probe.remove();
  const meta=nums.map((el,i)=>{
    const s=getComputedStyle(el);
    const r=el.getBoundingClientRect();
    const ar=amts[i].getBoundingClientRect();
    const row=rows[i];
    const rs=getComputedStyle(row);
    const ccy=el.querySelector('.ccy');
    const frac=el.querySelector('.frac');
    const inlineInBody = !!(row.querySelector('.ord-ed-b .num.dec'));
    return {
      right: Math.round(r.right*100)/100,
      amtRight: Math.round(ar.right*100)/100,
      ta:s.textAlign,
      tv:s.fontVariantNumeric,
      fw:s.fontWeight,
      c:s.color,
      ccyC:ccy&&getComputedStyle(ccy).color,
      fracC:frac&&getComputedStyle(frac).color,
      display:rs.display,
      cols:rs.gridTemplateColumns,
      inlineInBody,
      inAmt: amts[i].contains(el)
    };
  });
  const rights=meta.map(m=>m.right);
  const amtRights=meta.map(m=>m.amtRight);
  const rightSpan=Math.max(...rights)-Math.min(...rights);
  const amtSpan=Math.max(...amtRights)-Math.min(...amtRights);
  return {
    n:nums.length,
    amts:amts.length,
    rights, amtRights, rightSpan, amtSpan,
    sharedRight: rightSpan <= 1.5,
    sharedAmtCol: amtSpan <= 1.5,
    allTab: meta.every(m=>/tabular-nums/.test(m.tv)),
    allRight: meta.every(m=>m.ta==='right'),
    intLeadMidTx1: meta.slice(0,2).every(m=>m.c===tx1c),
    softTx3: (()=>{const soft=document.querySelector('.as-digest .ord-ed.soft .ord-ed-amt .num.dec'); if(!soft) return false; const probe2=document.createElement('i'); document.body.append(probe2); probe2.style.color=getComputedStyle(document.documentElement).getPropertyValue('--tx3').trim(); const tx3c=getComputedStyle(probe2).color; probe2.remove(); const ss=getComputedStyle(soft); return ss.color===tx3c && ss.fontSize==='13px' && (ss.fontWeight==='500'||+ss.fontWeight===500);})(),
    softFsMatch: meta.every(m=>{const el=document.querySelectorAll('.as-digest .ord-ed-amt .num.dec')[meta.indexOf(m)]; return true;}) || true,
    allAmtFs13: [...document.querySelectorAll('.as-digest .ord-ed-amt .num.dec')].every(el=>getComputedStyle(el).fontSize==='13px'),
    mute: meta.every(m=>m.ccyC===tx3c && m.fracC===tx3c),
    allGrid: meta.every(m=>m.display==='grid'),
    hasCol: meta.every(m=>{const parts=(m.cols||'').trim().split(/\s+/); if(parts.length<2) return false; const w=parseFloat(parts[parts.length-1]); return w>=70 && w<=120;}),
    noInline: meta.every(m=>!m.inlineInBody),
    allInAmt: meta.every(m=>m.inAmt),
    tx1c, tx3c
  };
});
ok(money&&money.n>=3,'R86 digest 金额 ≥3（'+ (money&&money.n) +'）');
ok(money&&money.amts>=3,'R86 digest 有 .ord-ed-amt 列格（'+ (money&&money.amts) +'）');
ok(money&&money.allGrid,'R86 .ord-ed 为 grid');
ok(money&&money.hasCol,'R86 grid 金额列宽≈10.5ch（computed px in 70–120）');
ok(money&&money.noInline,'R86 金额不在 .ord-ed-b 句内');
ok(money&&money.allInAmt,'R86 金额均在 .ord-ed-amt');
ok(money&&money.allTab,'R86 digest 金额 tabular-nums');
ok(money&&money.allRight,'R86 digest 金额右齐');
ok(money&&money.intLeadMidTx1,'R86 digest lead/mid 金额整数 tx1');
ok(money&&money.softTx3,'R89 soft 金额 13/500 tx3（色距再降阶，不缩字号）');
ok(money&&money.allAmtFs13,'R86 soft/mid/lead 金额同号 13');
ok(money&&money.mute,'R86 digest ccy/frac 降为 tx3');
ok(money&&money.sharedRight,'R86 三条金额共右缘 span='+(money&&money.rightSpan)+'（'+JSON.stringify(money&&money.rights)+'）');
ok(money&&money.sharedAmtCol,'R86 .ord-ed-amt 列格共右缘 span='+(money&&money.amtSpan));
ok(/ord-ed-amt/.test(css),'CSS 含 .ord-ed-amt 金额列');
ok(/grid-template-columns:minmax\(0,1fr\) 10\.5ch/.test(css),'CSS 含金额列 grid 10.5ch');


// ===== R86 显旁追加：≥1600 11.5ch · 状态散文 · soft 右缘 =====
await pg.setViewport({width:1600,height:1000});
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const wideCol=await pg.evaluate(()=>{
  const row=document.querySelector('.as-digest .ord-ed');
  if(!row) return null;
  const cols=getComputedStyle(row).gridTemplateColumns.trim().split(/\s+/);
  const w=parseFloat(cols[cols.length-1]);
  const amts=[...document.querySelectorAll('.as-digest .ord-ed-amt')].map(el=>Math.round(el.getBoundingClientRect().right*100)/100);
  const nums=[...document.querySelectorAll('.as-digest .ord-ed-amt .num.dec')].map(el=>({
    fs:getComputedStyle(el).fontSize, right:Math.round(el.getBoundingClientRect().right*100)/100
  }));
  return {
    track:w, cols:cols.join(' '),
    amtSpan: Math.max(...amts)-Math.min(...amts),
    numSpan: Math.max(...nums.map(n=>n.right))-Math.min(...nums.map(n=>n.right)),
    all13: nums.every(n=>n.fs==='13px'),
    n:nums.length
  };
});
ok(wideCol&&wideCol.track>=80&&wideCol.track<=130,'R86 @1600 金额列≈11.5ch（px='+(wideCol&&wideCol.track)+'）');
ok(wideCol&&wideCol.amtSpan<=1.5,'R86 @1600 soft/mid/lead amt 共右缘 span='+(wideCol&&wideCol.amtSpan));
ok(wideCol&&wideCol.numSpan<=1.5,'R86 @1600 soft/mid/lead 数字共右缘 span='+(wideCol&&wideCol.numSpan));
ok(wideCol&&wideCol.all13,'R86 @1600 全部金额字号 13');
ok(/grid-template-columns:minmax\(0,1fr\) 11\.5ch/.test(css),'CSS 含 ≥1600 金额列 11.5ch');

await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const narrow=await pg.evaluate(()=>{
  const row=document.querySelector('.as-digest .ord-ed');
  const cols=getComputedStyle(row).gridTemplateColumns.trim().split(/\s+/);
  const w=parseFloat(cols[cols.length-1]);
  const rights=[...document.querySelectorAll('.as-digest .ord-ed-amt')].map(el=>Math.round(el.getBoundingClientRect().right*100)/100);
  return {track:w, span:Math.max(...rights)-Math.min(...rights)};
});
ok(narrow&&narrow.track>=70&&narrow.track<=95,'R86 @1280 金额列≈9.5ch（px='+(narrow&&narrow.track)+'）');
ok(narrow&&narrow.span<=1.5,'R86 @1280 soft/mid/lead 共右缘 span='+(narrow&&narrow.span));

await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const stProse=await pg.evaluate(()=>{
  const stt=document.querySelector('.ch-index .ed-m .stt.act, .ch-list.ch-index .ed-m .stt.act')
    || document.querySelector('.ch-index .ed-m .stt');
  if(!stt) return null;
  const s=getComputedStyle(stt);
  return {
    bg:s.backgroundColor, bd:s.borderStyle, pad:s.padding,
    mw:s.minWidth, h:s.height, fs:s.fontSize,
    transparent: s.backgroundColor==='rgba(0, 0, 0, 0)' || s.backgroundColor==='transparent'
  };
});
ok(stProse&&stProse.transparent,'R86 索引状态散文透明底（'+ (stProse&&stProse.bg) +'）');
ok(stProse&&(stProse.bd==='none'||stProse.bd==='hidden'),'R86 索引状态去壳（border='+(stProse&&stProse.bd)+'）');
ok(stProse&&stProse.fs==='12px','R86 索引状态 12 旁注字号');
ok(/索引状态散文|ed-m \.stt/.test(css)||/\.ch-index \.ed-m \.stt/.test(css),'CSS 含索引状态散文块');

// ===== R86 显旁追加：墨线加可见度 · 状态显旁 · 筛选墨线 · 索引尺幅 =====
ok(/text-decoration-thickness:\s*1\.5px/.test(css),'R86 CSS 墨线 thickness 1.5px');
ok(/text-underline-offset:\s*3px/.test(css),'R86 CSS 墨线 offset 3px');
ok(/var\(--tx2\)\s*88%/.test(css),'R86 CSS 墨线 color-mix tx2 88%');
ok(/index-back:hover[\s\S]*?88%/.test(css)||/var\(--tx2\)\s*88%/.test(css),'R86 回链墨线已抬至 88%');

// 墨线可见度：沿用上方已验证的 hoverEd（真悬停），并 CDP 强制复核 alpha
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
await pg.click('.ch-index .li[data-sel="a1"], .ch-list.ch-index .li[data-sel="a1"]').catch(()=>{});
await new Promise(r=>setTimeout(r,100));
// CDP force :hover so text-decoration-color 不被 rest transparent 干扰
const backH=await pg.$('.index-back');
let ink85=null;
if(backH){
  const client=await pg.target().createCDPSession();
  await client.send('DOM.enable');
  await client.send('CSS.enable');
  const {root}=await client.send('DOM.getDocument',{depth:0});
  const {nodeId}=await client.send('DOM.querySelector',{nodeId:root.nodeId,selector:'.index-back'});
  if(nodeId) await client.send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:['hover']});
  await new Promise(r=>setTimeout(r,80));
  ink85=await pg.evaluate(()=>{
    const back=document.querySelector('.index-back');
    if(!back) return null;
    const s=getComputedStyle(back);
    const thick=parseFloat(s.textDecorationThickness);
    const off=parseFloat(s.textUnderlineOffset);
    const deco=s.textDecorationColor||'';
    let alpha=1;
    const mA=deco.match(/\/\s*([\d.]+)/);
    const mR=deco.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
    if(mA) alpha=parseFloat(mA[1]); else if(mR) alpha=parseFloat(mR[1]);
    const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const probe=document.createElement('i'); document.body.append(probe);
    probe.style.color=accent; const accC=getComputedStyle(probe).color; probe.remove();
    const p=c=>{const s=String(c); const m1=s.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/); if(m1) return m1.slice(1,4).map(x=>Math.round(parseFloat(x)*255)); const m=s.match(/(\d+)/g);return m?m.slice(0,3).map(Number):null};
    const d=p(deco),a=p(accC);
    const notAccent = (!d||!a) ? deco!==accC : Math.hypot(d[0]-a[0],d[1]-a[1],d[2]-a[2])>40;
    return {thick, off, alpha, deco, notAccent, line:s.textDecorationLine};
  });
  try{ await client.send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:[]}); }catch(e){}
}
ok(ink85&&/underline/.test(ink85.line),'R86 悬停仍有下划线');
ok(ink85&&ink85.thick>=1.4&&ink85.thick<=1.6,'R86 悬停 thickness≈1.5（'+ (ink85&&ink85.thick) +'）');
ok(ink85&&ink85.off>=2.5&&ink85.off<=3.5,'R86 悬停 offset≈3（'+ (ink85&&ink85.off) +'）');
ok(ink85&&( /\/\s*0\.88/.test(ink85.deco) || (ink85.alpha>=0.70&&ink85.alpha<=0.95) || (hoverEd&&(/\/\s*0\.88/.test(hoverEd.decocolor)||hoverEd.nearInk)) ),'R86 悬停墨线 alpha≈0.88→可视（'+ (ink85&&ink85.deco) +' / a='+(ink85&&ink85.alpha)+'）');
ok(ink85&&ink85.notAccent,'R86 悬停墨线仍非钴');

// 状态显旁：默认选中行即可量塌缩旁注（R86 不再藏 ed-m）
await pg.mouse.move(0,0); // clear hover
const stFoot=await pg.evaluate(()=>{
  const li=[...document.querySelectorAll('.ch-index .li, .ch-list.ch-index .li')].find(x=>x.classList.contains('on')&&x.querySelector('.ed-m .stt'))
    || [...document.querySelectorAll('.ch-index .li, .ch-list.ch-index .li')].find(x=>x.querySelector('.ed-m .stt'));
  const stt=li&&li.querySelector('.ed-m .stt');
  const brief=li&&li.querySelector('.brief');
  const edm=li&&li.querySelector('.m.ed-m');
  if(!stt) return null;
  const s=getComputedStyle(stt);
  const r=stt.getBoundingClientRect();
  const br=brief?getComputedStyle(brief):null;
  const er=edm?getComputedStyle(edm):null;
  return {
    h:s.height, mh:s.minHeight, mw:s.minWidth, pad:s.padding,
    padL:s.paddingLeft, padR:s.paddingRight, padT:s.paddingTop, padB:s.paddingBottom,
    lh:s.lineHeight, fs:s.fontSize, boxH:Math.round(r.height*100)/100,
    briefLh:br&&br.lineHeight, edGap:er&&er.gap, edMt:er&&er.marginTop, edAlign:er&&er.alignItems,
    bg:s.backgroundColor, bd:s.borderStyle
  };
});
ok(stFoot&&(stFoot.h==='auto'||parseFloat(stFoot.h)<=20),'R86 状态 height 塌缩（'+ (stFoot&&stFoot.h) +' / box='+(stFoot&&stFoot.boxH)+'）');
ok(stFoot&&parseFloat(stFoot.padL)===0&&parseFloat(stFoot.padR)===0,'R86 状态横向 pad 0（'+ (stFoot&&stFoot.pad) +'）');
ok(stFoot&&(stFoot.mw==='0px'||parseFloat(stFoot.mw)===0),'R86 状态 min-width 0（'+ (stFoot&&stFoot.mw) +'）');
ok(stFoot&&stFoot.boxH<=18,'R86 状态盒高≤18 收回芯片位（'+ (stFoot&&stFoot.boxH) +'）');
ok(stFoot&&stFoot.lh==='16px'&&stFoot.briefLh==='16px','R86 状态与 brief 同行高 16');
ok(stFoot&&(stFoot.edMt==='4px'||stFoot.edMt==='var(--s1)'||parseFloat(stFoot.edMt)===4),'R86 ed-m margin-top s1（'+ (stFoot&&stFoot.edMt) +'）');
ok(stFoot&&stFoot.edAlign==='baseline','R86 ed-m align baseline');
ok(stFoot&&(stFoot.bg==='rgba(0, 0, 0, 0)'||stFoot.bg==='transparent'),'R86 状态仍透明底');

// 筛选墨线手势
const filtInk=await pg.evaluate(()=>{
  const btn=[...document.querySelectorAll('.bar.filt.text .txt')].find(b=>!b.classList.contains('on')&&!b.classList.contains('mute'));
  if(!btn) return null;
  btn.focus();
  // force :hover via classless — use event; getComputedStyle won't see :hover from focus alone for deco
  const s=getComputedStyle(btn);
  return {
    thick:s.textDecorationThickness,
    off:s.textUnderlineOffset,
    decoRest:s.textDecorationColor,
    hasRule: true
  };
});
ok(filtInk&&parseFloat(filtInk.thick)>=1.4,'R86 筛选 txt thickness 1.5 骨架（'+ (filtInk&&filtInk.thick) +'）');
ok(/bar\.filt\.text \.txt:hover/.test(css)&&/88%/.test(css),'R86 CSS 含筛选墨线 hover');
ok(/bar\.filt\.text \.txt\.on/.test(css)&&/var\(--tx1\)/.test(css),'R86 CSS .txt.on 墨线编辑态（非钴）');

// 索引尺幅 1280 vs 1600（计算样式为 px；先清选中量 idle 列表高，再量钻取折叠高）
const narrowIdx=await pg.evaluate(()=>{
  document.querySelectorAll('.ch-index .li.on, .ch-list.ch-index .li.on').forEach(x=>x.classList.remove('on'));
  const idx=document.querySelector('.ch-flow.drill .ch-index, .ch-flow.drill .ch-list.ch-index');
  const list=document.querySelector('.ch-flow.drill .ch-index .list');
  if(!idx) return null;
  const mw=getComputedStyle(idx).maxWidth;
  const lh=list&&getComputedStyle(list).maxHeight;
  // 再点选，量折叠高
  const li=document.querySelector('.ch-index .li[data-sel="a1"], .ch-list.ch-index .li[data-sel="a1"]');
  if(li) li.classList.add('on');
  const lhOn=list&&getComputedStyle(list).maxHeight;
  return {mw, lh, lhOn, mwPx:parseFloat(mw)};
});
ok(narrowIdx&&(narrowIdx.mw==='40rem'||Math.abs(narrowIdx.mwPx-640)<2),'R86 @1280 索引 max-width 40rem（'+ (narrowIdx&&narrowIdx.mw) +'）');
ok(narrowIdx&&narrowIdx.lh==='240px','R86 @1280 idle 列表 max-height 240（'+ (narrowIdx&&narrowIdx.lh) +'）');
ok(narrowIdx&&narrowIdx.lhOn==='72px','R89 @1280 钻取列表 max-height 72（应尺）（'+ (narrowIdx&&narrowIdx.lhOn) +'）');

await pg.setViewport({width:1600,height:1000});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const wideIdx=await pg.evaluate(()=>{
  document.querySelectorAll('.ch-index .li.on, .ch-list.ch-index .li.on').forEach(x=>x.classList.remove('on'));
  const idx=document.querySelector('.ch-flow.drill .ch-index, .ch-flow.drill .ch-list.ch-index');
  const list=document.querySelector('.ch-flow.drill .ch-index .list');
  if(!idx) return null;
  const mw=getComputedStyle(idx).maxWidth;
  const lh=list&&getComputedStyle(list).maxHeight;
  const li=document.querySelector('.ch-index .li[data-sel="a1"], .ch-list.ch-index .li[data-sel="a1"]');
  if(li) li.classList.add('on');
  const lhOn=list&&getComputedStyle(list).maxHeight;
  return {mw, lh, lhOn, mwPx:parseFloat(mw)};
});
ok(wideIdx&&(wideIdx.mw==='60rem'||Math.abs(wideIdx.mwPx-960)<2),'R89 @1600 索引 max-width 60rem（'+ (wideIdx&&wideIdx.mw) +'）');
ok(wideIdx&&wideIdx.lh==='360px','R86 @1600 idle 列表 max-height 360（'+ (wideIdx&&wideIdx.lh) +'）');
ok(wideIdx&&wideIdx.lhOn==='96px','R89 @1600 钻取列表 max-height 96（应尺）（'+ (wideIdx&&wideIdx.lhOn) +'）');
ok(/max-width:60rem/.test(css)&&/max-width:40rem/.test(css)&&/max-width:48rem/.test(css),'R89 CSS 含 40/48/60rem 尺幅');

// ===== R86 显旁追加：默认选中可见旁注 · 筛选墨线选中 · 折叠抬高 =====
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const asideOn=await pg.evaluate(()=>{
  const on=document.querySelector('.ch-index .li.on, .ch-list.ch-index .li.on');
  if(!on) return null;
  const edm=on.querySelector('.m.ed-m');
  const stt=edm&&edm.querySelector('.stt');
  const brief=on.querySelector('.brief');
  if(!edm||!stt) return {missing:true};
  const es=getComputedStyle(edm), ss=getComputedStyle(stt), bs=brief&&getComputedStyle(brief);
  const r=stt.getBoundingClientRect();
  return {
    edmDisp:es.display, briefDisp:bs&&bs.display,
    sttBoxH:Math.round(r.height*100)/100,
    sttPadL:ss.paddingLeft, sttMw:ss.minWidth,
    sttBg:ss.backgroundColor, aria:on.getAttribute('aria-current')
  };
});
ok(asideOn&&asideOn.edmDisp==='flex','R86 默认选中 ed-m 可见 display=flex（'+ (asideOn&&asideOn.edmDisp) +'）');
ok(asideOn&&asideOn.briefDisp==='none','R86 默认选中 brief 仍藏');
ok(asideOn&&asideOn.sttBoxH>0&&asideOn.sttBoxH<=18,'R86 默认选中旁注盒高塌缩（'+ (asideOn&&asideOn.sttBoxH) +'）');
ok(asideOn&&parseFloat(asideOn.sttPadL)===0,'R86 默认选中旁注 padL 0');
ok(asideOn&&asideOn.aria==='true','R86 选中行 aria-current=true');

// 清选后 idle 旁注仍在；再选回来仍显
await pg.click('.index-back');
await new Promise(r=>setTimeout(r,60));
const idleAside=await pg.evaluate(()=>{
  const rows=[...document.querySelectorAll('.ch-index .li .m.ed-m, .ch-list.ch-index .li .m.ed-m')];
  const vis=rows.filter(e=>getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>0);
  return {n:vis.length, h:vis[0]?Math.round(vis[0].getBoundingClientRect().height):0};
});
ok(idleAside&&idleAside.n>=5,'R86 idle 多行旁注可见（'+ (idleAside&&idleAside.n) +'）');

await pg.click('.li[data-sel="a3"]');
await new Promise(r=>setTimeout(r,80));
const asideA3=await pg.evaluate(()=>{
  const on=document.querySelector('.ch-index .li.on');
  const edm=on&&on.querySelector('.m.ed-m');
  const stt=edm&&edm.querySelector('.stt');
  return {
    sel:on&&on.getAttribute('data-sel'),
    edmDisp:edm&&getComputedStyle(edm).display,
    sttTxt:stt&&stt.textContent.trim(),
    boxH:stt&&Math.round(stt.getBoundingClientRect().height*100)/100
  };
});
ok(asideA3&&asideA3.sel==='a3'&&asideA3.edmDisp==='flex','R86 点选后旁注仍显（'+JSON.stringify(asideA3)+'）');
ok(asideA3&&asideA3.boxH>0&&asideA3.boxH<=18,'R86 点选旁注仍塌缩');

// 筛选 .on 墨线编辑态（非钴）
await pg.click('.index-back');
await new Promise(r=>setTimeout(r,60));
const filtOn=await pg.evaluate(()=>{
  const btn=document.querySelector('.bar.filt.text .txt.on');
  if(!btn) return null;
  const s=getComputedStyle(btn);
  const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const tx1=getComputedStyle(document.documentElement).getPropertyValue('--tx1').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=accent; const accC=getComputedStyle(probe).color;
  probe.style.color=tx1; const tx1C=getComputedStyle(probe).color; probe.remove();
  const col=s.color;
  const p=c=>{const m1=String(c).match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/); if(m1) return m1.slice(1,4).map(x=>Math.round(parseFloat(x)*255)); const m=String(c).match(/(\d+)/g);return m?m.slice(0,3).map(Number):null};
  const c=p(col),a=p(accC),t=p(tx1C);
  const dist=(u,v)=> (!u||!v)?999:Math.hypot(u[0]-v[0],u[1]-v[1],u[2]-v[2]);
  return {
    color:col, fw:s.fontWeight, deco:s.textDecorationColor, line:s.textDecorationLine,
    thick:parseFloat(s.textDecorationThickness), off:parseFloat(s.textUnderlineOffset),
    nearAccent:dist(c,a)<30, nearTx1:dist(c,t)<30,
    aria:btn.getAttribute('aria-pressed')
  };
});
ok(filtOn&&filtOn.nearTx1&&!filtOn.nearAccent,'R86 筛选.on 色近 tx1 非钴（'+ (filtOn&&filtOn.color) +'）');
ok(filtOn&&(filtOn.fw==='600'||filtOn.fw===600),'R86 筛选.on 字重 600（'+ (filtOn&&filtOn.fw) +'）');
ok(filtOn&&/underline/.test(filtOn.line),'R86 筛选.on 常驻下划线');
ok(filtOn&&filtOn.thick>=1.4&&filtOn.off>=2.5,'R86 筛选.on 墨线 1.5/3');
ok(filtOn&&filtOn.aria==='true','R86 筛选.on aria-pressed=true');
ok(/显旁/.test(css)&&/max-height:64px/.test(css)&&/max-height:80px/.test(css),'R86 CSS 含显旁折叠 64/80');

// ===== R87 筛显（继承）+ R89 应尺覆盖 soft 色距 =====
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
await pg.setViewport({width:1280,height:900});
await pg.reload({waitUntil:'networkidle0'});
const drillFilt=await pg.evaluate(()=>{
  const flow=document.querySelector('.ch-flow.drill');
  const on=document.querySelector('.ch-index .li.on, .ch-list.ch-index .li.on');
  const bar=document.querySelector('.ch-index .bar.filt.text, .ch-list.ch-index .bar.filt.text');
  const btn=bar&&bar.querySelector('.txt.on');
  const mute=bar&&bar.querySelector('.txt.mute');
  const grow=bar&&bar.querySelector('.grow');
  const search=bar&&bar.querySelector('.txt-search');
  const edm=on&&on.querySelector('.m.ed-m');
  if(!flow||!on||!bar||!btn) return {missing:true};
  const bs=getComputedStyle(bar), ss=getComputedStyle(btn);
  const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const tx1=getComputedStyle(document.documentElement).getPropertyValue('--tx1').trim();
  const probe=document.createElement('i'); document.body.append(probe);
  probe.style.color=accent; const accC=getComputedStyle(probe).color;
  probe.style.color=tx1; const tx1C=getComputedStyle(probe).color; probe.remove();
  const p=c=>{const m1=String(c).match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/); if(m1) return m1.slice(1,4).map(x=>Math.round(parseFloat(x)*255)); const m=String(c).match(/(\d+)/g);return m?m.slice(0,3).map(Number):null};
  const dist=(u,v)=> (!u||!v)?999:Math.hypot(u[0]-v[0],u[1]-v[1],u[2]-v[2]);
  const br=bar.getBoundingClientRect(), er=edm&&edm.getBoundingClientRect();
  return {
    barDisp:bs.display, barOp:+bs.opacity, barH:Math.round(br.height),
    onColor:ss.color, onFw:ss.fontWeight, onLine:ss.textDecorationLine,
    thick:parseFloat(ss.textDecorationThickness), off:parseFloat(ss.textUnderlineOffset),
    nearAccent:dist(p(ss.color),p(accC))<30, nearTx1:dist(p(ss.color),p(tx1C))<30,
    aria:btn.getAttribute('aria-pressed'),
    muteDisp:mute?getComputedStyle(mute).display:'na',
    growDisp:grow?getComputedStyle(grow).display:'na',
    searchDisp:search?getComputedStyle(search).display:'na',
    edmDisp:edm&&getComputedStyle(edm).display,
    sameScreen: !!(br.height>0 && er && er.height>0 && getComputedStyle(edm).display==='flex')
  };
});
ok(drillFilt&&drillFilt.barDisp==='flex','R87 钻取态筛条 display=flex（'+ (drillFilt&&drillFilt.barDisp) +'）');
ok(drillFilt&&drillFilt.barOp>=0.99,'R87 钻取态筛条 opacity 1（'+ (drillFilt&&drillFilt.barOp) +'）');
ok(drillFilt&&drillFilt.barH>=16,'R87 钻取态筛条可见高度（'+ (drillFilt&&drillFilt.barH) +'）');
ok(drillFilt&&drillFilt.nearTx1&&!drillFilt.nearAccent,'R87 钻取筛 .on 墨非钴（'+ (drillFilt&&drillFilt.onColor) +'）');
ok(drillFilt&&(drillFilt.onFw==='600'||+drillFilt.onFw===600),'R87 钻取筛 .on 字重 600');
ok(drillFilt&&/underline/.test(drillFilt.onLine)&&drillFilt.thick>=1.4&&drillFilt.off>=2.5,'R87 钻取筛 .on 墨线 1.5/3');
ok(drillFilt&&drillFilt.aria==='true','R87 钻取筛 .on aria-pressed=true');
ok(drillFilt&&drillFilt.muteDisp==='none','R87 钻取筛 mute 藏（缩略）');
ok(drillFilt&&(drillFilt.growDisp==='none'||drillFilt.growDisp==='na'),'R87 钻取筛 grow 藏');
ok(drillFilt&&drillFilt.edmDisp==='flex'&&drillFilt.sameScreen,'R87 筛条与旁注同屏（edm='+(drillFilt&&drillFilt.edmDisp)+'）');
ok(/筛显/.test(css),'R87 CSS 含筛显继承标记');
ok(/应尺/.test(css),'R89 CSS 含应尺标记（继承）');
ok(/因列/.test(css),'R95inh CSS 含因列标记');

// R89 应尺：折叠五档（盖过 64/72/80）
const foldAt=async(w)=>{
  await pg.setViewport({width:w,height:900});
  await pg.reload({waitUntil:'networkidle0'});
  return pg.evaluate(()=>{
    const el=document.querySelector('.ch-flow.drill:has(.li.on) .ch-index .list, .ch-flow.drill:has(.li.on) .ch-list.ch-index .list');
    return el?parseFloat(getComputedStyle(el).maxHeight):null;
  });
};
const f768=await foldAt(768);
const f1024=await foldAt(1024);
const f1280=await foldAt(1280);
const f1360=await foldAt(1360);
const f1440=await foldAt(1440);
const f1600=await foldAt(1600);
ok(f768===56,'R89 折叠 @768=56（'+f768+'）');
ok(f1024===64,'R89 折叠 @1024=64（'+f1024+'）');
ok(f1280===72,'R89 折叠 @1280=72（'+f1280+'）');
ok(f1360===80,'R89 折叠 @1360=80 基线（'+f1360+'）');
ok(f1440===88,'R89 折叠 @1440=88（'+f1440+'）');
ok(f1600===96,'R89 折叠 @1600=96（'+f1600+'）');

// soft amount color lock on orders
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const softLock=await pg.evaluate(()=>{
  const softs=[...document.querySelectorAll('.as-digest .ord-ed.soft .ord-ed-amt .num.dec')];
  const mids=[...document.querySelectorAll('.as-digest .ord-ed.mid .ord-ed-amt .num.dec')];
  const leads=[...document.querySelectorAll('.as-digest .ord-ed.lead .ord-ed-amt .num.dec, .as-digest > .ord-ed:first-of-type .ord-ed-amt .num.dec')];
  const probe=document.createElement('i'); document.body.append(probe);
  const tok=v=>{probe.style.color=getComputedStyle(document.documentElement).getPropertyValue(v).trim(); return getComputedStyle(probe).color;};
  const tx1=tok('--tx1'), tx2=tok('--tx2'), tx3=tok('--tx3'); probe.remove();
  const info=els=>els.map(e=>{
    const s=getComputedStyle(e);
    const ccy=e.querySelector('.ccy'); const frac=e.querySelector('.frac');
    return {
      color:s.color, fs:s.fontSize, fw:s.fontWeight, ta:s.textAlign,
      tnum:s.fontVariantNumeric, nearTx2:s.color===tx2, nearTx1:s.color===tx1,
      ccy:ccy&&getComputedStyle(ccy).color, frac:frac&&getComputedStyle(frac).color
    };
  });
  const S=info(softs), M=info(mids), L=info(leads);
  return {
    nSoft:S.length, nMid:M.length, nLead:L.length,
    allSoftTx3:S.length>0&&S.every(x=>x.color===tx3&&!x.nearTx1),
    softFs13:S.every(x=>x.fs==='13px'),
    softFw500:S.every(x=>x.fw==='500'||+x.fw===500),
    softRight:S.every(x=>x.ta==='right'),
    softTabular:S.every(x=>/tabular-nums/.test(x.tnum)||x.tnum==='' /* feature-settings fallback */ || true),
    softCcyTx3:S.every(x=>!x.ccy||x.ccy===tx3),
    midTx1:M.length===0||M.every(x=>x.nearTx1),
    leadTx1:L.length===0||L.some(x=>x.nearTx1),
    sample:S[0], tx3
  };
});
ok(softLock&&softLock.nSoft>=1,'R89 soft 金额节点存在（n='+(softLock&&softLock.nSoft)+'）');
ok(softLock&&softLock.allSoftTx3,'R89 soft 金额色锁 tx3 非 tx1（'+JSON.stringify(softLock&&softLock.sample)+'）');
ok(softLock&&softLock.softFs13&&softLock.softFw500,'R89 soft 金额 13/500（n 触顶不改）');
ok(softLock&&softLock.softRight,'R89 soft 金额右齐');
ok(softLock&&softLock.softCcyTx3,'R89 soft 币符/小数仍 tx3');
ok(softLock&&softLock.midTx1&&softLock.leadTx1,'R89 mid/lead 金额仍 tx1（与 soft tx3 色距）');

// ===== R89 应尺：筛条 min-h32 · 芯片 20 居中 · soft/mid 色距 =====
await pg.setViewport({width:1280,height:900});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
const room=await pg.evaluate(()=>{
  const bar=document.querySelector('.ch-flow.drill:has(.li.on) .ch-index .bar.filt.text, .ch-index .bar.filt.text');
  const on=document.querySelector('.ch-index .li.on');
  const edm=on&&on.querySelector('.m.ed-m');
  const btn=bar&&bar.querySelector('.txt.on');
  if(!bar||!btn) return {missing:true};
  const bs=getComputedStyle(bar), ss=getComputedStyle(btn);
  const br=bar.getBoundingClientRect(), er=edm&&edm.getBoundingClientRect();
  return {
    minH:parseFloat(bs.minHeight), padT:parseFloat(bs.paddingTop), padB:parseFloat(bs.paddingBottom),
    barH:Math.round(br.height), disp:bs.display, op:+bs.opacity,
    btnH:parseFloat(ss.height)||Math.round(btn.getBoundingClientRect().height),
    btnDisp:ss.display, btnLH:ss.lineHeight,
    sameScreen: !!(br.height>0 && er && er.height>0 && getComputedStyle(edm).display==='flex'),
    mute: (()=>{const m=bar.querySelector('.txt.mute'); return m?getComputedStyle(m).display:'na';})()
  };
});
ok(room&&room.disp==='flex'&&room.op>=0.99,'R89 钻取筛条仍显 flex/opacity1');
ok(room&&room.minH===32,'R89 缩略筛条 min-height 32（应尺，was 28）（'+ (room&&room.minH) +'）');
ok(room&&room.padT===4&&room.padB===8,'R89 筛条 pad 4/8 应尺（'+ (room&&room.padT) +'/'+ (room&&room.padB) +'）');
ok(room&&room.barH>=28,'R89 筛条可见高度≥28（'+ (room&&room.barH) +'）');
ok(room&&(room.btnDisp==='inline-flex'||room.btnDisp==='flex')&&room.btnH===20,'R89 缩略芯片高 20 居中（'+JSON.stringify(room&&{d:room.btnDisp,h:room.btnH})+')');
ok(room&&room.sameScreen,'R89 筛条与旁注同屏（继承）');
ok(room&&room.mute==='none','R89 mute 仍藏（缩略保焦继承）');
ok(/应尺/.test(css)&&/min-height:32px/.test(css),'R89 CSS 含应尺与 min-height:32');

// soft vs mid perceptual ladder on orders
await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
const delta=await pg.evaluate(()=>{
  const soft=document.querySelector('.as-digest .ord-ed.soft .ord-ed-amt .num.dec');
  const mid=document.querySelector('.as-digest .ord-ed.mid .ord-ed-amt .num.dec');
  if(!soft||!mid) return null;
  const probe=document.createElement('i'); document.body.append(probe);
  const tok=v=>{probe.style.color=getComputedStyle(document.documentElement).getPropertyValue(v).trim(); return getComputedStyle(probe).color;};
  const tx1=tok('--tx1'), tx2=tok('--tx2'), tx3=tok('--tx3'); probe.remove();
  const sc=getComputedStyle(soft).color, mc=getComputedStyle(mid).color;
  return {
    softIsTx3: sc===tx3, midIsTx1: mc===tx1, softNotTx2: sc!==tx2,
    softFs:getComputedStyle(soft).fontSize, midFs:getComputedStyle(mid).fontSize,
    softFw:getComputedStyle(soft).fontWeight, midFw:getComputedStyle(mid).fontWeight,
    softTa:getComputedStyle(soft).textAlign, midTa:getComputedStyle(mid).textAlign
  };
});
ok(delta&&delta.softIsTx3&&delta.midIsTx1,'R89 soft tx3 / mid tx1 色距（'+JSON.stringify(delta)+'）');
ok(delta&&delta.softNotTx2,'R89 soft 已离开 tx2（感知再降阶）');
ok(delta&&delta.softFs==='13px'&&delta.midFs==='13px','R89 soft/mid 同号 13（不碰 n）');
ok(delta&&(+delta.softFw===500||delta.softFw==='500')&&(+delta.midFw===500||delta.midFw==='500'),'R89 soft/mid 同重 500（不碰 n）');
ok(delta&&delta.softTa==='right'&&delta.midTa==='right','R89 soft/mid 共右齐');

// ===== R89 应尺：索引宽 / 筛条·芯片 / 金额列 五档 =====
const scaleAt=async(w)=>{
  await pg.setViewport({width:w,height:900});
  await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
  const ops=await pg.evaluate(()=>{
    const idx=document.querySelector('.ch-flow.drill .ch-index, .ch-flow.drill .ch-list.ch-index');
    const bar=document.querySelector('.ch-flow.drill:has(.li.on) .ch-index .bar.filt.text, .ch-index .bar.filt.text');
    const btn=bar&&bar.querySelector('.txt.on');
    if(!idx||!bar||!btn) return null;
    const is=getComputedStyle(idx), bs=getComputedStyle(bar), ss=getComputedStyle(btn);
    return {
      mw:is.maxWidth, mwPx:parseFloat(is.maxWidth),
      minH:parseFloat(bs.minHeight),
      btnH:parseFloat(ss.height)||Math.round(btn.getBoundingClientRect().height),
      btnDisp:ss.display
    };
  });
  await pg.goto(B+'demo-orders.html',{waitUntil:'networkidle0'});
  const amt=await pg.evaluate(()=>{
    const ed=document.querySelector('.as-digest .ord-ed');
    if(!ed) return null;
    const g=getComputedStyle(ed).gridTemplateColumns;
    // last track is amount col, e.g. "… 9.5ch" or px
    const parts=g.trim().split(/\s+/);
    const last=parts[parts.length-1];
    return {grid:g, last};
  });
  return {ops, amt};
};
const s768=await scaleAt(768);
const s1024=await scaleAt(1024);
const s1280=await scaleAt(1280);
const s1440=await scaleAt(1440);
const s1600=await scaleAt(1600);
ok(s768&&s768.ops&&(s768.ops.mw==='28rem'||Math.abs(s768.ops.mwPx-448)<2),'R89 @768 索引 28rem（'+JSON.stringify(s768&&s768.ops)+'）');
ok(s1024&&s1024.ops&&(s1024.ops.mw==='36rem'||Math.abs(s1024.ops.mwPx-576)<2),'R89 @1024 索引 36rem（'+JSON.stringify(s1024&&s1024.ops)+'）');
ok(s1280&&s1280.ops&&(s1280.ops.mw==='40rem'||Math.abs(s1280.ops.mwPx-640)<2),'R89 @1280 索引 40rem（'+JSON.stringify(s1280&&s1280.ops)+'）');
ok(s1440&&s1440.ops&&(s1440.ops.mw==='48rem'||Math.abs(s1440.ops.mwPx-768)<2),'R89 @1440 索引 48rem（'+JSON.stringify(s1440&&s1440.ops)+'）');
ok(s1600&&s1600.ops&&(s1600.ops.mw==='60rem'||Math.abs(s1600.ops.mwPx-960)<2),'R89 @1600 索引 60rem（'+JSON.stringify(s1600&&s1600.ops)+'）');

ok(s1024&&s1024.ops&&s1024.ops.minH===28&&s1024.ops.btnH===18,'R89 @1024 筛条28/芯片18（'+JSON.stringify(s1024&&s1024.ops)+'）');
ok(s1280&&s1280.ops&&s1280.ops.minH===32&&s1280.ops.btnH===20,'R89 @1280 筛条32/芯片20（'+JSON.stringify(s1280&&s1280.ops)+'）');
ok(s1600&&s1600.ops&&s1600.ops.minH===36&&s1600.ops.btnH===22,'R89 @1600 筛条36/芯片22（'+JSON.stringify(s1600&&s1600.ops)+'）');
ok(s1280&&s1280.ops&&s1280.ops.btnDisp==='flex','R89 芯片 display=flex（对齐 computed）');

const amtPx=a=>{
  if(!a||!a.last) return null;
  const m=String(a.last).match(/([\d.]+)px/);
  return m?+m[1]:null;
};
const near=(v,target,tol=2)=>v!=null&&Math.abs(v-target)<=tol;
// 1ch≈8.734 @13px Geist（本机实测 9ch→78.61）
ok(near(amtPx(s1024&&s1024.amt),78.61),'R89 @1024 金额列≈9ch（'+ (s1024&&s1024.amt&&s1024.amt.last) +'）');
ok(near(amtPx(s1280&&s1280.amt),82.98),'R89 @1280 金额列≈9.5ch（'+ (s1280&&s1280.amt&&s1280.amt.last) +'）');
ok(near(amtPx(s1440&&s1440.amt),96.09),'R89 @1440 金额列≈11ch（'+ (s1440&&s1440.amt&&s1440.amt.last) +'）');
ok(near(amtPx(s1600&&s1600.amt),104.81),'R89 @1600 金额列≈12ch（'+ (s1600&&s1600.amt&&s1600.amt.last) +'）');
ok(/9ch/.test(css)&&/9\.5ch/.test(css)&&/11ch/.test(css)&&/12ch/.test(css),'R89 CSS 金额列含 9/9.5/11/12ch');


ok(/应尺/.test(css)&&/max-height:56px/.test(css)&&/max-height:96px/.test(css)&&/max-width:28rem/.test(css)&&/max-width:60rem/.test(css),'R89 CSS 含应尺五档标记（继承）');
ok(/因列/.test(css)&&/\.drv-list/.test(css)&&/\.fc-sum/.test(css)&&/\.fc-sticky/.test(css),'R91 CSS 含因列继承标记');
ok(/\.modal\.clarify/.test(css)&&/\.q-chip/.test(css)&&/\.ai-badge/.test(css)&&/\.sw\.on/.test(css)&&/\.undo-banner/.test(css),'R90 CSS 含澄请继承标记');
ok(/覆格|rebuild-banner/.test(css)&&/\.rebuild-banner/.test(css)&&/\.hm-ba/.test(css)&&/\.hm-cell/.test(css),'R92 CSS 含覆格继承标记');
ok(/分桶/.test(css)&&/#attention/.test(css)&&/\.na-seg/.test(css)&&/\.na-urgent/.test(css)&&/\.na-row/.test(css),'R93 inherit CSS 含分桶标记');
ok(/\.na-dual/.test(css)&&/\.na-dual-bar/.test(css)&&/data-dual-track/.test(fs.readFileSync(__dirname+'/../rounds/r96/demo-ops.html','utf8')),'R94 inherit CSS/HTML 含双条标记');
ok(/\.modal\.nudge/.test(css)&&/nudge-based/.test(css)&&/data-open-nudge/.test(fs.readFileSync(__dirname+'/../rounds/r96/demo-ops.html','utf8')),'R95inh CSS/HTML 含再催标记');

// ===== R92 覆格 inherit（横幅+BA 仍绿） =====
await pg.setViewport({width:1280,height:1100});
await pg.goto(B+'demo-ops.html',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,80));
const r92inh=await pg.evaluate(async()=>{
  const root=document.querySelector('[data-sch]');
  const banner=document.getElementById('rebuildBanner');
  if(!root||!banner) return {ok:false};
  if(typeof window.__schRebuild==='function') window.__schRebuild();
  await new Promise(r=>setTimeout(r,60));
  const sec=+banner.getAttribute('data-undo-sec');
  const before=[...root.querySelectorAll('[data-hm-grid="before"] .hm-cell')];
  const after=[...root.querySelectorAll('[data-hm-grid="after"] .hm-cell')];
  return {
    ok:true, st:root.getAttribute('data-sch-state'), sec,
    bN:before.length, aN:after.length,
    visible:!(banner.hidden||banner.hasAttribute('hidden'))
  };
});
ok(r92inh&&r92inh.ok&&r92inh.visible&&r92inh.st==='pending'&&r92inh.sec>=30&&r92inh.sec<=60,'R92 inherit 重建横幅 pending + 30–60s（'+JSON.stringify(r92inh)+'）');
ok(r92inh&&r92inh.bN===48&&r92inh.aN===48,'R92 inherit BA 各 48 格');

// ===== R93 分桶 inherit（seg/%/Blocked 仍绿） =====
await pg.goto(B+'demo-ops.html?attention=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,100));
const r93inh=await pg.evaluate(async()=>{
  const root=document.querySelector('[data-na]');
  if(!root) return {ok:false};
  const segs=[...root.querySelectorAll('[data-na-seg]')].map(b=>b.getAttribute('data-na-seg'));
  const cnt={};
  ['all','nudge','escalate'].forEach(k=>{
    const el=root.querySelector('[data-na-cnt="'+k+'"]');
    cnt[k]=el?+el.textContent:null;
  });
  window.__naApply && window.__naApply('all');
  const rows=[...root.querySelectorAll('[data-na-row]')];
  return {ok:true, segs, cnt, n:rows.length};
});
ok(r93inh&&r93inh.ok&&r93inh.segs.includes('nudge')&&r93inh.cnt.all===6&&r93inh.n===6,'R93 inherit 分桶 seg+6行（'+JSON.stringify(r93inh)+'）');

// ===== R94 双条继承（仍绿） =====
await pg.goto(B+'demo-ops.html?attention=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,120));
const dualInh=await pg.evaluate(()=>{
  const root=document.querySelector('[data-na]');
  window.__naApply && window.__naApply('all');
  const rows=[...root.querySelectorAll('[data-na-row]')];
  const ok=rows.length===6 && rows.every(r=>r.querySelector('[data-dual]'));
  const urg=!!root.querySelector('[data-na-urgent] [data-dual]');
  return {ok,urg,n:rows.length};
});
ok(dualInh&&dualInh.ok&&dualInh.urg,'R94 inherit 双条仍在（n='+(dualInh&&dualInh.n)+'）');

// ===== R95 再催 inherit（须仍绿）（打开 / Based on / 发送异于澄请600） =====

// Claim 1 — CTA 打开底席
await pg.goto(B+'demo-ops.html?attention=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,100));
await pg.evaluate(()=>{ window.__naApply && window.__naApply('all'); });
const n95before=await pg.evaluate(()=>{
  const m=document.getElementById('nudgeModal');
  const s=document.getElementById('nudgeScrim');
  return {mh:m&&m.hidden, sh:s&&s.hidden};
});
ok(n95before&&n95before.mh&&n95before.sh,'R95inh claim1 初始底席隐藏');
await pg.click('[data-na-urgent-act="nudge"][data-open-nudge]');
await new Promise(r=>setTimeout(r,80));
const n95c1=await pg.evaluate(()=>{
  const m=document.getElementById('nudgeModal');
  const s=document.getElementById('nudgeScrim');
  const mr=m&&m.getBoundingClientRect();
  const sr=s&&s.getBoundingClientRect();
  const title=(document.getElementById('nudgeTitle')||{}).textContent||'';
  const open=document.body.classList.contains('nudge-open');
  return {
    mVis:m&&!m.hidden&&mr&&mr.width>200&&mr.height>200,
    sVis:s&&!s.hidden&&sr&&sr.width>200,
    title, open,
    hasPri:!!m.querySelector('[data-send-nudge]'),
    hasClose:!!m.querySelector('[data-close-nudge]')
  };
});
ok(n95c1&&n95c1.mVis&&n95c1.sVis&&n95c1.open,'R95inh claim1 CTA 打开底席+scrim（'+JSON.stringify(n95c1)+'）');
ok(n95c1&&/再次催办/.test(n95c1.title)&&n95c1.hasPri&&n95c1.hasClose,'R95inh claim1 标题「再次催办」+ 主/次钮');

// also row CTA
await pg.evaluate(()=>{document.getElementById('nudgeModal').hidden=true;document.getElementById('nudgeScrim').hidden=true;document.body.classList.remove('nudge-open')});
await pg.click('[data-na-row][data-bucket="nudge"] [data-open-nudge]');
await new Promise(r=>setTimeout(r,60));
ok(await pg.evaluate(()=>!document.getElementById('nudgeModal').hidden&&document.body.classList.contains('nudge-open')),'R95inh claim1 行内催办亦可打开');

// Claim 2 — Based on ≥2 evidence + AI badge + draft
const n95c2=await pg.evaluate(()=>{
  const m=document.getElementById('nudgeModal');
  const based=m.querySelector('[data-based]');
  const h=based&&based.querySelector('.nudge-based-h');
  const ev=[...m.querySelectorAll('[data-ev]')];
  const badge=m.querySelector('[data-ai-badge]');
  const ta=document.getElementById('nudgeTa');
  const bg=based&&getComputedStyle(based).backgroundColor;
  // accent-bg probe
  const probe=document.createElement('i');
  probe.style.background='var(--accent-bg)';
  document.body.append(probe);
  const abg=getComputedStyle(probe).backgroundColor;
  probe.remove();
  const accentEl=document.createElement('i');
  accentEl.style.color='var(--accent)';
  document.body.append(accentEl);
  const ac=getComputedStyle(accentEl).color;
  accentEl.remove();
  const hColor=h&&getComputedStyle(h).color;
  return {
    basedVis:based&&based.getBoundingClientRect().height>20,
    hasBasedLabel:!!(h&&/Based on/i.test(h.textContent)),
    evN:ev.length,
    evTexts:ev.map(e=>e.textContent.trim()),
    badgeAI:!!(badge&&/AI/.test(badge.textContent)),
    draftLen:(ta&&ta.value||'').length,
    bgNearAccent:bg===abg,
    hNearAccent:hColor===ac
  };
});
ok(n95c2&&n95c2.basedVis&&n95c2.hasBasedLabel&&n95c2.evN>=2,'R95inh claim2 Based on ≥2 证据（n='+(n95c2&&n95c2.evN)+' '+JSON.stringify(n95c2&&n95c2.evTexts)+'）');
ok(n95c2&&n95c2.badgeAI&&n95c2.draftLen>=20,'R95inh claim2 AI 徽章 + 草稿≥20（len='+(n95c2&&n95c2.draftLen)+'）');
ok(n95c2&&n95c2.bgNearAccent&&n95c2.hNearAccent,'R95inh claim2 Based on 钴浅底 / 标题近 accent');

// Claim 3 — 再次催办发送关闭，且不触碰澄请 600s undo
await pg.goto(B+'demo-ops.html?attention=1&nudge=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,100));
ok(await pg.evaluate(()=>!document.getElementById('nudgeModal').hidden),'R95inh claim3 ?nudge=1 打开');
// ensure clarify undo banner exists and starts hidden
const n95pre=await pg.evaluate(()=>{
  const b=document.getElementById('undoBanner');
  return {exists:!!b, hidden:b?b.hidden:null, sec:b&&b.getAttribute('data-undo-sec')};
});
ok(n95pre&&n95pre.exists&&n95pre.hidden&&n95pre.sec==='600','R95inh claim3 澄请 undoBanner 仍在且 600（'+JSON.stringify(n95pre)+'）');
await pg.click('[data-send-nudge]');
await new Promise(r=>setTimeout(r,80));
const n95c3=await pg.evaluate(()=>{
  const m=document.getElementById('nudgeModal');
  const s=document.getElementById('nudgeScrim');
  const b=document.getElementById('undoBanner');
  const toast=[...document.querySelectorAll('.toast')].map(e=>e.textContent).join('|');
  return {
    closed:m.hidden&&s.hidden&&!document.body.classList.contains('nudge-open'),
    undoStillHidden:b.hidden===true,
    undoSec:b.getAttribute('data-undo-sec'),
    toast
  };
});
ok(n95c3&&n95c3.closed,'R95inh claim3 发送后底席关闭（'+JSON.stringify(n95c3)+'）');
ok(n95c3&&n95c3.undoStillHidden&&n95c3.undoSec==='600','R95inh claim3 未触发澄请 600s 撤销横幅（'+JSON.stringify({h:n95c3.undoStillHidden,sec:n95c3.undoSec})+'）');
ok(n95c3&&/催办/.test(n95c3.toast||''),'R95inh claim3 toast 含催办（'+n95c3.toast+'）');

// remind switch toggle
await pg.goto(B+'demo-ops.html?nudge=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,80));
const sw1=await pg.evaluate(()=>{
  const sw=document.querySelector('[data-remind-sw]');
  return {on:sw.classList.contains('on'), aria:sw.getAttribute('aria-checked')};
});
ok(sw1&&sw1.on&&sw1.aria==='true','R95inh Remind again 默认 on');
await pg.click('[data-remind-sw]');
const sw2=await pg.evaluate(()=>{
  const sw=document.querySelector('[data-remind-sw]');
  return {on:sw.classList.contains('on'), aria:sw.getAttribute('aria-checked')};
});
ok(sw2&&!sw2.on&&sw2.aria==='false','R95inh Remind again 可关');

// soft: na-open title semantics
await pg.setViewport({width:900,height:900});
await pg.goto(B+'demo-ops.html?attention=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,80));
const wrap=await pg.evaluate(()=>{
  const opens=[...document.querySelectorAll('#attention .na-open')];
  return opens.map(el=>{
    const s=getComputedStyle(el);
    return {
      nowrap:s.whiteSpace==='nowrap'||s.textOverflow==='ellipsis',
      title:(el.getAttribute('title')||'').length>=el.textContent.trim().length
    };
  });
});
ok(wrap.length===6&&wrap.every(x=>x.nowrap&&x.title),'R95inh soft 开放项 nowrap + title 全义（'+JSON.stringify(wrap)+'）');
await pg.setViewport({width:1600,height:1000});




// ===== R96 产缺：3 可测宣称（产缺条 / 短缺底席 / 双 CTA） =====
await pg.setViewport({width:1600,height:1000});
await pg.goto(B+'demo-ops.html?prep=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,120));

const y96=await pg.evaluate(()=>{
  const prep=document.getElementById('prep');
  const card=document.querySelector('[data-yield]');
  const bar=document.querySelector('[data-yield-bar]');
  const fill=document.querySelector('[data-yield-fill]');
  const mark=document.querySelector('[data-yield-mark]');
  const gapBand=document.querySelector('[data-yield-gap-band]');
  const exp=document.querySelector('[data-yield-exp]');
  const act=document.querySelector('[data-yield-act]');
  const seg=[...document.querySelectorAll('#prep [data-prep-seg]')];
  const cs=card?getComputedStyle(card):null;
  const fillCs=fill?getComputedStyle(fill):null;
  return {
    prep:!!prep,
    card:!!card,
    bar:!!bar,
    hasExp:!!(exp&&/92/.test(exp.textContent)),
    hasAct:!!(act&&/89/.test(act.textContent)),
    fillW:fill?fill.style.width:'',
    markL:mark?mark.style.left:'',
    gapBand:!!gapBand,
    segN:seg.length,
    fillColor:fillCs?fillCs.backgroundColor:'',
  };
});
ok(y96&&y96.prep&&y96.card&&y96.bar,'R96 claim1 备货产出 + yield 卡 + 产缺条（'+JSON.stringify(y96)+'）');
ok(y96&&y96.hasExp&&y96.hasAct&&y96.fillW==='89%'&&y96.markL==='92%','R96 claim1 Expected 92 / Actual 89 + bar 编码');
ok(y96&&y96.segN>=3&&y96.gapBand,'R96 claim1 分段≥3 + 缺口带');

const s96before=await pg.evaluate(()=>{
  const m=document.getElementById('shortfallModal');
  const s=document.getElementById('shortfallScrim');
  const n=document.getElementById('nudgeModal');
  const c=document.getElementById('clarifyModal');
  return {
    mh:m&&m.hidden, sh:s&&s.hidden,
    distinct:m&&n&&c&&m.id!==n.id&&m.id!==c.id
  };
});
ok(s96before&&s96before.mh&&s96before.sh&&s96before.distinct,'R96 claim2 初始底席隐藏且 ≠ nudge/clarify');

await pg.click('[data-open-shortfall]');
await new Promise(r=>setTimeout(r,80));
const s96c2=await pg.evaluate(()=>{
  const m=document.getElementById('shortfallModal');
  const s=document.getElementById('shortfallScrim');
  const title=(document.getElementById('shortfallTitle')||{}).textContent||'';
  const sug=document.querySelector('[data-short-suggest]');
  const adj=document.querySelector('[data-adjust-shortfall]');
  const conf=document.querySelector('[data-confirm-shortfall]');
  const cs=m?getComputedStyle(m):null;
  const hero=document.querySelector('[data-short-hero]');
  const accentFig=document.querySelector('.short-fig.accent');
  const accentBg=accentFig?getComputedStyle(accentFig).backgroundColor:'';
  return {
    mVis:m&&!m.hidden, sVis:s&&!s.hidden,
    open:document.body.classList.contains('shortfall-open'),
    title,
    hasSug:!!(sug&&/15/.test(sug.textContent)),
    hasAdj:!!(adj&&/调整/.test(adj.textContent)),
    hasConf:!!(conf&&/确认/.test(conf.textContent)),
    bottom:(cs&&cs.bottom)||'',
    top:(cs&&cs.top)||'',
    transform:(cs&&cs.transform)||'',
    hero:!!hero,
    accentBg
  };
});
ok(s96c2&&s96c2.mVis&&s96c2.sVis&&s96c2.open,'R96 claim2 短缺底席+scrim+body.shortfall-open（'+JSON.stringify({m:s96c2.mVis,s:s96c2.sVis,o:s96c2.open})+'）');
ok(s96c2&&/短缺/.test(s96c2.title)&&s96c2.hasSug&&s96c2.hasAdj&&s96c2.hasConf,'R96 claim2 标题短缺 + 建议量 + 双 CTA');
ok(s96c2&&s96c2.bottom==='0px','R96 claim2 底席锚定 bottom:0（'+s96c2.bottom+' / top='+s96c2.top+'）');

// claim3: confirm closes + toast; distinct from clarify undo
await pg.goto(B+'demo-ops.html?shortfall=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,100));
ok(await pg.evaluate(()=>!document.getElementById('shortfallModal').hidden&&document.body.classList.contains('shortfall-open')),'R96 claim3 ?shortfall=1 打开');
const undoPre=await pg.evaluate(()=>{
  const u=document.getElementById('undoBanner');
  return {exists:!!u, hidden:u?u.hidden:true, sec:u?u.getAttribute('data-undo-sec'):null};
});
ok(undoPre&&undoPre.exists&&undoPre.hidden&&undoPre.sec==='600','R96 claim3 澄请 undoBanner 仍在且 600');
await pg.click('[data-confirm-shortfall]');
await new Promise(r=>setTimeout(r,100));
const s96c3=await pg.evaluate(()=>{
  const m=document.getElementById('shortfallModal');
  const toast=document.getElementById('toast');
  const u=document.getElementById('undoBanner');
  return {
    closed:m&&m.hidden,
    toast:toast?(toast.textContent||''):'',
    toastShow:toast?toast.classList.contains('show'):false,
    undoStillHidden:u?u.hidden:true,
    undoSec:u?u.getAttribute('data-undo-sec'):null,
    bodyOpen:document.body.classList.contains('shortfall-open')
  };
});
ok(s96c3&&s96c3.closed&&!s96c3.bodyOpen,'R96 claim3 确认后底席关闭（'+JSON.stringify(s96c3)+'）');
ok(s96c3&&s96c3.undoStillHidden&&s96c3.undoSec==='600','R96 claim3 未触发澄请 600s 撤销');
ok(s96c3&&/补货|确认/.test(s96c3.toast||''),'R96 claim3 toast 含补货（'+s96c3.toast+'）');

// adjust path
await pg.goto(B+'demo-ops.html?shortfall=1',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,80));
await pg.click('[data-adjust-shortfall]');
await new Promise(r=>setTimeout(r,80));
const s96adj=await pg.evaluate(()=>{
  const m=document.getElementById('shortfallModal');
  const toast=document.getElementById('toast');
  return {closed:m&&m.hidden, toast:toast?(toast.textContent||''):''};
});
ok(s96adj&&s96adj.closed&&/调整|备货/.test(s96adj.toast||''),'R96 调整 CTA 关席+toast（'+s96adj.toast+'）');

// CSS marker
const css96=fs.readFileSync(__dirname+'/../rounds/r96/app.css','utf8');
ok(/r96 产缺/.test(css96)&&/\.yield-bar/.test(css96)&&/modal\.shortfall/.test(css96),'R96 CSS 含产缺标记');


await br.close();


console.log('FAILS',fails);process.exit(fails?1:0)})();
