# Round 74 · 钻取 · v76.0

编辑感续写。r73 越过 ~70（71.5）；本轮针对三条中项：**ops 双区钻取 → 单列续读**、**订单宽表 → 摘要少列**、**异常虚线徽章 → 字色安静**。r71–73 成果全部继承。

## 继承（勿回退）

- 轨 72 · 无顶搜 · 3 章开章 + ch-open/figs · panel.open 去墙
- 详情无 tile.kpi → read-figs · 章间/figs/filt/tray 去壳线
- 字控 filt · grp.ed · 无 sparkline · quiet 时间 · ch-head tabs 出 panel · ch-note + note-figs · 无 alert.warn
- 字阶 22/15/13/12 · 页边 32@≥1280 · 辅文 12·tx3 · 钴蓝点缀 · 无紫
- `.stt.act` → info（非 accent-bg）

## R74 本轮

### 1. 单列续读（拆双区）

- ops 第二章：`.ch-flow.drill` **永远** `flex-direction:column`（含 ≥1440）
- 左栏改为 `.ch-list.ch-index` + `.index-h`「告警索引」；右栏改为 `.read.drill-pane` + `.drill-kicker`「续读 · 处置报告」
- 选中后滚动进续读窗（任意宽度，见 `app.js`）
- lede：「下方续开处置报告」

### 2. 订单摘要表

- `.ch-table.sum`：panel 开敞去墙；表头 12·tx3
- 「支付」列 → `fit show-wide`（默认 ≤1520 隐藏，宽屏再出）
- 「售后」列头改为「状态」（语义收束）
- 章 lede：「先扫摘要，宽屏再展开支付列」
- 常规 `.stt` 去壳底/边；异常靠字色 + 行首色条

### 3. 安静异常

- 列表/详情/表：`.stt.exc.quiet`（及 `.stt.exc` 覆盖）**无虚线边、无 bad-bg**；保留定高 28 与定宽对齐
- 图例 `.legend-st .exc` 改实心圆点

## 主题

- `localStorage` key：`r74-theme`
- 函数：`r74theme()` / `window.r74theme`

## 门禁

- `node tools/lint_r74.js` → TOTAL 0
- `node tools/m74_test.js` → FAILS 0
- 盲评包：`/workspace/review-r74/`（标题剥 Round/版本）
- 暂存：`/workspace/up74/`（不发布）

## 明确不做

- 不改数据模型 / 路由
- 不引入紫 / 不回 accent 态底
- 不恢复左右双栏 ops / 不恢复 sparkline / 不恢复虚线异常盒
