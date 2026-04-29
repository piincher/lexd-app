import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { userData } from "@src/shared/types/user";
import RenderListItem from "@src/components/RenderListItem/RenderListItem";
import { UserSelectItem } from "../UserSelectItem";

interface UserSelectListProps {
  users: userData[];
  selectedUser?: userData;
  onSelectUser: (user: userData | undefined) => void;
}

export const UserSelectList: React.FC<UserSelectListProps> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: userData }) => (
      <RenderListItem
        item={item}
        selectedItem={selectedUser!}
        setSelectedItem={onSelectUser}
        renderItemContent={(item) => <UserSelectItem item={item} />}
      />
    ),
    [selectedUser, onSelectUser]
  );

  return (
    <FlashList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item: userData) => item._id}
    />
  );
};

export default UserSelectList;
