export const REPO = 'https://github.com/optirust/optirust';

/** The release the downloads section and the docs point at. Bump both fields for a new release. */
export const RELEASE = { version: '1.0.0', tag: 'v1.0.0' } as const;

export const RELEASES_URL = `${REPO}/releases`;

/** Direct link to a file attached to the current release. */
export const assetUrl = (file: string): string =>
  `${REPO}/releases/download/${RELEASE.tag}/${file}`;

/** Prefix a site path (starting with `/`) with the Astro base, so links work under any Pages address. */
export const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/+$/, '')}${path}`;

export const SITE_DESCRIPTION =
  'Open-source apparel CAD for garment workshops: pattern design, grading, marker making and cut planning.';
