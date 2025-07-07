// Email validation: checks for a basic email pattern
export const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

// Password strength: at least 8 chars, one uppercase, one digit, one special char
export const isStrongPassword = password =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);
