import { ConfigDto } from './Config';

export interface Login {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  token?: string;
  validPassword?: boolean;
}

export interface PasswordData {
  password: string;
  confirm_password: string;
}

export interface StoreData {
  user: User;
  config: ConfigDto;
  progress: { value: number };
}
