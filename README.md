# 田芳 · Next.js UI 设计师个人作品集

一个无外部字体和图片依赖的 UI 设计师个人介绍页，包含田芳的简介、5 年设计经验、生日、设计理念及待补充的作品集位置。适合测试 GitHub Pages。使用 Next.js App Router，构建时生成静态网页。

## 本地运行

需要 Node.js 22。

```sh
npm ci
npm run dev
```

打开 http://localhost:3000。修改 `app/page.tsx` 的文字、TSX 中的 Tailwind 类名和 `app/globals.css` 的主题样式即可。

## 上传到 GitHub Pages

1. 在 GitHub 创建一个公开仓库，名字可以叫 `my-blog`，也可以叫 `你的用户名.github.io`。
2. 将**本目录内的所有源文件**上传到仓库根目录。不要把整个 `tianfang-portfolio` 文件夹作为外层目录上传；不要上传 `node_modules`、`.next` 或 `out`。
3. 必须包含隐藏目录 `.github/workflows/deploy.yml`、`.gitignore` 和 `package-lock.json`。使用 Git 推送最容易保留隐藏文件；网页上传时请检查工作流是否存在。
4. 进入仓库 Settings → Pages → Build and deployment → Source，选择 **GitHub Actions**。这个 Next.js 项目不要选择 Deploy from a branch。
5. 确认默认分支为 `main`。进入 Actions，选择 Deploy Tian Fang portfolio to GitHub Pages → Run workflow，或者再推送一次代码。
6. 等待工作流成功，在 Settings → Pages 查看网站链接。

普通仓库地址为 `https://你的用户名.github.io/仓库名/`；用户名站点仓库为 `https://你的用户名.github.io/`。配置会自动识别仓库名，处理静态资源路径。以后推送到 `main` 自动部署。

如果以后绑定自定义域名，请同时将 `next.config.mjs` 的 `basePath` 改为 `''`，并在 GitHub Pages 设置中配置域名。

## 验证构建

```sh
npm run build
```

输出在 `out/`。GitHub Pages 只运行静态网页，不提供 Next.js 服务端接口、登录后台或数据库。该演示公开可访问，不包含访问限制。

## 内容说明

生日及设计经验由用户提供；设计理念和第一人称简介为初稿，正式发布前可由田芳确认。尚未添加具体项目、客户、软件技能或业绩，作品集提供后再补充。

技术栈：Next.js App Router + TypeScript（严格类型检查）+ Tailwind CSS v4。PostCSS 配置在 `postcss.config.mjs`，Tailwind 主题在 `app/globals.css`。
