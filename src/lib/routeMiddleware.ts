import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { getVersionFromPath, getPathForVersion } from './versions';

export const onRequest = defineRouteMiddleware(async (context, next) => {
  await next();
  const routeData = context.locals.starlightRoute;
  if (!routeData) return;

  const pathname = context.url.pathname;
  const version = getVersionFromPath(pathname);

  if (!version.isLatest) {
    type SidebarEntry = (typeof routeData.sidebar)[number];

    const updateEntries = (entries: SidebarEntry[]): SidebarEntry[] => {
      return entries.map((entry) => {
        if (entry.type === 'link') {
          const href = getPathForVersion(entry.href, version.slug);
          const isCurrent = href === pathname || href === `${pathname}/` || `${href}/` === pathname;
          return {
            ...entry,
            href,
            isCurrent,
          };
        }
        if (entry.type === 'group') {
          return {
            ...entry,
            entries: updateEntries(entry.entries),
          };
        }
        return entry;
      });
    };

    if (routeData.sidebar) {
      routeData.sidebar = updateEntries(routeData.sidebar);
    }

    if (routeData.pagination) {
      if (routeData.pagination.prev?.href) {
        routeData.pagination.prev.href = getPathForVersion(
          routeData.pagination.prev.href,
          version.slug,
        );
      }
      if (routeData.pagination.next?.href) {
        routeData.pagination.next.href = getPathForVersion(
          routeData.pagination.next.href,
          version.slug,
        );
      }
    }
  }
});
