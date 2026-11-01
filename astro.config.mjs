// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repository at https://madmouse17.github.io/rajutara-documentation/. Every link
// and asset goes through the base: Astro and Starlight add it themselves, our components use withBase()
// (src/lib/site.ts) and the Markdown content uses relative links, so it works under any base.
const site = 'https://madmouse17.github.io';
const base = '/rajutara-documentation';

const publicUrl = (/** @type {string} */ path) => new URL(`${base}${path}`, site).href;

const repo = 'https://github.com/madmouse17/rajutara';
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
      title: 'Rajutara',
      description,
      logo: { src: './src/assets/logo/rajutara-128.png', alt: '' },
      favicon: '/favicon.png',
      social: [{ icon: 'github', label: 'Rajutara on GitHub', href: repo }],
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
          items: [
            { slug: 'docs', translations: { id: 'Dokumentasi Rajutara' } },
            { slug: 'docs/getting-started', translations: { id: 'Memulai' } },
            { slug: 'docs/workflows', translations: { id: 'Alur kerja' } },
          ],
        },
        {
          label: 'Workspaces',
          translations: { id: 'Ruang kerja' },
          items: [
            { slug: 'docs/workspaces/pds', translations: { id: 'PDS, desain pola' } },
            { slug: 'docs/workspaces/grading', translations: { id: 'Grading' } },
            { slug: 'docs/workspaces/marker', translations: { id: 'Marker' } },
            { slug: 'docs/workspaces/cut-plan', translations: { id: 'Rencana Potong (Cut Plan)' } },
          ],
        },
        {
          label: 'Reference',
          translations: { id: 'Referensi' },
          items: [
            { slug: 'docs/formats', translations: { id: 'Format berkas' } },
            { slug: 'docs/headless', translations: { id: 'Headless dan agen' } },
            { slug: 'docs/windows-7', translations: { id: 'Windows 7' } },
            { slug: 'docs/glossary', translations: { id: 'Glosarium' } },
          ],
        },
        {
          label: 'Project',
          translations: { id: 'Proyek' },
          items: [
            { slug: 'docs/roadmap', translations: { id: 'Peta jalan' } },
            { slug: 'docs/parity-checklist', translations: { id: 'Daftar periksa paritas' } },
            { slug: 'docs/changelog', translations: { id: 'Catatan perubahan' } },
            { slug: 'docs/contributing', translations: { id: 'Berkontribusi' } },
          ],
        },
      ],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
