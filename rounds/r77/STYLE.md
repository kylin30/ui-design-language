# Round 77 · 旁清 · v79.0

编辑感续写。r76 过线（75.5）；本轮针对三条中项：**旁注单条清场**、**digest 编辑短句（非迷你表）**、**趋势并入 ess 第二句**。r71–76 成果全部继承。

## 继承（勿回退）

- 轨 72 · 无顶搜 · 3 章开章 + ch-open/figs · panel.open 去墙
- 详情无 tile.kpi → read-figs · 章间/figs/filt/tray 去壳线
- 字控 filt · grp.ed · 无 sparkline · quiet 时间 · ch-head tabs 出 panel · ch-note + note-figs · 无 alert.warn
- 字阶 22/15/13/12 · 页边 32@≥1280 · 辅文 12·tx3 · 钴蓝点缀 · 无紫
- `.stt.act` → info（非 accent-bg）
- R74：`.ch-flow.drill` 永远 column · `.ch-index` + `.drill-pane` · `.ch-table.sum` · `.stt.exc.quiet` 无虚线
- R75：索引墨线选中 · `.brief` · `.as-digest` · 续读结论先行
- R76：有选中时索引收旁注 · digest 主位 / `details.tbl-sec` 默认折叠 · 去 `.drill-viz` · `.drill-more` 默认折叠

## R77 本轮

### 1. 旁注单条清场

- `:has(.li.on)` 时：非选中行 / 分组标题 / 筛条 **全部隐藏**（不再半透明双行竞视）
- `.list` max-height **44**（单行）
- 选中行压成单行：藏 `.brief` / `.m.ed-m`，只留标题 + 侧时；墨线保留
- `.index-back`「全部告警」露出，可清选回索引

### 2. digest 编辑短句

- `.ord-ed` 改为块级编辑体：标题行 + 一句条款；去掉右侧金额/状态列
- 金额与状态写入条款句内；行间靠 gap，不靠表格式分割线
- 总领一句 `.as-digest-lede`（可选）

### 3. 趋势入 ess

- `.drill-trend` 移入 `.drill-ess`，紧随 `.concl` 作第二句
- 字阶升至 13/tx1，避免被关键数盖过
- kicker：「续读 · 旁清」

## 主题

- `localStorage` key：`r77-theme`
- 函数：`r77theme()` / `window.r77theme`

## 门禁

- `node tools/lint_r77.js` → TOTAL 0
- `node tools/m77_test.js` → FAILS 0
- 盲评包：`/workspace/review-r77/`（标题剥 Round/版本）
- 暂存：`/workspace/up77/`（不发布）

## 明确不做

- 不改数据模型 / 路由
- 不引入紫 / 不回 accent 态底
- 不恢复左右双栏 ops / 不恢复 sparkline / 不恢复虚线异常盒
- 不恢复索引 `accent-bg` 整行高亮
- 不让 digest 与表默认同权并立
- 不恢复旁注双行竞视 / 不恢复游离薄趋势行抢 ess
