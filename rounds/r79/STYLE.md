# Round 79 · 句差 · v81.0

编辑感续写。r78「回链」过线（77.5）；本轮针对三条中项：**soft 真降档（≠ mid）**、**趋势衔接用字形「—」**、**回链独占一行给呼吸**。r71–78 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清：选中后索引只留当前一条（max-h 44）· `.ord-ed` 编辑 digest · 趋势入 `.drill-ess`
- r78 回链：`.index-back`「返回索引」+#i-back 钴标 · tx2/600；digest lead/mid/soft 分阶骨架；趋势无「趋势」标签
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫

## 本轮主张「句差」

句级落差要可读：总领 / 从读 / 附注三档字阶分明；从句用真破折号；回链不挤在标题行。

### 1. soft 真降档（对 r78 中项①）

`.as-digest .ord-ed.soft` 相对 `.mid` 必须可见降档（不能只靠更短文案）：

- **lead**：标题 15/600 tx1 · 正文 13/tx1 · 底线
- **mid**：标题 13/500 tx2 · 正文 12/tx3
- **soft**：标题 **12/400 tx3** · 正文 **12/400 tx3**（字号与字重均低于 mid）

中间条显式 `.ord-ed.mid`；soft 选择器不再被 mid 规则盖住字号。

### 2. 趋势字形「—」（对 r78 中项②）

`.ph0.trend-join` 写入真破折号 `—`（不再空 span + 1px 占位条）：

- 显示为行内文字：字号随 trend（13）、色 tx3、字重 400
- 取消 `.ph0` 的 width/height/font-size:0 条形伪装
- 仍挂 `.ph0`，满足「裸 — 须在 .ph0 内」；lint 对 `.trend-join` 验字形而非条色

### 3. 回链独占一行（对 r78 中项③）

选中旁注态，`.index-back` 不再与「告警索引」挤同一标题行：

- `.index-h` wrap；回链 `flex-basis:100%` 落到下一行
- 字阶抬到 **13/600**（仍低于章节 `ch-title` 22，不抢章题）
- 与上方静默标签用 `--s3` 行距分开，左侧对齐，不 `margin-left:auto` 贴边

## Token（不变）

见 `app.css` `:root`。主题键 `r79-theme` / `window.r79theme`。

## 自检

- `node tools/lint_r79.js` → ERRORS 0
- `node tools/m79_test.js` → FAILS 0
