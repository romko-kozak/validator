export interface IPasswordValidator {
  onSubmit?: (data: IPasswordFormData) => void;
  className?: string;
}

export interface IPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ICheckPasswordRules {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
