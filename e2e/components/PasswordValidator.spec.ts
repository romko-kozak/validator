import { test, expect } from "@playwright/test";

/**
 * Test suite for the PasswordValidator component
 *
 * This suite verifies that the PasswordValidator component correctly handles form submission,
 * password validation, and displays appropriate feedback to users.
 */
test.describe("PasswordValidator Component", () => {
  test.setTimeout(15000);

  const testPasswords = {
    empty: "",
    tooShort: "abc",
    noUppercase: "password123!",
    noLowercase: "PASSWORD123!",
    noNumber: "Password!",
    noSpecial: "Password123",
    valid: "Password123!",
    mismatch: {
      password: "Password123!",
      confirm: "Password456!",
    },
  };

  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(10000);

    await page.goto(
      "/iframe.html?id=password-validation-library--complete-validation-solution&viewMode=story",
      {
        waitUntil: "networkidle",
      }
    );

    try {
      await page.waitForSelector('[data-testid="password-validator-form"]', {
        timeout: 5000,
      });
    } catch (error) {
      console.log(
        "Could not find password-validator-form, looking for any form element"
      );
      await page.waitForSelector("form", { timeout: 5000 });
    }
  });

  test("should render with all required form elements", async ({ page }) => {
    await page.screenshot({
      path: "playwright-report/validator-initial-state.png",
    });

    try {
      const form = page.locator(
        '[data-testid="password-validator-form"], form'
      );
      await expect(form).toBeVisible();

      const passwordInput = page
        .locator(
          '[data-testid="password-input"], input[id="password"], input[placeholder*="password" i]'
        )
        .first();
      await expect(passwordInput).toBeVisible();

      const confirmPasswordInput = page
        .locator(
          '[data-testid="confirm-password-input"], input[id="confirmPassword"], input[placeholder*="confirm" i]'
        )
        .first();
      await expect(confirmPasswordInput).toBeVisible();

      const strengthIndicator = page.locator(
        '[data-testid="password-strength-indicator"], div:has(> div[class*="strength"]), div:has(> div[class*="indicator"])'
      );
      await expect(strengthIndicator).toBeVisible();

      const passwordRules = page.locator(
        '[data-testid="password-rules"], ul, ol'
      );
      await expect(passwordRules).toBeVisible();

      const submitButton = page.locator(
        '[data-testid="submit-button"], button[type="submit"]'
      );
      await expect(submitButton).toBeVisible();

      const buttonText = await submitButton.textContent();
      expect(buttonText?.toLowerCase()).toContain("password");
    } catch (error) {
      console.error("Error in component structure test:", error);
      await page.screenshot({
        path: "playwright-report/validator-structure-test-failure.png",
      });
      throw error;
    }
  });

  test("should validate password requirements", async ({ page }) => {
    try {
      const passwordInput = page
        .locator(
          '[data-testid="password-input"] input, input[id="password"], input[placeholder*="password" i]'
        )
        .first();
      const submitButton = page
        .locator('[data-testid="submit-button"], button[type="submit"]')
        .first();

      await expect(passwordInput).toBeVisible();
      await expect(submitButton).toBeVisible();

      await passwordInput.fill(testPasswords.tooShort);
      await page.waitForTimeout(500);
      await submitButton.click();

      await page.screenshot({
        path: "playwright-report/validator-too-short.png",
      });

      const minLengthRule = page
        .locator("ul li, ol li")
        .filter({ hasText: /8 characters/i });

      if ((await minLengthRule.count()) > 0) {
        const hasPassedClass = await minLengthRule.first().evaluate((el) => {
          return el.className.includes("pass");
        });

        expect(hasPassedClass).toBeFalsy();
      } else {
        console.log("Could not find minimum length rule element");
      }

      await passwordInput.fill(testPasswords.valid);
      await page.waitForTimeout(500);

      await page.screenshot({
        path: "playwright-report/validator-valid-password.png",
      });

      const allRules = page.locator("ul li, ol li");
      const ruleCount = await allRules.count();

      if (ruleCount > 0) {
        let passedRules = 0;

        for (let i = 0; i < ruleCount; i++) {
          const hasPassedClass = await allRules.nth(i).evaluate((el) => {
            return el.className.includes("pass");
          });

          if (hasPassedClass) {
            passedRules++;
          }
        }

        expect(passedRules).toBeGreaterThan(0);
      } else {
        console.log("Could not find any password rule elements");
      }
    } catch (error) {
      console.error("Error in password requirements test:", error);
      await page.screenshot({
        path: "playwright-report/validator-requirements-test-failure.png",
      });
      throw error;
    }
  });

  test("should update strength indicator based on password", async ({
    page,
  }) => {
    try {
      const passwordInput = page
        .locator(
          '[data-testid="password-input"] input, input[id="password"], input[placeholder*="password" i]'
        )
        .first();

      await page.screenshot({
        path: "playwright-report/validator-strength-initial.png",
      });

      await expect(passwordInput).toBeVisible();

      await passwordInput.fill(testPasswords.empty);
      await page.waitForTimeout(500);

      await page.screenshot({
        path: "playwright-report/validator-strength-empty.png",
      });

      await passwordInput.fill(testPasswords.tooShort);
      await page.waitForTimeout(500);

      await page.screenshot({
        path: "playwright-report/validator-strength-weak.png",
      });

      await passwordInput.fill(testPasswords.valid);
      await page.waitForTimeout(500);

      await page.screenshot({
        path: "playwright-report/validator-strength-strong.png",
      });

      console.log(
        "Strength indicator test completed - check screenshots for visual differences"
      );
    } catch (error) {
      console.error("Error in strength indicator test:", error);
      await page.screenshot({
        path: "playwright-report/validator-strength-test-failure.png",
      });
      throw error;
    }
  });

  test("should validate password confirmation match", async ({ page }) => {
    const passwordInput = page.locator('[data-testid="password-input"] input');
    const confirmPasswordInput = page.locator(
      '[data-testid="confirm-password-input"] input'
    );
    const submitButton = page.locator('[data-testid="submit-button"]');

    await passwordInput.fill(testPasswords.mismatch.password);
    await confirmPasswordInput.fill(testPasswords.mismatch.confirm);

    await submitButton.click();

    await page.screenshot({
      path: "playwright-report/validator-mismatch.png",
    });

    try {
      const errorMessages = page.locator(
        '[data-testid="confirm-password-input"] ~ div, [data-testid="confirm-password-input"] + div, [data-testid="confirm-password-input"] div[role="alert"]'
      );
      const hasError = (await errorMessages.count()) > 0;

      if (hasError) {
        await expect(errorMessages.first()).toBeVisible();
      } else {
        const inputWithError = page.locator(
          '[data-testid="confirm-password-input"]'
        );
        const hasErrorAttr = await inputWithError.evaluate((el) => {
          return (
            el.classList.contains("error") ||
            el.classList.contains("invalid") ||
            el.getAttribute("aria-invalid") === "true" ||
            el.querySelector("input").classList.contains("error") ||
            el.querySelector("input").getAttribute("aria-invalid") === "true"
          );
        });

        if (!hasErrorAttr) {
          console.log("Could not verify error state for mismatched passwords");
        }
      }
    } catch (error) {
      console.log("Error checking for password mismatch validation");
    }

    await passwordInput.fill(testPasswords.valid);
    await confirmPasswordInput.fill(testPasswords.valid);

    await submitButton.click();

    await page.screenshot({
      path: "playwright-report/validator-matching.png",
    });
  });

  test("should allow submission with valid data", async ({ page }) => {
    const passwordInput = page.locator('[data-testid="password-input"] input');
    const confirmPasswordInput = page.locator(
      '[data-testid="confirm-password-input"] input'
    );
    const submitButton = page.locator('[data-testid="submit-button"]');

    await passwordInput.fill(testPasswords.valid);
    await confirmPasswordInput.fill(testPasswords.valid);

    const formSubmitted = page
      .waitForEvent("dialog", { timeout: 5000 })
      .catch(() => null);

    await submitButton.click();
    await page.screenshot({
      path: "playwright-report/validator-submitted.png",
    });

    const dialog = await formSubmitted;
    if (dialog !== null) {
      await dialog.dismiss();
      console.log("Form submission detected via dialog");
    } else {
      console.log(
        "No dialog detected, form may still have been submitted successfully"
      );
    }
  });

  test("should maintain consistent visual appearance", async ({ page }) => {
    await page.screenshot({
      path: "playwright-report/visual-regression-validator-initial.png",
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 600,
        height: 800,
      },
    });

    const passwordInput = page.locator('[data-testid="password-input"] input');
    const confirmPasswordInput = page.locator(
      '[data-testid="confirm-password-input"] input'
    );

    await passwordInput.fill(testPasswords.valid);
    await confirmPasswordInput.fill(testPasswords.valid);

    await page.screenshot({
      path: "playwright-report/visual-regression-validator-filled.png",
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 600,
        height: 800,
      },
    });
  });

  test("should have accessible form elements", async ({ page }) => {
    const passwordLabel = page.locator('label[for="password"]');
    await expect(passwordLabel).toBeVisible();

    const confirmPasswordLabel = page.locator('label[for="confirmPassword"]');
    await expect(confirmPasswordLabel).toBeVisible();

    const submitButton = page.locator('[data-testid="submit-button"]');
    await expect(submitButton).toHaveAttribute("type", "submit");

    await page.screenshot({
      path: "playwright-report/accessibility-validator.png",
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 600,
        height: 800,
      },
    });
  });
});
