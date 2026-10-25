# Round 93 · 分桶 · v95.0

编辑感续写。r92「覆格」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：Needs attention 队列 Saved views 分桶（Nudge / Escalate）+ 完成% + Blocked by 角色 + Urgent 卡。r71–r92 成果全部继承（五档应尺、soft tx3、澄请弹层、因列 Forecast、排班覆格、filt flex+edm+ink.on 等）。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格
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

## 本轮主张「分桶」

八维满分后继续气质迭代。主刀落在 **demo-ops「需关注」**：供应商入驻 Needs attention 队列按责任方分桶。参考 2026-10-24 Vetted onboarding（`refs/x-2026-10-24-d/vetted-*.jpg`）。轻编辑感，非通用 admin filter 壳。

### 1. Saved views 分桶条（主刀）

- `.na-seg`：全部 / 催办 Nudge / 升级 Escalate；带计数
- 点选后 `data-na-bucket` 切换；行 `data-bucket` 过滤；`[data-na-visible]` 同步
- Deep link：`?attention=1` / `?na=1` 滚入；`?bucket=nudge|escalate` 预筛

### 2. 完成% + Blocked by

- 每行显 `[data-row-pct]` + `%` + 迷你进度条；`[data-row-blocked]` 文案以 **Blocked by** 起头（Legal / Security / Finance / Compliance / Vendor）
- Urgent 卡同构：大号 `%` + `Blocked by Legal` 胶囊 + 钴进度轨

### 3. Urgent 卡 + 行内 CTA

- `.na-urgent`：sunken + 钴左边框编辑感优先卡；默认可见；筛 Escalate 时隐藏（实体属 Nudge）
- Nudge 行：次要「催办」；Escalate 行：危险「升级」

## Token（不变）

见 `app.css` `:root`。主题键 `r93-theme` / `window.r93theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/lint_r93.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- `node tools/m93_test.js` → FAILS 0
- 盲评分仅信息性；**不要求 >90.0** 即可发布
