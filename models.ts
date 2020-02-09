export type User = {
  username: string;
  email: string;
};

export type UserData = {
  uid?: string;
  name?: string;
  surname?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  hasCellGroup?: boolean;
  gender?: string;
  age?: string;
  clearUser?: boolean;
};

export type SignUpData = UserData & {
  password?: string;
  confirmPassword?: string;
};

export type ReduxState = {
  signUp: SignUpData;
};

export type NavigationProps = {
  navigation: {
    navigate: (string, object?) => void;
  };
};
