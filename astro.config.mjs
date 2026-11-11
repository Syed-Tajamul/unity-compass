import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://unitycompass.com',
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind(), sitemap()],
});

