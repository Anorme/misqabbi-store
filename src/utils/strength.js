import { isStrongPassword } from './validation';

export const getPasswordStrength = password => {
  if (password.length === 0) return '';
  if (isStrongPassword(password)) return 'Strong';
  if (password.length >= 8) return 'Weak';
  return 'Too short';
};
