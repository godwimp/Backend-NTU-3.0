import { hashSync, compareSync } from "bcryptjs";
export const hashPassword = (password: string): string => {
  return hashSync(password);
};

export const comparePassword = (
  inputPassword: string,
  passwordDB: string
): boolean => {
  return compareSync(inputPassword, passwordDB);
};
