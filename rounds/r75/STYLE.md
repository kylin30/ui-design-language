# Round 75 · 短续 · v77.0

编辑感续写。r74 过线（73.0）；本轮针对三条中项：**索引行编辑化**、**摘要表再轻 / 售后叙事**、**续读 pane 缩短**。r71–74 成果全部继承。

## 继承（勿回退）

- 轨 72 · 无顶搜 · 3 章开章 + ch-open/figs · panel.open 去墙
- 详情无 tile.kpi → read-figs · 章间/figs/filt/tray 去壳线
- 字控 filt · grp.ed · 无 sparkline · quiet 时间 · ch-head tabs 出 panel · ch-note + note-figs · 无 alert.warn
- 字阶 22/15/13/12 · 页边 32@≥1280 · 辅文 12·tx3 · 钴蓝点缀 · 无紫
- `.stt.act` → info（非 accent-bg）
- R74：`.ch-flow.drill` 永远 column · `.ch-index` + `.drill-pane` · `.ch-table.sum` · `.stt.exc.quiet` 无虚线

## R75 本轮

### 1. 索引行编辑化

- `.ch-index .li`：选中态去 `accent-bg` 高亮块 → 左侧墨线旁注（`border-left: 2px solid var(--accent)`；无 accent-bg）
- 行内加 `.brief` 一句结论/处置；`.m` 元信息缩短（去区域赘词）
- 行高略松、侧栏时间更短（「18 分」）

### 2. 摘要表再轻 + 售后叙事

- `.ch-table.sum`：下单时间列亦 `show-wide`（@1280 常显五列：订单 / 客户 / 商品 / 金额 / 状态）
- 章内新增 `.as-digest` 售后双行叙事摘要（表降为次级扫读）
- 常规 `.stt` 在摘要表内 `border:0`（清掉 1px 透明边余噪）

### 3. 续读 pane 缩短

- 结构：`.drill-ess`（结论先行 + read-figs + 精简 meta）→ `.drill-viz`（矮图 120）→ `.drill-more`（`.drill-cap` + 短步骤；渠道分布降级隐藏）
- 垂直节奏收紧；底栏 tray 保持软态
- lede：「点选一条，下方先给结论与关键数」

## 主题

- `localStorage` key：`r75-theme`
- 函数：`r75theme()` / `window.r75theme`

## 门禁

- `node tools/lint_r75.js` → TOTAL 0
- `node tools/m75_test.js` → FAILS 0
- 盲评包：`/workspace/review-r75/`（标题剥 Round/版本）
- 暂存：`/workspace/up75/`（不发布）

## 明确不做

- 不改数据模型 / 路由
- 不引入紫 / 不回 accent 态底
- 不恢复左右双栏 ops / 不恢复 sparkline / 不恢复虚线异常盒
- 不恢复索引 `accent-bg` 整行高亮
