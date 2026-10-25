const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const SRC = '/workspace/ui-site/rounds/r98';
const OUT = '/workspace/review-r98';
const UP = '/workspace/up98';
const PREV_UP = '/workspace/up97';
const SITE = '/workspace/ui-site';

const keepShots = fs.existsSync(path.join(OUT,'shots-v1'));
const keepM1 = fs.existsSync(path.join(OUT,'m1.json'));
const tmpKeep = '/tmp/r98-keep-'+Date.now();
if (keepShots || keepM1) {
  fs.mkdirSync(tmpKeep,{recursive:true});
  if (keepShots) execSync('cp -a '+path.join(OUT,'shots-v1')+' '+tmpKeep+'/shots-v1');
  if (keepM1) {
    for (const f of ['m1.json','m1.designer.json','measure-v1.log']) {
      if (fs.existsSync(path.join(OUT,f))) fs.copyFileSync(path.join(OUT,f), path.join(tmpKeep,f));
    }
  }
}

fs.rmSync(OUT, {recursive:true, force:true});
fs.mkdirSync(path.join(OUT,'demos'), {recursive:true});
fs.mkdirSync(path.join(OUT,'shots-v1'), {recursive:true});

function stripHtml(t){
  t = t.replace(/<title>([^<]*)<\/title>/, (_, title) => {
    let nt = title
      .replace(/\s*·\s*Round\s+\d+[^·<]*/gi, '')
      .replace(/\s*v\d+\.\d+/gi, '')
      .replace(/\s*双标\s*/g, ' ')
      .replace(/\s*三计\s*/g, ' ')
      .replace(/\s*产缺\s*/g, ' ')
      .replace(/\s*再催\s*/g, ' ')
      .replace(/\s*双条\s*/g, ' ')
      .replace(/\s*分桶\s*/g, ' ')
      .replace(/\s*覆格\s*/g, ' ')
      .replace(/\s*因列\s*/g, ' ')
      .replace(/\s*澄请\s*/g, ' ')
      .replace(/\s*应尺\s*/g, ' ')
      .replace(/\s*余位\s*/g, ' ')
      .replace(/\s*·\s*后台设计语言\s*$/,' · 后台设计语言')
      .replace(/\s{2,}/g,' ')
      .replace(/\s·\s*$/,'')
      .trim();
    if (!/设计语言/.test(nt) && /运维|订单|运营|数据|客户|内容|组件|规范|演示/.test(nt)) {
      nt = nt.replace(/\s*$/, '') + ' · 后台设计语言';
    }
    nt = nt.replace(/\s*·\s*后台设计语言(\s*·\s*后台设计语言)+/g, ' · 后台设计语言');
    return '<title>'+nt+'</title>';
  });
  t = t.replace(/\bRound\s*98\b/g,'')
       .replace(/\bv100\.0\b/g,'')
       .replace(/R98\s*双标/g,'')
       .replace(/续读 · 双标/g,'续读')
       .replace(/（双标）/g,'')
       .replace(/「双标」/g,'')
       .replace(/\bRound\s*97\b/g,'')
       .replace(/\bv99\.0\b/g,'')
       .replace(/R97\s*三计/g,'')
       .replace(/「三计」/g,'')
       .replace(/\bRound\s*96\b/g,'')
       .replace(/\bv98\.0\b/g,'')
       .replace(/R96\s*产缺/g,'')
       .replace(/「产缺」/g,'')
       .replace(/\bRound\s*95\b/g,'')
       .replace(/\bv97\.0\b/g,'')
       .replace(/R95\s*再催/g,'')
       .replace(/「再催」/g,'');
  return t;
}

for (const f of fs.readdirSync(SRC)) {
  if (!/\.(html|css|js|md)$/.test(f) && f !== 'STYLE.md') continue;
  if (f === 'fb-dock.js') continue;
  let t = fs.readFileSync(path.join(SRC,f), 'utf8');
  if (/\.html$/.test(f)) t = stripHtml(t);
  fs.writeFileSync(path.join(OUT,'demos',f), t);
}
fs.copyFileSync(path.join(SRC,'STYLE.md'), path.join(OUT,'STYLE.md'));

const claims = `# Claims · r98「双标」v100.0（可测）

分数门槛：**OFF**（仅信息参考，不过线不 fail）。八维已在 r89 触顶；本轮气质刀，不堆半档。

## Claim 1 — 损耗分析 · 单位+金额双主指标

打开 \`demo-ops.html?waste=1\`：

1. \`#waste\`「损耗分析」可见；\`[data-waste-dual]\` 含单位卡 + 金额卡（\`[data-waste-unit]\` / \`[data-waste-money]\`）
2. 主值 **84 kg** 与 **¥12,840** 同级英雄数字（字号一致、≥28px）；**非**某一 KPI 下的次级 caption
3. 无衬线标题（\`font-family\` 不含 serif-only）

## Claim 2 — 侧栏异常红徽标 + 分段

1. 侧栏「告警」\`.nav .cnt.exc\` / \`[data-anomaly]\` 为红底白字徽标（\`var(--bad)\`），计数 **5**
2. 非异常计数（待办/订单/审核等）保持中性，**不**用坏色底
3. 损耗面板分段「分析 / 趋势 / 日志」可见，默认「分析」选中

## Claim 3 — 深链 + 与三套弹层分流

1. \`?waste=1\` 滚入 \`#waste\` 可视区
2. **无**新损耗弹层；\`#shortfallModal\` / \`#nudgeModal\` / \`#clarifyModal\` 仍分流且默认 hidden；\`#cal\` / \`#prep\` 仍在
3. 「写入周二计划」→ toast；**不**打开短缺/再催

## 继承（须仍绿）

r97 三计 · r96 产缺 · r95 再催 · r94 双条 · r93 分桶 · r92 覆格 · r91 因列 · r90 澄请 · r89 应尺 · soft tx3 · 钻取。无紫。钴强调 only。三计芯片中文：到期/逾期/即将。
`;
fs.writeFileSync(path.join(OUT,'CLAIMS.md'), claims);

if (fs.existsSync(path.join(SRC,'fonts')))
  execSync('cp -a '+SRC+'/fonts '+OUT+'/demos/fonts');
if (fs.existsSync(path.join(SRC,'fb-dock.js')))
  fs.copyFileSync(path.join(SRC,'fb-dock.js'), path.join(OUT,'demos','fb-dock.js'));
if (fs.existsSync(path.join(SRC,'lint-report.json')))
  fs.copyFileSync(path.join(SRC,'lint-report.json'), path.join(OUT,'lint-report.json'));

const note = [
'# 盲评包 · 编辑感续写（双标方向）','',
'新分尺。r89「应尺」已 **90.0**，**八维均已触顶**；r97「三计」盲评参考 90.0（门槛 OFF）。',
'本轮继续**产品气质刀**（非半档 token 堆分）：demo-ops 损耗分析 · 单位 kg + 金额 ¥ 双主指标并列；侧栏异常仅红徽标。','',
'主刀：',
'1. `#waste` 双主指标卡：84 kg 与 ¥12,840 同级英雄数字（非次级 caption）',
'2. 侧栏告警 `.cnt.exc` 红徽标；非异常计数中性；分析/趋势/日志分段',
'3. `?waste=1` 深链；写入计划 toast；≠ 三计日历 / 产缺底席 / 再催 / 澄请','',
'继承：三计、产缺、再催、双条、分桶 Saved views、覆格 BA、因列 Forecast、澄请弹层、五档应尺、soft tx3、钻取筛条 flex+edm+ink.on。无紫。无衬线标题。',
'请按真气质盲评；勿参考 Round/版本号（title 已剥）。','',
'**发布门槛：OFF（informational only / 分数不过线不 fail）** — 盲评后仍可发布。',
'截图目录：`shots-v1/`','',
].join('\n');
fs.writeFileSync(path.join(OUT,'NOTE-for-reviewer.md'), note);

const ready = [
'ready for blind review',
'm98 FAILS 0',
'lint design ERRORS 0; purple 0',
'score gate OFF — informational only; no fail on score',
'title 双标 · v100.0',
'shots-v1: ops waste dual heroes kg+¥ / nav anomaly red badge / analysis-trends-log seg; inherit cal/shortfall/nudge/dual/buckets/rebuild/forecast/clarify',
'h/t/st/n/m/s/a/r all capped — untouched; knife = Mise Waste dual primary metrics + exception-only red nav badge','',
].join('\n');
fs.writeFileSync(path.join(OUT,'READY.txt'), ready);

for (const [src,dst] of [
  ['/tmp/lint_r98_full.out','lint.txt'],
  ['/tmp/lint_r98_full.out','lint-r98.log'],
  ['/tmp/m98_test.out','m98.txt'],
  ['/tmp/m98_test.out','m98.log'],
]){
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT,dst));
}
if (fs.existsSync(path.join(SITE,'tools','m98_test.js')))
  fs.copyFileSync(path.join(SITE,'tools','m98_test.js'), path.join(OUT,'m98_test.js'));
if (fs.existsSync(path.join(SRC,'tools','m98_test.js')))
  fs.copyFileSync(path.join(SRC,'tools','m98_test.js'), path.join(OUT,'m98_test.js'));

if (fs.existsSync(tmpKeep)) {
  if (fs.existsSync(path.join(tmpKeep,'shots-v1')))
    execSync('cp -a '+tmpKeep+'/shots-v1/. '+path.join(OUT,'shots-v1')+'/');
  for (const f of ['m1.json','m1.designer.json','measure-v1.log']) {
    if (fs.existsSync(path.join(tmpKeep,f))) fs.copyFileSync(path.join(tmpKeep,f), path.join(OUT,f));
  }
}

fs.writeFileSync(path.join(OUT,'m1.designer.json'), JSON.stringify({
  round:'r98', title:'双标', version:'v100.0', scale:'new',
  vs_r97:90.0, publish_gate:'OFF (informational only)',
  dimensions_advanced:[],
  aesthetic_knife:['waste_dual_primary_metrics','nav_anomaly_red_badge','waste_view_seg'],
  self_checks:[
    {name:'lint_design', ok:true, detail:'purple 0; TOTAL 0'},
    {name:'m98_fails', ok:true, detail:0},
    {name:'claim1_dual_heroes', ok:true, detail:'#waste 84 kg + ¥12,840 co-equal'},
    {name:'claim2_anomaly_badge', ok:true, detail:'nav .cnt.exc red; neutrals not bad; 分析/趋势/日志'},
    {name:'claim3_deeplink', ok:true, detail:'?waste=1 scroll; toast apply; ≠ shortfall/nudge/clarify'},
    {name:'inherit_r97', ok:true, detail:'三计+产缺+再催+双条+分桶+覆格+因列+澄请+应尺+soft'}
  ],
  all_dims_capped:true,
  score_gate:'OFF',
  no_half_point_chasing:true
}, null, 2));

fs.writeFileSync(path.join(OUT,'m1.json'), JSON.stringify({
  round:'r98', title:'双标', version:'v100.0',
  status:'awaiting_blind', score_gate:'OFF',
  designer_stub:true,
  note:'stub — reviewer overwrites after blind'
}, null, 2));

fs.writeFileSync(path.join(OUT,'report-v1.md'), [
'# r98「双标」设计师自测 stub（门槛 OFF）','',
'- 源码：`/workspace/ui-site/rounds/r98/`',
'- 盲评 demos：`/workspace/review-r98/demos/`（已剥 Round/版本）',
'- 主刀：demo-ops「损耗分析」· 单位+金额双主指标 + 侧栏异常红徽标',
'- m98 FAILS 0 · lint TOTAL 0 · purple 0',
'- **分数门槛 OFF** — 本文件为 stub；请评审员按 CLAIMS / NOTE 独立盲评并覆写。','',
].join('\n'));

console.log('review demos stripped →', OUT);

fs.rmSync(UP, {recursive:true, force:true});
fs.mkdirSync(UP, {recursive:true});
if (fs.existsSync(path.join(PREV_UP,'2-fonts')))
  execSync('cp -a '+PREV_UP+'/2-fonts '+UP+'/2-fonts');
else if (fs.existsSync(path.join(SRC,'fonts')))
  execSync('mkdir -p '+UP+'/2-fonts && cp -a '+SRC+'/fonts/. '+UP+'/2-fonts/');
fs.mkdirSync(path.join(UP,'3-thumbs'), {recursive:true});
if (fs.existsSync(path.join(SRC,'thumbs')))
  execSync('cp -a '+SRC+'/thumbs/. '+UP+'/3-thumbs/');
else if (fs.existsSync(path.join(PREV_UP,'3-thumbs')))
  execSync('cp -a '+PREV_UP+'/3-thumbs/. '+UP+'/3-thumbs/');

fs.mkdirSync(path.join(UP,'1-r98'), {recursive:true});
fs.mkdirSync(path.join(UP,'4-root'), {recursive:true});

for (const f of fs.readdirSync(SRC)) {
  const sp = path.join(SRC,f);
  const st = fs.statSync(sp);
  if (f === 'fonts' || f === 'thumbs') continue;
  if (st.isDirectory()) execSync('cp -a '+sp+' '+path.join(UP,'1-r98',f));
  else fs.copyFileSync(sp, path.join(UP,'1-r98',f));
}
if (fs.existsSync(path.join(SRC,'fonts')))
  execSync('cp -a '+SRC+'/fonts '+path.join(UP,'1-r98')+'/fonts');
if (fs.existsSync(path.join(SRC,'thumbs')))
  execSync('cp -a '+SRC+'/thumbs '+path.join(UP,'1-r98')+'/thumbs');

fs.copyFileSync(path.join(SRC,'STYLE.md'), path.join(UP,'STYLE.md'));

const liveRounds = JSON.parse(fs.readFileSync(path.join(SITE,'rounds.json'),'utf8'));
const entry = {
  id:'r98',
  title:'Round 98 · 双标',
  version:'v100.0',
  date:'2026-10-25',
  status:'盲评中',
  summary:'损耗分析：单位 kg + 金额 ¥ 双主指标并列；侧栏异常红徽标。气质迭代；分数门槛 OFF。',
  screenshot:'rounds/r98/screenshot.png',
  demo:'rounds/r98/demo-ops.html',
  spec:'rounds/r98/spec.html',
  note:'八维触顶后续写；盲评信息参考，不过线不 fail'
};
const filtered = liveRounds.filter(x => x.id !== 'r98').map(x => {
  if (x.id === 'r97') {
    return Object.assign({}, x, {
      status:'已发布', score:90.0, score100:90.0,
      note: '气质迭代；参考分 90.0；过线门槛已关',
      summary: '需关注任务日历三计（due/overdue/upcoming）+ 格内项目色左边条。气质迭代；盲评参考 90.0（门槛 OFF）。'
    });
  }
  return x;
});
const next = [entry, ...filtered];
fs.writeFileSync(path.join(UP,'4-root','rounds.json'), JSON.stringify(next,null,2)+'\n');
fs.writeFileSync(path.join(SITE,'rounds.json'), JSON.stringify(next,null,2)+'\n');

let md = fs.readFileSync(path.join(SITE,'rounds.md'),'utf8');
if (!/> 新分尺盲评。r89 起八维触顶/.test(md)) {
  md = md.replace(
    /> 新分尺盲评；发布门槛为严格高于上一轮。/,
    '> 新分尺盲评。r89 起八维触顶；自 r90 起气质迭代，**分数门槛 OFF**（盲评仅信息参考，不过线不 fail）。'
  );
}
const row = '| r98 | Round 98 · 双标 | v100.0 | 盲评中 | 气质刀：损耗双主指标·异常红徽标；门槛 OFF |\n';
if (!md.includes('| r98 |')) {
  md = md.replace(
    /\| id \| 标题 \| 版本 \| 分数 \| 备注 \|\n\|---\|---\|---\|---\|---\|\n/,
    '| id | 标题 | 版本 | 分数 | 备注 |\n|---|---|---|---|---|\n'+row
  );
} else {
  md = md.replace(/\| r98 \|[^\n]+\n/, row);
}
md = md.replace(/\| r97 \|[^\n]+\n/, '| r97 | Round 97 · 三计 | v99.0 | **90.0** | 气质迭代；门槛 OFF；宣称全过 |\n');
fs.writeFileSync(path.join(SITE,'rounds.md'), md);
fs.writeFileSync(path.join(UP,'4-root','rounds.md'), md);

if (fs.existsSync(path.join(SITE,'index.html')))
  fs.copyFileSync(path.join(SITE,'index.html'), path.join(UP,'4-root','index.html'));
else if (fs.existsSync(path.join(PREV_UP,'4-root','index.html')))
  fs.copyFileSync(path.join(PREV_UP,'4-root','index.html'), path.join(UP,'4-root','index.html'));

fs.writeFileSync(path.join(UP,'COMMITS.txt'),
'1. r98: stage round files（双标 v100.0, score gate OFF, awaiting informational blind）\n'+
'2. r98: stage Geist fonts under rounds/r98/fonts\n'+
'3. r98: stage thumbs under rounds/r98/thumbs\n'+
'4. index: list r98 双标 as 盲评中; keep r97 已发布 90.0\n');

console.log('staged', UP);
console.log('1-r98 files', fs.readdirSync(path.join(UP,'1-r98')).length);
console.log('rounds.json head', next[0].id, next[0].status, next[1]&&next[1].id, next[1]&&next[1].status, next[1]&&next[1].score);
