import React, { FC, useMemo } from "react";
import { calculatePasswordStrength, getStrengthLabel } from "utils/validation";
import {
  Container,
  Header,
  Title,
  StrengthLabel,
  StrengthBar,
  StrengthStatusBar,
} from "./styles";
import type { IPasswordStrengthIndicator } from "types/PasswordStrengthIndicator";

/**
 * PasswordStrengthIndicator component visually displays password strength
 *
 * @param password - Current password value to calculate strength
 * @param className - Optional CSS class for styling
 */

export const PasswordStrengthIndicator: FC<IPasswordStrengthIndicator> =
  React.memo(({ password, className = "" }) => {
    const strength = useMemo(
      () => calculatePasswordStrength(password),
      [password]
    );

    const strengthLabel = useMemo(() => getStrengthLabel(strength), [strength]);

    // Calculate percentage width based on strength (0-4 scale to 0-100%)
    const barWidth = useMemo(
      () => (password ? (strength / 4) * 100 : 0),
      [password, strength]
    );

    return (
      <Container
        className={className}
        data-testid="password-strength-indicator"
      >
        <Header data-testid="password-strength-header">
          <Title data-testid="password-strength-title">Password Strength</Title>
          <StrengthLabel data-testid="strength-label">
            {password ? strengthLabel : "None"}
          </StrengthLabel>
        </Header>

        <StrengthBar data-testid="strength-bar-container">
          <StrengthStatusBar
            $strength={strength}
            width={barWidth}
            data-testid="strength-gradient-bar"
            style={{ width: `${barWidth}%` }}
            className={`strength strength-${strength} level level-${strength}`}
          />
        </StrengthBar>
      </Container>
    );
  });

export default PasswordStrengthIndicator;
