import { Form, Input } from "antd";
import { isEmail } from "../../helpers/validators";
import React, { FormEvent, useEffect, useState } from "react";

export default function InputFormItem({
  value,
  setValue,
  name,
  placeholder,
  validatorFn,
  type,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  placeholder?: string;
  validatorFn?: (value: string) => boolean;
  type?: string;
}) {
  const shouldBeValidating = !!validatorFn;
  function onInput(e: FormEvent<HTMLInputElement>) {
    setValue((e.target as HTMLInputElement).value);
  }

  function getValidator() {
    if (!shouldBeValidating) return undefined;
    return () => {
      if (validatorFn(value)) {
        return Promise.resolve();
      }
      if (value.length === 0) {
        return Promise.reject("Required field");
      }
      return Promise.reject("Incorrect value");
    };
  }

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: shouldBeValidating ? undefined : "Required field",
          validator: getValidator(),
        },
      ]}
      dependencies={["value"]}
      //{...getFormItemProps()}
    >
      <Input
        placeholder={placeholder ?? name}
        size="large"
        type={type}
        value={value}
        onInput={onInput}
      />
    </Form.Item>
  );
}
