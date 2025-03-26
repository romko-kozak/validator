import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface IPasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  testId?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
