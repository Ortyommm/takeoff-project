import React, { FormEvent } from "react";
import { Form, Input } from "antd";
import { isEmail, isUrl } from "../../helpers/validators";
import InputFormItem from "./InputFormItem";

export default function PictureFormItem({
  link,
  setLink,
}: {
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <InputFormItem
      name="picture"
      placeholder="picture link"
      value={link}
      setValue={setLink}
      validatorFn={isUrl}
    />
  );
}
