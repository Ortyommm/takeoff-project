import style from "./LoginPage.module.scss";
import { Alert, Button, Form, Typography } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import api from "../../api";
import { IError, ILoginResponse } from "../../types";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { isEmail } from "../../helpers/validators";
import ActionsEnum from "../../store/actions/types";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import EmailFormItem from "../FormItems/EmailFormItem";
import PasswordFormItem from "../FormItems/PasswordFormItem";

const { Title } = Typography;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector((state) => state.auth.isSignedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  async function onLoginClick() {
    //Basic validation
    if (!email.trim() || !isEmail(email.trim()) || !password.trim()) return;
    api
      .post("auth", {
        email: email.trim(),
        password: password.trim(),
      })
      .then((res: AxiosResponse<ILoginResponse>) => {
        if (res.data.status === "success") {
          dispatch({ type: ActionsEnum.SIGN_IN, payload: res.data.contact });
        }
      })
      .catch((err: IError) => {
        setErrorText(err.response.data.message);
        setTimeout(() => {
          setErrorText("");
        }, 3000);
      });
  }

  if (isSignedIn) {
    return <Navigate to="/contacts" />;
  }

  return (
    <div className={style.login_container}>
      <Title level={2} className={style.title}>
        Welcome to the Takeoff admin!
      </Title>

      <Alert
        message={errorText}
        type="error"
        showIcon
        className={style.error}
        style={{ opacity: errorText ? 1 : 0 }}
      />

      <Form style={{ width: "100%" }}>
        <EmailFormItem email={email} setEmail={setEmail} />
        <PasswordFormItem password={password} setPassword={setPassword} />
        <Form.Item>
          <Button
            type="primary"
            shape="round"
            icon={<EnterOutlined />}
            size="middle"
            htmlType="submit"
            onClick={onLoginClick}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// Contacts:
// // GET
// // POST
// // DELETE
// // PATCH
