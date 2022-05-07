import { IContact } from "../../types";
import ActionsEnum from "../actions/types";

const initialState: { data: IContact[] } = {
  data: [],
};

const contactsReducer = (
  state = initialState,
  action:
    | { type: ActionsEnum.SET_CONTACTS; payload: IContact[] }
    | { type: ActionsEnum.ADD_CONTACT; payload: IContact }
    | { type: ActionsEnum.EDIT_CONTACT; payload: IContact }
    | { type: ActionsEnum.DELETE_CONTACT; payload: number }
) => {
  switch (action.type) {
    case ActionsEnum.SET_CONTACTS:
      return { ...state, data: action.payload };
    case ActionsEnum.ADD_CONTACT:
      return { ...state, data: [action.payload, ...state.data] };
    case ActionsEnum.DELETE_CONTACT:
      return {
        ...state,
        data: state.data.filter((el) => el.id !== action.payload),
      };
    case ActionsEnum.EDIT_CONTACT:
      return {
        ...state,
        data: state.data.map((el) => {
          if (el.id === action.payload.id) {
            el = { ...el, ...action.payload };
          }
          return el;
        }),
      };
    default:
      return state;
  }
};

export default contactsReducer;
