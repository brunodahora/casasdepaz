import { createStore, combineReducers } from "redux";

import { signUp } from "./reducers/signUpReducer";

const rootReducer = combineReducers({
  signUp
});

export const store = createStore(rootReducer);
