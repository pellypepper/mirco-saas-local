const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitize = (value: string, max = 255) =>
  value.trim().slice(0, max);

const isStrongPassword = (password: string) =>
  password.length >= 8;


export { isValidEmail, sanitize, isStrongPassword };