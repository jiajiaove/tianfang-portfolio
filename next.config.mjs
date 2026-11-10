// GitHub project sites live under /repository-name; user sites live at /.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath = process.env.GITHUB_ACTIONS === 'true' && repository && !repository.endsWith('.github.io')
  ? `/${repository}`
  : '';

export default {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};
