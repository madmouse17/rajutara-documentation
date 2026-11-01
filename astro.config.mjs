// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repository at https://madmouse17.github.io/optirust-documentation/. Every link
// and asset goes through the base: Astro and Starlight add it themselves, our components use withBase()
// (src/lib/site.ts) and the Markdown content uses relative links, so it works under any base.
const site = 'https://madmouse17.github.io';
const base = '/optirust-documentation';

const publicUrl = (/** @type {string} */ path) => new URL(`${base}${path}`, site).href;

const repo = 'https://github.com/optirust/optirust';
const description =
  'Open-source apparel CAD for garment workshops: pattern design, grading, marker making and cut planning.';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [
    icon(),
    starlight({
      title: 'optirust',
      description,
      logo: { src: './src/assets/logo/optirust-128.png', alt: '' },
      favicon: '/favicon.png',
      social: [{ icon: 'github', label: 'optirust on GitHub', href: repo }],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        id: { label: 'Bahasa Indonesia', lang: 'id' },
      },
      customCss: [
        '@fontsource-variable/geist/wght.css',
        '@fontsource-variable/geist-mono/wght.css',
        './src/styles/tokens.css',
        './src/styles/docs.css',
      ],
      components: {
        ThemeProvider: './src/components/docs/ThemeProvider.astro',
        ThemeSelect: './src/components/docs/ThemeSelect.astro',
        SiteTitle: './src/components/docs/SiteTitle.astro',
        SocialIcons: './src/components/docs/SocialIcons.astro',
      },
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#07152d' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${base}/apple-touch-icon.png` } },
        { tag: 'meta', attrs: { property: 'og:image', content: publicUrl('/og.jpg') } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: publicUrl('/og.jpg') } },
      ],
      sidebar: [
        {
          label: 'Start',
          translations: { id: 'Mulai' },
          items: [{ slug: 'docs' }, { slug: 'docs/getting-started' }],
        },
        {
          label: 'Workspaces',
          translations: { id: 'Ruang kerja' },
          items: [
            { slug: 'docs/workspaces/pds' },
            { slug: 'docs/workspaces/grading' },
            { slug: 'docs/workspaces/marker' },
            { slug: 'docs/workspaces/cut-plan' },
          ],
        },
        {
          label: 'Reference',
          translations: { id: 'Referensi' },
          items: [
            { slug: 'docs/formats' },
            { slug: 'docs/headless' },
            { slug: 'docs/windows-7' },
            { slug: 'docs/glossary' },
          ],
        },
        {
          label: 'Project',
          translations: { id: 'Proyek' },
          items: [
            { slug: 'docs/roadmap' },
            { slug: 'docs/parity-checklist' },
            { slug: 'docs/contributing' },
          ],
        },
      ],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
