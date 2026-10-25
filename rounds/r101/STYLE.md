# Round 101 · 预差 · v103.0

编辑感续写。r100「桥瀑」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：demo-ops **预差**：Forecast / Prepped / Used 差分表 + 学到→明日备货动作线。区别于 r100 桥瀑、r99 证差、r98 双标、r97 三计、r96 产缺（Expected/Actual 产缺条）、r95 再催、r91 因列 Forecast。r71–r100 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶 · r94 双条 · r95 再催 · r96 产缺 · r97 三计 · r98 双标 · r99 证差 · r100 桥瀑
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- 变更放行「请求澄清」弹层 + 600s 撤销横幅（r90）
- 预测页有符号驱动 → Forecast 收束（r91）
- 排班重建成功横幅 + 45s 限时撤销 + Before/After 半小时覆格（r92）
- 需关注 Saved views 分桶 + Required/Document 双进度（r93–r94）
- AI 催办底席「再次催办」+ Based on ≥2（r95）；≠ 澄请弹层
- 备货产出 Expected/Actual 产缺条 + 短缺底席双 CTA（r96）；≠ 再催/澄请
- 任务日历项目色左边条 + due/overdue/upcoming 三计（r97）；芯片文案中文化（到期/逾期/即将）
- 损耗分析单位 kg + 金额 ¥ 双主指标并列；侧栏异常仅红徽标（r98）
- 证差决议：Critical 胶囊 + 证据差分 + Recommended 单选 +「为何排第一」旁栏（r99）
- EBITDA 桥瀑：瀑布柱选中联动泄漏列表 + Plan Gates 延误红描边（r100）；关口文案中文化（对齐/延误）

## 本轮主张「预差」

八维满分后继续气质迭代。主刀落在 **demo-ops「预测对照」**：Mise Forecast→Prep 式 **Forecast / Prepped / Used 差分表**；Difference 用琥珀超备条 / 红短缺条编码；旁栏 **学到了什么** + **明日备货**动作列表与「审阅明日计划」CTA。参考 @nizamdesign Mise Forecast vs actual（`refs/x-2026-10-25-b/nizam-forecast-prep.jpg`），**不**抄紫 AI 英雄卡与衬线大标题；浅色编辑感；钴强调准确率与 CTA。

### 1. 差分表 · Forecast / Prepped / Used

- `#fprep` 章节；`[data-fprep-tbl]` 含 ≥5 行；列含 Forecast / Prepped / Used / Difference / 潜在损耗
- Difference：`.fprep-diff.over` 琥珀条、`.fprep-diff.short` 红条；无紫
- 顶栏问题式 KPI：预测准确率 / 超备 / 短缺

### 2. 学到 → 明日计划

- `[data-fprep-learned]` 结论句 + 迷你柱；`[data-fprep-actions]` ≥3 条编辑动作
- 「审阅明日计划」主钮 → toast；无新弹层
- Deep link `?fprep=1` 滚入章节

### 3. 分流 + 轻量中文关口

- ≠ `#prep` 产缺条、`#shortfallModal`、`#bridge` 桥瀑、`#forecast` 因列、`#waste` 双标、`#exception` 证差
- analytics Plan Gates：On track→对齐、Slip→延误（继承红描边）

## Token

见 `app.css` `:root`。主题键 `r101-theme` / `window.r101theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/m101_test.js` → FAILS 0
- `node tools/lint_r101.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- 静态紫 0
