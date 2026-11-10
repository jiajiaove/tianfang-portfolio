import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Actions supplies the repository so renamed repositories work too.
const [owner = 'jiajiaove', repository = 'tianfang-portfolio'] =
  (process.env.GITHUB_REPOSITORY ?? '').split('/').filter(Boolean);
const isProjectSite = !repository.endsWith('.github.io');

export default defineConfig({
  site: process.env.SITE_URL || `https://${owner}.github.io`,
  base: process.env.BASE_PATH ?? (isProjectSite ? `/${repository}` : '/'),
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
