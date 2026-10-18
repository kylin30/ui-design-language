# R29 案例库说明（截图私有、不上传；本文件只含文字与来源链接）

> 本轮问题：R28 得 65 分，批注「没有动效和面板组件，单纯的线条分割阅读还是很吃力。」（demo-analytics.html）。
> 所以本轮只研究两件事：**已上线后台怎样用面板 / 卡片分组**，以及**它们的动效用什么时长和曲线**。
> `rounds/r29/cases/` 下截图全部来自公开文档页、公开演示站（Ant Design Pro / Arco Pro 官方预览、shadcn 示例、Tailwind Catalyst 演示），只做内部研究，**不进入上传清单、不在规范页展示**。规范页的对照只用 r29 自己的渲染和文字。
> 采集：2026-10-18 02:00 起（Asia/Shanghai）。实时站点用无头浏览器 1440×900 @2x 截图，并读取计算后样式（背景、圆角、边框、阴影、间距、`transition` / `animation`），原始数据在 `study/measure/*.json`（私有）。文档图用 `tools/lines.py` 和取色读像素。R28 的 43 张案例（Compound、PostHog、June、飞书看板等）仍然有效，这里只补本轮缺的部分。

## 一、面板 / 卡片

| 案例 | 来源 | 画布 | 卡片 | 间距 | 看点 |
|---|---|---|---|---|---|
| vercel-o11y-panels | https://vercel.com/docs/analytics | #FBFBFB / #F7F7F7 | 白、1px 极浅线（≈#EBEBEB）、圆角约 6、无投影，底边多 1px 更深的线（#DCDBDC，等于 1px 投影）。按行文字宽度标定为 2x 图 | 12 | 卡片头 ≈56px：左边是药丸页签（高约 26、选中底 #F2F2F2、页签字 12px），右边是 12px 大写列名；卡片头下一条线；列表行距 32、行内浅灰占比条高约 25、圆角 4，卡片内边距约 10；底部渐隐 +「View All」 |
| vercel-analytics-visitors / vercel-speed-insights / vercel-o11y-tab | https://vercel.com/docs/analytics 、/speed-insights 、/observability | #FBFBFB | 同上 | 12 | 指标格放在图表卡片的头部，点指标切换图表；图表区不画边框 |
| stripe-payments-analytics | https://docs.stripe.com/payments/analytics | 白 | 指标格：1px #D8DEE4、圆角约 6；**选中的指标格用 2px 强调色描边** | 16 | 指标格就是图表的页签——点哪个数，图表就画哪个数；上期用灰色点线 |
| posthog-dashboard-light / -dark | https://posthog.com/docs/product-analytics/dashboards | #F3F4EF（暖灰） | 白、1px #DADBD4、圆角约 5、无投影 | ≈10–12 | 卡片头：10px 大写类型行（TRENDS · LAST 90 DAYS）+ 14/600 标题 + 右侧「Show details」「···」；内容铺满卡片 |
| linear-dashboards / linear-dashboard-bugs / linear-insights | https://linear.app/docs/dashboards 、/insights | #090909（深） | #101012、1px #232325、圆角约 8 | 12–16 | 卡片只有一行 14/500 标题，不加头部分隔线；一个大数字也独占一张卡 |
| supabase-report-memory / -conn | https://supabase.com/docs/guides/telemetry/reports | 白 | #FCFCFC 面板、1px 线 | — | 每个指标一张图表面板，标题 + 当前值 + 图 |
| shadcn-dashboard01（实时） | https://ui.shadcn.com/view/new-york-v4/dashboard-01 | 侧栏 #FAFAFA，主区是一块白色内嵌面板（圆角 14） | 白、1px #E5E5E5、圆角 14、内边距 24 | 16 | KPI 卡：标签 / 大数字 / 右上角趋势徽 / 底部两行说明；图表卡右上角是分段控件 |
| shadcn-dashboard（实时） | https://ui.shadcn.com/examples/dashboard | 白 | 同上 | 16 | 同上 |
| antpro-analysis-live / antpro-workplace（实时，反例为主） | https://preview.pro.ant.design/dashboard/analysis | #F5F5F5 | 白、无边框、圆角 8、三层极淡投影 `0 1px 2px rgba(0,0,0,.03), 0 1px 6px -1px rgba(0,0,0,.02), 0 2px 4px rgba(0,0,0,.02)` | 24 | 分组清楚，但每张卡都是「标题 + 大数字 + 迷你图 + 分隔线 + 底注」，蓝色实心柱和渐变进度条太重 |
| arco-workplace / arco-data-analysis / arco-multi-analysis / arco-search-table（实时，反例为主） | https://vue-pro.arco.design（官方演示账号） | #F2F3F5 | 白、1px #E5E6EB、圆角 2–4 | 16 | 卡片里再套彩色底的指标块、彩色迷你图，层级靠颜色 |
| tremor-blocks（实时） | https://tremor.so/blocks | 白 | 白、1px 线、圆角 8 | 16 | KPI 卡 + 图表卡的标准组合 |
| catalyst-demo（实时，对照） | https://catalyst-demo.tailwindui.com | 白 | **不用卡片**，只用分隔线 | — | 只有 4 个指标 + 1 张表、留白很大，所以线也能读；内容一多（我们的 6 个演示）就不够了 |

### 面板结论
1. **画布比卡片深 2–4%，卡片是白的**：Vercel #FBFBFB/#F7F7F7、PostHog #F3F4EF、Ant #F5F5F5、Arco #F2F3F5、shadcn 侧栏 #FAFAFA。比 R26 以前的灰画布浅，也比 R28 的「一整块白」多出一层底。
2. **卡片边框比投影更常见**：Vercel、PostHog、Linear、shadcn、Tremor、Arco 都用 1px 浅线；只有 Ant 用无边框 + 极淡投影。Vercel 是「1px 线 + 底边略深」，看起来像 1px 投影，但不发虚。
3. **圆角 8–14**，卡片间距 **12–16**（Ant 24 太松）。
4. **卡片头**：14/500–600 标题 + 12px 说明 + 右侧操作；要么在头部下面加一条线（Vercel、PostHog），要么不加线、只用间距（Linear、shadcn）。
5. **一张卡只讲一件事**：一个指标、一张图、一张表、一个列表。指标卡可以当页签用（Stripe 选中描边、Vercel 头部指标）。
6. **卡片里不再套卡片**；卡片内的分组靠小标题和留白，最多一块浅底的「井」。
7. 反例（Ant Pro、Arco Pro）：分组没问题，问题在**卡片内容**：彩色迷你图、渐变进度条、彩色底色块、实心蓝柱。也就是说，卡片要配上 R27 / R28 的「低噪音内容」才干净。

## 二、动效（全部读自实时站点的计算样式，或设计系统文档原文）

| 来源 | 悬停 / 按下 | 小件（菜单、页签、开关） | 中件（展开、Toast、抽屉） | 大件 / 入场 | 曲线 |
|---|---|---|---|---|---|
| Linear 官网（linear.app） | 颜色 100ms | 160ms（filter / transform） | — | 700ms 位移 | `cubic-bezier(.25,.46,.45,.94)`（ease-out quad）；大位移 `cubic-bezier(.32,.72,0,1)` |
| Vercel Geist（vercel.com/geist） | 150ms | 150–200ms | — | 入场淡入 200ms | `cubic-bezier(.4,0,.2,1)` |
| shadcn / Radix（实时） | 150ms | 菜单、对话框入场 100ms（淡入 + 0.95→1 缩放） | — | — | `cubic-bezier(.4,0,.2,1)` |
| Raycast 官网 | 200ms | 200–400ms | — | 滑入 700ms | `cubic-bezier(.23,1,.32,1)`（ease-out quint）；`cubic-bezier(.215,.61,.355,1)` |
| Ant Design Pro（实时） | 200ms | 300ms | 300ms | — | `cubic-bezier(.645,.045,.355,1)`、`cubic-bezier(.215,.61,.355,1)` |
| Arco Pro（实时） | 背景色 100ms 线性 | 200ms | 高度展开 200ms | 轮播 500ms | `cubic-bezier(.34,.69,.1,1)` |
| IBM Carbon 文档 | 70ms（按钮） / 110ms（淡入） | 150ms | 240ms（展开、Toast） | 400ms（大展开）、700ms（背景变暗） | productive 标准 `(.2,0,.38,.9)`、入场 `(0,0,.38,.9)`、退场 `(.2,0,1,.9)` |
| Fluent 2 文档 | — | — | — | — | 动效要有目的；页面级切换只做快速淡入，不滑动；列表入场用短间隔错开；必须提供「无动效」 |

来源链接：https://carbondesignsystem.com/elements/motion/overview/ 、https://fluent2.microsoft.design/motion 、https://linear.app 、https://vercel.com/geist/introduction 、https://ui.shadcn.com 、https://www.raycast.com 、https://preview.pro.ant.design 、https://vue-pro.arco.design

### 动效结论
1. **四档时长就够**：悬停 / 按下 100ms；菜单、页签指示条、开关 160ms；展开收起、Toast、抽屉 240ms；数字和图表入场 400–600ms。大于 300ms 的只用在**一次性**的入场上，不用在反复操作上。
2. **用 ease-out 入场**（Linear `.25,.46,.45,.94`、Carbon 入场 `0,0,.38,.9`），**退场更快**（约 0.7 倍，`ease-in`）；抽屉等大位移用 `.32,.72,0,1`（Linear 官网 700ms 用的就是它；后台里缩短到 280ms）。
3. 动效**只在发生变化的元素上**（Fluent「限制在焦点元素」）：悬停只改底色，不位移、不放大、不加投影（按钮保持全平）。
4. 入场可以**错开**，但间隔短（30–40ms），总时长不超过约 500ms。
5. **骨架屏**只用在真的要等的地方（首次进入、切换时间范围、切页签重取数），形状和真实内容一致。
6. **必须尊重 `prefers-reduced-motion`**：关闭位移和数字滚动，只保留瞬时状态变化。
