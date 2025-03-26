import type { Meta, StoryObj } from "@storybook/react";
import { PasswordValidator } from "components/PasswordValidator/PasswordValidator";
import PasswordRules from "components/PasswordRules/PasswordRules";
import PasswordStrengthIndicator from "components/PasswordStrengthIndicator/PasswordStrengthIndicator";
import { Form } from "components/PasswordValidator/styles";
import PasswordInput from "components/PasswordInput";
import { useArgs } from "@storybook/preview-api";
import { FieldError } from "react-hook-form";

/**
 * # Password Validation Library
 *
 * A comprehensive set of components for password validation, strength indication, and rule checking.
 *
 * ## Components
 *
 * - **PasswordValidator**: Main form component that handles password input and validation
 * - **PasswordRules**: Displays password validation rules and their status
 * - **PasswordStrengthIndicator**: Visual indicator of password strength
 *
 * ## Installation
 *
 * ```bash
 * npm install password-validator
 * # or
 * yarn add password-validator
 * ```
 *
 * ## Usage
 *
 * ```tsx
 * import { PasswordValidator } from 'components/PasswordValidator';
 *
 * function App() {
 *   const handleSubmit = (data) => {
 *     console.log('Password validated:', data);
 *   };
 *
 *   return (
 *     <PasswordValidator onSubmit={handleSubmit} />
 *   );
 * }
 * ```
 */
const meta = {
  title: "Password Validation Library",
  component: PasswordValidator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive set of components for password validation, strength indication, and rule checking.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Define types for each component story
type PasswordStrengthStory = StoryObj<{ password: string }>;
type PasswordRulesStory = StoryObj<{ password: string }>;
type PasswordInputStory = StoryObj<{
  password: string;
  showError: boolean;
  errorMessage: string;
}>;

/**
 * ## Complete Password Validation Solution
 *
 * This example demonstrates the complete password validation solution with all components working together.
 * The `PasswordValidator` component includes both the `PasswordRules` and `PasswordStrengthIndicator` components.
 *
 * ### Features
 *
 * - Real-time password strength indication
 * - Password rule validation
 * - Password visibility toggle
 * - Form validation with error handling
 */
export const CompleteValidationSolution: Story = {
  args: {
    className: "",
  },
  argTypes: {
    onSubmit: { action: "form submitted" },
    className: { control: "text" },
  },
  render: function Render(args) {
    return <PasswordValidator {...args} />;
  },
};

/**
 * ## Password Strength Indicator
 *
 * Demonstrates the standalone PasswordStrengthIndicator component.
 * Shows how to use the component to provide real-time password strength feedback.
 */
export const PasswordStrengthIndicatorStory: PasswordStrengthStory = {
  args: {
    password: "Test12@!",
  },
  argTypes: {
    password: {
      control: "text",
      description: "Password to evaluate strength",
    },
  },
  render: function Render() {
    const [{ password }, updateArgs] = useArgs();
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      updateArgs({ password: newPassword });
    };

    return (
      <Form>
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter a password"
          onChange={handlePasswordChange}
          value={password}
        />
        <PasswordStrengthIndicator password={password} />
      </Form>
    );
  },
};

/**
 * ## Password Rules
 *
 * Demonstrates the standalone PasswordRules component.
 * Shows how to use the component to provide real-time password validation feedback.
 */
export const PasswordRulesStory: PasswordRulesStory = {
  args: {
    password: "Test12@!",
  },
  argTypes: {
    password: {
      control: "text",
      description: "Password to evaluate against rules",
    },
  },
  render: function Render() {
    const [{ password }, updateArgs] = useArgs();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      updateArgs({ password: newPassword });
    };

    return (
      <Form>
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter a password"
          onChange={handlePasswordChange}
          value={password}
        />
        <PasswordRules password={password} />
      </Form>
    );
  },
};

/**
 * ## Password Input
 *
 * Demonstrates the standalone PasswordInput component.
 */
export const PasswordInputStory: PasswordInputStory = {
  args: {
    password: "",
    showError: false,
    errorMessage: "Password is required",
  },
  argTypes: {
    password: {
      control: "text",
      description: "The password value",
    },
    showError: {
      control: "boolean",
      description: "Whether to show an error message",
    },
    errorMessage: {
      control: "text",
      description: "The error message to display",
      if: { arg: "showError", truthy: true },
    },
  },
  render: function Render() {
    const [{ password, showError, errorMessage }, updateArgs] = useArgs();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      updateArgs({ password: newPassword });
    };

    // Create a proper FieldError object for react-hook-form
    const error: FieldError | undefined = showError
      ? {
          type: "manual",
          message: errorMessage,
        }
      : undefined;

    return (
      <Form>
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter a password"
          onChange={handlePasswordChange}
          value={password}
          error={error}
        />
      </Form>
    );
  },
};
