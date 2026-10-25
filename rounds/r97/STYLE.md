# Round 97 · 三计 · v99.0

编辑感续写。r96「产缺」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：demo-ops **任务日历** 月历格项目色左边条 + 页头 due / overdue / upcoming 三计。区别于 r96 产缺底席、r95 再催、r90 澄请、r94 双条、r93 分桶、r92 覆格。r71–r96 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶 · r94 双条 · r95 再催 · r96 产缺
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- 变更放行「请求澄清」弹层 + 600s 撤销横幅（r90）
- 预测页有符号驱动 → Forecast 收束（r91）
- 排班重建成功横幅 + 45s 限时撤销 + Before/After 半小时覆格（r92）
- 需关注 Saved views 分桶 + Required/Document 双进度（r93–r94）
- AI 催办底席「再次催办」+ Based on ≥2（r95）；≠ 澄请弹层
- 备货产出 Expected/Actual 产缺条 + 短缺底席双 CTA（r96）；≠ 再催/澄请

## 本轮主张「三计」

八维满分后继续气质迭代。主刀落在 **demo-ops「任务日历」**：月历格内任务以**项目色左边条**归属；页头 **due / overdue / upcoming** 三计摘要。参考 @zahragr8r 任务日历信息结构（`refs/x-2026-10-24-d/zahra-cal.jpg`），**不**抄深色皮肤与紫色项目色；浅色编辑感；无消费向软胶囊。

### 1. 三计摘要

- `#cal` 章节；`.cal-summary` 含 due today / overdue / upcoming 计数芯片
- Deep link `?cal=1` 滚入章节
- 芯片可点高亮对应 `data-kind` 任务（可选交互）

### 2. 月历格 · 项目色左边条

- `.cal-grid` 周一至周日；今日格钴底 + 日号环
- `.cal-task` 药丸：左侧 3px `.cal-bar` 取项目色（ops 钴 / sched 青 / prep 钢 / chg 琥珀）
- 图例 `.cal-legend` ≥4 项目；**无紫**

### 3. 与既有弹层分流

- 日历本身**不**引入新 modal；点击任务仅 toast
- 保留 `#shortfallModal` / `#nudgeModal` / `#clarifyModal` 三套弹层互不合并

## Token

见 `app.css` `:root`。主题键 `r97-theme` / `window.r97theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/m97_test.js` → FAILS 0
- `node tools/lint_r97.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- 静态紫 0
