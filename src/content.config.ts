import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader({
      generateId: ({ entry, data }) => {
        if (data.slug) return String(data.slug);
        let id = entry.replace(/\.[^/.]+$/, '');
        if (id.endsWith('/index')) {
          id = id.slice(0, -'/index'.length);
        }
        return id;
      },
    }),
    schema: docsSchema(),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
