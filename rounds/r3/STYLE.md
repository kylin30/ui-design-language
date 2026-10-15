# 后台视觉规范 v5.0（Round 3 ·「纸灰·砚墨」）

> **一句话**：这是一套**与 UI 库无关**的视觉规范。用 Ant Design、Element Plus、shadcn/ui、MUI 还是手写 CSS 都行，照着做出来的后台看起来是同一个产品。
>
> 气质：**冷静、专业、整齐**。适用：后台管理系统、运营后台、SaaS 控制台。
>
> v5.0 是一次**大改**，不是换色：R1（松墨绿 3 分）和 R2（靛墨 4 分）都只换了色值，分数都低。这一轮把“身份”从颜色挪到**层次、留白和字**上。

---

## 0. 为什么这样改（Rationale）

| 反馈 / 参考 | 结论 | v5.0 的做法 |
|---|---|---|
| R1 3 分“不喜欢绿色” | 有色彩倾向的主色都有风险 | 主色改为**近黑砚墨 #1B1A19**，几乎没有色相 |
| R2 4 分，无备注 | 靛蓝、衬线、等宽大写标签整体偏“设计感”，不够当下 | 去掉衬线标题、去掉等宽大写刻线标签、去掉朱印竖条 |
| 早期：藏青+琥珀像 10 年前 | 饱和蓝 + 暖强调色是老后台标配 | 不用任何蓝色作身份色 |
| 早期：炭灰/zinc 太像 shadcn | 冷灰（带蓝）+ 纯黑 = shadcn 默认 | 灰阶**偏暖 1–2°**（纸灰），层次靠三层底色而非边框 |
| @nizamdesign 后台 | 层次靠底色、近黑主操作、颜色极少、标题下摘要、三行记录、决策页讲后果 | 全部收为规则，见 §2、§6 |

## 0.5 Identity：换任何库都认得出来的五个签名

1. **三层底色**：画布纸灰 `canvas` → 白色主面板 `surface`（大圆角浮在画布上）→ 面板内浅灰槽 `surface-subtle`，槽里再放白卡。**不用阴影分层**。
2. **砚墨主操作**：主按钮、选中、分页当前页、批量操作条都是近黑；全屏只有它“重”。
3. **颜色只给状态**：红/橙/绿/蓝只出现在 6px 圆点、涨跌数字和风险标记上，不做背景大面积。
4. **紧字距无衬线大标题 + 一行数字摘要**：26/650，字距 -0.025em；标题下一行“37 待处理售后 · ¥12,840 待退 · 最久 11 天”。
5. **三行记录**：标题 / 编号（等宽）/ 补充信息，表格、列表、审批项统一。

## 1. 三层结构

- **规则**（永不变）：本文 §2、§6、§7。
- **角色**（很少变）：§3.1 的角色名。
- **取值**（可替换）：`reference-tokens.css` 里的色值和像素。换值时必须满足 §3.2 的约束。

## 2. 原则（可直接用来判断）

1. 一屏只有一个最重的东西，它一定是砚墨主操作或关键数字。
2. 能用底色差分层，就不用边框；能用边框，就不用阴影。阴影只给浮层（下拉、抽屉、弹窗）。
3. 颜色是信息，不是装饰。一个元素有颜色，必须能说出它代表什么状态。
4. 数字永远等宽对齐（tabular-nums），金额右对齐。
5. 会造成后果的操作，按钮上写清对象和数量（“批准 6 笔退款 · ¥4,218”），旁边写能否撤销。
6. 留白宽于常见后台一档，但行高不放松：表格行 58px 容纳三行记录，单行表 44px。

## 3. 颜色：角色，而不是色板

### 3.1 角色与参考取值

| 角色 | 用途 | 参考值 |
|---|---|---|
| canvas | 页面画布、侧栏 | `#F2F1EE` |
| surface | 主面板、卡片、弹窗 | `#FFFFFF` |
| surface-subtle | 面板内槽、表头、KPI 组底 | `#F7F6F3` |
| surface-hover | 悬停 | `#EFEEEA` |
| border / divider | 1px 发丝线 / 行分隔 | `#E4E2DD` / `#ECEAE6` |
| border-strong | 输入框、次按钮边 | `#D3D0CA` |
| text-1 / 2 / 3 | 正文 / 次要 / 说明 | `#171615` / `#4A4743` / `#76726C` |
| action | 主操作、选中、当前态 | `#1B1A19`（hover `#2E2C2A`） |
| success / warning / danger / info | 只用于状态点、涨跌、风险 | `#2E7D52` / `#A15C07` / `#B3261E` / `#3B5B8C` |
| attention | 极少：风险提示条（白名单 §7.2） | `#C4320A` |

### 3.2 约束（换值必须满足）

- action 与白字对比度 ≥ 12:1；HSL 饱和度 ≤ 8%（即“近黑”，不能变成藏青、深绿）。
- 中性灰三档同一色相（暖 30–50°，饱和度 3–8%）；**禁止**冷蓝灰（这是 zinc/slate 的特征）。
- canvas 与 surface 明度差 4–6%；surface-subtle 介于两者之间。
- 状态色饱和度 ≤ 60%，只能以 ≤ 8px 的点、文字、细线出现；soft 底色只在提示条中使用。
- 禁止：绿色/藏青/靛蓝作主色、黄色/琥珀作主色或大面积底色。

### 3.3 映射到 UI 库

| 角色 | Ant Design 5 | Element Plus | shadcn/ui | MUI |
|---|---|---|---|---|
| canvas | `colorBgLayout` | `--el-bg-color-page` | `--background`（页面） | `palette.background.default` |
| surface | `colorBgContainer` | `--el-bg-color` | `--card` | `palette.background.paper` |
| surface-subtle | `colorFillQuaternary` / Table `headerBg` | `--el-fill-color-light` | `--muted` | `palette.grey[50]` |
| border | `colorBorderSecondary` | `--el-border-color-lighter` | `--border` | `palette.divider` |
| border-strong | `colorBorder` | `--el-border-color` | `--input` | `TextField` outline |
| text-1/2/3 | `colorText` / `colorTextSecondary` / `colorTextTertiary` | `--el-text-color-primary/regular/secondary` | `--foreground` / `--muted-foreground` | `palette.text.primary/secondary` |
| action | `colorPrimary` | `--el-color-primary` | `--primary` | `palette.primary.main` |
| status | `colorSuccess/Warning/Error/Info` | `--el-color-success/...` | 自定义 `--success` 等 | `palette.success/...` |
| radius | `borderRadius:6`, `borderRadiusLG:10` | `--el-border-radius-base:6px` | `--radius:0.625rem` | `shape.borderRadius:6` |
| 字体 | `fontFamily` | `--el-font-family` | `font-sans` | `typography.fontFamily` |

**注意 shadcn**：只换值不够，必须同时执行 §0.5 的三层底色与圆点状态，否则会退化成默认 shadcn 观感。Ant Design 需把 `colorPrimary` 设为近黑后，再把 `Button.primaryShadow` 设为 `none`、`Tag` 改为圆点 + 文字。

## 4. 字体排印

- 字族：Inter / Geist / SF Pro + PingFang SC / HarmonyOS Sans / Noto Sans CJK；等宽 Geist Mono / JetBrains Mono，只用于编号、单号、代码。**不用衬线。**
- 字号阶梯：12 / 13 / 14（默认）/ 16 / 22 / 26（页标题）/ 28（KPI 数字）。
- 字重：400 正文、550 按钮与选中、600 小标题与数字、650 页标题。
- 大字（≥22）字距 -0.02 ~ -0.03em；正文不改字距。
- 数字统一 tabular-nums；货币符号缩小一档、降为 text-3。

## 5. 间距、密度、圆角、层级

- 4px 基础网格；页面内边距 28×32，区块间距 20，卡内 18–20。
- 圆角：控件 6、卡片/槽 10、主面板 14、弹窗 12。不用胶囊按钮。
- 层级：画布 → 主面板（1px 边）→ 槽 → 白卡（1px 4% 黑描边）。阴影只给 dropdown / drawer / modal。
- 密度：默认行 44；三行记录行 58；紧凑模式 36（`data-density="compact"`）。

## 6. 版式模式

1. **页面骨架**：侧栏与画布同色、无分隔线；主内容是一块白色大面板，离窗口 8px，圆角 14。
2. **页面头**：标题 + 一行数字摘要（关键数字加粗 text-1，其余 text-3）+ 一行口径说明；主次按钮右对齐底边。
3. **KPI 组**：4 张白卡放在同一个浅灰槽里，间距 6；需关注的卡只加红色小标记，不换底色。
4. **表格**：表头是圆角浅灰条，无下边框；行分隔用 divider；选中行用 surface-subtle；批量操作条为砚墨实底，浮在表头之上。
5. **三行记录**：标题（500）/ 编号（等宽 12px text-3）/ 补充（12px text-3）。
6. **决策页**：左侧依次为“问题 → 建议 → 批准后会发生什么（3 个前后对比数字）→ 涉及条目”；右侧固定“审批摘要”，列出可撤销与不可撤销的后果（绿点 / 橙点），主按钮写对象、数量、金额。

## 7. 组件规则

- **按钮**：主（砚墨实底）每个区域最多 1 个；次（白底 + border-strong）；文字按钮；危险操作用次按钮 + danger 文字，确认弹窗里才出现红色实底。
- **§7.2 attention 白名单**：超时/逾期标记、不可撤销警告、通知红点。一屏 ≤ 2 处。
- **状态**：6px 圆点 + text-1 文字，不用彩色底胶囊。
- **焦点**：2px 砚墨 outline，偏移 2px；输入框聚焦为 text-1 边 + 3px 16% 砚墨环。
- **链接**：text-1 + 浅下划线，不用蓝色。
- **分段控件 / 标签页**：当前项白卡浮起（分段）或 2px 砚墨下划线（标签页）。

## 8. 落地步骤（任何库）

1. 按 §3.3 填 token；2. 关闭库默认阴影（卡片、按钮）；3. 实现三层底色骨架；4. Tag 改为圆点；5. 表头改浅灰圆角条；6. 用 §9 验收。

## 9. 验收清单

- [ ] 截图转灰度后，层次仍清楚（说明靠明度而非颜色）。
- [ ] 一屏彩色元素都能说出代表什么状态。
- [ ] 没有蓝、绿、黄作为主色或大面积底色。
- [ ] 页面头有数字摘要；有后果的按钮写清数量与可撤销性。
- [ ] 数字等宽、金额右对齐。

## 10. 不做的事

荧光强调色、胶囊按钮、每张卡不同底色、渐变、玻璃拟态、为截图好看的过松排版。

## 附录 · 版本记录

- v5.0（2026-10-15，R3）纸灰·砚墨：近黑主色、三层底色、去衬线、去等宽大写标签、新增决策页模式。
- v4.0（R2，4 分）暖石灰·靛墨·朱印。
- v3.0（R1，3 分）青石·朱印。
