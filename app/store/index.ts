import { createStore, combineReducers } from "redux";

import { signUp } from "./reducers/signUpReducer";
import { place } from "./reducers/placeReducer";

const rootReducer = combineReducers({
  signUp,
  place
});

export const store = createStore(rootReducer);
