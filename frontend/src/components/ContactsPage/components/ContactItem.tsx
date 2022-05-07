import { Avatar, List, Skeleton } from "antd";
import { IContact } from "../../../types";

export default function ContactItem({
  item,
  loading,
  onDelete,
  onEdit,
}: {
  item: IContact;
  loading: boolean;
  onDelete: (id: number) => void;
  onEdit: (item: IContact) => void;
}) {
  return (
    <List.Item
      actions={[
        <a key="list-loadmore-edit" onClick={() => onEdit(item)}>
          Edit
        </a>,
        <a key="list-delete" onClick={() => onDelete(item.id)}>
          Delete
        </a>,
      ]}
    >
      <Skeleton avatar loading={loading} title={false} active>
        <List.Item.Meta
          avatar={<Avatar src={item.picture} />}
          title={<div>{item.name}</div>}
          description={item.email}
        />
      </Skeleton>
    </List.Item>
  );
}
