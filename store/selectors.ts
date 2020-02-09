import { ReduxState } from "../models";

export const getSignUpData = ({ signUp }: ReduxState) => signUp;

export const getAboutYouData = ({
  signUp: { name, surname, cpf }
}: ReduxState) => ({
  name,
  surname,
  cpf
});

export const getContactsData = ({ signUp: { email, phone } }: ReduxState) => ({
  email,
  phone
});

export const getMoreInfoData = ({
  signUp: { hasCellGroup, gender, age }
}: ReduxState) => ({
  hasCellGroup,
  gender,
  age
});
