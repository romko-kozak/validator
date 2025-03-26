import { z } from "zod";

/**
 * Regular expression pattern for identifying special characters
 * Includes most common special characters used in password complexity
 */
const specialCharRegex = /[!@#$%^&*()_\-+={}[\]|:;"'<,.>]/;

/**
 * Zod schema for password validation
 * Enforces complex password requirements:
 * - Minimum 6 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Password must contain at least one number",
  })
  .refine((value) => specialCharRegex.test(value), {
    message: "Password must contain at least one special character",
  });

/**
 * Zod schema for password form validation
 * Includes password and confirmation password fields
 * Ensures both passwords match
 */
export const passwordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Type inference for password form data
 * Automatically generated from the Zod schema
 */
export type PasswordFormData = z.infer<typeof passwordFormSchema>;

/**
 * Checks individual password rule compliance
 *
 * @param password - The password string to validate
 * @returns An object indicating which password rules are met
 */
export const checkPasswordRules = (password: string) => {
  return {
    minLength: password?.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: specialCharRegex.test(password),
  };
};

/**
 * Calculates a password strength score based on multiple factors
 *
 * Scoring mechanism:
 * - Base points from passed validation rules
 * - Extra points for longer passwords
 * - Maximum score of 4
 *
 * @param password - The password string to assess
 * @returns A strength score between 0 and 4
 */
export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;

  const rules = checkPasswordRules(password);
  const passedRules = Object.values(rules).filter(Boolean).length;

  // Additional strength factors
  let extraPoints = 0;
  if (password.length > 10) extraPoints += 0.5;
  if (password.length > 14) extraPoints += 0.5;

  const strength = Math.min(4, passedRules + extraPoints);
  return Math.max(0, strength);
};

/**
 * Provides a human-readable label for password strength
 *
 * @param strength - The numeric strength score
 * @returns A descriptive strength label
 */
export const getStrengthLabel = (strength: number): string => {
  const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  return labels[Math.floor(strength)];
};
