import { href, t, type Lang } from './i18n';
import { REPO } from './site';

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
export const navFor = (lang: Lang): NavGroup[] => [
  {
    label: t(lang, 'nav.product'),
    items: [
      { label: 'PDS', href: href(lang, '/#pds'), icon: 'draft' },
      { label: 'Grading', href: href(lang, '/#grading'), icon: 'graded-nest' },
      { label: 'Marker', href: href(lang, '/#marker'), icon: 'marker-nest' },
      { label: 'Cut Plan', href: href(lang, '/#cut-plan'), icon: 'solve' },
    ],
  },
  {
    label: t(lang, 'nav.learn'),
    items: [
      { label: t(lang, 'nav.docs'), href: href(lang, '/docs/') },
      { label: t(lang, 'nav.gettingStarted'), href: href(lang, '/docs/getting-started/') },
      { label: t(lang, 'nav.workflows'), href: href(lang, '/docs/workflows/') },
    ],
  },
  {
    label: t(lang, 'nav.resources'),
    items: [
      { label: t(lang, 'nav.downloads'), href: href(lang, '/#download') },
      { label: t(lang, 'nav.gallery'), href: href(lang, '/gallery/') },
      { label: t(lang, 'nav.roadmap'), href: href(lang, '/docs/roadmap/') },
      {
        label: t(lang, 'nav.changelog'),
        href: `${REPO}/blob/main/CHANGELOG.md`,
        external: true,
      },
    ],
  },
  {
    label: t(lang, 'nav.about'),
    items: [
      {
        label: t(lang, 'nav.cleanRoom'),
        href: href(
          lang,
          lang === 'id'
            ? '/docs/contributing/#aturan-clean-room'
            : '/docs/contributing/#the-clean-room-rule',
        ),
      },
      { label: t(lang, 'nav.contributing'), href: href(lang, '/docs/contributing/') },
      { label: 'GitHub', href: REPO, external: true },
    ],
  },
];
