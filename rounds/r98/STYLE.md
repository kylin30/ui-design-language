# Round 98 · 双标 · v100.0

编辑感续写。r97「三计」盲评参考 **90.0**（门槛 OFF）。本轮继续**气质迭代、不要求分数过线**——产品刀：demo-ops **损耗分析** 单位 + 金额双主指标并列；侧栏异常徽标仅例外标红。区别于 r97 三计日历、r96 产缺、r95 再催、r94 Required/Document 双进度、r93 分桶、r92 覆格、r91 因列、r90 澄请。r71–r97 成果全部继承。

## 继承（勿回退）

- rail72 · chapter stream · drill column · tbl-sec 默认折叠 · quiet stt
- r77 旁清 · r78 回链 · r79 句差 · r80 节让 · r81 热收 · r82 悬明 · r83 金列 · r84 列稳 · r85 位收 · r86 显旁 · r87 筛显 · r88 余位 · r89 应尺 · r90 澄请 · r91 因列 · r92 覆格 · r93 分桶 · r94 双条 · r95 再催 · r96 产缺 · r97 三计
- 字阶：页标题 22/600 · 节 15/600 · 正文 13 · 次级 12·tx3
- 页边 32@≥1280 · 节距 28 · 钴色 `#1F5FD1` 仅作强调 · 少硬边 · Geist 等宽数字 · 无紫
- 变更放行「请求澄清」弹层 + 600s 撤销横幅（r90）
- 预测页有符号驱动 → Forecast 收束（r91）
- 排班重建成功横幅 + 45s 限时撤销 + Before/After 半小时覆格（r92）
- 需关注 Saved views 分桶 + Required/Document 双进度（r93–r94）
- AI 催办底席「再次催办」+ Based on ≥2（r95）；≠ 澄请弹层
- 备货产出 Expected/Actual 产缺条 + 短缺底席双 CTA（r96）；≠ 再催/澄请
- 任务日历项目色左边条 + due/overdue/upcoming 三计（r97）；芯片文案中文化（到期/逾期/即将）

## 本轮主张「双标」

八维满分后继续气质迭代。主刀落在 **demo-ops「损耗分析」**：**单位（kg）与金额（¥）双主指标**并列为同等英雄数字——不是某一 KPI 下的次级说明。侧栏计数徽标：**仅异常标红**，其余中性。可选 分析/趋势/日志 分段。参考 @nizamdesign Mise Waste 信息结构（`refs/x-2026-10-24-b/nizam-waste-*.png`），**不**抄衬线大标题与紫色；浅色编辑感；钴强调。

### 1. 双主指标

- `#waste` 章节；`.waste-dual` / `[data-waste-dual]` 含两个 `.waste-hero`
- 单位卡 `[data-waste-unit]`：**84 kg**；金额卡 `[data-waste-money]`：**¥12,840**
- 两卡字号/字重同级（hero），互不为 caption
- Deep link `?waste=1` 滚入章节

### 2. 侧栏异常徽标 + 分段

- `.nav .cnt.exc` / `[data-anomaly]`：**红底**仅用于例外（告警）
- 其余 `.nav .cnt` 保持中性 tx3，不套红
- `.waste-view` 分段：分析 / 趋势 / 日志（默认分析）

### 3. 与既有章节分流

- 损耗分析**不**引入新 modal；≠ `#cal` 三计、`#shortfallModal` / `#nudgeModal` / `#clarifyModal`
- 无衬线标题；无紫

## Token

见 `app.css` `:root`。主题键 `r98-theme` / `window.r98theme`。强调色仅钴 `#1F5FD1`（浅）/ `#6B93F0`（深）。无紫。

## 自检

- `node tools/m98_test.js` → FAILS 0
- `node tools/lint_r98.js` → ERRORS 0（设计；title Round 泄漏不计过门）
- 静态紫 0
