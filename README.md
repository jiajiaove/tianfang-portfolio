# 田芳 · UI 设计师个人作品集

Astro + React TSX + TypeScript + Tailwind CSS v4 静态作品集。包含个人介绍、设计理念与按项目、业务和版本筛选的图片瀑布流。

## 本地开发

需要 Node.js 22.12 或更高版本（建议 Node.js 22 最新维护版）。

```sh
npm ci
npm run dev
```

打开终端显示的本地网址（默认 http://localhost:4321/tianfang-portfolio/）。

## 项目结构

- `src/components/Portfolio.tsx`：使用 React TSX 编写的页面内容与 Tailwind 类名。
- `src/pages/index.astro`：页面路由，组合布局和 React 组件。
- `src/layouts/Layout.astro`：HTML 外壳、页面标题和描述。
- `src/styles/global.css`：Tailwind 导入、主题颜色与基础样式。
- `astro.config.mjs`：React 集成、Tailwind Vite 插件和部署路径。

目前页面没有交互，React 组件在构建时生成 HTML。以后有 useState 或点击事件的组件，在 Astro 页面使用 `<YourComponent client:load />`，或用 `client:visible` 按需加载。组件内部继续使用普通 React 写法。

## 构建与预览

```sh
npm run build
npm run preview
```

构建会先检查 Astro 与 TypeScript，再输出静态文件到 `dist/`。

## GitHub Pages

将本目录内的源文件放在仓库根目录，保留 `.github/workflows/deploy.yml` 和 `package-lock.json`，不要提交 `node_modules`、`.astro`、`dist`、旧的 `.next` 或 `out`。

Settings → Pages → Source 保持 **GitHub Actions**。推送到 `main` 自动检查、构建并部署 `dist/`。不用另外创建 GitHub 的 Next.js 工作流。

默认网址：https://jiajiaove.github.io/tianfang-portfolio/

工作流会自动读取仓库名来配置子路径。若以后绑定自定义域名，设置构建环境变量 `SITE_URL=https://你的域名` 和 `BASE_PATH=/`，并在 Pages 设置里配置域名。

这次迁移删除了旧的 `app/`、`next.config.mjs`、`next-env.d.ts`、`postcss.config.mjs`；更新远程仓库时也请同步删除这些旧文件。推荐通过 Git 提交全部变更。

## 内容说明

生日及设计经验由用户提供；设计理念和第一人称简介为初稿。尚未添加具体项目、客户、软件技能或业绩，作品集提供后再补充。

## 作品集图片管理

- 项目配置：`src/data/projects.ts`。每个项目独立配置名称、简介、配色、业务顺序、版本顺序和图片清单。
- 图片清单：`src/data/projects/keygold.json`。包含中文标题、业务、版本、尺寸、英文路径和原始文件对应关系。
- 图片文件：`public/images/keygold/<业务英文名>/<版本英文名>/`。`thumbs/` 存放列表缩略图，同级 WebP 为完整原图。
- 原始素材保留在项目目录外的 `../KeyGold-Images/`，不修改原始文件。

当前 KeyGold 导入 122 张图，按首页与导航、商品与支付、订单与状态、账号与钱包、会员与营销、联盟与店铺、客服与帮助、品牌与内容划分业务；保留自适应改版、旧 PC 端、旧移动端版本。

添加其他项目时：

1. 创建 `public/images/<项目英文名>/<业务英文名>/<版本英文名>/`，放入英文命名的图片和缩略图。
2. 创建 `src/data/projects/<项目英文名>.json`，参照 KeyGold 的清单字段。
3. 在 `src/data/projects.ts` 导入清单并新增项目对象，使用独立项目 ID 和全局唯一的图片 ID。
4. 项目标签、业务分类和版本筛选会自动生成，展示组件无需修改。

点击瀑布流卡片可预览完整长图，支持上下滚动、上一张/下一张、左右方向键和 Esc 关闭。列表使用缩略图和延迟加载，预览时加载原图。

本机重新导入 KeyGold 素材可运行 `node scripts/import-keygold.mjs`（需保留上面的素材目录；使用 Astro 安装的 sharp 图片处理依赖）。英文文件名与原文件的对照保存在图片清单的 `source` 字段。
