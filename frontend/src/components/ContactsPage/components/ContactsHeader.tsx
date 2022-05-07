import Search from "antd/es/input/Search";
import { FormEvent } from "react";
import { Button } from "antd";

export default function ContactsHeader({
  onSearch,
  onAddContact,
}: {
  onSearch: (value: string) => void;
  onAddContact: () => void;
}) {
  let timeout: ReturnType<typeof setTimeout>;
  function onSearchInput(e: FormEvent<HTMLInputElement>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onSearch((e.target as HTMLInputElement).value);
    }, 200);
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <Search
        style={{ marginBottom: "10px" }}
        placeholder="input search text"
        onInput={onSearchInput}
        onSearch={onSearch}
        enterButton
      />
      <Button type="primary" danger onClick={onAddContact}>
        Add contact
      </Button>
    </div>
  );
}
