# Round 92 · 覆格 · v94.0

编辑感续写。r91「因列」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：排班重建成功横幅 + 限时 undo + Before/After 半小时覆盖热力格。r71–r91 成果全部继承（五档应尺、soft tx3、澄请弹层、因列 Forecast、filt flex+edm+ink.on 等）。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · soft 同号 13/500·**tx3** · mid/lead **tx1** · 共右缘
- 回链悬停墨线下划 1.5px / offset 3 / tx2@88%（位收）
- 索引 `.ed-m .stt` 去壳 + 芯片位收回
- 钻取选中仍显塌缩 `.ed-m` + 缩略筛条（mute/search/grow 藏）；筛选 `.on` 墨线；缩略条 idle 齐 32（余位）
- 折叠/索引/筛条·芯片/金额列五档断点应尺（r89）
- 变更放行「请求澄清」弹层 + 600s 撤销横幅（r90）
- 预测页有符号驱动 → Forecast 收束（r91）

## 本轮主张「覆格」

八维满分后继续气质迭代。主刀落在 **demo-ops「排班覆盖」**：重建成功绿浅横幅 + 短时倒计时撤销 + 并排 Before/After 半小时热力格。参考 2026-10-25 Visitly Call-out（nizam-visitly / followthru）。与 r90 澄清撤销（600s）区分——本轮默认 **45s**。

### 1. 重建成功横幅（主刀）

- `.rebuild-banner`：`ok-bg`；结论「当日班次已重建」+ 覆盖计数胶囊
- `data-undo-sec="45"`；`[data-rb-until]` 显「撤销余 mm:ss」并每秒递减
- 动作：`[data-rebuild-undo]` 撤销 · `[data-rebuild-dismiss]` 完成（固定 After）
- Deep link：`?schedule=1` / `?rebuild=1` 自动进入 pending

### 2. Before / After 半小时覆格

- `.hm-ba` 两列；每列 `.hm-grid` **48** 格（24 半小时 × 2 行：拣货/复核）
- 格态：`.cov`（tx1）/ `.done`（neu-s）/ `.need`（bad）/ `.risk`（warn-s）
- Before 默认 **45/48**；After **48/48**（3 缺口填为 cov）
- `data-sch-state`：`idle`（After 淡）· `pending`（双列对照 + 横幅）· `committed`（Before 淡，After 固定）

### 3. 交互收束

- 「重建排班」→ pending + 倒计时
- 撤销 → idle（覆盖回到 Before）
- 完成 / 倒计时到 0 → committed（保留 After）

## Token（不变）

见 `app.css` `:root`。主题键 `r92-theme` / `window.r92theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/lint_r92.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- `node tools/m92_test.js` → FAILS 0
- 盲评分仅信息性；**不要求 >90.0** 即可发布
