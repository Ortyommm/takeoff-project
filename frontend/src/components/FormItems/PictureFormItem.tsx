import React from "react";
import { isUrl } from "../../helpers/validators";
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
