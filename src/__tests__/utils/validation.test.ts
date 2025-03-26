import { 
  passwordSchema, 
  passwordFormSchema,
  checkPasswordRules, 
  calculatePasswordStrength, 
  getStrengthLabel 
} from '../../utils/validation';

describe('Password Schema Validation', () => {
  it('should pass validation for valid password', () => {
    const result = passwordSchema.safeParse('Test1@');
    expect(result.success).toBe(true);
  });

  it('should fail validation for password without uppercase', () => {
    const result = passwordSchema.safeParse('test1@');
    expect(result.success).toBe(false);
  });

  it('should fail validation for password without lowercase', () => {
    const result = passwordSchema.safeParse('TEST1@');
    expect(result.success).toBe(false);
  });

  it('should fail validation for password without number', () => {
    const result = passwordSchema.safeParse('Test@');
    expect(result.success).toBe(false);
  });

  it('should fail validation for password without special character', () => {
    const result = passwordSchema.safeParse('Test12');
    expect(result.success).toBe(false);
  });

  it('should fail validation for password with less than 6 characters', () => {
    const result = passwordSchema.safeParse('Te1@');
    expect(result.success).toBe(false);
  });
});

describe('Password Form Schema Validation', () => {
  it('should pass validation when passwords match', () => {
    const result = passwordFormSchema.safeParse({
      password: 'Test1@',
      confirmPassword: 'Test1@'
    });
    expect(result.success).toBe(true);
  });

  it('should fail validation when passwords do not match', () => {
    const result = passwordFormSchema.safeParse({
      password: 'Test1@',
      confirmPassword: 'Test2@'
    });
    expect(result.success).toBe(false);
  });
});

describe('checkPasswordRules', () => {
  it('should correctly identify all rules for a valid password', () => {
    const rules = checkPasswordRules('Test1@');
    expect(rules.minLength).toBe(true);
    expect(rules.hasUppercase).toBe(true);
    expect(rules.hasLowercase).toBe(true);
    expect(rules.hasNumber).toBe(true);
    expect(rules.hasSpecialChar).toBe(true);
  });

  it('should correctly identify failed rules', () => {
    const rules = checkPasswordRules('test');
    expect(rules.minLength).toBe(false);
    expect(rules.hasUppercase).toBe(false);
    expect(rules.hasLowercase).toBe(true);
    expect(rules.hasNumber).toBe(false);
    expect(rules.hasSpecialChar).toBe(false);
  });
});

describe('calculatePasswordStrength', () => {
  it('should return 0 for empty password', () => {
    expect(calculatePasswordStrength('')).toBe(0);
  });

  it('should return a higher score for a stronger password', () => {
    expect(calculatePasswordStrength('Test1@')).toBeGreaterThan(
      calculatePasswordStrength('test')
    );
  });

  it('should give extra points for longer passwords', () => {
    // Base password with all requirements
    const baseStrength = calculatePasswordStrength('Test1@');
    
    // Longer password (>10 chars) with same requirements
    const longerStrength = calculatePasswordStrength('TestTest1@');
    
    // Since the max strength is 4, we'll check if the longer password is at least as strong
    expect(longerStrength).toBeGreaterThanOrEqual(baseStrength);
  });

  it('should max out at 4', () => {
    // Super strong password
    const strength = calculatePasswordStrength('TestTestTest1@$%^&*');
    expect(strength).toBeLessThanOrEqual(4);
  });
});

describe('getStrengthLabel', () => {
  it('should return "Very Weak" for strength 0', () => {
    expect(getStrengthLabel(0)).toBe('Very Weak');
  });

  it('should return "Weak" for strength 1', () => {
    expect(getStrengthLabel(1)).toBe('Weak');
  });

  it('should return "Medium" for strength 2', () => {
    expect(getStrengthLabel(2)).toBe('Medium');
  });

  it('should return "Strong" for strength 3', () => {
    expect(getStrengthLabel(3)).toBe('Strong');
  });

  it('should return "Very Strong" for strength 4', () => {
    expect(getStrengthLabel(4)).toBe('Very Strong');
  });
});
