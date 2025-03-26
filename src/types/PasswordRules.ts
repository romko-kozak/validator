export interface IPasswordRules {
  password: string;
  className?: string;
  onErrorCleared?: (cleared: boolean) => void;
}
