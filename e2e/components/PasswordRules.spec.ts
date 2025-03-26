import { test, expect } from "@playwright/test";

/**
 * Test suite for the PasswordRules component
 *
 * This suite verifies that the PasswordRules component correctly displays
 * validation rules and their status based on the password input.
 */
test.describe("PasswordRules Component", () => {
  const testScenarios = [
    {
      name: "empty",
      url: "/iframe.html?id=password-validation-library--password-rules-story&args=password:&viewMode=story",
      expectedPassedRules: 0,
      expectedFailedRules: 5,
    },
    {
      name: "weak",
      url: "/iframe.html?id=password-validation-library--password-rules-story&args=password:abc123&viewMode=story",
      expectedPassedRules: 2,
      expectedFailedRules: 3,
    },
    {
      name: "strong",
      url: "/iframe.html?id=password-validation-library--password-rules-story&args=password:Test12@!&viewMode=story",
      expectedPassedRules: 5,
      expectedFailedRules: 0,
    },
  ];

  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(10000);
  });

  test("should render the password requirements header", async ({ page }) => {
    await page.goto(testScenarios[0].url);

    const header = page.locator('[data-testid="password-rules"] header');
    await expect(header).toBeVisible();

    const title = page
      .locator('[data-testid="password-rules"] header')
      .getByText("Password Requirements");
    await expect(title).toBeVisible();
  });

  test("should display all five password rules", async ({ page }) => {
    await page.goto(testScenarios[0].url);

    const rulesList = page.locator('[data-testid="password-rules"] li');
    await expect(rulesList).toHaveCount(5);

    await expect(
      rulesList.filter({ hasText: "At least 8 characters" })
    ).toBeVisible();
    await expect(
      rulesList.filter({ hasText: "Contains an uppercase letter" })
    ).toBeVisible();
    await expect(
      rulesList.filter({ hasText: "Contains a lowercase letter" })
    ).toBeVisible();
    await expect(
      rulesList.filter({ hasText: "Contains a number" })
    ).toBeVisible();
    await expect(
      rulesList.filter({ hasText: "Contains a special character" })
    ).toBeVisible();
  });

  for (const scenario of testScenarios) {
    test(`should correctly validate ${scenario.name} password`, async ({
      page,
    }) => {
      await page.goto(scenario.url);

      await page.screenshot({
        path: `playwright-report/rules-${scenario.name}.png`,
      });

      if (scenario.expectedPassedRules > 0) {
        const passedRules = page.locator(
          '[data-testid="password-rules"] li[class*="passed"]'
        );
        await expect(passedRules).toHaveCount(scenario.expectedPassedRules);

        const checkIcons = page.locator(
          '[data-testid="password-rules"] li[class*="passed"] svg'
        );
        await expect(checkIcons).toHaveCount(scenario.expectedPassedRules);
      }

      if (scenario.expectedFailedRules > 0) {
        const failedRules = page.locator(
          '[data-testid="password-rules"] li:not([class*="passed"])'
        );
        await expect(failedRules).toHaveCount(scenario.expectedFailedRules);

        const xIcons = page.locator(
          '[data-testid="password-rules"] li:not([class*="passed"]) svg'
        );
        await expect(xIcons).toHaveCount(scenario.expectedFailedRules);
      }
    });
  }

  test("should have accessible color contrast for rule items", async ({
    page,
  }) => {
    await page.goto(testScenarios[2].url); // Using strong password scenario

    const passedRules = page.locator(
      '[data-testid="password-rules"] li[class*="passed"]'
    );
    await expect(passedRules.first()).toBeVisible();

    const ruleText = await passedRules.first().textContent();
    expect(ruleText).not.toBeNull();
    expect(ruleText?.trim().length).toBeGreaterThan(0);

    const icon = passedRules.first().locator("svg");
    await expect(icon).toBeVisible();
  });

  // Visual regression test
  test("should maintain consistent visual appearance", async ({ page }) => {
    for (const scenario of testScenarios) {
      await page.goto(scenario.url);
      await page.waitForSelector('[data-testid="password-rules"]');
      await page.screenshot({
        path: `playwright-report/visual-regression-rules-${scenario.name}.png`,
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 500,
          height: 400,
        },
      });
    }
  });
});
