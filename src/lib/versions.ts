export interface DocVersion {
  slug: string;
  label: string;
  isLatest: boolean;
}

export const VERSIONS: DocVersion[] = [{ slug: '2.0', label: '2.0', isLatest: true }];

export function getLatestVersion(): DocVersion {
  return VERSIONS.find((v) => v.isLatest) ?? VERSIONS[0];
}

export function getVersionFromPath(
  pathname: string,
  base: string = '/rajutara-documentation',
): DocVersion {
  const cleanBase = base.replace(/\/+$/, '');
  let rel = pathname;
  if (cleanBase && rel.startsWith(cleanBase)) {
    rel = rel.slice(cleanBase.length);
  }
  if (!rel.startsWith('/')) {
    rel = '/' + rel;
  }

  const match = rel.match(/^(?:\/id)?\/docs\/(\d+\.\d+)(?:\/.*)?$/);
  if (match) {
    const slug = match[1];
    const found = VERSIONS.find((v) => v.slug === slug);
    if (found) return found;
    return { slug, label: slug, isLatest: false };
  }

  return getLatestVersion();
}

export function getPathForVersion(
  pathname: string,
  targetVersionSlug: string,
  base: string = '/rajutara-documentation',
): string {
  const cleanBase = base.replace(/\/+$/, '');
  let rel = pathname;
  if (cleanBase && rel.startsWith(cleanBase)) {
    rel = rel.slice(cleanBase.length);
  }
  if (!rel.startsWith('/')) {
    rel = '/' + rel;
  }

  const isId = rel.startsWith('/id/docs');
  const docsPrefix = isId ? '/id/docs' : '/docs';

  if (!rel.startsWith(docsPrefix)) {
    return pathname;
  }

  const remainder = rel.slice(docsPrefix.length);
  const versionMatch = remainder.match(/^\/(\d+\.\d+)(\/.*)?$/);
  const pathWithoutVersion = versionMatch ? versionMatch[2] || '/' : remainder || '/';

  const targetVersion = VERSIONS.find((v) => v.slug === targetVersionSlug);
  const isTargetLatest = targetVersion ? targetVersion.isLatest : false;

  let newRel: string;
  if (isTargetLatest) {
    newRel = `${docsPrefix}${pathWithoutVersion.startsWith('/') ? pathWithoutVersion : '/' + pathWithoutVersion}`;
  } else {
    const cleanRemainder = pathWithoutVersion.startsWith('/')
      ? pathWithoutVersion
      : '/' + pathWithoutVersion;
    newRel = `${docsPrefix}/${targetVersionSlug}${cleanRemainder === '/' ? '/' : cleanRemainder}`;
  }

  return cleanBase ? `${cleanBase}${newRel}` : newRel;
}
