# Round 82 · 悬明 · v84.0

编辑感续写。r81「热收」过线（79.5，仅 +0.5）；**hierarchy/theme 已双触顶**，本轮禁半档字重堆分。三条刀：**回链 hover 特异性（动效维）**、**soft 真字号台阶**、**digest 金额等宽律（数字维）**。r71–81 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫

## 本轮主张「悬明」

悬停色升真可见；soft 块内字号台阶落地；摘要金额按等宽律排齐——增量落 **motion / numerals**，不碰 h/t 天花板。

### 1. 回链 hover 特异性（对 r81 中项① · **motion**）

`.index-back:hover` 曾被 `.ch-flow.drill:has(.li.on) .index-back` 盖住，色停在 tx3：

- 补 `.ch-flow.drill:has(.li.on) .index-back:hover{color:var(--tx1)}`
- 图标 hover 仍钴：`.…:hover .ic{color:var(--accent)}`
- `transition:color var(--d-hover)`（120ms）；`prefers-reduced-motion` 降为 none

### 2. soft 真字号台阶（对 r81 中项②）

`.ord-ed.soft` 不再标题/正文同为 12：

- soft 标题 **13/500 tx2**（原 12/500 tx2）
- soft 正文仍 **12/400 tx3**
- 块内字号台阶（13→12）+ 色阶（tx2→tx3）；非半档字重

### 3. digest 金额等宽律（**numerals** · 换维）

`.as-digest .num.dec` 作编辑体金额位：

- `min-width:8.5ch` + `tabular-nums` / `tnum+lnum`
- 整数墨色 **tx1/500**；`.ccy` / `.frac` 降为 **tx3/400**
- 扫描 lead/mid/soft 三条时金额列视觉对齐，非 pad/gap 灌分

## Token（不变）

见 `app.css` `:root`。主题键 `r82-theme` / `window.r82theme`。

## 自检

- `node tools/lint_r82.js` → ERRORS 0
- `node tools/m82_test.js` → FAILS 0
