# R25「质感」· 调研笔记 craft.md

> 起点：R24「回正」得了 55 分（R23 是 40 分）。Xiang 的批注是「少一点高级感、质感、设计感。」可读性和分组这两项已经过关。
> 本轮目标：R24 的结构一律不动（KPI 面板、分组列表、画布上放面板），只在上面加一层统一的「材质」。要让人觉得做工细，同时不降低可读性。
> 文件位置：材质层是 `material.css`，最后加载。参照截图在 `refs/`，只作内部比对，不上传。比对图在 `craft/`。

## 1. 参照来源，以及我实际量到的数值

| 产品 | 来源 | 可以直接用的具体做法 |
|---|---|---|
| **Linear（2024 改版）** | linear.app/now/how-we-redesigned-the-linear-ui（part II）；changelog 2024-03-20 "A new Linear UI" | 主题变量从 98 个砍到 3 个输入：base、accent、contrast，在 LCH 里生成。层级只靠黑 / 白透明度叠加，不另外取色。品牌蓝从界面框架里退出。浅色模式的正文更深。侧栏和页头去掉噪音。**实测 refs/linear-\*.png（深色）**：画布 #08090A，面板 #101112–#161718，面板顶边亮一阶，为 #1B1C1D–#202122，也就是"内高光"。 |
| **Vercel Geist** | vercel.com/geist/materials；vercel.com/geist/colors | 材质分级：base 和 small 用圆角 6；medium 和 large 用 12；menu 和 modal 用 12；fullscreen 用 16。阴影和遮罩用 gray-alpha。原话 "Keep material shadows translucent"：阴影不透明会带出一圈灰晕。数字用 label-13 tabular。动效 150ms ease。**实测 refs/vercel-summary.png**：画布 #FAFAFA，面板 #FFF，描边 #E9E9E9 / #EEEEEE，页头带 #FAFAFA，几乎看不出阴影。 |
| **Stripe Dashboard** | docs.stripe.com/elements/appearance-api（官方 Tab / Input 默认值） | 发丝描边 #E0E6EB。默认阴影 `0 1px 1px rgba(0,0,0,.03), 0 3px 6px rgba(18,42,66,.02)`：两层，第二层带一点海军蓝墨色。选中态再叠一圈 `0 0 0 2px primary`。**实测 refs/stripe-invoices.png**：行线 #E9ECF0，按钮描边 #C0C3C9，金额右对齐等宽，币种灰一阶。 |
| **Attio** | attio.com 产品页截图 | **实测 refs/attio-table.png**：画布 #F3F4F6，白色面板**不描边**，只靠底色差区分。行线 #EEEFF1，按钮环 #EEEFF1。头像是圆形渐变色块。 |
| **Raycast** | raycast.com/blog "A fresh look and feel"（2022） | 所有图标遵守同一套描边宽度和圆角规则。用键帽（keycap）表达快捷键。浮层是"发丝环 + 内高光 + 大而软的投影"。 |
| **Mercury** | mercury.com 产品页 / 品牌稿 | 字重落在 regular 和 medium 之间（约 420 / 480）。金额是排版的主角，用 tabular figures。卡片圆角 12、内边距 24，描边很淡。全站只有一个靛蓝。 |
| **Ramp** | ramp-ds.vercel.app（表格组件）；adminlte.io/blog/fintech-dashboard-design-examples（2026 分析） | 工作流优先，审批队列比装饰图表重要。高对比浅色。字重单一，层级靠字号和字距。表格 13–14px，等宽数字。 |
| **Retool（新主题）** | docs.retool.com/changelog/shadows；docs.retool.com/changelog/theme-editor；retool.com/blog/q1-2025-release | 主题阴影只给 low / medium / high 三档预设，这和我们 e1–e3 的思路一致。颜色、字体、度量都做成 token。 |
| **Arc** | thebrowser.company 公开截图（未实测像素） | 内容区是嵌在有色外框里的一块圆角"纸"。外框可以有颜色，内容纸保持中性。只借用"面板浮在画布上"这个关系，不借渐变外框。 |
| **Height** | height.app 公开截图（产品已于 2025 停运，未实测） | 命令面板和菜单的浮层做得精致：发丝环加大软投影，选中行是浅色填充而不是描边。 |
| **社区 / X** | @jh3yy（2026-09-17，约 1.9k 赞）："reminder: ease your gradients… crisper details, softer fades"；Sean Geng《Buttons with real depth》；designforai btn-212 | 渐变加缓动停点，不用线性两点。按钮分三层：环境影 + `0 0 0 1px` 环 + `inset 0 1px 0` 高光。阴影透明度压低，悬停只提亮，按下 translateY(1px)。**说明**：在 X 搜 "premium SaaS UI details" 基本只返回营销号和提示词贴，可用的只有点名设计师账号这一类。Dribbble 作品多是概念稿，阴影偏重，只作反例参考。 |

## 2. 提炼出的技术，以及是否采用

| # | 技术 | 采用？ | R25 的落点 |
|---|---|---|---|
| 1 | 画布带一点色调，面板纯白，靠底色差分层 | ✅ | iris 画布 #F5F5F8（介于 Vercel 的 #FAFAFA 和 Attio 的 #F3F4F6 之间，带一丝鸢尾紫）。面板 #FFF。 |
| 2 | 面板不用实色描边，改用"透明度发丝环 + 两层极软投影" | ✅ | `--m-e1`：`0 0 0 1px text·8%` + `0 1px 2px ink·4%` + `0 2px 6px -2px ink·5%`。描边改成 transparent。 |
| 3 | 阴影用带色墨水，不用纯黑 | ✅ | `--m-ink: 24,20,46`（深紫灰），对应 Stripe 的海军蓝墨、Geist 的"半透明阴影"。 |
| 4 | 透明度描边，做出"0.5px 的感觉" | ✅ | 面板内的分隔线用 `--m-line-soft`（文字色 5.5%）。行线 #EEEDF3。全站没有 2px 以上的描边。 |
| 5 | 圆角阶梯 | ✅ | 标签 6 / 控件 7 / 内嵌井 9 / 面板 12 / 浮层 14。外层圆角大于内层，同心关系成立。 |
| 6 | 内高光（顶边亮一阶） | ✅ 深色为主 | 浅色主按钮用 `inset 0 1px 0 rgba(255,255,255,.22)`。midnight 面板用 `inset 0 1px 0 rgba(255,255,255,.04)`（对应 Linear 的 #1B1C1D 顶边）。 |
| 7 | 大数字收紧字距，单位降一级 | ✅ | KPI 数字 −0.03em + tnum。单位用 500 字重、三级灰。h1 −0.022em。 |
| 8 | 等宽数字 | ✅ | 金额、数量、时间一律 `tabular-nums`。金额小数部分透明度 .55。 |
| 9 | 字重对比 | ✅ 有限制 | 自托管的 Geist 只有 400 / 500 / 600 三个字重文件，做不到 Mercury 那种 450 / 550。改用"600 标题 / 500 标签 / 400 正文 + 灰阶"来拉开层次。 |
| 10 | 次要色调降饱和 | ✅ | 状态色只出现在点、字、2px 线上。KPI 标签降为三级灰。 |
| 11 | 品牌标记用微渐变 | ✅ | 品牌块 28px，鸢尾色自上而下约 12% 的渐变，加内高光。旁边是工作区名、副标题（华东一区 · 企业版）和 ↕ 切换器。 |
| 12 | 图标统一 1.5 描边 | ✅ | `.ico{stroke-width:1.5}`。面包屑和切换器的 chevron 使用同一套描边。 |
| 13 | 精致的焦点环 | ✅ | 双环：`0 0 0 2px surface, 0 0 0 4px primary·45%`。环与控件之间留出一圈底色缝隙。 |
| 14 | 微交互 | ✅ | 统一 150ms `cubic-bezier(.2,.7,.2,1)`。可点卡片悬停时 e1 升到 e2。按钮按下 translateY(.5px)。没有弹跳、没有缩放。 |
| 15 | 趋势线配鸢尾渐变 | ✅ 克制 | 只用在"趋势本身就是信息"的 KPI 上（今日已办、平均处理时长、恢复时间、我的今日审核）。84×28，1.5px 线，渐变用缓动停点（.18 → .10@30% → .035@60% → 0），终点画一个小圆。 |
| 16 | 图表 | ✅ | 面积渐变改为缓动停点。区域条形图收细到 6px 胶囊，轨道用 text·6%。提示框用 e3。 |
| 17 | 分段控件 | ✅ | 底部是凹槽（text·5%），选中项是浮起的滑块（surface + e1），和 Linear / Vercel 同一做法。 |
| 18 | 空状态、头像 | ✅ | 空状态图标放进带井色的圆角块。头像用渐变底加 inset 发丝环。 |
| 19 | 浮层 | ✅ | 下拉、命令面板、Toast 用 e3，圆角 12 / 14。 |
| 20 | 顶栏滚动后出现发丝线 | ✅ | `.top.scrolled`：不滚动时没有线，避免多一条无意义的线。 |
| ✗ | 毛玻璃 / backdrop-blur 大面积使用 | ❌ | 会降低文字对比，也是"模板感"的来源。只保留顶栏原有的 82% 不透明。 |
| ✗ | 噪点纹理、霓虹描边、彩色光晕 | ❌ | 属于噱头，不符合"彩色只给动作和状态"。 |
| ✗ | shadcn zinc 外观（纯中性灰 + 黑主按钮 + 6px 实线框） | ❌ | 我们保留鸢尾主色、带色画布和带色阴影墨。 |
| ✗ | 衬线标题 | ❌ | 只用无衬线。 |
| ✗ | 大阴影卡片（Dribbble 常见） | ❌ | 见规范页"过度"示例：阴影 ≥ 20% 时面板像在飘，表格反而难读。 |

## 3. 材质令牌（规范页「质感」章有正误对比）

| 令牌 | iris 值 | midnight 值 | 用途 |
|---|---|---|---|
| `--color-bg` | #F5F5F8 | #0B0C10 | 画布 |
| `--color-surface` | #FFFFFF | #14161B | 面板 |
| `--m-line` | text 8% | rgba(255,255,255,.075) | 面板环 |
| `--m-line-soft` | text 5.5% | rgba(255,255,255,.05) | 面板内分隔 |
| `--m-line-strong` | text 11% | rgba(255,255,255,.11) | 控件环 |
| `--m-e0` | 1px 环 | 同 | 井、表头 |
| `--m-e1` | 环 + 0 1px 2px .04 + 0 2px 6px −2px .05 | 内高光 .04 + 环 + 黑影 .35 / .55 | 面板 |
| `--m-e2` | 环 + 0 2px 4px .05 + 0 8px 20px −6px .10 | — | 可点卡片悬停 |
| `--m-e3` | 环 + 0 4px 8px .06 + 0 16px 40px −8px .18 | 内高光 .06 + 环 .09 + 0 16px 48px −8px .7 | 菜单、命令面板、提示 |
| 圆角 | 6 / 7 / 9 / 12 / 14 | 同 | 标签 / 控件 / 井 / 面板 / 浮层 |
| 动效 | 150ms cubic-bezier(.2,.7,.2,1) | 同 | 所有 hover / focus |

## 4. 三轮比对记录（craft/）

- **第 1 轮（材质令牌）**：加 material.css。去掉实线描边，改成 e1。画布 #F5F5F8。主按钮加渐变和高光。KPI 加趋势线。
  - 结论：已经比 R24 细，但放在 Vercel / Attio 旁边还是偏"平"，控件环比参照重。图标 1.6 描边比文字重。
- **第 2 轮**：控件环 13% → 11%（接近 Attio 的 #EEEFF1）。图标统一 1.5。品牌块改成工作区切换器（名称、副标题、↕）。面包屑用 chevron。KPI 标签降为三级灰。提示框改用 e3。
  - 图：`pass1-2-demo.png`（R24 / 第 1 轮 / 第 2 轮）、`vs-stripe-p2.png`、`vs-vercel-attio-p2.png`、`vs-linear-dark-p2.png`。
- **第 3 轮**：分段控件改成凹槽加滑块。区域条形图收细成 6px 胶囊。midnight 的蓝灰减半（画布 #0B0C10、面板 #14161B），向 Linear 的近中性黑靠，同时保留「星蓝」身份。
  - 图：`r24-vs-r25.png`、`detail-r24-vs-r25.png`、`vs-vercel-p3.png`、`vs-stripe-p3.png`、`vs-attio-p3.png`、`vs-linear-dark-p3.png`。
  - 结论：放在 Vercel / Stripe / Attio 之间，面板的分层方式、描边重量、数字排版处于同一档。midnight 面板的顶边高光和 Linear 一致。
- **可读性复查**：6 个页面的字数、按钮数、彩色块数和 R24 持平（彩色块 1–4 个）。正文和次要文字的颜色没有变浅，只有 KPI 标签从二级灰降到三级灰，旁边的大数字承担识别。

## 5. 没做、留给下一轮的

- 字重 450 / 550：需要可变字重的 Geist 文件，目前自托管的只有 400 / 500 / 600。
- 图表悬停十字线和数值跟随：属于交互，不是材质，留到下一轮。
