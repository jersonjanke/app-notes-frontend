export const hasUpperCase = (text: string) => {
  return /(?=.*[A-Z])/.test(text);
};
export const hasLowerCase = (text: string) => {
  return /(?=.*[a-z])/.test(text);
};
export const hasSpecialCharacter = (text: string) => {
  return /(?=.*[!@#$%^&*])/.test(text);
};

export const hasNumber = (text: string) => {
  return /\d/.test(text);
};
