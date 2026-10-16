# 后台设计语言 v12.0（Round 10 ·「霜白·钴蓝」）

> 与 UI 库无关的后台设计语言。气质：冷静、专业、整齐。本轮把语言本身写成可视规范：**spec.html 是主交付**，每条规矩配“对 / 错”现场渲染。结构、12 条规矩和布局与 R9 相同；**本轮整套换色**：冷中性霜白 + 夜蓝侧栏 + 钴蓝主操作。

## 主张
后台是办事的桌面，不是展示的橱窗。
1. **秩序**：对齐和节奏代替装饰。
2. **克制**：钴蓝给操作，颜色只给状态，一屏只有一个声音最大。
3. **负责**：先说结论和后果，再给明细；每条路都有出口。

## 配色说明（v12.0）
R9 评语「换一套更现代的配色」。暖绢 + 暖墨读起来像纸本、偏旧；本轮改为：
- **中性**：微带蓝的冷灰（#F3F5F8 画布 / #FFFFFF 纸面 / #E6E9EF 发丝线），屏幕感、干净，不是 shadcn 的 zinc（带蓝而非纯灰，层次更明确）。
- **框架**：夜蓝近黑侧栏 #11151F，冷调、沉稳，与内容区形成清晰"工具框"。
- **主操作**：钴蓝 #3D4BE0，介于蓝与靛之间，比传统 #1677FF 更沉、更有辨识度；只给动作与选中，不做装饰。
- **状态**：成功 #13805A、注意 #B25E09、异常 #D12F2F、进行 #5B6B86（石板灰蓝，避免与钴蓝混淆）。黄色只用于图表/小徽标。
- 避开历史雷区：绿色不做身份色、无藏青+琥珀、非 zinc 炭灰。

### 对比度（WCAG 2.1）
| 组合 | 比值 | 级别 |
|---|---|---|
| 白字 / 钴蓝 #3D4BE0 | 6.40 | AA |
| 正文 #0F1420 / 白 | 18.4 | AAA |
| 次要 #424B5E / 白 | 8.75 | AAA |
| 辅助 #667085 / 画布 #F3F5F8 | 4.55 | AA |
| 异常 #D12F2F / 白 | 5.05 | AA |
| 成功 #13805A / 白 | 4.93 | AA |
| 注意 #B25E09 / 白 | 4.67 | AA |
| 进行 #5B6B86 / 白 | 5.40 | AA |
| 侧栏文字 #A3ABBD / #11151F | 7.92 | AAA |

## 第一层 · 12 条规矩（长期不变）
| # | 规矩 | 为什么 | 令牌 |
|---|---|---|---|
| 01 | 一屏一个主操作 | 钴蓝按钮是“下一步”的唯一答案 | --role-action |
| 02 | 颜色只表示状态（6px 点 + 文字） | 装饰色会淹没真正的异常 | --role-success…danger |
| 03 | 先结论，后明细 | 第一行告诉人有什么事、多严重 | 标题下摘要 |
| 04 | 数字右对齐、等宽 | 便于纵向比较 | tabular-nums |
| 05 | 发丝线，不画框 | 线只分隔，不装饰 | --color-hairline |
| 06 | 分层靠底色，不靠投影 | 霜白 → 纯白两层；投影只给浮层 | --shadow-pop |
| 07 | 间距只有 8 / 16 / 32（+4 / 40） | 间距表达关系 | --rhythm-* |
| 08 | 字号 7 档，靠字重强调 | 档位少层级才清楚 | --fs-* |
| 09 | 危险操作写清后果，按钮写动作+数量 | “确定吗”什么也没说 | --role-danger |
| 10 | 空 / 加载 / 出错都有出口 | 不留死胡同 | — |
| 11 | 表格行高 44（紧凑 36），主次两级 | 密而不挤 | --row-h-* |
| 12 | 焦点 2px 钴蓝实线，偏移 2px | 键盘用户要知道在哪 | --focus-outline |

## 第二层 · 角色
框架、画布、纸面、主/次/轻/危险操作、四种状态、三级文字、数字、分区标签、焦点。组件只引用 `--role-*`，见 reference-tokens.css ① 与 spec.html#roles。

## 第三层 · 取值（可整套替换）
见 reference-tokens.css ②。替换条件：主操作对白字 ≥ 4.5:1（AA）；状态色不做大面积底色；仍满足 12 条规矩。

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
