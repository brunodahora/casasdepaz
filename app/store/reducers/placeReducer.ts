import { UPDATE_PLACE_DATA, CLEAR_PLACE_DATA } from "../actions";

import { PlaceData } from "../../models";

const initialState: PlaceData = {
  type: "",
  otherType: "",
  address: "",
  cep: "",
  neighborhood: "",
  state: "",
  city: "",
  weekDay: "",
  time: "",
  name: "",
  owner: "",
  phone: "",
  email: "",
  partner: ""
};

export const place = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACE_DATA:
      console.log(action.payload);
      return { ...state, ...action.payload };
    case CLEAR_PLACE_DATA:
      return initialState;
    default:
      return state;
  }
};
