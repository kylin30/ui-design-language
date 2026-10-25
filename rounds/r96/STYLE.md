# Round 96 · 产缺 · v98.0

编辑感续写。r95「再催」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：demo-ops **备货产出** Expected vs Actual 产缺条 + 短缺底席（建议量 + 双 CTA）。区别于 r90 澄请、r95 再催、r94 双条、r93 分桶、r92 覆格。r71–r95 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶 · r94 双条 · r95 再催
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- 变更放行「请求澄清」弹层 + 600s 撤销横幅（r90）
- 预测页有符号驱动 → Forecast 收束（r91）
- 排班重建成功横幅 + 45s 限时撤销 + Before/After 半小时覆格（r92）
- 需关注 Saved views 分桶 + Required/Document 双进度（r93–r94）
- AI 催办底席「再次催办」+ Based on ≥2（r95）；≠ 澄请弹层

## 本轮主张「产缺」

八维满分后继续气质迭代。主刀落在 **demo-ops「备货产出」**：分段计数 + Expected/Actual 缺口条；短缺时升起**底席**（非居中 modal），建议量 + 调整 / 确认双 CTA。参考 Mise Prep 信息结构（`refs/x-2026-10-24-d/mise-*.jpg`、`refs/x-2026-10-25/nizam-mise-*.jpg`），**不**抄 Mise 皮肤（无衬线大标题、无紫、无消费向软胶囊）。浅色编辑感；深色不学。

### 1. Expected / Actual 产缺条

- `#prep` 章节；分段 To do / In progress / Done 计数
- `.yield-card`：Expected / Actual / 缺口三列数字
- `.yield-bar`：Actual 填充（钴）+ Expected 竖标 + 缺口带（坏色浅）
- Deep link `?prep=1` 滚入章节

### 2. 短缺底席 · 建议量

- `data-open-shortfall` → `#shortfallModal` + `#shortfallScrim` + `body.shortfall-open`
- 底席锚定底部（`.modal.shortfall.sheet`），≠ 居中 `.modal.clarify` / `.modal.nudge`
- 建议补货量（AI 徽章）+ 可调数量

### 3. 双 CTA

- 次钮「调整备货计划」`data-adjust-shortfall`：关席 + info toast
- 主钮「确认补货」`data-confirm-shortfall`：关席 + ok toast（钴主钮）
- `?shortfall=1` 首屏打开底席

## Token

见 `app.css` `:root`。主题键 `r96-theme` / `window.r96theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/m96_test.js` → FAILS 0
- `node tools/lint_r96.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- 静态紫 0
