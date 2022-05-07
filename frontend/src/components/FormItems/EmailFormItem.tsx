import { Form, Input } from "antd";
import { isEmail } from "../../helpers/validators";
import React, { FormEvent, useState } from "react";
import InputFormItem from "./InputFormItem";

export default function EmailFormItem({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <InputFormItem
      name="email"
      value={email}
      setValue={setEmail}
      validatorFn={isEmail}
    />
  );
}
