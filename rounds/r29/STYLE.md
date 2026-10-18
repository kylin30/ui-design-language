# 后台设计语言 · STYLE.md v31.0（R29「面板」）

> 唯一样式表：`app.css`（R28 规则原样保留 + 文件末尾的「R29 面板层」「R29 动效层」）。
> 本轮依据：R28 评分批注「没有动效和面板组件，单纯的线条分割阅读还是很吃力」；22 张卡片式后台 / 设计系统页面的测量（Vercel、Stripe、PostHog、Linear、Supabase、shadcn、Tremor、Catalyst；Ant Pro、Arco Pro 作反例）和 8 个来源的动效参数（Linear、Vercel Geist、shadcn / Radix、Raycast、Ant、Arco、IBM Carbon、Fluent 2），见 `spec.html`「面板案例」「像素研究」「动效案例」「复核记录」。
> 方向不变：Linear 式 · 鸢尾强调色 · Geist 数字 · 只用无衬线 · 分组明显 · 控件全平 · 低视觉噪音 · 无绿色识别色。

## 1. 外框与面板（R29 改）
- 画布与侧栏同色 `--color-frame #F2F2F6`（与白卡片 ΔL* ≈ 4，Arco / PostHog 同档）；侧栏直接放在画布上，不加卡片。
- 主区 `.main`：透明，`gap 16`、右 / 下外边距 16；顶栏 `.bar` 52px 无边框，直接在画布上。
- **内容一律放进白卡片 `.card`**：1px `--color-card-line #E6E6EC`、圆角 `--r-card 10`、投影 `--shadow-card 0 1px 2px rgba(24,24,40,.045)`（深色无投影）。卡间 `--gap 16`。
- 布局：列表—详情 `.split`（左 `pane card`，右 `.stack` 一摞卡；列表宽用 `clamp()` 随屏宽收缩）；三栏 `.split.three`；记录页 `.split.rec`（右栏 320，一摞 `card aside`）；看板 `.tiles` + `.grid`。
- 卡片结构：`.ch` 卡头（44px：`h3` 14/600 + `.meta` 说明 + `.r` 右侧操作）→ `.cb` 内容（0 16 16；`.flush` 贴边放表格）→ `.cf` 操作条（上方一条线）。卡内左边距统一 16。

## 2. 令牌
| 类 | 令牌 | 值 |
|---|---|---|
| 面 | frame / surface（卡片） | #F2F2F6 / #FFFFFF |
| 卡片 | card-line / r-card / gap / shadow-card | #E6E6EC / 10 / 16 / 0 1px 2px 4.5% |
| 线 | line（卡内分隔）/ line-strong（控件描边） | #ECECEF / #E1E1E6 |
| 文字 | text / secondary / tertiary | #17171C / #5E5E68 / #85858F |
| 填充 | fill（计数徽、轨道、分段底、细条轨道） | #F2F2F5 |
| 分组色带 | band（卡内内缩 8、圆角 6） | #F7F7F9 |
| 骨架 | sk / sk-hi | #EEEEF2 / #F7F7F9 |
| 强调 / 异常 / 提醒 | primary / danger / warn | #6246EA / #C42B3F / #D9822B（只给图标） |
| 动效时长 | dur-1 / dur-2 / dur-3 / dur-4 | 100 / 160 / 240 / 480ms；抽屉进入 280；数字滚动 600 |
| 曲线 | ease-out / ease-in / ease-move | .25,.46,.45,.94 / .4,0,1,1 / .32,.72,0,1 |
| 字号 | 12 标签 · 13 正文/行 · 14 卡头/顶栏 · 20 详情标题 · 24 指标数字 | 字重 400 / 500 / 600 |

深色「星蓝」（midnight）：frame #0B0C0F、卡片 #131418、card-line #23252B、无卡片投影、sk 白 4.5% / 8%。其余亮色主题只换画布色（均调到 ΔL* 4.0–4.4）和强调色。

## 3. 面板规则
1. **浅画布 + 白卡片分组**：一眼能数出几块；不再只靠 1px 线分区。
2. **卡片靠描边成形**，投影几乎看不见；不浮起、不渐变、悬停不位移。
3. **卡头一行**：标题 + 灰说明 + 右侧操作；不加底色。
4. **一张卡讲一件事，卡里不套卡**（内部用小标题、属性行、留白，最多一块浅底 `.post.well`）。
5. **指标格就是图表页签**：`button.tile` role=tab，选中 = 主色描边 + 1px 内圈，悬停描边带 32% 主色；不可点的指标格用 `div.tile`。数字行固定 30px、按基线对齐。
6. **卡内分组色带内缩**（左右 8、圆角 6），不贴满卡宽。
7. **状态颜色只给 14px 图标**（沿用 R28）；红色只给越线数字和危险操作。
8. **卡内表格只有横线**，左右 16；最后一行无底线，让卡片描边收口。
9. **控件全平**：28px、圆角 6、1px 描边；投影只给卡片（极淡）和浮层（菜单、命令面板、Toast、抽屉）。
10. **图表卡先给结论数字**（`.kpi`：24/500 + 灰色对比说明），再给图；图表从 0 起或给出明确区间，刻度 ≥1 万写「万」、≥1000 加千分位。
11. **选中轻、切换有过渡**：选中项是内缩主色浅底；切换只让变化的区域淡入。
12. R28 其余规则全部保留：单行 40 / 表格 36、属性行、完成即退场（灰勾 + 次要色）、迷你柱不上色、高频操作写快捷键、选中谁详情就是谁。

## 4. 动效规则
1. 悬停 / 按下：只改底色、文字色、描边色，100ms。
2. 页签下划线 `.tabs .ind`、分段底块 `.seg .thumb`：160ms 滑动（JS `slider()`，首次定位不播放）。
3. 展开收起 `.collapse`：grid-template-rows 0fr → 1fr，240ms；箭头同步转 90°；收起后内容 `visibility:hidden`（不可聚焦）。
4. 抽屉 `.drawer`：浮起的卡片，进入 280ms `ease-move`，退出 240ms `ease-in`；背后 `.scrim` 6% 遮罩；关闭后 `inert`；Esc / 点遮罩关闭。
5. 骨架 `[data-sk]`（`rows` 条纹 / `num` 短条 / 默认块）：只在首屏（360ms）、切换范围、切页签时出现，形状与内容一致；不用转圈遮罩。
6. 入场一次：卡片 `.enter` 上移 6px 淡入、错开 35ms、最多 12 张；折线 480ms 画出、柱子错开 18ms 长出、横条长出；数字 `countUp()` 600ms。之后的重绘（缩放窗口）不再播放。
7. 切换数据：变化的区域 `.swap` 160ms 淡入；图表 `swapc` 160ms 淡入；数字 `tween()` 从旧值滚到新值。
8. 浮层：菜单 100ms、命令面板 160ms、Toast 240ms。
9. **减少动态效果**：CSS 把所有时长 / 延迟归零；JS（`RM`）跳过骨架、滚数、入场，直接显示终态。

## 5. 组件
R28 组件全部保留（`.btn`、`.fb`、`.seg`、`.tabs`、`.row`、`.gh`、`.tbl`、`.props`、`.kv`、`.tl`、`.cf`、`.hbar`、`.mini`、`.si`、`.tag`、`.cnt`、`.ddm`、`.cmdk`、`.toast` 等）。R29 新增：`.card`（`.ch` / `.cb` / `.cb.flush` / `.cf`、`.fill` 撑满、`.aside` 右栏小卡、`.tcard` 表格卡）· `.stack` 一摞卡 · `.grid` · `.tiles` / `.tile`（`.l` / `.v` / `.d`；`button.tile.on`）· `.kpi` 结论数字 · `.gh.fold` + `.collapse` 折叠 · `.tabs .ind` / `.seg .thumb` 指示器 · `.drawer` + `.scrim` · `[data-sk]` 骨架 · `.post.well` 引用井 · `.t-rank .gbw` 金额 + 细条。JS（`r29_shell.py`）：`slider` `skel` `swapIn` `tween` `countUp` `firstDraw` `boot`。

## 6. 演示 ↔ 参考
| 演示 | 参考模式 |
|---|---|
| 数据看板 demo-analytics.html（本轮评审页） | Stripe 首页指标格 + Vercel 图表卡 |
| 运营待办 demo.html | Linear 我的事项 + Vercel 面板 |
| 订单售后 demo-orders.html | Stripe 发票列表 + 指标格 |
| 运维告警 demo-ops.html | Sentry 问题流 + Grafana / Datadog 面板 |
| 客户管理 demo-crm.html | Linear 客户页 + Attio 右栏 |
| 内容审核 demo-content.html | Intercom 收件箱 + Plain 工单卡 |

## 7. 验收清单
- [ ] 每页内容都在白卡片里，画布可见；`.card .card` = 0
- [ ] 卡片 1px 描边 + 极淡投影、圆角 10、卡间 16；控件无投影无渐变
- [ ] 卡头一行；图表卡先给结论数字；卡内左边距统一 16
- [ ] 看板指标格可切图；切换范围有骨架和数字过渡
- [ ] 悬停 100 / 页签 160 / 展开 240 / 抽屉 280·240ms；骨架只在真等待时；入场只播一次
- [ ] 减少动态效果：无运行中动画、直接终值（`tools/m29_motion_test.js`）
- [ ] 字号 12 / 13 / 14 / 20 / 24；无衬线；Geist 数字自托管
- [ ] 7 套主题结构一致；1280 / 1440 无横向滚动、无遮挡、无截断
- [ ] 反馈面板（fb-dock，data-round="r29"）不遮挡主操作
