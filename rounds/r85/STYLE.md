# Round 85 · 位收 · v87.0

编辑感续写。r84「列稳」过线（84.0）；**hierarchy/theme 已双触顶**，本轮禁半档字重堆分。三条刀：**回链墨线加可见度（动效维）**、**索引状态收芯片占地（状态维）**、**筛选墨线手势 + 1280↔1600 索引尺幅（动效/响应维）**。r71–84 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · soft 同号 13/500 tx2 · 共右缘（金列/列稳）
- 回链悬停墨线下划（非钴）+ 图标微移（列稳）

## 本轮主张「位收」

墨线下划要能读出编辑手势；索引状态去壳后还要收回芯片占位，让 metrics 行真塌缩；筛选条复用墨线手势，宽窄屏索引尺幅分阶——增量落 **motion / status / responsiveness**，不碰 h/t 天花板。

### 1. 墨线加可见度（对 r84 中项① · **motion**）

r84 墨线 `tx2@72%` × 1px 目视偏淡，编辑手势主要靠图标位移：

- `:hover` / `:focus-visible` 下划线仍 **非 accent**（禁链蓝）
- `text-decoration-color: color-mix(tx2 88%, transparent)`（自 72% 抬）
- `text-decoration-thickness: 1.5px`；`text-underline-offset: 3px`
- 图标仍钴色 + `translateX(-2px)`；`prefers-reduced-motion` 取消位移

### 2. 状态位收（对 r84 中项② · **status**）

r84 `.ed-m .stt` 透明无边，但仍 height=28 / padL≈12 占芯片位：

- `.ch-index .ed-m .stt` → `height:auto` · `min-height:0` · `min-width:0` · `padding:0` · `gap:var(--s1)`
- 与 `.brief` 同行高 16；图标 12×12 贴文
- `.ed-m` 自身 `margin-top:var(--s1)` · `gap:var(--s2)` · `align-items:baseline` → metrics 行塌缩为旁注句

### 3. 筛选墨线 + 索引尺幅（**motion + responsiveness**）

- `.bar.filt.text .txt` 悬停/焦点复用墨线手势（非 `.on` 仍 tx 阶；`.on` 保持钴文色、下划透明以免链蓝）
- `@media (max-width:1279.98px)` → 索引 / 钻取窗 `max-width:40rem`；列表 `max-height:240px`
- `@media (min-width:1600px)` → 索引 / 钻取窗 `max-width:56rem`；列表 `max-height:360px`
- 金额列断点（9.5 / 10.5 / 11.5ch）继承不变

## Token（不变）

见 `app.css` `:root`。主题键 `r85-theme` / `window.r85theme`。

## 自检

- `node tools/lint_r85.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- `node tools/m85_test.js` → FAILS 0
