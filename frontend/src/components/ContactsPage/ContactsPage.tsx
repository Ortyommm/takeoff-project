import { useAppSelector } from "../../store";
import { Navigate } from "react-router-dom";
import ContactItem from "./components/ContactItem";
import { useEffect, useState } from "react";
import { List, notification } from "antd";
import api from "../../api";
import { AxiosResponse } from "axios";
import { IContact, ISearchResponse } from "../../types";
import ContactsHeader from "./components/ContactsHeader";
import ContactModal from "./components/ContactModal";
import useContactsDispatch from "./hooks/useContactsDispatch";
import { SmileOutlined } from "@ant-design/icons";

export default function ContactsPage() {
  const { setContacts, deleteContact } = useContactsDispatch();

  const isSignedIn = useAppSelector((state) => state.auth.isSignedIn);
  const data = useAppSelector((state) => state.contacts.data);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<IContact | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;
    notification.open({
      message: "Successfully logged in!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  }, []);

  function onContactDelete(id: number) {
    api.delete(`contacts/${id}`).then((res: AxiosResponse<IContact>) => {
      deleteContact(id);
    });
  }

  function onContactEdit(contact: IContact) {
    setEditingContact(contact);
    setIsModalVisible(true);
  }

  function onSearch(value: string) {
    api
      .get(`contacts/search?q=${value}`)
      .then((res: AxiosResponse<ISearchResponse>) => {
        setContacts(res.data.contacts);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    api.get("contacts").then((res: AxiosResponse<IContact[]>) => {
      setContacts(res.data);
      setIsLoading(false);
    });
  }, []);

  if (!isSignedIn) return <Navigate to="/" />;

  function onAddContact() {
    setEditingContact(null);
    setIsModalVisible(true);
  }

  return (
    <>
      <ContactModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        editingContact={editingContact}
        cleanEditingContact={() => setEditingContact(null)}
      />
      <div className="container">
        <ContactsHeader
          onSearch={onSearch}
          onAddContact={() => onAddContact()}
        />
        <List
          className="demo-loadmore-list"
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <ContactItem
              loading={isLoading}
              item={item}
              onDelete={onContactDelete}
              onEdit={onContactEdit}
            />
          )}
        />
      </div>
    </>
  );
}
