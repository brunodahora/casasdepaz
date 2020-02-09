import { UPDATE_SIGNUP_DATA, CLEAR_SIGNUP_DATA } from "../actions";

import { SignUpData } from "../../models";

const initialState: SignUpData = {
  name: "",
  surname: "",
  cpf: "",
  email: "",
  phone: "",
  hasCellGroup: null,
  gender: "",
  age: "",
  password: "",
  confirmPassword: ""
};

export const signUp = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SIGNUP_DATA:
      return { ...state, ...action.payload };
    case CLEAR_SIGNUP_DATA:
      return initialState;
    default:
      return state;
  }
};
