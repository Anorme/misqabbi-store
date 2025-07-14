export const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

export const isStrongPassword = password =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);
