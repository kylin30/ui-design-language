# Round 95 · 再催 · v97.0

编辑感续写。r94「双条」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：需关注 **AI 催办底席**（再次催办 + Based on 证据链），区别于 r90「澄请」问询弹层。r71–r94 成果全部继承（双条、分桶 Saved views、排班覆格、澄请弹层、因列 Forecast、五档应尺、soft tx3、filt flex+edm+ink.on 等）。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶 · r94 双条
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- digest `.ord-ed` grid 金额真列 · soft 同号 13/500·**tx3** · mid/lead **tx1** · 共右缘
- 回链悬停墨线下划 1.5px / offset 3 / tx2@88%（位收）
- 索引 `.ed-m .stt` 去壳 + 芯片位收回
- 钻取选中仍显塌缩 `.ed-m` + 缩略筛条（mute/search/grow 藏）；筛选 `.on` 墨线；缩略条 idle 齐 32（余位）
- 折叠/索引/筛条·芯片/金额列五档断点应尺（r89）
- 变更放行「请求澄清」弹层 + 600s 撤销横幅（r90）
- 预测页有符号驱动 → Forecast 收束（r91）
- 排班重建成功横幅 + 45s 限时撤销 + Before/After 半小时覆格（r92）；`?rebuild=1` 首屏滚入 `#schedule`
- 需关注 Saved views 分桶（全部/Nudge/Escalate）+ %/Blocked by + Urgent（r93）
- Required vs Document 双进度条 + 缺口芯片（r94）；窄档「开放项」nowrap + ellipsis，并带 `title` 全文明示

## 本轮主张「再催」

八维满分后继续气质迭代。主刀落在 **demo-ops「需关注」**：Nudge/Urgent CTA 打开编辑感 **AI 催办底席**，非通用 admin modal 壳，亦非 r90 澄请问询。参考 2026-10-24 Vetted 催办模态 / 移动端 Nudge 底席（`refs/x-2026-10-24-d/vetted-3.jpg`、`refs/x-2026-10-24-c/vetted-3.jpg`）。浅色编辑感；深色不学。

### 1. CTA 打开底席

- Urgent「催办法务」与 4 行 Nudge「催办」均 `data-open-nudge`（升级钮仍瞬时 toast）
- `.modal.nudge` + `#nudgeScrim` 同屏；标题「再次催办」；Deep link `?nudge=1`

### 2. Based on 证据链

- `.nudge-based` 钴浅底；标题含「Based on」+ spark
- `[data-ev]` **≥2** 条可测证据（签署日 / 逾期日 / 目标日）
- 草稿区预填 + `.ai-badge`「AI 已起草」

### 3. 再次催办发送（异于澄请 600s）

- 主钮「再次催办」`data-send-nudge`：关底席 + toast，**不**触碰 `#undoBanner`（澄请 `data-undo-sec=600`）
- 「两日后再次提醒」开关默认 on · 钴轨（Remind again）
- 次钮「取消」/ scrim / Esc 关闭

## Token

见 `app.css` `:root`。主题键 `r95-theme` / `window.r95theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/m95_test.js` → FAILS 0
- `node tools/lint_r95.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- 静态紫 0
