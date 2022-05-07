import { useEffect, useState } from "react";
import { Input, Modal, Form } from "antd";
import EmailFormItem from "../../FormItems/EmailFormItem";
import PasswordFormItem from "../../FormItems/PasswordFormItem";
import NameFormItem from "../../FormItems/NameFormItem";
import PictureFormItem from "../../FormItems/PictureFormItem";
import { isEmail, isUrl } from "../../../helpers/validators";
import api from "../../../api";
import { AxiosResponse } from "axios";
import { IContact } from "../../../types";
import useContactsDispatch from "../hooks/useContactsDispatch";

export default function ContactModal({
  setIsModalVisible,
  isModalVisible,
  editingContact,
  cleanEditingContact,
}: {
  setIsModalVisible: (value: boolean) => void;
  isModalVisible: boolean;
  editingContact: IContact | null;
  cleanEditingContact: () => void;
}) {
  const { addContact, editContact } = useContactsDispatch();
  const [form] = Form.useForm();
  console.log({ editingContact });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pictureLink, setPictureLink] = useState("");

  function cleanData() {
    console.log("cleaned");
    setEmail("");
    setPassword("");
    setName("");
    setPictureLink("");
    cleanEditingContact();
    form.resetFields();
  }

  useEffect(() => {
    if (!editingContact) return;

    const { email, password, name, picture } = editingContact;
    setEmail(email);
    setPassword(password);
    setName(name);
    setPictureLink(picture);
    console.log({ email });
    // ui
    form.setFields([
      { name: "email", value: email },
      { name: "password", value: password },
      { name: "name", value: name },
      { name: "picture", value: picture },
    ]);
  }, [editingContact]);

  const handleOk = async () => {
    // Validation
    if (
      !isEmail(email.trim()) ||
      !password.trim() ||
      !name.trim() ||
      !isUrl(pictureLink.trim())
    )
      return;
    const newContact = {
      email: email.trim(),
      password: password.trim(),
      name: name.trim(),
      picture: pictureLink.trim(),
    };
    if (editingContact) {
      await api
        .patch(`contacts/${editingContact.id}`, newContact)
        .then((res: AxiosResponse<IContact>) => {
          editContact(res.data);
        });
    } else {
      await api
        .post("contacts", newContact)
        .then((res: AxiosResponse<IContact>) => {
          addContact(res.data);
        });
    }
    cleanData();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      cleanData();
    }, 100);
  };

  return (
    <Modal
      title="Contact editor"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form form={form}>
        <EmailFormItem email={email} setEmail={setEmail} />
        <PasswordFormItem
          password={password}
          setPassword={setPassword}
          showSymbols
        />
        <NameFormItem name={name} setName={setName} />
        <PictureFormItem link={pictureLink} setLink={setPictureLink} />
      </Form>
    </Modal>
  );
}
