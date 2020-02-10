import {
  UPDATE_SIGNUP_DATA,
  CLEAR_SIGNUP_DATA,
  UPDATE_PLACE_DATA,
  CLEAR_PLACE_DATA
} from "./actions";

import { SignUpData, PlaceData } from "../models";

export const updateSignUpData = (
  payload: SignUpData
): { type: string; payload: SignUpData } => ({
  type: UPDATE_SIGNUP_DATA,
  payload
});

export const clearSignUpData = (): { type: string } => ({
  type: CLEAR_SIGNUP_DATA
});

export const updatePlaceData = (
  payload: PlaceData
): { type: string; payload: PlaceData } => ({
  type: UPDATE_PLACE_DATA,
  payload
});

export const clearPlaceData = (): { type: string } => ({
  type: CLEAR_PLACE_DATA
});
