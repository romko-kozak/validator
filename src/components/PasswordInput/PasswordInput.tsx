import React, { useState, useCallback, FC, memo } from "react";
import {
  Container,
  Label,
  InputWrapper,
  Input,
  VisibilityToggle,
  ErrorMessage,
} from "./styles";
import { VisibleIcon, VisibleOffIcon, ErrorIcon } from "./icons";
import { IPasswordInputProps } from "../../types";

/**
 * PasswordInput component provides a password input field with visibility toggle
 * and error display
 *
 * @param id - Input id attribute
 * @param label - Label text for the input
 * @param placeholder - Optional placeholder text
 * @param register - React Hook Form register object
 * @param error - React Hook Form error object
 * @param testId - Optional test id for testing
 * @param className - Optional CSS class
 */
const PasswordInput: FC<IPasswordInputProps> = memo(
  ({
    id,
    label,
    placeholder = "Enter password",
    register,
    error,
    testId = "password-input",
    className,
    onChange,
    value,
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <Container className={className}>
        <Label htmlFor={id} data-testid={`${testId}-label`}>
          {label}
        </Label>
        <InputWrapper>
          <Input
            data-testid={testId}
            id={id}
            $error={error}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            {...register}
          />
          <VisibilityToggle
            type="button"
            data-testid={`${testId}-toggle`}
            onClick={togglePasswordVisibility}
            aria-label={
              showPassword
                ? `Hide ${label.toLowerCase()}`
                : `Show ${label.toLowerCase()}`
            }
          >
            {showPassword ? <VisibleOffIcon /> : <VisibleIcon />}
          </VisibilityToggle>
        </InputWrapper>
        {error && (
          <ErrorMessage
            data-testid={`${testId}-error`}
            role="alert"
            aria-live="polite"
            aria-describedby="password-error"
          >
            <ErrorIcon aria-hidden="true" /> {error.message}
          </ErrorMessage>
        )}
      </Container>
    );
  }
);

export default PasswordInput;
