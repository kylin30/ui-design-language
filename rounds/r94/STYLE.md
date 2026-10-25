# Round 94 · 双条 · v96.0

编辑感续写。r93「分桶」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：入驻合规 **Required vs Document 双进度条**直接编码缺口。r71–r93 成果全部继承（分桶 Saved views、排班覆格、澄请弹层、因列 Forecast、五档应尺、soft tx3、filt flex+edm+ink.on 等）。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · soft 同号 13/500·**tx3** · mid/lead **tx1** · 共右缘
- 回链悬停墨线下划 1.5px / offset 3 / tx2@88%（位收）
- 索引 `.ed-m .stt` 去壳 + 芯片位收回
- 钻取选中仍显塌缩 `.ed-m` + 缩略筛条（mute/search/grow 藏）；筛选 `.on` 墨线；缩略条 idle 齐 32（余位）
- 折叠/索引/筛条·芯片/金额列五档断点应尺（r89）
- 变更放行「请求澄清」弹层 + 600s 撤销横幅（r90）
- 预测页有符号驱动 → Forecast 收束（r91）
- 排班重建成功横幅 + 45s 限时撤销 + Before/After 半小时覆格（r92）；`?rebuild=1` 首屏滚入 `#schedule`
- 需关注 Saved views 分桶（全部/Nudge/Escalate）+ %/Blocked by + Urgent（r93）

## 本轮主张「双条」

八维满分后继续气质迭代。主刀落在 **demo-ops「需关注」**：合规证件 Required vs Document **双进度条**编码缺口。参考 2026-10-24 Vetted 移动端证书行（`refs/x-2026-10-24-d/vetted-2.jpg`）。轻编辑感，非通用 admin progress 壳。

### 1. 双轨可见（主刀）

- 每行与 Urgent 卡均含 `.na-dual`：上下两轨 `data-dual-track=req|doc`
- Required 轨钴填充；Document 轨在缺口时 `--bad`，齐平时 `--ok`
- Deep link：`?attention=1` / `?na=1` 滚入（继承分桶）

### 2. Required / Document 数值

- 行与 Urgent：`data-req` / `data-doc` / `data-gap`；文本 `[data-dual-req]` / `[data-dual-doc]`
- Urgent 固定 **Required 100 · Document 60 · gap 40**
- 六行固定对：100/60、100/70、100/85、100/45、100/30、100/50

### 3. 缺口编码

- `data-gap = req − doc`；gap>0 时 Document 条带 `.gap`，Urgent 显 `.na-gap-chip`「缺口 40pp」
- ≤1023：「开放项」`.na-open` nowrap + ellipsis，避免折行挤动作列

## Token（不变）

见 `app.css` `:root`。主题键 `r94-theme` / `window.r94theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/lint_r94.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- `node tools/m94_test.js` → FAILS 0
- 盲评分仅信息性；**不要求 >90.0** 即可发布
