# Round 99 · 证差 · v101.0

编辑感续写。r98「双标」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：demo-ops **证差决议**深页：Critical 胶囊 + 证据差分高亮 + Recommended 单选 +「为何排第一」旁栏。区别于 r98 损耗双标、r97 三计日历、r96 产缺、r95 再催、r94 Required/Document 双进度、r93 分桶、r92 覆格、r91 因列、r90 澄请。r71–r98 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶 · r94 双条 · r95 再催 · r96 产缺 · r97 三计 · r98 双标
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

## 本轮主张「证差」

八维满分后继续气质迭代。主刀落在 **demo-ops「证差决议」**：Clearbill 式异常决议深页——**Critical** 状态胶囊锚定严重度；证据字段 **红/绿软色差分**对照采购单与发票；**Recommended** 单选项给出处置；右侧 **「为何排第一」** 旁栏解释队列优先级。参考 @nizamdesign Clearbill 异常决议（`refs/x-2026-10-24-b/nizam-clearbill.jpg`），**不**抄衬线大标题与紫色；浅色编辑感；钴强调。

### 1. Critical + 证据差分

- `#exception` 章节；`[data-exc-panel]` 含 Critical 胶囊 `[data-exc-critical]`
- `[data-exc-diff]` 证据对照表：相符行软绿/中性，不符行 `bad-bg` + `.hl-bad` 高亮
- 关键字段含增值税号末位差分、金额 +¥4,400

### 2. Recommended 单选 + 确认

- `[data-exc-rec]` / `[data-exc-opts]`：三条单选项，默认「接受更正…」选中（`.exc-opt.on`）
- 「确认决议」→ toast；「稍后处理」→ 推迟 toast
- Deep link `?exception=1` 滚入章节

### 3. 「为何排第一」旁栏 + 分流

- `[data-exc-why]` 旁栏：金额 / 复发 / SLA / 入驻就绪四条优先级理由
- **不**引入新 modal；≠ `#waste` 双标、`#cal` 三计、`#shortfallModal` / `#nudgeModal` / `#clarifyModal`
- 无衬线标题；无紫

## Token

见 `app.css` `:root`。主题键 `r99-theme` / `window.r99theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/m99_test.js` → FAILS 0
- `node tools/lint_r99.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- 静态紫 0
