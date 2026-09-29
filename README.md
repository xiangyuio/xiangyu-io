# xiangyu.io

吕翔宇的个人主页 · <https://xiangyu.io>

一个单页静态站点，纯手写 HTML / CSS / JavaScript，**零第三方依赖**：没有框架、没有构建步骤、没有 npm 包、没有外部字体、没有 CDN、没有统计脚本。所有资源都由本站自己提供，因此它在任何网络环境、任何设备上都能正常打开——包括十年后。

页面的 HTML、CSS 与 JavaScript 由我和 Qwen 3.8 Max 逐行共同写成。

## 特性

- **零依赖**：三个源文件（`index.html`、`assets/style.css`、`assets/main.js`）就是全部代码，字体使用系统字体栈。
- **深浅色主题**：跟随系统 `prefers-color-scheme`，可手动切换，选择保存在 `localStorage`（key 为 `xy-theme`）。`<head>` 内联脚本在首帧前设置 `data-theme`，避免闪白；`theme-color` 由 CSS 变量 `--bg` 动态写入，随主题变化。
- **渐进增强**：入场动画、滚动高亮等依赖 JS 的效果挂在 `html.js` 类下；禁用 JavaScript 时内容依然完整可读（404 页刻意不加 `.reveal`，无 JS 也直接可见）。
- **无障碍**：调色板按 WCAG AA 调校，正文与次要文字对 `--bg` 的对比度均 ≥ 4.5:1；两套主题都声明了 `color-scheme`；主题切换按钮暴露 `aria-pressed`，邮箱复制按钮使用 `aria-live`；`prefers-reduced-motion` 下关闭动画。
- **SEO**：canonical、Open Graph、Twitter Card、Person 类型的 JSON-LD，外加 `robots.txt`、`sitemap.xml`；404 页标记 `noindex`。

## 目录结构

```
.
├── index.html          # 单页主体（关于 + 联系）
├── 404.html            # 自定义 404，资源用绝对路径，可在任意深度命中
├── robots.txt
├── sitemap.xml
├── LICENSE             # MIT，覆盖代码部分
├── NOTICE              # 头像、文案与 xiangyu.io 标识保留所有权利
└── assets/
    ├── style.css       # 全部样式，CSS 变量驱动主题
    ├── main.js         # 主题切换、滚动吸顶、入场动画、邮箱复制
    └── img/
        ├── avatar.jpg              # 头像，同时用作 og:image
        └── apple-touch-icon.png    # 180×180，同时用作 favicon
```

## 本地预览

不需要安装任何依赖，起一个静态服务器即可：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 许可

双许可，详见 [LICENSE](LICENSE) 与 [NOTICE](NOTICE)：

- **代码**（`index.html`、`404.html`、`assets/style.css`、`assets/main.js` 等）：MIT，欢迎自由参考、复用、改造。
- **个人内容**（`assets/img/` 下的图片、全部文案、姓名与「xiangyu.io」标识）：保留所有权利，不在 MIT 范围内。

想 fork 去搭自己的主页？代码随便用，但请把头像、文案和署名全部换成你自己的。

## 联系

lyu@xiangyu.io · [GitHub](https://github.com/xiangyuio) · [X](https://x.com/xiangyuio)

© 2026 吕翔宇
