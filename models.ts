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

export type PlaceData = {
  type?: string;
  address?: string;
  cep?: string;
  neighborhood?: string;
  state?: string;
  city?: string;
  time?: string;
  name?: string;
  owner?: string;
  phone?: string;
  email?: string;
  partner?: string;
};

export type ReduxState = {
  signUp: SignUpData;
  place: PlaceData;
};

export type NavigationProps = {
  navigation: {
    navigate: (string, object?) => void;
  };
};
