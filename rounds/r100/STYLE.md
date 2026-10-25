# Round 100 · 桥瀑 · v102.0

编辑感续写。r99「证差」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：demo-analytics **EBITDA 桥瀑**：瀑布柱选中联动泄漏/驱动列表；轻量 Plan Gates Slip 红描边。区别于 r99 证差决议、r98 损耗双标、r97 三计日历、r96 产缺、r95 再催、r94 Required/Document 双进度、r93 分桶、r92 覆格、r91 因列 Forecast。r71–r99 成果全部继承。里程碑 r100。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶 · r94 双条 · r95 再催 · r96 产缺 · r97 三计 · r98 双标 · r99 证差
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
- 证差决议：Critical 胶囊 + 证据差分 + Recommended 单选 +「为何排第一」旁栏（r99）；Recommended 仅保留默认「推荐」一标（去 AI 建议叠标）

## 本轮主张「桥瀑」

八维满分后继续气质迭代。主刀落在 **demo-analytics「EBITDA 桥瀑」**：Financials Bridge 式 **瀑布柱**（营收 → 销货成本 → 人工超支 → 运营费用 → 损耗 → 其他收入 → EBITDA）；**点选一步**，旁侧 **泄漏/驱动列表**按 `data-leak-for` 筛选。可选轻量 **计划关口**表，一行 **Slip 红描边**。参考 @nizamdesign Financials Bridge / Plan Gates（`refs/x-2026-10-24-c/nizam-fin-*.jpg`），**不**抄紫渐变与衬线大标题；浅色编辑感；钴强调选中柱。

### 1. 瀑布桥 · 编辑感柱

- `#bridge` 章节；`[data-bridge-plot]` 含 ≥6 步（含营收总量与 EBITDA 收束）
- 扣减柱中性/钴灰（`--c3`），增加柱软绿，总量柱钴；选中 `.on` 钴描边
- 无紫渐变；无衬线标题

### 2. 选中联动泄漏列表

- `[data-bridge-leak-list]` 行带 `data-leak-for="<step>"`；默认选中 `labor`
- 点击 `[data-bridge-step]` 切换：仅匹配行可见；标题/合计同步
- Deep link `?bridge=1` 滚入章节

### 3. 分流 + 轻量 Plan Gates

- ≠ `#exception` 证差、`#waste` 双标、`#forecast` 因列、双进度、覆格热力
- `[data-bridge-gates]` 可选：一行 `.slip` 红描边 + Slip 胶囊；不引入新 modal

## Token

见 `app.css` `:root`。主题键 `r100-theme` / `window.r100theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/m100_test.js` → FAILS 0
- `node tools/lint_r100.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- 静态紫 0
