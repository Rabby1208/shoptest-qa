
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure'
  }
});
