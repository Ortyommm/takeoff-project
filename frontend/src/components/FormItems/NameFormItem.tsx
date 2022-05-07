import React from "react";
import InputFormItem from "./InputFormItem";

export default function NameFormItem({
  name,
  setName,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return <InputFormItem name="name" value={name} setValue={setName} />;
}
