import styled from "styled-components";
import { FieldError } from "react-hook-form";
import {
  spacing,
  fontSize,
  fontFamily,
  gradientText,
} from "../../styles/variables";

export const Container = styled.div`
  width: 100%;
  margin-bottom: ${spacing.md};
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

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input<{ $error?: FieldError }>`
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

  &::placeholder {
    color: #aaa;
  }

  ${({ $error }) =>
    $error &&
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

  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.div<{ type?: "success" | "error" }>`
  display: flex;
  align-items: center;
  font-size: ${fontSize.xs};
  color: ${({ type }) => (type === "success" ? "#10B981" : "#EF4444")};
  margin-top: ${spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${fontFamily.primary};

  svg {
    margin-right: ${spacing.xs};
  }
`;
