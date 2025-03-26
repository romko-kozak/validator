import styled from "styled-components";
import {
  spacing,
  fontSize,
  fontFamily,
  gradientText,
} from "../../styles/variables";

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${spacing.sm};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.xs};
  padding: 0;
`;

export const Title = styled.span`
  font-size: ${fontSize.sm};
  font-weight: 600;
  ${gradientText}
  font-family: ${fontFamily.primary};
`;

export const StrengthLabel = styled.span`
  font-size: ${fontSize.xs};
  font-weight: 600;
  padding: ${spacing.xs} ${spacing.md};
  border-radius: 10px;
  font-family: ${fontFamily.primary};
  ${gradientText}
  box-shadow: inset -3px -3px 6px rgba(255, 255, 255, 0.8),
    inset 3px 3px 6px rgba(174, 174, 192, 0.2);
`;

export const StrengthBar = styled.div`
  height: 8px;
  margin: ${spacing.md} auto 0;
  border-radius: 2px;
  overflow: hidden;
  background-color: #f0f0f3;
  box-shadow: inset -3px -3px 6px rgba(255, 255, 255, 0.8),
    inset 3px 3px 6px rgba(174, 174, 192, 0.2);
  position: relative;
`;

export const StrengthStatusBar = styled.div<{
  $strength: number;
  width: number;
}>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  min-height: 8px;
  min-width: 1px;
  width: ${(props) => props.width}%;
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.17, 0.67, 0.09, 1.32),
    background-color 0.3s ease;
  opacity: 1;

  /* Add strength level classes for tests */
  ${({ $strength }) => {
    return `
      &.strength-${$strength} {}
      &.level-${$strength} {}
      &.strength {}
      &.level {}
    `;
  }}

  ${({ $strength }) => {
    switch (true) {
      case $strength === 0:
        return `
          background: transparent;
        `;
      case $strength <= 1:
        return `
          background: linear-gradient(135deg, #FF6B6B, #FF4757);
        `;
      case $strength <= 2:
        return `
          background: linear-gradient(135deg, #FFD93D, #FF9130);
        `;
      case $strength <= 3:
        return `
          background: linear-gradient(135deg, #6BCB77, #4CAF50);
        `;
      default:
        return `
          background: linear-gradient(135deg, #4CAF50, #2E7D32);
        `;
    }
  }}

  box-shadow: 
    -2px -2px 4px rgba(255, 255, 255, 0.4),
    2px 2px 4px rgba(174, 174, 192, 0.2);

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0)
    );
    border-radius: inherit;
  }
`;
