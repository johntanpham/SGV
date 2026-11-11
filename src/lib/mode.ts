/**
 * Build mode.
 *  - "preview" (default): hidden. noindex on every page, X-Robots-Tag header,
 *    robots.txt disallows everything. Safe to deploy anywhere.
 *  - "production": indexable. Only `npm run launch` builds this.
 */
export type SiteMode = 'preview' | 'production';

export function getMode(): SiteMode {
  const raw = (import.meta.env?.SITE_MODE ?? process.env.SITE_MODE ?? 'preview') as string;
  return raw === 'production' ? 'production' : 'preview';
}

export const isPreview = (): boolean => getMode() === 'preview';
