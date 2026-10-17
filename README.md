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
- 演示页和规范页右下角有反馈面板：**拖动滑块打 0–100 分**（百分制，步长 1；也可以用方向键、Home/End 调整），大号数字实时显示分数。拖动或按键之前不能提交。写下喜欢/不喜欢/其他想法后点「提交 N 分」。
- 反馈直接写入 Supabase，提交后列表立刻刷新，不需要登录。
- 历史上的 1–10 分（R11–R20）按 ×10 换算显示，并标「旧制 x/10」。
- 数据约定见 tools/FEEDBACK.md。
