import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { getMode } from '../lib/mode';

/** AI crawlers we welcome by name. */
export const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export function robotsBody(mode: 'preview' | 'production'): string {
  if (mode === 'preview') {
    return ['# Hidden preview: nothing here should be indexed.', 'User-agent: *', 'Disallow: /', ''].join('\n');
  }
  const rules = ['Allow: /', 'Disallow: /search', 'Disallow: /*?', 'Disallow: /keystatic', 'Disallow: /api/'];
  const lines = ['User-agent: *', ...rules, ''];
  for (const bot of AI_CRAWLERS) lines.push(`User-agent: ${bot}`, ...rules, '');
  lines.push(`Sitemap: ${site.origin}/sitemap-index.xml`, '');
  return lines.join('\n');
}

export const GET: APIRoute = () =>
  new Response(robotsBody(getMode()), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
