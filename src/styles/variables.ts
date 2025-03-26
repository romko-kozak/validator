import { css } from "styled-components";

// Spacing variables (multiples of 8)
export const spacing = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "32px",
};

// Font size variables (most also aligned to multiples of 8 or 4)
export const fontSize = {
  xs: "12px",
  sm: "14px",
  md: "16px",
};

// Font family variables
export const fontFamily = {
  primary:
    "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  monospace: "Menlo, Consolas, 'Courier New', monospace",
};

// Gradient text

export const gradientText = css`
  background: linear-gradient(135deg, #5761b2, #1fc5a8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// Transitions
export const transitions = {
  default: "all 200ms",
  slow: "all 300ms",
};
