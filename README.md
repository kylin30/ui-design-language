# 后台 UI 设计语言（评审站）

一套与具体 UI 库无关的后台视觉规范，按「出设计 → 打分 → 再设计」循环迭代。

**固定地址：** https://kylin30.github.io/ui-design-language/

## 目录
- `index.html` 首页：所有轮次（新的在前）、截图、摘要、反馈汇总
- `rounds.json` 轮次清单
- `rounds/rN/` 每轮：`demo.html` 演示页、`spec.html` 规范阅读版、`STYLE.md` 规范原文、`reference-tokens.css` 参考取值、`screenshot.png`
- `assets/` 共享样式与反馈面板脚本
- `rounds.md` 轮次记录，`inspiration-log.md` 案例日志

## 新增一轮
1. 新建 `rounds/r2/`，放入上面五个文件（演示页里 `reference-tokens.css` 用相对路径）。
2. 在 `demo.html`、`spec.html` 的 `</body>` 前加：
   ```html
   <link rel="stylesheet" href="../../assets/feedback.css">
   <script src="../../assets/feedback.js" data-round="r2" defer></script>
   ```
3. 在 `rounds.json` 加一条（id、title、version、date、status、summary、screenshot、demo、spec、tokens）。首页自动按日期倒序，并用最新一轮的 tokens 着色。

## 反馈怎么用
- 演示页和规范页右下角有反馈面板：选 1–10 分，写下喜欢/不喜欢/其他想法，点「去 GitHub 提交」。
- 会打开本仓库的新建 Issue 页面，标题形如 `[R1] 评分 8/10`，内容已预填，登录 GitHub 后点 Submit 即可。
- 页面会通过 GitHub 公共接口读取已有反馈（按标题前缀 `[R1]` 筛选）只读展示；接口受限时不影响提交。
- 也可以直接在 Issues 里用「设计评分反馈」模板。
- 建议在仓库里建好 `feedback`、`round-1` 标签（没有也能用）。
