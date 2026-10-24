# Round 88 · 余位 · v90.0

编辑感续写。r87「筛显」过线（88.5）；**hierarchy / theme / status / numerals / motion 已触顶**（h15 / t15 / st10 / m10 / n10），本轮禁半档字重、状态与数字阶堆分。两条刀：**钻取缩略筛条放宽余位（spacing / alignment）**、**soft↔mid 金额感知色距（alignment）**。r71–87 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · soft 同号 13/500 · 共右缘（金列/列稳）
- 回链悬停墨线下划 1.5px / offset 3 / tx2@88%（位收）
- 索引 `.ed-m .stt` 去壳 + 芯片位收回；索引尺幅 40rem@≤1280 / 56rem@≥1600
- 钻取选中仍显塌缩 `.ed-m` + 缩略筛条（mute/search/grow 藏）；筛选 `.on` 墨线；折叠 64/72/80

## 本轮主张「余位」

筛显把缩略筛条与 soft tx2 锁做实了，但钻取筛条 `min-height:28` 偏紧，soft/mid 金额虽分 token 目视仍近。本轮把缩略条余位对齐 idle 32，并把 soft 金额再降一阶到 tx3——增量落 **spacing / alignment**，不碰 h/t/st/m/n 天花板。

### 1. 缩略筛条余位（对 r87 中项① · **spacing / alignment**）

- 钻取态 `.bar.filt.text` 仍 `display:flex` · `opacity:1`（不回退藏条）
- `min-height:32px`（盖过 R87 的 28，与 idle `.bar.filt.text` 同尺）
- 顶 pad `var(--s1)` + 底 `var(--s2)`，给墨线 offset 留余位
- 缩略芯片 `inline-flex` · 高 20 / 行高 20，垂直居中于 32 条
- mute / search / grow 仍藏；`.txt.on` 墨线 1.5/3 @ tx2 88% 继承；折叠 64/72/80 不改

### 2. soft↔mid 金额色距（对 r87 中项② · **alignment**，非 numerals 抬分）

n 已触顶，禁再堆字号/字重。只拉开色阶感知：

- soft `.ord-ed-amt .num.dec` → **`color: var(--tx3)`** · 仍 13/500 · tabular · 右齐
- soft `.ccy`/`.frac` 仍 **tx3**（与数字同阶安静）
- mid/lead 金额仍 **tx1**（实色，相对 soft 目视拉开）
- 同列同号、共右缘继承金列/列稳

## Token（不变）

见 `app.css` `:root`。主题键 `r88-theme` / `window.r88theme`。

## 自检

- `node tools/lint_r88.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- `node tools/m88_test.js` → FAILS 0
