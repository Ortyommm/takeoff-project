import { combineReducers } from "redux";
import authReducer from "./authReducer";
import contactsReducer from "./contactsReducer";

export default combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});
