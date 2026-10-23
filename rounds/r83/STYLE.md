# Round 83 · 金列 · v85.0

编辑感续写。r82「悬明」过线（80.5）；**hierarchy/theme 已双触顶**，本轮禁半档字重堆分。三条刀：**digest 金额真列对齐（数字/结构维）**、**回链悬停编辑可见（动效维）**、**≤1280 金额列收宽（响应维）**。r71–82 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫

## 本轮主张「金列」

摘要金额从句内散文抽出，落成跨行共右缘的真列；回链悬停用钴下划线+图标微移，目视可辨——增量落 **numerals / structural / motion / responsiveness**，不碰 h/t 天花板。

### 1. digest 金额真列（对 r82 中项① · **numerals + structural**）

r82 在句内 `.num.dec` 上设 `min-width`，跨行右缘落差 ≈174px，不是列：

- `.as-digest .ord-ed` → `display:grid; grid-template-columns:minmax(0,1fr) 10.5ch`
- 正文进 `.ord-ed-main`；金额进 `.ord-ed-amt`（标签「实付」+ `.num.dec`）
- 同列宽 + `text-align:right` / `align-items:flex-end` → 三条金额 **共右缘**
- 整数仍 tx1/500 tabular；`.ccy` / `.frac` 仍 tx3/400

### 2. 回链悬停编辑可见（对 r82 中项③ · **motion**）

r82 hover 色升可测但目视偏克制：

- 默认透明下划线；`:hover` → `text-decoration-color:var(--accent)` + 文色 tx1
- 图标 `translateX(-2px)` + 钴色；`--d-hover` 过渡
- `prefers-reduced-motion` 取消位移与过渡

### 3. ≤1280 金额列收宽（**responsiveness**）

窄屏 `grid-template-columns: … 9.5ch` + 略收 column-gap，右缘对齐不变。

## Token（不变）

见 `app.css` `:root`。主题键 `r83-theme` / `window.r83theme`。

## 自检

- `node tools/lint_r83.js` → ERRORS 0
- `node tools/m83_test.js` → FAILS 0
