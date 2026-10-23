# 后台设计语言 v75.0 · Round 73「阅读」

## R73 阅读 · 列表/表章阅读化（在 R72 章体之上）

本轮主刀：**把列表与订单章从中台控件壳推进阅读流**。继承轨 72、三章、open 去墙、详情 read-figs、页边 32@1280、字阶 22/15/13/12、钴只作 pri+选中、发丝纪律、禁紫。

| 面 | 做法 | 不做 |
|----|------|------|
| 列表滤栏 | `.bar.filt.text` 行内字控；无实体 `.sel` | 再砌 sunken 筛条 |
| 分组 | `.grp.ed` 专栏小标题 | 图标色条组头 |
| 行密度 | 去 sparkline；`.side-v.quiet` 时间；保留一枚安静 stt | 仪表盘火花线墙 |
| 订单章头 | `.ch-head` 收纳 soft-tabs + 文本查找 | tabs/搜仍困在 panel 顶 |
| 表 | `.ch-table` 轻 thead、阅读行距 | 裸中台表壳 |
| 待办提醒 | `.ch-note` + 叙事 + note-figs | `.alert.warn` 色块条 |
| 主轴 | 阅读流气质 | 再刷 pad/gap/定宽 |

## 继承（R71–R72，不可回退）

- 轨 `.side.rail` **72**；ops/orders 各 **≥3**×`.chapter`；`.panel.open` 去墙
- 详情 **无** `.tile.kpi`；用 `.ch-figs.read-figs`
- 章间无全宽发丝；figs/filt/tray/soft-h 去壳线
- `@≥1280` 页边 **32**；辅文 **12 / tx3**；`.stt.act`→info；严重数字 `--bad`
- 钴：主按钮 + 选中点缀；禁紫

## 字阶与疏密（维持）

页题 22/600 · 区题 15/600 · 正文 13 · 辅文 12；页边 32；区块靠留白。数字 Geist tabular。

## 自测门槛

lint_r73 TOTAL **0** · m73 FAILS **0**。盲评新尺：~70 已慷慨；禁微改灌分。
