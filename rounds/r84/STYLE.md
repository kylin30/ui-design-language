# Round 84 · 列稳 · v86.0

编辑感续写。r83「金列」过线（82.0）；**hierarchy/theme 已双触顶**，本轮禁半档字重堆分。三条刀：**soft 金额列稳不掉队（数字维）**、**回链悬停改墨线下划（动效维）**、**≥1600 列跟手 + 索引状态散文（响应/状态维）**。r71–83 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · 共右缘（金列）

## 本轮主张「列稳」

金额列扫描时 soft 不再因缩到 12 掉队；回链悬停去掉链蓝钴下划，改墨线编辑手势；宽屏列跟手，索引状态改散文旁注——增量落 **numerals / motion / responsiveness / status**，不碰 h/t 天花板。

### 1. soft 金额列稳（对 r83 中项① · **numerals**）

r83 soft 金额随 soft 正文缩到 12，扫列略掉队：

- `.as-digest .ord-ed.soft .ord-ed-amt .num.dec` → 仍 **13/500**（与 mid/lead 同号同列）
- soft 只靠色阶降档：整数 **tx2**；`.ccy` / `.frac` 仍 tx3
- grid 列宽不变 → soft/mid/lead **共右缘**不滑

### 2. 回链墨线悬停（对 r83 中项② · **motion**）

r83 hover 文色 tx1 + 钴下划叠出「链蓝」：

- `:hover` / `:focus-visible` → 文色 tx1；下划线改 **墨线**（`color-mix(tx2 72%, transparent)`），非 `--accent`
- 图标仍钴色 + `translateX(-2px)`；钴只留在图标点缀
- `prefers-reduced-motion` 取消位移与过渡

### 3. 宽屏列跟手 + 索引状态散文（**responsiveness + status**）

- `@media (min-width:1600px)` → 金额列 **11.5ch**（≤1280 仍 9.5ch；默认 10.5ch）；右缘仍齐
- 索引 `.ed-m .stt` 去壳：透明底、无边框，读写态作旁注句（act→info / done→tx3 / risk→warn / exc→bad）

## Token（不变）

见 `app.css` `:root`。主题键 `r84-theme` / `window.r84theme`。

## 自检

- `node tools/lint_r84.js` → ERRORS 0
- `node tools/m84_test.js` → FAILS 0
