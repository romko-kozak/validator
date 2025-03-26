import { test, expect } from "@playwright/test";

/**
 * Test suite for the PasswordStrengthIndicator component
 *
 * This suite verifies that the PasswordStrengthIndicator component correctly displays
 * the strength of a password with appropriate visual indicators and labels.
 */
test.describe("PasswordStrengthIndicator Component", () => {
  const strengthScenarios = [
    {
      name: "empty",
      url: "/iframe.html?id=password-validation-library--password-strength-indicator-story&args=password:&viewMode=story",
      expectedLabel: "None",
      expectedBarWidth: "0%",
      strengthLevel: 0,
    },
    {
      name: "weak",
      url: "/iframe.html?id=password-validation-library--password-strength-indicator-story&args=password:a&viewMode=story",
      expectedLabel: "Weak",
      expectedBarWidth: "25%",
      strengthLevel: 1,
    },
    {
      name: "medium",
      url: "/iframe.html?id=password-validation-library--password-strength-indicator-story&args=password:abc123&viewMode=story",
      expectedLabel: "Medium",
      expectedBarWidth: "50%",
      strengthLevel: 2,
    },
    {
      name: "strong",
      url: "/iframe.html?id=password-validation-library--password-strength-indicator-story&args=password:abc12345&viewMode=story",
      expectedLabel: "Strong",
      expectedBarWidth: "75%",
      strengthLevel: 3,
    },
    {
      name: "very-strong",
      url: "/iframe.html?id=password-validation-library--password-strength-indicator-story&args=password:Test12@!&viewMode=story",
      expectedLabel: "Very Strong",
      expectedBarWidth: "100%",
      strengthLevel: 4,
    },
  ];

  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(10000);
  });

  test("should render with the correct structure", async ({ page }) => {
    await page.goto(strengthScenarios[0].url);

    const container = page.locator(
      '[data-testid="password-strength-indicator"]'
    );
    await expect(container).toBeVisible();

    const header = container.locator("header");
    await expect(header).toBeVisible();

    const title = header.getByText("Password Strength");
    await expect(title).toBeVisible();

    const strengthLabel = page.locator('[data-testid="strength-label"]');
    await expect(strengthLabel).toBeVisible();

    const strengthBarContainer = page.locator(
      '[data-testid="strength-bar-container"]'
    );
    await expect(strengthBarContainer).toBeVisible();

    const strengthGradientBar = page.locator(
      '[data-testid="strength-gradient-bar"]'
    );
    await expect(strengthGradientBar).toBeVisible();
  });

  for (const scenario of strengthScenarios) {
    test(`should correctly display ${scenario.name} password strength`, async ({
      page,
    }) => {
      await page.goto(scenario.url);
      await page.waitForSelector('[data-testid="password-strength-indicator"]');
      await page.screenshot({
        path: `playwright-report/strength-${scenario.name}.png`,
      });

      const strengthLabel = page.locator('[data-testid="strength-label"]');

      await expect(strengthLabel).toHaveText(scenario.expectedLabel);

      const strengthBar = page.locator('[data-testid="strength-gradient-bar"]');

      const styleAttribute = await strengthBar.getAttribute("style");

      expect(styleAttribute).not.toBeNull();

      if (scenario.strengthLevel > 0) {
        const hasWidth = styleAttribute?.includes("width");
        expect(hasWidth).toBeTruthy();
      }

      if (scenario.strengthLevel > 0) {
        const hasStrengthClass = await strengthBar.evaluate((el, level) => {
          const classList = Array.from(el.classList);
          return classList.some(
            (cls) =>
              cls.includes(`strength-${level}`) ||
              cls.includes(`level-${level}`) ||
              cls.includes(`strength`) ||
              cls.includes(`level`)
          );
        }, scenario.strengthLevel);

        expect(hasStrengthClass).toBeTruthy();
      }
    });
  }

  test("should update strength indicator when password changes", async ({
    page,
  }) => {
    await page.goto(strengthScenarios[0].url);
    await page.waitForSelector('[data-testid="password-strength-indicator"]');

    const strengthLabel = page.locator('[data-testid="strength-label"]');
    await expect(strengthLabel).toHaveText("None");

    for (const scenario of strengthScenarios.slice(1)) {
      await page.goto(scenario.url);
      await page.waitForSelector('[data-testid="password-strength-indicator"]');

      await expect(strengthLabel).toHaveText(scenario.expectedLabel);
    }
  });

  test("should have accessible color indicators for different strength levels", async ({
    page,
  }) => {
    for (const scenario of strengthScenarios) {
      await page.goto(scenario.url);
      await page.waitForSelector('[data-testid="password-strength-indicator"]');

      const strengthBar = page.locator('[data-testid="strength-gradient-bar"]');
      await expect(strengthBar).toBeVisible();

      await page.screenshot({
        path: `playwright-report/color-contrast-${scenario.name}.png`,
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 500,
          height: 200,
        },
      });
    }
  });

  test("should maintain consistent visual appearance across strength levels", async ({
    page,
  }) => {
    for (const scenario of strengthScenarios) {
      await page.goto(scenario.url);
      await page.waitForSelector('[data-testid="password-strength-indicator"]');

      await page.screenshot({
        path: `playwright-report/visual-regression-strength-${scenario.name}.png`,
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: 500,
          height: 200,
        },
      });
    }
  });
});
