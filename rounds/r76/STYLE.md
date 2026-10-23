# Round 76 · 一焦 · v78.0

编辑感续写。r75 过线（74.0）；本轮针对三条中项：**索引收旁注（单焦点）**、**digest 主位 / 表次级折叠**、**短报 ess+趋势（去图、步骤默认收）**。r71–75 成果全部继承。

## 继承（勿回退）

- 轨 72 · 无顶搜 · 3 章开章 + ch-open/figs · panel.open 去墙
- 详情无 tile.kpi → read-figs · 章间/figs/filt/tray 去壳线
- 字控 filt · grp.ed · 无 sparkline · quiet 时间 · ch-head tabs 出 panel · ch-note + note-figs · 无 alert.warn
- 字阶 22/15/13/12 · 页边 32@≥1280 · 辅文 12·tx3 · 钴蓝点缀 · 无紫
- `.stt.act` → info（非 accent-bg）
- R74：`.ch-flow.drill` 永远 column · `.ch-index` + `.drill-pane` · `.ch-table.sum` · `.stt.exc.quiet` 无虚线
- R75：索引墨线选中 · `.brief` · `.as-digest` · 续读结论先行

## R76 本轮

### 1. 索引收旁注（一焦）

- `.ch-flow.drill:has(.li.on)`：有选中时索引收成旁注
- `.list` max-height **112**（原 280）；非选中行降透明、藏 brief/meta；筛条淡化；索引 tray 隐藏
- 选中行保持墨线 + brief；主焦让给下方短报

### 2. 订单：digest 主位

- `.as-digest` 仍为售后主路径
- 全量表包进 `<details class="tbl-sec">` **默认折叠**；summary「展开全量订单表」
- 展开后表仍为 `.ch-table.sum` 五列语法（宽屏时间/渠道）

### 3. 短报再短

- 去掉 `.drill-viz` 图；改为 `.drill-trend` 一行趋势旁注
- `.drill-more` 改为 `<details>` **默认折叠**（处理经过）
- 默认可见：`.drill-ess`（结论 + read-figs + meta）+ `.drill-trend`
- kicker：「续读 · 一焦」

## 主题

- `localStorage` key：`r76-theme`
- 函数：`r76theme()` / `window.r76theme`

## 门禁

- `node tools/lint_r76.js` → TOTAL 0
- `node tools/m76_test.js` → FAILS 0
- 盲评包：`/workspace/review-r76/`（标题剥 Round/版本）
- 暂存：`/workspace/up76/`（不发布）

## 明确不做

- 不改数据模型 / 路由
- 不引入紫 / 不回 accent 态底
- 不恢复左右双栏 ops / 不恢复 sparkline / 不恢复虚线异常盒
- 不恢复索引 `accent-bg` 整行高亮
- 不让 digest 与表默认同权并立
