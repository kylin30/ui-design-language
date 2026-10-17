# R28 案例库说明（截图私有、不上传；本文件只含文字与来源链接）

> `rounds/r28/cases/` 下的截图全部来自第三方产品的公开文档/营销页/画廊，只用于内部研究，**不进入上传清单、不在规范页展示**。规范页里的对照只用 r28 自己的渲染图和文字描述。

采集：2026-10-17 夜（Asia/Shanghai）。共 43 张。自动测量见 `tools/measure_case.py`（底色占比、横线颜色、文字灰阶、字形高度、行距），人工测量用 `tools/textboxes.py` 读像素。尺寸统一换算为 CSS px（2x 图除以 2）。深色图的自动文字测量不可靠，以人工为准。

## 没拿到的来源

- 阿里云控制台：help.aliyun.com 的截图由脚本动态加载，无头浏览器取不到（0 张）。
- Datadog：公开页只有 logo/营销插画，没有可用的真实界面截图。
- Shopify 管理后台：帮助中心页面 0 张可下载截图。
- Mobbin：需要登录，未使用。
- X 上设计师帖子：检索到的多为 Dribbble 式概念稿，不是已上线产品，只保留 1 张 PostHog SQL 洞察（未入库）。

## 跨案例结论（摘要，详见 study/notes.md）

1. 已上线的浅色后台，主工作区几乎都是**白色或近白**（#FCFCFC–#FFFFFF），侧栏只比它深 1–2%（#FAFAFA/#FBFBFB/#F6F8FA），中间一条发丝线。「灰画布+一堆白卡片」只出现在看板类（Compound、PostHog）。
2. 线色极浅：Stripe #E3E8EE、Attio #E7E7E7、Notion #E9E9E7、Vercel #EDEDED、Linear 0.5px 发丝线。
3. 字号小而统一：列表/表格正文 13–14px，标签 12px，页面标题在 48px 顶栏里只有 14–15px/600（Linear、Attio、Intercom）；只有列表落地页（Stripe）用 28px 大标题。
4. 行高 36–40px，单行为主；第二信息放到右侧列（时间、负责人、金额），而不是塞第二行。
5. 分组 = 小标题 + 计数 + 发丝线（Linear、Kitemaker、Plain），不是卡片。
6. 详情 = 「标签/值」属性组（Linear 属性行、Intercom Details、GitHub 右栏），节与节之间一条线或 24px 留白。
7. 状态用 14px 小图标/色点+黑色文字，颜色不染整段文字；只有异常才用红。
8. 对照组（Ant Pro、Jira、Front、Groove）的共同问题：指标卡+图表+按钮堆满第一屏、色彩多、层级靠颜色——正是 r20–r27 页面骨架的来源。

## 逐案例

### linear-customer-light
- 产品 / 模式：Linear · CRM 客户页 · 分组列表
- 来源：https://linear.app/docs/customer-requests  （2880×1191）
- 为什么干净 / 高级：白底 #FCFCFC 窗口嵌在深色外框里；页头只有头像+18px 名称；属性行 6 列「12px 灰标签 / 13px 值」，列间 40px；分组标签+0.5px 发丝线，行 40px 单行，右侧优先级/时长/更多。
- 人工测量：正文 13/500 #1F1F1F；标签 12 #5A5A5A；标题 17–18/500；分组标签→首行 34px，组间 54px；发丝线 0.5px #CDCDCD；计数徽 11px 底 #EAEAEC 圆角 4（已逐像素复刻）
- 自动测量：底色 #FCFCFC 79.3%, #868686 11.7%, #FAFAFA 1.7%；线色 #7A7879, #DCDCDC, #F8F8F8；文字灰阶 #040405 / #1E1E1E / #505050；常见字形高 12px；常见行距 20, 28 css px

### linear-project-doc
- 产品 / 模式：Linear · 项目详情 · 属性行
- 来源：https://linear.app/docs/project-updates  （2880×2161）
- 为什么干净 / 高级：项目页：标题+一行属性 chips（状态/负责人/日期）+正文；属性用 12px 标签+图标值，无卡片框。
- 人工测量：深色；正文 14；属性 chip 高 24 圆角 6；段落间距 16
- 自动测量：底色 #0E0E10 39.7%, #0C0C0E 28.8%, #101012 4.7%；线色 #FAFAFA, #1A1A1C, #131315；文字灰阶 #030305 / #0E0E10；常见字形高 8px；常见行距 19, 16 css px

### linear-triage-dark
- 产品 / 模式：Linear · 运营队列 · 分诊收件箱（深色）
- 来源：https://linear.app/docs/triage  （2880×1998）
- 为什么干净 / 高级：分诊收件箱：每条两行（标题 13/500 + 12px 次要元数据），右侧时间；列表即页面，无外框。
- 人工测量：行距约 56（两行条目）；标题/元数据两档灰
- 自动测量：底色 #161618 51.9%, #1E2022 15.1%, #1C1C1E 4.9%；线色 #222325, #232325, #58585A；文字灰阶 #141416 / #1C1D1F；常见字形高 8px；常见行距 24, 42 css px

### linear-my-issues-dark
- 产品 / 模式：Linear · 运营队列 · 按状态分组（深色）
- 来源：https://linear.app/docs/my-issues  （2880×1301）
- 为什么干净 / 高级：我的事项：按状态分组（In Review / In Progress / Backlog），组头是浅底条+计数；行 ID(灰)·状态图标·标题·右侧标签/日期。
- 人工测量：行 36–40；组头 32；ID 用等宽灰；状态 14px 圆形图标
- 自动测量：底色 #080808 26.7%, #101012 20.7%, #141618 5.6%；线色 #0E0E10, #5BB0A1, #161618；文字灰阶 #060606 / #0F1013；常见字形高 8px；常见行距 24 css px

### linear-inbox-dark
- 产品 / 模式：Linear · 运营队列 · 收件箱 + 详情（深色）
- 来源：https://linear.app  （1440×832）
- 为什么干净 / 高级：通知收件箱：头像+两行文字，未读用小点；列表/详情双栏用一条线分开。
- 人工测量：行约 56；未读点 6px
- 自动测量：底色 #08080A 38.1%, #101212 10.8%, #080A0A 6.4%；线色 #29292C, #222323；文字灰阶 —；常见字形高 8px；常见行距 — css px

### linear-initiatives-dark
- 产品 / 模式：Linear · 列表 · 分组表格（深色）
- 来源：https://linear.app  （1440×832）
- 为什么干净 / 高级：目标列表：表格式列（健康度/负责人/目标日期），列标题 12px 灰，行 40，状态用小色点+文字。
- 人工测量：列标题 12；行 40；健康度点 8px
- 自动测量：底色 #08080A 27.7%, #0E1010 21.6%, #101012 5.0%；线色 #1A1B1C；文字灰阶 —；常见字形高 —px；常见行距 — css px

### stripe-invoices
- 产品 / 模式：Stripe Dashboard · 订单 · 表格 + 行菜单
- 来源：https://docs.stripe.com/invoicing/dashboard  （1440×963）
- 为什么干净 / 高级：发票列表：28px 粗标题、蓝色下划线页签、11px 大写列头；行 36、只有横线；金额右对齐+加粗，币种灰；发票号等宽；状态 badge 小而淡（#D7F7C2/#05690D）；行操作菜单分组标题大写 11px（已逐像素复刻）。
- 人工测量：正文 14（我们用 Inter 13.2 对齐宽度）；线 #E3E8EE；主色 #5469D4；按钮 28 高圆角 4；菜单项 27 行距
- 自动测量：底色 #FEFEFE 85.9%, #FCFCFC 1.4%；线色 #E6E9EE, #FBFBFC, #F9FAFB；文字灰阶 #484D5F / #626879 / #6A707F；常见字形高 14px；常见行距 51, 50 css px

### stripe-invoices-menu
- 产品 / 模式：Stripe Dashboard · 订单 · 表格（2x）
- 来源：https://docs.stripe.com/invoicing/dashboard  （3000×2007）
- 为什么干净 / 高级：同上，高分辨率版；用来核对菜单阴影与分隔线。
- 人工测量：菜单 156 宽，阴影 0 15 35 rgba(49,49,93,.1)；分隔线 1px #E3E8EE
- 自动测量：底色 #FEFEFE 87.5%, #FCFCFC 1.6%, #E4E8EC 1.2%；线色 #F4F5F7, #E7EAEE, #E4E8ED；文字灰阶 #535768 / #6C7282 / #8B919E；常见字形高 18px；常见行距 26, 26 css px

### vercel-summary
- 产品 / 模式：Vercel · 部署详情 · 分区列表
- 来源：https://vercel.com/docs  （1440×810）
- 为什么干净 / 高级：部署摘要：可折叠分组（Edge Middleware / Static Assets / Functions），组头右侧放数量徽标；每行路径等宽+运行时+大小。
- 人工测量：线 #EDEDED；行 32；等宽 13；徽标 20 高
- 自动测量：底色 #FAFAFA 59.0%, #FEFEFE 32.4%, #EAEAEA 1.6%；线色 #F7F7F7, #F6F6F6, #F1F1F1；文字灰阶 #000000 / #535353 / #545454；常见字形高 16px；常见行距 85 css px

### vercel-resources
- 产品 / 模式：Vercel · 资源表格 · 筛选
- 来源：https://vercel.com/docs  （1440×753）
- 为什么干净 / 高级：资源表：顶部搜索+筛选，表格行 40，右侧下拉菜单；几乎全黑白，只有状态点有色。
- 人工测量：正文 14；次要 #666；线 #EBEBEB
- 自动测量：底色 #FEFEFE 65.0%, #FAFAFA 20.8%, #F2F2F2 5.2%；线色 #F9F9F9, #E9E9E9, #EFEFEF；文字灰阶 #000000 / #111111 / #181818；常见字形高 13px；常见行距 48, 62 css px

### vercel-observability
- 产品 / 模式：Vercel · 分析 · 图表 + 表格
- 来源：https://vercel.com/docs/observability  （2400×1256）
- 为什么干净 / 高级：可观测：大图表在白面板里，图例在右上，下方路由表（数值右对齐、等宽）；红色只用于错误率。
- 人工测量：面板圆角 8–12；图表网格极淡；表行 40
- 自动测量：底色 #FEFEFE 56.7%, #FAFAFA 25.6%, #E2F0FE 9.1%；线色 #EDEDED, #F3F3F3, #FBFBFB；文字灰阶 #181818 / #666666 / #6A6F6C；常见字形高 16px；常见行距 18 css px

### attio-people
- 产品 / 模式：Attio · CRM · 人员表格
- 来源：https://saasinterface.com/pages/lists-tables/  （2880×1800）
- 为什么干净 / 高级：人员表：侧栏 #FBFBFB+右侧发丝线；顶栏 48、工具栏 57 都用 1px #E7E7E7 分隔；表格全网格线但颜色极浅；记录名做成 20px 高的淡蓝 pill；AI 字段格底只有 #F9F7FE（几乎看不出）（已逐像素复刻）。
- 人工测量：正文 14/500 #111；列头 14/500 #5E5E5E；行 36；按钮 33 高、1px #EAEAEA、圆角 8；侧栏项 30 高间距 2
- 自动测量：底色 #FEFEFE 53.4%, #FAFAFA 20.5%, #F8F6FE 15.1%；线色 #E7E7E7；文字灰阶 #111111 / #19171E / #343435；常见字形高 14px；常见行距 18 css px

### attio-filters
- 产品 / 模式：Attio · CRM · 看板 + 筛选
- 来源：https://saasinterface.com/components/filters/  （2880×1800）
- 为什么干净 / 高级：筛选弹层：按字段分组的菜单，左侧图标统一灰，选中项浅灰底；筛选条件以 chip 呈现在工具栏。
- 人工测量：菜单项 32；弹层圆角 10；阴影淡
- 自动测量：底色 #FEFEFE 75.4%, #FAFAFA 16.9%；线色 #E7E7E7；文字灰阶 #111111 / #353535 / #3E3E3E；常见字形高 10px；常见行距 26, 12 css px

### attio-table-crop
- 产品 / 模式：Attio · CRM · 公司表格（局部）
- 来源：https://attio.com  （680×440）
- 为什么干净 / 高级：公司表局部：评分列用小色块数字，行头 logo 16px；列头灰、图标灰。
- 人工测量：行 36；评分块 20×20 圆角 4
- 自动测量：底色 #FEFEFE 46.6%, #F2F4F6 13.4%, #FAFAFA 10.1%；线色 #EEEFF1；文字灰阶 #21201F / #242629 / #2D3239；常见字形高 11px；常见行距 36, 79 css px

### plain-queue
- 产品 / 模式：Plain · 运营队列 · 工单列表
- 来源：https://saasinterface.com/components/filters/  （2880×1800）
- 为什么干净 / 高级：工单队列：主区是嵌在浅灰外框里的白色圆角面板；顶部 Todo/Snoozed/Done 分段控件；按优先级分组（Normal 6）；每条=客户名+邮箱 / 主题+预览 / 标签 chip，右侧时间+负责人头像。
- 人工测量：主区白 #FFF，外框 #F5F5F7；标题 20/600；分组标签 14/500+计数；条目约 52（两行）；标签 chip 22 高 1px 线圆角 6
- 自动测量：底色 #FEFEFE 72.0%, #F8F8FA 22.3%；线色 #F1F2F5；文字灰阶 #000000 / #161A26 / #898C92；常见字形高 11px；常见行距 10, 26 css px

### plain-thread
- 产品 / 模式：Plain · 内容审核 / 工单详情 · 三栏
- 来源：https://saasinterface.com/pages/messaging-chat/  （2880×2400）
- 为什么干净 / 高级：工单详情：中间时间线，事件小字灰，消息块用细边框；右栏客户信息按「标签/值」分组。
- 人工测量：正文 14；事件 12 灰；右栏 300 宽
- 自动测量：底色 #FEFEFE 67.9%, #F4F4F8 12.4%, #F8F8FA 9.2%；线色 #F1F2F5, #EBECF1, #F8F8FA；文字灰阶 #161A26 / #898C92；常见字形高 11px；常见行距 10, 16 css px

### front-inbox
- 产品 / 模式：Front · 运营队列 · 共享收件箱
- 来源：https://saasinterface.com/pages/messaging-chat/  （2880×1800）
- 为什么干净 / 高级：对照组：彩色左栏、大量按钮和图标，信息密度过高——我们要避免。
- 人工测量：—
- 自动测量：底色 #FEFEFE 48.0%, #F6F8FA 27.2%, #F2F6FC 5.3%；线色 #E8EAED, #F0F1F3, #D4D6D9；文字灰阶 #000000 / #191919 / #3E3E40；常见字形高 10px；常见行距 20, 10 css px

### groove-inbox
- 产品 / 模式：Groove · 工单详情 · 右栏客户信息
- 来源：https://saasinterface.com/pages/messaging-chat/  （2880×1800）
- 为什么干净 / 高级：对照组：三栏邮件式，按钮/徽标颜色多，层级靠颜色不靠排版。
- 人工测量：—
- 自动测量：底色 #FEFEFE 67.0%, #F6F8FA 21.2%, #EEF0F4 4.4%；线色 #E4E8ED, #EAEDF1, #EEF1F5；文字灰阶 #1B1B1B / #36414D；常见字形高 10px；常见行距 19, 12 css px

### intercom-inbox
- 产品 / 模式：Intercom · 运营队列 · 收件箱三栏
- 来源：https://www.intercom.com/inbox  （2436×1624）
- 为什么干净 / 高级：收件箱三栏：会话列表（选中=淡紫底圆角 8）/对话/右侧「Details」属性栏；属性栏分节标题大写 11px+折叠箭头，标签灰/值黑两列对齐。
- 人工测量：列表项两行 46；选中底 #E3E5F8 类；属性行 23；分节间用 1px 线
- 自动测量：底色 #FEFEFE 64.7%, #F0F0F0 19.0%, #DCE0F8 3.7%；线色 #F8F8F8, #FAFAFA, #F9F9F9；文字灰阶 #000000 / #1D1D1D / #6B6B6B；常见字形高 8px；常见行距 13, 14 css px

### kitemaker-list
- 产品 / 模式：Kitemaker · 运营队列 · 分组列表（Linear 风格）
- 来源：https://saasinterface.com/pages/lists-tables/  （2880×1800）
- 为什么干净 / 高级：事项列表：分组标题+计数+发丝线（与 Linear 同构）；行内 ID 灰、标题黑、右侧头像。
- 人工测量：行 36；组头 13/500
- 自动测量：底色 #F8F8F8 65.5%, #FEFEFE 30.4%, #F2F2F2 1.3%；线色 #F3F3F3, #EDEDED, #ECECEC；文字灰阶 #171717 / #6F6F6F / #818181；常见字形高 9px；常见行距 18, 25 css px

### cardinal-feedback
- 产品 / 模式：Cardinal · 内容审核 · 反馈队列 + 详情
- 来源：https://saasinterface.com/components/side-panel/  （2880×1800）
- 为什么干净 / 高级：反馈列表+右侧详情面板：列表行 36，详情面板用属性组与正文分开，无卡片阴影。
- 人工测量：线 #EEE；面板左边一条线
- 自动测量：底色 #FEFEFE 65.8%, #F8F8FA 18.7%, #F4F2FE 3.6%；线色 #DCDFEA；文字灰阶 #111322 / #1A202C / #7F8183；常见字形高 12px；常见行距 12, 20 css px

### spendesk-table-panel
- 产品 / 模式：Spendesk · 订单 · 表格 + 侧栏详情
- 来源：https://saasinterface.com/components/side-panel/  （2880×1800）
- 为什么干净 / 高级：表格+右侧抽屉：抽屉用线而不是阴影分隔，但色彩偏多（对照参考）。
- 人工测量：行 48
- 自动测量：底色 #FEFEFE 69.6%, #FAFAFC 9.9%, #16124E 7.2%；线色 #DDDDE6, #EEEEF2, #CDCDD7；文字灰阶 #3E3D53 / #504F66 / #A3A3B5；常见字形高 10px；常见行距 28, 28 css px

### flow-tasks
- 产品 / 模式：Flow · 运营队列 · 任务列表 + 详情
- 来源：https://saasinterface.com/components/side-panel/  （2880×1800）
- 为什么干净 / 高级：任务列表：分组可折叠、行内复选框；颜色偏多，作为部分参考。
- 人工测量：行 36
- 自动测量：底色 #FEFEFE 62.2%, #F6F8FA 20.2%, #F6F2EE 7.3%；线色 #E6E7EB, #F0F1F2, #E5EDFF；文字灰阶 #16171A / #52545A / #6E7178；常见字形高 12px；常见行距 16, 14 css px

### laserfocus-record
- 产品 / 模式：Laserfocus · CRM · 客户记录页
- 来源：https://saasinterface.com/components/filters/  （2880×1900）
- 为什么干净 / 高级：CRM 记录页：顶部名称+属性 chips，下面分节（Account / Contacts / Opportunities）用小标题+标签值对，菜单浮层整洁。
- 人工测量：属性标签 12 灰；值 13；分节 24 间距
- 自动测量：底色 #FEFEFE 66.5%, #FEF6E8 18.9%, #30323A 6.8%；线色 #EAEAEB, #E4E4E5；文字灰阶 #30333A / #838589；常见字形高 10px；常见行距 15, 24 css px

### sentry-issues
- 产品 / 模式：Sentry · 运维告警 · 问题流
- 来源：https://docs.sentry.io/product/issues/  （1600×864）
- 为什么干净 / 高级：问题流：工具栏（项目/环境/时间范围的组合下拉）+搜索 token；表头浅灰底一行；每行=类型（粗）+一行消息+灰色元数据，右侧迷你柱状趋势、事件数/用户数右对齐；紫色主按钮与我们的鸢尾色相近。
- 人工测量：行约 61（三行条目）；表头 36；元数据 12 灰；数字 14 右对齐
- 自动测量：底色 #FEFEFE 83.9%, #F6F6F8 3.6%, #FCFCFC 2.0%；线色 #E9E6ED, #E5E3E9, #F6F5F8；文字灰阶 #261C2E / #2F2538 / #C0BAC6；常见字形高 12px；常见行距 24, 51 css px

### sentry-issue-detail
- 产品 / 模式：Sentry · 运维告警 · 问题详情
- 来源：https://docs.sentry.io/product/issues/issue-details/  （1600×1000）
- 为什么干净 / 高级：问题详情：标题+标签行，中间事件图表，下方堆栈；右栏属性。层级靠字号与留白。
- 人工测量：—
- 自动测量：底色 #FEFEFE 59.3%, #EEECF0 12.7%, #FAF8FA 8.5%；线色 #E2DDE7, #E7E3EC, #FBFBFB；文字灰阶 #010102 / #12091A / #241C2C；常见字形高 10px；常见行距 24, 25 css px

### sentry-alert
- 产品 / 模式：Sentry · 运维告警 · 告警详情
- 来源：https://docs.sentry.io/product/alerts/  （1161×645）
- 为什么干净 / 高级：告警详情：标题+状态、触发次数柱图、右栏条件说明；历史表 3 列。
- 人工测量：表行 36；右栏 300
- 自动测量：底色 #FEFEFE 72.8%, #F6F6FA 14.8%, #7452FE 1.4%；线色 #DFDBEF, #FAFAFB；文字灰阶 #181423 / #1B1826 / #57606B；常见字形高 10px；常见行距 33, 20 css px

### sentry-traces
- 产品 / 模式：Sentry · 分析 · 查询 + 图表 + 表
- 来源：https://docs.sentry.io/product/explore/traces/  （1600×924）
- 为什么干净 / 高级：链路列表：顶部图表+下方表格，筛选侧栏；表格密度高但线色很浅。
- 人工测量：行 32
- 自动测量：底色 #FEFEFE 80.8%, #F6F6F8 3.8%, #FCFCFC 1.7%；线色 #FAF9FB, #E6E3EA, #E0DCE5；文字灰阶 #130A19 / #261C2E / #2E2437；常见字形高 12px；常见行距 47, 50 css px

### posthog-dashboard
- 产品 / 模式：PostHog · 分析看板 · 卡片网格
- 来源：https://posthog.com/docs/product-analytics/dashboards  （1644×1164）
- 为什么干净 / 高级：仪表盘：白卡片网格，每卡标题 14/600+说明，大数字 40+；卡间距 16。
- 人工测量：卡片 1px 线圆角 6；数字 36–48
- 自动测量：底色 #FEFEFE 51.7%, #F2F4EE 14.5%, #EEEEEA 5.3%；线色 #DFDFDC, #DADBD4, #E3E3E2；文字灰阶 #111111 / #191919 / #373936；常见字形高 10px；常见行距 36, 35 css px

### posthog-trends
- 产品 / 模式：PostHog · 分析 · 趋势图
- 来源：https://posthog.com/docs/product-analytics/trends/overview  （2528×1146）
- 为什么干净 / 高级：趋势页：左侧条件、右侧单张大图，图表只有一种主色线条，网格极淡。
- 人工测量：—
- 自动测量：底色 #FEFEFE 89.4%, #F2F4F0 4.3%, #E4E4DE 1.1%；线色 #DADBD3, #CCCCCC, #5F77F8；文字灰阶 #111111 / #2D2D2D；常见字形高 12px；常见行距 17, 18 css px

### compound-dashboard
- 产品 / 模式：Compound · 分析看板 · 财务
- 来源：https://saasinterface.com/pages/dashboard/  （2880×4828）
- 为什么干净 / 高级：资产看板：浅灰画布 #F4F6F8 上放白色大面板（圆角 12、无阴影）；左侧账户列表行 36 金额右对齐；主面板标题 16/600、分段控件、关键数字 22/600、图例小方块；洞察卡片三列。
- 人工测量：画布 #F4F6F8；面板白圆角 12；标签 13 灰；数字 22；线 #EEF0F2
- 自动测量：底色 #FEFEFE 82.6%, #F4F6F8 10.5%, #F2F2F2 1.8%；线色 #F3F2F2, #F8F8F8, #EDEDED；文字灰阶 #000000 / #171717 / #222222；常见字形高 12px；常见行距 25, 24 css px

### june-dashboard
- 产品 / 模式：June · 分析看板 · 产品指标
- 来源：https://saasinterface.com/pages/dashboard/  （2880×6400）
- 为什么干净 / 高级：产品分析：报告块标题+一句解释+图表，块与块用留白和细线分隔，图表颜色单一。
- 人工测量：标题 15/600；说明 13 灰
- 自动测量：底色 #FEFEFE 73.6%, #FAFAFC 17.4%；线色 #FAFBFC, #EBEDEE, #F4F5F7；文字灰阶 #0D131B / #2A2522 / #343A3F；常见字形高 9px；常见行距 28, 37 css px

### github-issues
- 产品 / 模式：GitHub · 运营队列 · 问题列表
- 来源：https://github.com  （1440×900）
- 为什么干净 / 高级：Issue 列表：表头一条浅灰底（Open/Closed 计数+筛选下拉），行 = 状态图标+标题(粗)+标签 chips+灰色元数据，外框 1px 圆角 6。
- 人工测量：行约 60；线 #D1D9E0；正文 14；元数据 12 #59636E
- 自动测量：底色 #FEFEFE 69.2%, #F6F8FA 14.1%, #000000 7.4%；线色 #DFE4E9, #D1D9E0, #191F1B；文字灰阶 #1F2328 / #59636E；常见字形高 12px；常见行距 32, 56 css px

### github-issue
- 产品 / 模式：GitHub · 详情 · 正文 + 右栏属性
- 来源：https://github.com  （1440×900）
- 为什么干净 / 高级：Issue 详情：时间线+右侧属性栏（Assignees/Labels/Projects 每节小标题+值，节之间发丝线）。
- 人工测量：右栏小标题 12/600 #59636E；节间 16
- 自动测量：底色 #FEFEFE 72.3%, #F6F8FA 12.8%, #000000 7.4%；线色 #DFE4E9, #D1D9E0, #191F1B；文字灰阶 #1F2328 / #22262B / #404448；常见字形高 11px；常见行距 30, 42 css px

### github-pulls
- 产品 / 模式：GitHub · 列表 · 标签与元信息
- 来源：https://github.com  （1440×900）
- 为什么干净 / 高级：PR 列表：同 Issue 列表结构，检查状态用小图标。
- 人工测量：—
- 自动测量：底色 #FEFEFE 68.6%, #F6F8FA 14.9%, #000000 7.9%；线色 #DFE4E9, #D1D9E0, #191F1B；文字灰阶 #000000 / #1F2328 / #59636E；常见字形高 9px；常见行距 40, 27 css px

### notion-database
- 产品 / 模式：Notion · 表格 · 数据库视图 + 筛选
- 来源：https://saasinterface.com/components/filters/  （2880×1800）
- 为什么干净 / 高级：数据库表：列头图标+灰文字，行 33，网格线极浅 #E9E9E7，筛选条件 chip。
- 人工测量：正文 14；线 #E9E9E7
- 自动测量：底色 #FEFEFE 74.8%, #FAFAFA 13.5%, #F4F4F4 2.8%；线色 #E9E9E7, #E0E0DE, #EBEAEA；文字灰阶 #37352F / #6D6C68 / #73726E；常见字形高 10px；常见行距 14, 9 css px

### feishu-approval-table
- 产品 / 模式：飞书 · 订单 / 审批 · 表格
- 来源：https://www.feishu.cn/hc/zh-CN/articles/360043495234  （1631×1288）
- 为什么干净 / 高级：飞书审批表：中文后台表格，行高 48、状态标签浅色底；字号 14。
- 人工测量：中文正文 14；线 #DEE0E3；主色 #3370FF
- 自动测量：底色 #FEFEFE 82.1%, #F8F8F8 8.6%, #F6F6F6 1.8%；线色 #F9F9F9, #EFEFEF；文字灰阶 #000000 / #6A7175 / #8F9393；常见字形高 22px；常见行距 63 css px

### feishu-admin-list
- 产品 / 模式：飞书管理后台 · 运营队列 · 管理列表
- 来源：https://www.feishu.cn/hc/zh-CN/articles/360049067916  （1435×897）
- 为什么干净 / 高级：飞书管理后台列表：左侧导航+顶部筛选+列表行操作按钮；按钮偏多。
- 人工测量：—
- 自动测量：底色 #FEFEFE 87.8%, #DCE0E2 5.6%, #EAECEC 1.4%；线色 #DBDCDD；文字灰阶 #1E232A / #292E36 / #30353C；常见字形高 10px；常见行距 22, 82 css px

### feishu-dashboard
- 产品 / 模式：飞书 · 分析看板 · 中文后台
- 来源：https://www.feishu.cn/hc/zh-CN/articles/360049067916  （5760×3240）
- 为什么干净 / 高级：飞书仪表盘：指标卡+图表网格，卡片白底圆角 8。
- 人工测量：—
- 自动测量：底色 #FEFEFE 79.4%, #F8F8FA 3.5%, #FAFAFA 2.3%；线色 #DEE0E3, #E3E5E6, #FBFBFB；文字灰阶 #1F2329 / #2B2F36 / #4C4F54；常见字形高 6px；常见行距 41, 40 css px

### feishu-admin-form
- 产品 / 模式：飞书管理后台 · 设置表单
- 来源：https://www.feishu.cn  （1440×811）
- 为什么干净 / 高级：飞书表单：分节标题+两列字段，标签在上。
- 人工测量：标签 14 #646A73
- 自动测量：底色 #CCCCCC 74.0%, #FEFEFE 5.8%, #C2C2C4 5.7%；线色 #CFCFCF, #CDCDCF, #C8C8C9；文字灰阶 #03050A / #181A1E / #42464D；常见字形高 16px；常见行距 79 css px

### antpro-table
- 产品 / 模式：Ant Design Pro · 中文后台 · 查询表格（对照：常见做法）
- 来源：https://preview.pro.ant.design  （1440×900）
- 为什么干净 / 高级：对照组：Ant Design Pro 默认表格——筛选区占大块、按钮/链接色多、列多；「后台模板感」的来源。
- 人工测量：—
- 自动测量：底色 #FEFEFE 56.9%, #F4F4F4 13.9%, #FAFAFA 8.9%；线色 #F0F0F0, #EFEFEF；文字灰阶 #1F1F1F / #464646 / #565656；常见字形高 10px；常见行距 47, 49 css px

### antpro-analysis
- 产品 / 模式：Ant Design Pro · 中文后台 · 分析页（对照）
- 来源：https://preview.pro.ant.design  （1440×900）
- 为什么干净 / 高级：对照组：Ant Pro 分析页——4 张指标卡+大图表+彩色迷你图，信息堆满，是我们 r20–r27 页面结构的原型。
- 人工测量：—
- 自动测量：底色 #FEFEFE 60.7%, #F4F4F4 17.0%, #2288FE 4.4%；线色 #F0F0F0, #EFEFEF, #EDEDED；文字灰阶 #1F1F1F / #262626 / #454546；常见字形高 10px；常见行距 44, 53 css px

### jira-issue
- 产品 / 模式：Jira · 详情 · 属性栏（对照）
- 来源：https://atlassian.com  （1440×900）
- 为什么干净 / 高级：对照组：Jira 详情——字段多、蓝色强调多，层级不清。
- 人工测量：—
- 自动测量：底色 #FEFEFE 70.8%, #F6F8F8 13.1%, #0646A6 5.5%；线色 #2E3D54, #DCDFE4, #FFFFFF；文字灰阶 #696969；常见字形高 11px；常见行距 25, 24 css px
