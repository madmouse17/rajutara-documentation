import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { getDocIds, getVersionFromPath, getPathForVersion, hasDocPage } from './versions';

export const onRequest = defineRouteMiddleware(async (context, next) => {
  await next();
  const routeData = context.locals.starlightRoute;
  if (!routeData) return;

  const pathname = context.url.pathname;
  const version = getVersionFromPath(pathname);

  if (!version.isLatest) {
    type SidebarEntry = (typeof routeData.sidebar)[number];
    type SidebarLink = Extract<SidebarEntry, { type: 'link' }>;
    const docIds = await getDocIds();

    // An archived version lacks the pages added after it: drop their links and any group left empty.
    const updateEntries = (entries: SidebarEntry[]): SidebarEntry[] =>
      entries.flatMap((entry): SidebarEntry[] => {
        if (entry.type === 'link') {
          const href = getPathForVersion(entry.href, version.slug);
          if (!hasDocPage(href, docIds)) return [];
          const isCurrent = href === pathname || href === `${pathname}/` || `${href}/` === pathname;
          return [{ ...entry, href, isCurrent }];
        }
        const children = updateEntries(entry.entries);
        return children.length ? [{ ...entry, entries: children }] : [];
      });

    const flatten = (entries: SidebarEntry[]): SidebarLink[] =>
      entries.flatMap((entry) => (entry.type === 'link' ? [entry] : flatten(entry.entries)));

    routeData.sidebar = updateEntries(routeData.sidebar);

    // Prev and next follow the trimmed sidebar, so they never point at a page this version lacks.
    const links = flatten(routeData.sidebar);
    const current = links.findIndex((link) => link.isCurrent);
    if (current !== -1) {
      if (routeData.pagination.prev) routeData.pagination.prev = links[current - 1];
      if (routeData.pagination.next) routeData.pagination.next = links[current + 1];
    }
  }
});
