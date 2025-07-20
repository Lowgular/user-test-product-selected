import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src', // where your .spec.ts files live
  timeout: 30000, // max time per test in ms
  retries: 1, // retry once on CI
  reporter: [
    // console + HTML + JSON reports
    ['list'],
    ['json', { outputFile: 'test-results/e2e-report.json' }],
  ],
  use: {
    baseURL: process.env['APP_URL'] || 'http://localhost:4200',
    headless: true,
    actionTimeout: 10000, // max action time (clicks, fills)
    navigationTimeout: 20000,
    screenshot: 'only-on-failure', // save screenshots on failures
    video: 'retain-on-failure', // record videos on failures
    trace: 'on-first-retry', // collect trace only if retrying
    ignoreHTTPSErrors: true, // useful if you’re testing self-signed certs
    ...devices['Desktop Chrome'], // emulate desktop Chrome settings
  },
  projects: [
    { name: 'chromium' },
    // you can add firefox or webkit here if you like:
    // { name: 'firefox' },
    // { name: 'webkit' },
  ],
});
