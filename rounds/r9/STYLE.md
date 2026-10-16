# 后台设计语言 v11.0（Round 9 ·「案头·规矩」）

> 与 UI 库无关的后台设计语言。气质：冷静、专业、整齐。本轮把语言本身写成可视规范：**spec.html 是主交付**，每条规矩配“对 / 错”现场渲染。取值与 R8（v10.0）相同，身份不变：墨栏、暖绢、近黑主操作、颜色只给状态、案头布局。

## 主张
后台是办事的桌面，不是展示的橱窗。
1. **秩序**：对齐和节奏代替装饰。
2. **克制**：墨色给操作，颜色只给状态，一屏只有一个声音最大。
3. **负责**：先说结论和后果，再给明细；每条路都有出口。

## 第一层 · 12 条规矩（长期不变）
| # | 规矩 | 为什么 | 令牌 |
|---|---|---|---|
| 01 | 一屏一个主操作 | 墨色按钮是“下一步”的唯一答案 | --role-action |
| 02 | 颜色只表示状态（6px 点 + 文字） | 装饰色会淹没真正的异常 | --role-success…danger |
| 03 | 先结论，后明细 | 第一行告诉人有什么事、多严重 | 标题下摘要 |
| 04 | 数字右对齐、等宽 | 便于纵向比较 | tabular-nums |
| 05 | 发丝线，不画框 | 线只分隔，不装饰 | --color-hairline |
| 06 | 分层靠底色，不靠投影 | 绢 → 纸两层；投影只给浮层 | --shadow-pop |
| 07 | 间距只有 8 / 16 / 32（+4 / 40） | 间距表达关系 | --rhythm-* |
| 08 | 字号 7 档，靠字重强调 | 档位少层级才清楚 | --fs-* |
| 09 | 危险操作写清后果，按钮写动作+数量 | “确定吗”什么也没说 | --role-danger |
| 10 | 空 / 加载 / 出错都有出口 | 不留死胡同 | — |
| 11 | 表格行高 44（紧凑 36），主次两级 | 密而不挤 | --row-h-* |
| 12 | 焦点 2px 墨色实线，偏移 2px | 键盘用户要知道在哪 | --focus-outline |

## 第二层 · 角色
框架、画布、纸面、主/次/轻/危险操作、四种状态、三级文字、数字、分区标签、焦点。组件只引用 `--role-*`，见 reference-tokens.css ① 与 spec.html#roles。

## 第三层 · 取值（可整套替换）
见 reference-tokens.css ②。替换条件：主操作对白字 ≥ 7:1；状态色不做大面积底色；仍满足 12 条规矩。

## 组件库映射
| 角色 | Ant Design 5 | Element Plus | shadcn/ui | MUI |
|---|---|---|---|---|
| 主操作 | colorPrimary | --el-color-primary | --primary | palette.primary.main |
| 画布 | colorBgLayout | --el-bg-color-page | --background | background.default |
| 纸面 | colorBgContainer | --el-bg-color | --card | background.paper |
| 发丝线 | colorBorderSecondary | --el-border-color-lighter | --border | divider |
| 异常 | colorError | --el-color-danger | --destructive | palette.error.main |
| 圆角 | borderRadius 6 | --el-border-radius-base | --radius | shape.borderRadius |
| 投影 | boxShadow none | --el-box-shadow-light none | 去掉 shadow-sm | shadows none |
| 焦点 | outline 覆盖 | :focus-visible 覆盖 | --ring | focusVisible 覆盖 |

状态一律不用 Tag/Chip 色块，改为 6px 圆点 + 文字。MUI 需 `textTransform:'none'`、`disableElevation`。

## 验收清单
见 spec.html#check（14 条，可勾选）。

## 演示
demo.html：R8 演示 + 左下「显示标注」开关（或 `?rules`），标出每个区域用了哪几条规矩。
