import { UPDATE_SIGNUP_DATA, CLEAR_SIGNUP_DATA } from "./actions";

import { SignUpData } from "../models";

export const updateSignUpData = (
  payload: SignUpData
): { type: string; payload: SignUpData } => ({
  type: UPDATE_SIGNUP_DATA,
  payload
});

export const clearSignUpData = (): { type: string } => ({
  type: CLEAR_SIGNUP_DATA
});
