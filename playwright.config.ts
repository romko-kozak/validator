import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    viewport: { width: 1080, height: 800 },  
  },
  projects: [
    {
      name: "app-chromium",
      use: { 
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:5173",
        viewport: { width: 1080, height: 800 },
      },
      testMatch: /password-validator\.spec\.ts/,
    },
    {
      name: "app-firefox",
      use: { 
        ...devices["Desktop Firefox"],
        baseURL: "http://localhost:5173",
        viewport: { width: 1080, height: 800 },
      },
      testMatch: /password-validator\.spec\.ts/,
    },
    {
      name: "app-webkit",
      use: { 
        ...devices["Desktop Safari"],
        baseURL: "http://localhost:5173",
        viewport: { width: 1080, height: 800 },
      },
      testMatch: /password-validator\.spec\.ts/,
    },
    {
      name: "storybook-chromium",
      use: { 
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:6006",
        viewport: { width: 1080, height: 800 },
      },
      testMatch: /components\/.*\.spec\.ts/,
    },
    {
      name: "storybook-firefox",
      use: { 
        ...devices["Desktop Firefox"],
        baseURL: "http://localhost:6006",
        viewport: { width: 1080, height: 800 },
      },
      testMatch: /components\/.*\.spec\.ts/,
    },
    {
      name: "storybook-webkit",
      use: { 
        ...devices["Desktop Safari"],
        baseURL: "http://localhost:6006",
        viewport: { width: 1080, height: 800 },
      },
      testMatch: /components\/.*\.spec\.ts/,
    },
  ],
  webServer: [
    {
      command: "yarn dev",
      url: "http://localhost:5173",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "yarn storybook",
      url: "http://localhost:6006",
      reuseExistingServer: !process.env.CI,
    }
  ],
});
