import { defineConfig, devices } from '@playwright/test';

const chrome = { launchOptions: { executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome' } };

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4321' },
  webServer: {
    command: 'npx wrangler dev --ip 127.0.0.1 --port 4321 --log-level warn',
    url: 'http://127.0.0.1:4321/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: 'phone', use: { ...devices['Pixel 7'], ...chrome } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, ...chrome } },
  ],
});
