import { getCollection } from 'astro:content';

export interface DocVersion {
  slug: string;
  label: string;
  isLatest: boolean;
}

export const VERSIONS: DocVersion[] = [
  { slug: '2.1', label: '2.1', isLatest: true },
  { slug: '2.0', label: '2.0', isLatest: false },
];

const DEFAULT_BASE = '/rajutara-documentation';

export function getLatestVersion(): DocVersion {
  return VERSIONS.find((v) => v.isLatest) ?? VERSIONS[0];
}

/** The ids of every page in the docs collection, e.g. `docs/2.0/workspaces/pds` or `id/docs/assistant`. */
export async function getDocIds(): Promise<Set<string>> {
  return new Set((await getCollection('docs')).map((entry) => entry.id));
}

function stripBase(pathname: string, base: string): string {
  const cleanBase = base.replace(/\/+$/, '');
  let rel = pathname;
  if (cleanBase && rel.startsWith(cleanBase)) {
    rel = rel.slice(cleanBase.length);
  }
  return rel.startsWith('/') ? rel : '/' + rel;
}

/** Whether a site path (with or without the base) is a page of the docs collection. */
export function hasDocPage(
  pathname: string,
  docIds: ReadonlySet<string>,
  base: string = DEFAULT_BASE,
): boolean {
  return docIds.has(stripBase(pathname, base).replace(/^\/+|\/+$/g, ''));
}

export function getVersionFromPath(pathname: string, base: string = DEFAULT_BASE): DocVersion {
  const rel = stripBase(pathname, base);
  const match = rel.match(/^(?:\/id)?\/docs\/(\d+\.\d+)(?:\/.*)?$/);
  if (match) {
    const slug = match[1];
    const found = VERSIONS.find((v) => v.slug === slug);
    if (found) return found;
    return { slug, label: slug, isLatest: false };
  }

  return getLatestVersion();
}

/**
 * The same page in another version. With `docIds`, a page that the target version does not have
 * resolves to that version's docs index instead of a 404.
 */
export function getPathForVersion(
  pathname: string,
  targetVersionSlug: string,
  docIds?: ReadonlySet<string>,
  base: string = DEFAULT_BASE,
): string {
  const cleanBase = base.replace(/\/+$/, '');
  const rel = stripBase(pathname, base);

  const isId = rel.startsWith('/id/docs');
  const docsPrefix = isId ? '/id/docs' : '/docs';

  if (!rel.startsWith(docsPrefix)) {
    return pathname;
  }

  const remainder = rel.slice(docsPrefix.length);
  const versionMatch = remainder.match(/^\/(\d+\.\d+)(\/.*)?$/);
  const pathWithoutVersion = versionMatch ? versionMatch[2] || '/' : remainder || '/';
  const page = pathWithoutVersion.startsWith('/') ? pathWithoutVersion : '/' + pathWithoutVersion;

  const targetVersion = VERSIONS.find((v) => v.slug === targetVersionSlug);
  const versionRoot = targetVersion?.isLatest ? docsPrefix : `${docsPrefix}/${targetVersionSlug}`;

  let newRel = `${versionRoot}${page}`;
  if (docIds && !hasDocPage(newRel, docIds, '')) {
    newRel = `${versionRoot}/`;
  }

  return cleanBase ? `${cleanBase}${newRel}` : newRel;
}
