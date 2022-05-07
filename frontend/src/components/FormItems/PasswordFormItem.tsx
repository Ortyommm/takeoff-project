import { Form, Input } from "antd";
import React, { FormEvent } from "react";
import InputFormItem from "./InputFormItem";
import { isEmail } from "../../helpers/validators";

export default function PasswordFormItem({
  password,
  setPassword,
  showSymbols,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showSymbols?: boolean;
}) {
  return (
    <InputFormItem
      name="password"
      type={showSymbols ? undefined : "password"}
      value={password}
      setValue={setPassword}
    />
    // <Form.Item
    //   name="password"
    //   rules={[{ required: true, message: "Please input your password!" }]}
    // >
    //   <Input
    //     placeholder="password"
    //     type="password"
    //     size="large"
    //     value={password}
    //     onInput={onPasswordInput}
    //   />
    // </Form.Item>
  );
}
