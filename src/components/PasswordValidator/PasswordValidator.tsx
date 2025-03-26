import React, { useCallback, FC, useEffect, memo, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordFormSchema } from "utils/validation";
import PasswordRules from "components/PasswordRules/PasswordRules";
import PasswordStrengthIndicator from "components/PasswordStrengthIndicator/PasswordStrengthIndicator";
import PasswordInput from "components/PasswordInput";
import { Form, Button } from "./styles";
import { IPasswordValidator, IPasswordFormData } from "../../types";

/**
 * PasswordValidator component provides a complete password validation interface
 * with two input fields, strength indicator, validation rules, and submit button
 *
 * @param onSubmit - Callback function triggered on successful form submission
 * @param className - Optional CSS class for styling
 */
export const PasswordValidator: FC<IPasswordValidator> = memo(
  ({ onSubmit, className = "" }) => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      clearErrors,
    } = useForm<IPasswordFormData>({
      resolver: zodResolver(passwordFormSchema),
      mode: "onSubmit",
      reValidateMode: "onSubmit",
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    // Clear errors when user starts typing
    useEffect(() => {
      clearErrors();
    }, [password, confirmPassword, clearErrors]);

    const handleFormSubmit = useCallback(
      (data: IPasswordFormData) => {
        if (onSubmit) {
          onSubmit(data);
        }
      },
      [onSubmit]
    );

    const passwordInputProps = useMemo(
      () => ({
        id: "password",
        label: "Password",
        placeholder: "Enter password",
        register: register("password"),
        error: errors.password,
        testId: "password-input",
      }),
      [register, errors.password]
    );

    const confirmPasswordInputProps = useMemo(
      () => ({
        id: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Confirm password",
        register: register("confirmPassword"),
        error: errors.confirmPassword,
        testId: "confirm-password-input",
      }),
      [register, errors.confirmPassword]
    );

    return (
      <div className={className}>
        <Form
          onSubmit={handleSubmit(handleFormSubmit)}
          data-testid="password-validator-form"
        >
          <PasswordInput {...passwordInputProps} />
          <PasswordInput {...confirmPasswordInputProps} />
          <PasswordStrengthIndicator password={password || ""} />
          <PasswordRules password={password || ""} />
          <Button type="submit" data-testid="submit-button">
            Validate Password
          </Button>
        </Form>
      </div>
    );
  }
);
