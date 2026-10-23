# Round 81 · 热收 · v83.0

编辑感续写。r80「节让」过线（79.0，仅 +0.5）；本轮针对三条中项做**真编辑刀**，避开半档字重堆分：**soft 标题/正文真色阶**、**mid 标题抬深**、**回链热区收至内容宽**。r71–80 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清：选中后索引只留当前一条（max-h 44）· `.ord-ed` 编辑 digest · 趋势入 `.drill-ess`
- r78 回链：`.index-back`「返回索引」+#i-back 钴标 · digest lead/mid/soft 分阶骨架；趋势无「趋势」标签
- r79 句差：soft 相对 mid 真降档 · 趋势字形「—」· 回链独占下一行
- r80 节让：节标 13/600 tx2 主位 · 回链 12/500 tx3 · mid/soft 正文 tx2/tx3
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫

## 本轮主张「热收」

热区收到内容宽；块内墨色真分开——标题与正文不再同色同阶，从读与附注各有主从。

### 1. soft 标题/正文真色阶（对 r80 中项①）

`.ord-ed.soft` 不再只靠 500 vs 400 同色字重：

- soft 标题 **12/500 tx2**（原同色 tx3）
- soft 正文 **12/400 tx3**
- 块内色阶真差（tx2→tx3），非半档字重

### 2. mid 标题抬深（对 r80 中项②）

`.ord-ed.mid` 标题不再与正文同色 tx2：

- mid 标题 **13/600 tx1**（原 13/500 tx2）
- mid 正文仍 **12/400 tx2**
- 标题更深更重，块内主从可读

### 3. 回链热区收至内容宽（对 r80 中项③）

选中旁注态，`.index-back` 不再满行空热区：

- 节标 `.index-h > h2` 加 `flex:0 0 100%` 逼回链换行（独占下行继承）
- 回链改为 `flex:0 0 auto` + `width:max-content` + `align-self:flex-start`
- 点击热区 ≈「← 返回索引」内容宽；字阶仍 12/500 tx3，钴仅图标

## Token（不变）

见 `app.css` `:root`。主题键 `r81-theme` / `window.r81theme`。

## 自检

- `node tools/lint_r81.js` → ERRORS 0
- `node tools/m81_test.js` → FAILS 0
