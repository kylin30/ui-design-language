# R30 案例补充（截图私有、不上传；本文件只含文字与来源链接）

> 问题：R29 卡片化后在运营待办上得 60（R28 65）。本轮补看「卡片何时不该用」：嵌入式外壳和记录页。
> 采集：2026-10-20 07:50 起（Asia/Shanghai），无头浏览器 1440×900，截图在 `cases/`，计算样式在 `study/*.json`（均私有）。
> 另合并 `/workspace/admin-ui-system/inspiration-log.md` 2026-10-19 条目（间距三级、卡壳先行、图片内描边、表格数值细节、决策卡）。

| 案例 | 来源 | 看到什么 | 对 R30 的意义 |
|---|---|---|---|
| Linear 当前版应用（官网首屏实拍） | https://linear.app/ | 侧栏在深色画布上，主区是一整块嵌入式面板（圆角约 8），事项详情和右侧属性栏在同一块面里，用一条竖线分开；面板里**没有卡片** | 记录页 = 一块面 + 属性栏 |
| Plain 收件箱（官网首屏实拍） | https://www.plain.com/ | 嵌入式面板；会话列表、详情同面，用线分 | 队列页不拆卡 |
| Attio（官网首屏实拍） | https://attio.com/ | 同上：一块嵌入面板 + 浅灰画布 | 外壳模式 |
| Catalyst 订单详情 / 订单列表 | https://catalyst-demo.tailwindui.com/orders/3000 | 侧栏在 #FAFAFA 画布，主区一块白色嵌入面板（圆角 8、极淡投影）；详情用 14/600 小标题 + 分隔线分「Summary」「Payment method」，区块间距约 40；没有卡片 | 区块间距 ≫ 行距，就能分组 |
| shadcn sidebar-08（inset 外壳） | https://ui.shadcn.com/view/new-york-v4/sidebar-08 | 侧栏在画布；主区嵌入面板，里面再放浅灰占位块 | 嵌入面板是基础件 |
| shadcn dashboard-01 | https://ui.shadcn.com/view/new-york-v4/dashboard-01 | 嵌入面板里一排 4 张 KPI 卡（间距 16，内边距 24）+ 图表卡 + 表格；**只有并列的同类东西才是卡**；表格没有放进卡 | 看板才用卡 |
| shadcn tasks（mail 示例 404，未取得） | https://ui.shadcn.com/examples/tasks | 任务表格直接放在页面上，工具栏 + 表格，无卡片 | 长列表不进卡 |
| Tremor Dashboard 概览 | https://dashboard.tremor.so/overview | **完全没有卡片**：小节标题 + 三列指标，列之间靠 48 留白，区块之间 48–64 | 留白分组也能清楚，前提是区块间距够大 |
| Tremor Insights 报表 | https://insights.tremor.so/ | 筛选条 + 大面积留白，只有一处边框 | 同上 |
| GitHub issue | https://github.com/vercel/next.js/issues/58298 | 正文评论用卡（每条评论是一个独立的发言），右栏属性只用小标题 + 线 | 「每个都是独立的一份」才成卡 |
| PlanetScale 文档（Query Insights） | https://planetscale.com/docs/concepts/query-insights | 文档页，可参考信息不多 | 记录在案，未采用 |
| Resend 官网 | https://resend.com/ | 40 秒超时，未取得 | — |

## 结论（写入 R30 规则）
1. **外壳 = 画布 + 嵌入面板**，不是满屏卡片。队列 / 记录 / 列表页用 2–3 块面（列表 | 详情 | 属性栏）。
2. **成卡条件**：一排同类、可比较、各自独立的东西（指标格、图表、内容卡、每条评论）。一个对象的几个部分不成卡。
3. **间距三级**：面板 / 卡内边距 20；同组卡间距 12；区块间距 32。
4. **详情内分区**：14/600 小标题 + 区块间距 32 + 内缩分隔线（左右 20）。
5. **加载**：卡壳和标题先在位，内容区骨架，只在真等待时出现。
6. 头像 / 缩略图内描边 `outline:1px solid rgb(0 0 0/.1); outline-offset:-1px`。
