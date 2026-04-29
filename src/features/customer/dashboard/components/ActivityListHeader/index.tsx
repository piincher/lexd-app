import React from "react";
import { Appbar } from "react-native-paper";

interface ActivityListHeaderProps {
  title: string;
  onBack: () => void;
  rightAction?: React.ReactNode;
}

export const ActivityListHeader: React.FC<ActivityListHeaderProps> = ({
  title,
  onBack,
  rightAction,
}) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={title} />
      {rightAction}
    </Appbar.Header>
  );
};

export default ActivityListHeader;
