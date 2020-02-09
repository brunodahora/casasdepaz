export type User = {
  username: string;
  email: string;
};

export type SignUpData = {
  name?: string;
  surname?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  hasCellGroup?: boolean;
  gender?: string;
  age?: string;
  password?: string;
  confirmPassword?: string;
};

export type ReduxState = {
  signUp: SignUpData;
};
