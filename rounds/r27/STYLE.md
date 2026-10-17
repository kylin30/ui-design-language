# 后台设计语言 v29.0 · Round 27「素净」

R26「平整」58 分（和 R25 一样），批注「总是有不干净的感觉」（在 demo-crm.html 提交）。R27 先在 6 个演示首屏上数视觉噪音（见 clean.md），再把 R22–R26 叠出来的 7 个样式文件合成**唯一一份 `app.css`**，一套令牌，按每屏噪音预算删减。结构（页头一句结论 → 指标面板 → 工作面板，列表按紧急程度分段）、控件全平、鸢尾、Geist 数字、只用无衬线，全部保留。

## 原则
1. 两种面：浅灰画布 `--color-bg` + 白面板 `--color-surface`（1px `--color-line`，圆角 12，无投影）。面板里不再套浅灰块；选中行、悬停是唯一的面内底色。
2. 一种线色 `--color-line`：只给面板外框、表格行、吸底操作栏和页签下的分隔。列表行、KPI 格、面板内分区都用留白，不画线。
3. 三级文字灰，级差拉开：`--color-text` #17171C · `--color-text-secondary` #55555F · `--color-text-tertiary` #73737E（L* 8 / 37 / 49）。`--color-muted` #CFCFD6 只给图表灰柱和禁用。
4. 字号五档：28 KPI · 24 页标题 · 16 面板标题 · 14 正文 · 13 说明；12 只给坐标轴和快捷键。字重 400 / 500 / 600（Geist 没有 450、700）。
5. 一条左边缘：面板内边距 24，标题、正文、表格首列、图表坐标都从这里起；间距用 8 的倍数（4 只用于标签内部）。
6. 不带信息的装饰不放：KPI = 标签 + 数字 + 一句话；不放迷你趋势线、分段条、进度条；头像只给当前用户。
7. 一个强调色：鸢尾只给主按钮、选中、焦点、链接；红色只给异常，每个指标块最多一处；不用绿色表示涨。
8. 同一件事只标一次：状态列标了“超时”，等待天数就用普通文字。
9. 控件全平（R26）：纯色主按钮、1px 次按钮、浅色底轻按钮；投影只给菜单、⌘K、提示、Toast。

## 每屏噪音预算（1440×900 首屏）
| 项 | 预算 |
|---|---|
| 可见线条（同坐标首尾相接算一条） | ≤ 40，表格页 ≤ 48 |
| 线色 | 1 |
| 面板里的底色块 | 0 |
| 文字样式（字号 × 字重） | ≤ 12 |
| 字号 / 字重 | ≤ 6 / 3 |
| 图标尺寸 | 1（16） |
| 只差 1–3px 的行首左边缘 | 0 |
| 圆角 | 8（控件）/ 12（面板、浮层）+ 圆点 |
| 截断 | 0 |
| 截图带色面积 | ≤ 5% |

检查：`node tools/noise.js r27 iris`、`node tools/noise_lines.js r27`、`python3 tools/imgnoise.py`（需要本地 http.server 8811）。

## 令牌（app.css :root，iris）
| 令牌 | 值 |
|---|---|
| --color-bg / --color-surface / --color-line | #F4F4F6 / #FFFFFF / #E6E6EB |
| --color-text / -secondary / -tertiary / --color-muted | #17171C / #55555F / #73737E / #CFCFD6 |
| --color-primary / -hover / -active | #6246EA / #5236D9 / #4329BF |
| --color-danger | #C42B3F |
| --color-selected / --color-hover | 主色 7% / 文字色 4% |
| --r-ctl / --r-panel | 8 / 12 |
| --h-ctl / --h-ctl-sm / --h-top / --w-side | 32 / 28 / 56 / 240 |
| --pad / --gap / --sec | 24 / 24 / 32 |
| --t | 120ms（只过渡颜色和边） |

主题：iris（默认）、cobalt、lake、graphite、daylight、coral 只换画布、主色和红；midnight 换整套面、线、文字（画布 #0B0C10，面板 #15171C，线 #262931）。主题切换器和反馈面板用的旧令牌名在 app.css 末尾统一映射到上面这几个。

## 字体
只用无衬线：汉字、字母走系统黑体；数字用自托管的 Geist（`fonts/`，unicode-range 只覆盖数字和符号），tabular-nums；Geist Mono 只给代码。

## 文件
- `app.css`：唯一的样式表（令牌 + 外壳 + 组件 + 主题）。演示页只加载它、`theme-switcher.css` 和反馈面板。
- `demo*.html`：6 个演示，由 `tools/build_r27.py` 从 R26 页面生成（换样式表、删装饰、改内联样式）。
- `spec.html`：规范，新增「素净」一章（噪音预算、八条对 / 错、前后计数）；`reference-tokens.css` 只给规范页的示例用。
- `clean.md`：噪音计数、逐页批注、参照计数、改动、自查记录；`clean/*.png` 是 R26 / R27 并排图，`clean/noise.json` 是原始数据。
