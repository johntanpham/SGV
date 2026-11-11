// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sangabrielvalleymortgagebroker.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
