# Round 86 · 显旁 · v88.0

编辑感续写。r85「位收」过线（85.5）；**hierarchy / theme / status 已触顶**，本轮禁半档字重与状态堆分。三条刀：**钻取选中仍显塌缩旁注（状态可及性 / structure）**、**筛选选中改墨线编辑态（motion）**、**钻取折叠尺幅随旁注抬高（responsiveness）**。r71–85 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · soft 同号 13/500 tx2 · 共右缘（金列/列稳）
- 回链悬停墨线下划 1.5px / offset 3 / tx2@88%（位收）
- 索引 `.ed-m .stt` 去壳 + 芯片位收回（位收）；索引尺幅 40rem@≤1280 / 56rem@≥1600

## 本轮主张「显旁」

位收把状态旁注塌缩实了，但默认钻取 `.li.on` 把 `.ed-m` 整行藏掉——首屏看不见「旁注句」；筛选 `.on` 仍通篇钴色，与墨线编辑手势分叉。本轮让塌缩旁注在默认选中态可见，筛选选中改墨线，折叠尺幅跟手抬高——增量落 **accessibility of states / motion / responsiveness**，不碰 h/t/st 天花板。

### 1. 钻取显旁注（对 r85 中项① · **a11y of states / structure**）

r85 旁清在有 `.li.on` 时把选中行的 `.m.ed-m` 设为 `display:none`，默认 demo 首条已选 → 塌缩状态只能清选后才见：

- 钻取选中仍 **`display:flex`** 显 `.ed-m`（继承位收塌缩：height/pad/min-width 0，盒高≈行高 16）
- `.brief` 仍藏（旁清清场保留）
- 选中行 `aria-current="true"`；默认首屏即可证「旁注句」
- 不破坏点选/回链 UX

### 2. 筛选墨线选中（对 r85 中项② · **motion**）

r85 `.bar.filt.text .txt.on` 色走 accent、下划透明：

- 选中 → `color: var(--tx1)` · `font-weight: 600`
- 常驻墨线下划：`text-decoration-color: color-mix(tx2 88%, transparent)` · thickness 1.5 · offset 3
- 悬停/焦点同墨线，不回钴
- `aria-pressed="true|false"` 标状态；**钴只留给 `.btn.pri` 等真主按钮**

### 3. 折叠尺幅抬高（**responsiveness**）

旁注重显后，R85 钻取折叠 40/56 不够：

- 基线（1281–1599）：列表 `max-height: 72px`
- ≤1280：`64px`；≥1600：`80px`
- idle 列表高与索引 40/56rem 尺幅继承不变

## Token（不变）

见 `app.css` `:root`。主题键 `r86-theme` / `window.r86theme`。

## 自检

- `node tools/lint_r86.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- `node tools/m86_test.js` → FAILS 0
