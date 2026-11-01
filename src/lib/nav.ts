import { REPO, withBase } from './site';

export interface NavItem {
  label: string;
  href: string;
  /** Points outside the site: opens as a normal link and carries a marker for it. */
  external?: boolean;
  /** Name of an icon in src/icons (the application's own toolbar icons). */
  icon?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** The four groups of the top bar, also used by the small-screen menu and the footer. */
export const NAV: NavGroup[] = [
  {
    label: 'Product',
    items: [
      { label: 'PDS', href: withBase('/#pds'), icon: 'draft' },
      { label: 'Grading', href: withBase('/#grading'), icon: 'graded-nest' },
      { label: 'Marker', href: withBase('/#marker'), icon: 'marker-nest' },
      { label: 'Cut Plan', href: withBase('/#cut-plan'), icon: 'solve' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { label: 'Docs', href: withBase('/docs/') },
      { label: 'Getting started', href: withBase('/docs/getting-started/') },
      { label: 'Workflows', href: withBase('/docs/workflows/') },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Downloads', href: withBase('/#download') },
      { label: 'Gallery', href: withBase('/gallery/') },
      { label: 'Roadmap', href: withBase('/docs/roadmap/') },
      { label: 'Changelog', href: `${REPO}/blob/main/CHANGELOG.md`, external: true },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'Clean room', href: withBase('/docs/contributing/#the-clean-room-rule') },
      { label: 'Contributing', href: withBase('/docs/contributing/') },
      { label: 'GitHub', href: REPO, external: true },
    ],
  },
];
