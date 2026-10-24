# Round 87 · 筛显 · v89.0

编辑感续写。r86「显旁」过线（87.0）；**hierarchy / theme / status 已触顶**，本轮禁半档字重与状态堆分。三条刀：**钻取仍显缩略筛条（状态可及性 / motion）**、**soft 金额色锁 tx2（numerals）**、**缩略藏 mute/search 保旁注焦点（structure）**。r71–86 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · soft 同号 13/500 · 共右缘（金列/列稳）
- 回链悬停墨线下划 1.5px / offset 3 / tx2@88%（位收）
- 索引 `.ed-m .stt` 去壳 + 芯片位收回（位收）；索引尺幅 40rem@≤1280 / 56rem@≥1600
- 钻取选中仍显塌缩 `.ed-m`；筛选 `.on` 墨线编辑态；折叠 64/72/80（显旁）

## 本轮主张「筛显」

显旁把旁注与墨线筛选做实了，但钻取态仍把整条 `.bar.filt.text` `display:none`——默认首屏看不见墨线选中；soft 金额色抽检偶见 tx1。本轮让缩略筛条与旁注同屏可证，并锁 soft 金额到 tx2——增量落 **accessibility of states / motion / numerals / structure**，不碰 h/t/st 天花板；折叠尺幅继承不动。

### 1. 钻取筛显（对 r86 中项① · **a11y of states / motion**）

r78/r86 在有 `.li.on` 时把索引筛条整条藏掉 → 墨线 `.on` 须回索引或临时显条才得证：

- 钻取选中时 `.bar.filt.text` 仍 **`display:flex`** · `opacity:1`（盖过 R78 `display:none`）
- `.txt.on` 仍为 tx1·600 + 常驻墨线 1.5/3 @ tx2 88%；钴仅 `.btn.pri`
- 默认首屏：墨线选中与塌缩旁注**同屏可证**
- 折叠列表尺幅 64/72/80 **不改**（筛条在 list 外）

### 2. soft 金额色锁（对 r86 中项② · **numerals**）

`.as-digest .num.dec` 基线 tx1；soft 虽有降档规则，抽检偶见 tx1：

- `.as-digest .ord-ed.soft .ord-ed-amt .num.dec` → **`color: var(--tx2)`** · 13/500 · tabular · 右齐
- 币符/小数 `.ccy`/`.frac` 仍 **tx3**
- mid/lead 金额仍 **tx1**（色阶分离可证）
- 同列同号、共右缘继承金列/列稳

### 3. 缩略保焦（**structure**）

筛条重显不得抢旁注焦点：

- 钻取态藏 `.txt.mute` / `.txt-search` / `.grow`，只留主芯片
- 旁注 `.ed-m` 仍 flex；`aria-current` / `aria-pressed` 继承

## Token（不变）

见 `app.css` `:root`。主题键 `r87-theme` / `window.r87theme`。

## 自检

- `node tools/lint_r87.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- `node tools/m87_test.js` → FAILS 0
