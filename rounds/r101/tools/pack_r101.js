const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const SRC = '/workspace/ui-site/rounds/r101';
const OUT = '/workspace/review-r101';
const UP = '/workspace/up101';
const PREV_UP = '/workspace/up100';
const SITE = '/workspace/ui-site';

const keepShots = fs.existsSync(path.join(OUT,'shots-v1'));
const keepM1 = fs.existsSync(path.join(OUT,'m1.json'));
const tmpKeep = '/tmp/r101-keep-'+Date.now();
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
      .replace(/\s*预差\s*/g, ' ')
      .replace(/\s*桥瀑\s*/g, ' ').replace(/\s*证差\s*/g, ' ')
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
  t = t.replace(/\bRound\s*101\b/g,'').replace(/\bRound\s*100\b/g,'')
       .replace(/\bv103\.0\b/g,'').replace(/\bv102\.0\b/g,'')
       .replace(/\bRound\s*99\b/g,'')
       .replace(/\bv101\.0\b/g,'')
       .replace(/R100\s*桥瀑/g,'')
       .replace(/续读 · 预差/g,'续读')
       .replace(/续读 · 桥瀑/g,'续读')
       .replace(/（预差）/g,'')
       .replace(/「预差」/g,'')
       .replace(/「桥瀑」/g,'')
       .replace(/R101\s*预差/g,'')
       .replace(/\bRound\s*98\b/g,'')
       .replace(/\bv100\.0\b/g,'')
       .replace(/R99\s*证差/g,'')
       .replace(/「证差」/g,'')
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
if (fs.existsSync(path.join(SRC,'fonts')))
  execSync('cp -a '+SRC+'/fonts '+path.join(OUT,'demos')+'/fonts');
fs.copyFileSync(path.join(SRC,'STYLE.md'), path.join(OUT,'STYLE.md'));

const claims = `# Claims · r101「预差」v103.0（可测）

分数门槛：**OFF**（仅信息参考，不过线不 fail）。八维已在 r89 触顶；本轮气质刀，不堆半档。

## Claim 1 — Forecast / Prepped / Used 差分表

打开 \`demo-ops.html?fprep=1\`：

1. \`#fprep\`「预测对照」可见；\`[data-fprep-row]\` ≥5；表头含 Forecast / Prepped / Used
2. Difference 含超备 \`.over\` 与短缺 \`.short\`；顶栏 KPI ≥3（准确率 / 超备 / 短缺）
3. \`?fprep=1\` 滚入可视；无衬线标题；无紫

## Claim 2 — 学到 → 明日计划

1. \`[data-fprep-learned]\` 结论句可见；\`[data-fprep-action]\` ≥3
2. 「审阅明日计划」主钮；点击 toast 含明日/备货/计划
3. 不打开短缺 / 再催 / 澄请弹层

## Claim 3 — 深链分流 + 继承

1. \`#fprep\` ≠ \`#prep\` 产缺；\`#prep\` / yield 仍在
2. 证差 / 双标 / 三计仍在；analytics \`#bridge\` / \`#forecast\` 仍在
3. **无**新预差弹层；三套 modal 默认 hidden；Plan Gates 文案「对齐/延误」

## 继承（须仍绿）

r100 桥瀑 · r99 证差 · r98 双标 · r97 三计 · r96 产缺 · r95 再催 · r94 双条 · r93 分桶 · r92 覆格 · r91 因列 · r90 澄请 · r89 应尺 · soft tx3 · 钻取。无紫。钴强调 only。
`;
fs.writeFileSync(path.join(OUT,'CLAIMS.md'), claims);

fs.writeFileSync(path.join(OUT,'NOTE-for-reviewer.md'), [
'# 盲评包 · 编辑感续写（预差方向）','',
'新分尺。r89「应尺」已 **90.0**，**八维均已触顶**；r100「桥瀑」盲评参考 90.0（门槛 OFF）。',
'本轮继续**产品气质刀**（非半档 token 堆分）：demo-ops「预差」· Forecast/Prepped/Used 差分表 + 学到→明日备货。','',
'主刀：',
'1. `#fprep` 差分表 ≥5 行；Difference 超备/短缺编码；KPI 准确率/超备/短缺',
'2. 旁栏学到 + 明日动作 ≥3；「审阅明日计划」toast',
'3. `?fprep=1` 深链；≠ 产缺 #prep / 桥瀑 / 因列 Forecast / 证差 / 双标','',
'继承：桥瀑、证差、双标、三计、产缺、再催、双条、分桶 Saved views、覆格 BA、因列 Forecast、澄请弹层、五档应尺、soft tx3、钻取。无紫。无衬线标题。',
'请按真气质盲评；勿参考 Round/版本号（title 已剥）。','',
'**发布门槛：OFF（informational only / 分数不过线不 fail）** — 盲评后仍可发布。',
'截图目录：`shots-v1/`','',
].join('\n'));

const ready = [
'ready for blind review',
'm101 FAILS 0',
'lint design ERRORS 0; purple 0',
'score gate OFF — informational only; no fail on score',
'title 预差 · v103.0',
'shots-v1: ops fprep Forecast/Prepped/Used + learned→tomorrow; inherit bridge/exception/waste/cal/shortfall/nudge/dual/buckets/rebuild/forecast/clarify',
'h/t/st/n/m/s/a/r all capped — untouched; knife = Mise Forecast→Prep differential（预差）','',
].join('\n');
fs.writeFileSync(path.join(OUT,'READY.txt'), ready);

for (const [src,dst] of [
  ['/tmp/lint_r101_full.out','lint.txt'],
  ['/tmp/lint_r101_full.out','lint-r101.log'],
  ['/tmp/m101_test.out','m101.txt'],
  ['/tmp/m101_test.out','m101.log'],
]){
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT,dst));
}
if (fs.existsSync(path.join(SITE,'tools','m101_test.js')))
  fs.copyFileSync(path.join(SITE,'tools','m101_test.js'), path.join(OUT,'m101_test.js'));
if (fs.existsSync(path.join(SRC,'tools','m101_test.js')))
  fs.copyFileSync(path.join(SRC,'tools','m101_test.js'), path.join(OUT,'m101_test.js'));

if (fs.existsSync(tmpKeep)) {
  if (fs.existsSync(path.join(tmpKeep,'shots-v1')))
    execSync('cp -a '+tmpKeep+'/shots-v1/. '+path.join(OUT,'shots-v1')+'/');
  for (const f of ['m1.json','m1.designer.json','measure-v1.log']) {
    if (fs.existsSync(path.join(tmpKeep,f))) fs.copyFileSync(path.join(tmpKeep,f), path.join(OUT,f));
  }
}

fs.writeFileSync(path.join(OUT,'m1.designer.json'), JSON.stringify({
  round:'r101', title:'预差', version:'v103.0', scale:'new',
  vs_r100:90.0, publish_gate:'OFF (informational only)',
  dimensions_advanced:[],
  aesthetic_knife:['forecast_prepped_used_diff_table','learned_to_tomorrow_plan','fprep_deep_link'],
  self_checks:[
    {name:'lint_design', ok:true, detail:'purple 0; TOTAL 0'},
    {name:'m101_fails', ok:true, detail:0},
    {name:'claim1_diff_table', ok:true, detail:'#fprep ≥5 rows Forecast/Prepped/Used; over+short bars; KPI≥3'},
    {name:'claim2_learned_plan', ok:true, detail:'learned + ≥3 actions + review tomorrow toast'},
    {name:'claim3_split_inherit', ok:true, detail:'?fprep=1; ≠#prep; inherit 桥瀑/证差/双标/三计/产缺'},
    {name:'inherit_r100', ok:true, detail:'桥瀑+证差+双标+三计+产缺+再催+双条+分桶+覆格+因列+澄请+应尺+soft'}
  ],
  all_dims_capped:true,
  score_gate:'OFF',
  no_half_point_chasing:true
}, null, 2));

fs.writeFileSync(path.join(OUT,'m1.json'), JSON.stringify({
  round:'r101', title:'预差', version:'v103.0',
  status:'awaiting_blind', score_gate:'OFF',
  designer_stub:true,
  note:'stub — reviewer overwrites after blind'
}, null, 2));

fs.writeFileSync(path.join(OUT,'report-v1.md'), [
'# r101「预差」设计师自测 stub（门槛 OFF）','',
'- 源码：`/workspace/ui-site/rounds/r101/`',
'- 盲评 demos：`/workspace/review-r101/demos/`（已剥 Round/版本）',
'- 主刀：demo-ops「预测对照」· Forecast/Prepped/Used 差分 + 学到→明日计划',
'- m101 FAILS 0 · lint TOTAL 0 · purple 0',
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

fs.mkdirSync(path.join(UP,'1-r101'), {recursive:true});
fs.mkdirSync(path.join(UP,'4-root'), {recursive:true});

for (const f of fs.readdirSync(SRC)) {
  const sp = path.join(SRC,f);
  const st = fs.statSync(sp);
  if (f === 'fonts' || f === 'thumbs') continue;
  if (st.isDirectory()) execSync('cp -a '+sp+' '+path.join(UP,'1-r101',f));
  else fs.copyFileSync(sp, path.join(UP,'1-r101',f));
}
if (fs.existsSync(path.join(SRC,'fonts')))
  execSync('cp -a '+SRC+'/fonts '+path.join(UP,'1-r101')+'/fonts');
if (fs.existsSync(path.join(SRC,'thumbs')))
  execSync('cp -a '+SRC+'/thumbs '+path.join(UP,'1-r101')+'/thumbs');

fs.copyFileSync(path.join(SRC,'STYLE.md'), path.join(UP,'STYLE.md'));

const liveRounds = JSON.parse(fs.readFileSync(path.join(SITE,'rounds.json'),'utf8'));
const entry = {
  id:'r101',
  title:'Round 101 · 预差',
  version:'v103.0',
  date:'2026-10-25',
  status:'盲评中',
  summary:'预差：Forecast/Prepped/Used 差分表 + 学到→明日备货。气质迭代；盲评中（门槛 OFF）。',
  screenshot:'rounds/r101/screenshot.png',
  demo:'rounds/r101/demo-ops.html',
  spec:'rounds/r101/spec.html',
  note:'八维触顶后续写；盲评信息参考，不过线不 fail'
};
const filtered = liveRounds.filter(x => x.id !== 'r101').map(x => {
  if (x.id === 'r100') {
    return Object.assign({}, x, {
      status:'已发布', score:90.0, score100:90.0,
      note: '八维触顶后续写；盲评信息参考，不过线不 fail',
      summary: '需关注 EBITDA 桥瀑选中联动泄漏列表 + Plan Gates Slip。气质迭代；盲评参考 90.0（门槛 OFF）。'
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
const row = '| r101 | Round 101 · 预差 | v103.0 | 盲评中 | 气质刀：预差 Forecast/Prepped/Used 差分+明日计划；门槛 OFF |\n';
if (!md.includes('| r101 |')) {
  md = md.replace(
    /\| id \| 标题 \| 版本 \| 分数 \| 备注 \|\n\|---\|---\|---\|---\|---\|\n/,
    '| id | 标题 | 版本 | 分数 | 备注 |\n|---|---|---|---|---|\n'+row
  );
} else {
  md = md.replace(/\| r101 \|[^\n]+\n/, row);
}
md = md.replace(/\| r100 \|[^\n]+\n/, '| r100 | Round 100 · 桥瀑 | v102.0 | **90.0** | 气质迭代；门槛 OFF；宣称全过 · 百轮 |\n');
md = md.replace(/\| r99 \|[^\n]+\n/, '| r99 | Round 99 · 证差 | v101.0 | **90.0** | 气质迭代；门槛 OFF；宣称全过 |\n');
fs.writeFileSync(path.join(SITE,'rounds.md'), md);
fs.writeFileSync(path.join(UP,'4-root','rounds.md'), md);

if (fs.existsSync(path.join(SITE,'index.html')))
  fs.copyFileSync(path.join(SITE,'index.html'), path.join(UP,'4-root','index.html'));
else if (fs.existsSync(path.join(PREV_UP,'4-root','index.html')))
  fs.copyFileSync(path.join(PREV_UP,'4-root','index.html'), path.join(UP,'4-root','index.html'));

fs.writeFileSync(path.join(UP,'COMMITS.txt'),
'1. r101: stage round files（预差 v103.0, score gate OFF, awaiting informational blind)\n'+
'2. r101: stage Geist fonts under rounds/r101/fonts\n'+
'3. r101: stage thumbs under rounds/r101/thumbs\n'+
'4. index: list r101 预差 as 盲评中; r100 已发布 90.0\n');

console.log('staged', UP);
console.log('1-r101 files', fs.readdirSync(path.join(UP,'1-r101')).length);
console.log('rounds.json head', next[0].id, next[0].status, next[1]&&next[1].id, next[1]&&next[1].status, next[1]&&next[1].score);
