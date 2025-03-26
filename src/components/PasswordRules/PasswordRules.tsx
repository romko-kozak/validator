import React, { FC, useEffect, useCallback, useMemo } from "react";
import { checkPasswordRules } from "utils/validation";
import {
  Container,
  Header,
  Title,
  RulesList,
  RuleItem,
  RuleIcon,
} from "./styles";
import { CheckIcon, XIcon } from "./icons";
import { IPasswordRules } from "types/PasswordRules";
import { ICheckPasswordRules } from "types/PasswordValidator";

/**
 * PasswordRules component displays a list of password requirements and their status
 *
 * @param password - Current password value to check against rules
 * @param className - Optional CSS class for styling
 * @param onErrorCleared - Optional callback when errors are cleared
 */

export const PasswordRules: FC<IPasswordRules> = React.memo(
  ({ password, className = "", onErrorCleared }) => {
    const rules: ICheckPasswordRules = useMemo(
      () => checkPasswordRules(password),
      [password]
    );

    const ruleItems = useMemo(
      () => [
        {
          label: "At least 8 characters",
          passed: rules.minLength,
        },
        {
          label: "Contains an uppercase letter",
          passed: rules.hasUppercase,
        },
        {
          label: "Contains a lowercase letter",
          passed: rules.hasLowercase,
        },
        {
          label: "Contains a number",
          passed: rules.hasNumber,
        },
        {
          label: "Contains a special character",
          passed: rules.hasSpecialChar,
        },
      ],
      [rules]
    );

    const passedRules = useMemo(
      () => ruleItems.filter((rule) => rule.passed).length,
      [ruleItems]
    );
    const totalRules = ruleItems.length;

    const handleErrorCleared = useCallback(() => {
      const allRulesPassed = passedRules === totalRules;
      onErrorCleared?.(allRulesPassed);
    }, [passedRules, totalRules, onErrorCleared]);

    useEffect(() => {
      handleErrorCleared();
    }, [handleErrorCleared]);

    const renderRuleItem = useCallback(
      (rule: { label: string; passed: boolean }) => (
        <RuleItem key={rule.label} passed={rule.passed}>
          <RuleIcon passed={rule.passed}>
            {rule.passed ? <CheckIcon /> : <XIcon />}
          </RuleIcon>
          {rule.label}
        </RuleItem>
      ),
      []
    );

    return (
      <Container className={className} data-testid="password-rules">
        <Header>
          <Title>Password Requirements</Title>
        </Header>
        <RulesList>{ruleItems.map(renderRuleItem)}</RulesList>
      </Container>
    );
  }
);

export default PasswordRules;
