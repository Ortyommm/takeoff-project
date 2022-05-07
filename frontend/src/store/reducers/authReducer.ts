import { Action } from "redux";
import ActionsEnum from "../actions/types";
import { IContact } from "../../types";

const initialState: { isSignedIn: boolean; contact: IContact | null } = {
  isSignedIn: false,
  contact: null,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionsEnum.SIGN_IN:
      return { ...state, isSignedIn: true };
    case ActionsEnum.SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
