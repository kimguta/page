import { subPageDefinitions } from './sitePages';

export const menuItems = subPageDefinitions.map(({ id, label, href, cmsKey }) => ({
  id,
  label,
  href,
  cmsKey,
}));
