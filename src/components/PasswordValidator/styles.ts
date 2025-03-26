import styled from "styled-components";
import {
  spacing,
  fontSize,
  fontFamily,
  transitions,
  gradientText,
} from "../../styles/variables";

export const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  font-family: ${fontFamily.primary};
  background-color: #f0f0f3;
  padding: ${spacing.lg};
  border-radius: 25px;
  box-shadow: -10px -10px 20px rgba(255, 255, 255, 1),
    10px 10px 20px rgba(174, 174, 192, 0.3);

  @media (max-width: 575px) {
    width: calc(100vw - 2 * ${spacing.sm});
    min-width: 320px;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f3;
  box-shadow: -15px -15px 30px rgba(255, 255, 255, 0.8),
    15px 15px 30px rgba(174, 174, 192, 0.2);
  transition: ${transitions.slow};
  font-family: ${fontFamily.primary};

  ${Form} {
    transform: translateY(-10%);
  }

  @media (max-width: 575px) {
    padding: 0 ${spacing.sm};

    ${Form} {
      transform: none;
    }
  }
`;

export const Label = styled.label`
  text-align: left;
  display: block;
  font-size: ${fontSize.sm};
  font-weight: 600;
  ${gradientText}
  margin-bottom: ${spacing.xs};
  font-family: ${fontFamily.primary};
`;

export const Input = styled.input<{ error?: { message?: string } }>`
  width: 100%;
  padding: ${spacing.sm};
  border: none;
  border-radius: 20px;
  background-color: #f0f0f3;
  color: #353a5f;
  font-size: ${fontSize.sm};
  transition: all 0.3s ease;
  box-shadow: inset -5px -5px 10px rgba(255, 255, 255, 0.8),
    inset 5px 5px 10px rgba(174, 174, 192, 0.2);
  outline: none;
  font-family: ${fontFamily.primary};

  &:focus {
    box-shadow: inset -3px -3px 6px rgba(255, 255, 255, 0.9),
      inset 3px 3px 6px rgba(174, 174, 192, 0.3);
  }

  ${({ error }) =>
    error &&
    `
    box-shadow: 
      inset -5px -5px 10px rgba(255, 255, 255, 0.6),
      inset 5px 5px 10px rgba(155, 0, 0, 0.1);
    color: #EF4444;
  `}
`;

export const VisibilityToggle = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${spacing.sm};
  color: #9ebaf3;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: ${fontFamily.primary};
  border-radius: 0 20px 20px 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(2px);
  }
`;

export const ErrorMessage = styled.span<{ type?: "success" | "error" }>`
  display: flex;
  align-items: center;
  font-size: ${fontSize.xs};
  color: ${({ type }) => (type === "success" ? "#28a745" : "#dc3545")};
  margin-top: ${spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${fontFamily.primary};
  padding-left: ${spacing.sm};
`;

export const Button = styled.button`
  width: 100%;
  padding: ${spacing.sm};
  ${gradientText}
  border: none;
  border-radius: 50px;
  font-size: ${fontSize.md};
  font-weight: 600;
  outline: none;
  cursor: pointer;
  margin-top: ${spacing.xs};
  font-family: ${fontFamily.primary};
  transition: all 2s ease;
  box-shadow: 5px 5px 10px rgba(174, 174, 192, 0.2),
    -5px -5px 10px rgba(255, 255, 255, 0.8);

  &:hover {
    color: #fff;
    box-shadow: inset 5px 5px 10px rgba(174, 174, 192, 0.2),
      inset -5px -5px 10px rgba(255, 255, 255, 0.8);
  }
`;
