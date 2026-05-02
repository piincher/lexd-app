import React from 'react';
import { Appbar } from 'react-native-paper';
import { useMyContainersHeaderStyles } from './MyContainersHeader.styles';

interface MyContainersHeaderProps {
  onBack: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  showTitleStyle?: boolean;
}

export const MyContainersHeader: React.FC<MyContainersHeaderProps> = ({
  onBack,
  onRefresh,
  refreshing,
  showTitleStyle,
}) => {
  const styles = useMyContainersHeaderStyles();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content
        title="Mes expéditions"
        titleStyle={showTitleStyle ? styles.headerTitle : undefined}
      />
      {onRefresh && (
        <Appbar.Action
          icon="refresh"
          onPress={onRefresh}
          disabled={refreshing}
        />
      )}
    </Appbar.Header>
  );
};
