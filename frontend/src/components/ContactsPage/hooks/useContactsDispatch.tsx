import { IContact } from "../../../types";
import ActionsEnum from "../../../store/actions/types";
import { useAppDispatch } from "../../../store";

export default function useContactsDispatch() {
  const dispatch = useAppDispatch();

  const setContacts = (contacts: IContact[]) =>
    dispatch({ type: ActionsEnum.SET_CONTACTS, payload: contacts });

  const deleteContact = (id: number) => {
    dispatch({ type: ActionsEnum.DELETE_CONTACT, payload: id });
  };

  const addContact = (contact: IContact) => {
    dispatch({ type: ActionsEnum.ADD_CONTACT, payload: contact });
  };

  const editContact = (contact: IContact) => {
    dispatch({ type: ActionsEnum.EDIT_CONTACT, payload: contact });
  };

  return { setContacts, deleteContact, addContact, editContact };
}
