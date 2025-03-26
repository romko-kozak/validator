import styled, { keyframes } from "styled-components";
import {
  spacing,
  fontSize,
  fontFamily,
  gradientText,
} from "../../styles/variables";

// Bouncy animation for icons
const bouncyCheck = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2) rotate(5deg); }
`;

const bouncyX = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2) rotate(-5deg); }
`;

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${spacing.md};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xs};
`;

export const Title = styled.h3`
  font-size: ${fontSize.sm};
  font-weight: 600;
  ${gradientText}
  margin-bottom: ${spacing.sm};
  font-family: ${fontFamily.primary};
`;

export const RulesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const RuleItem = styled.li<{ passed: boolean }>`
  display: flex;
  align-items: center;
  font-size: ${fontSize.xs};
  font-weight: 600;
  color: ${({ passed }) => (passed ? "#4CAF50" : "#EF4444")};
  margin-bottom: ${spacing.xs};
  font-family: ${fontFamily.primary};
  padding: 2px ${spacing.xs};
`;

export const RuleIcon = styled.span<{ passed: boolean }>`
  margin-right: ${spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 0.3s ease;
    animation: ${({ passed }) => (passed ? bouncyCheck : bouncyX)} 0.5s
      ease-in-out;
  }
`;
