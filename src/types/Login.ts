export interface Login {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
}

export interface PasswordData {
  password: string;
  confirm_password: string;
}
