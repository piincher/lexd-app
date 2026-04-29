import React from 'react';
import { RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from 'react-native-paper';
import { ContainerCard } from '../ContainerCard';
import { CustomerContainer } from '../../types';
import { useMyContainersListStyles } from './MyContainersList.styles';

interface MyContainersListProps {
  data: CustomerContainer[];
  refreshing: boolean;
  onRefresh: () => void;
  onContainerPress: (id: string) => void;
}

export const MyContainersList: React.FC<MyContainersListProps> = ({
  data,
  refreshing,
  onRefresh,
  onContainerPress,
}) => {
  const theme = useTheme();
  const styles = useMyContainersListStyles();

  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ContainerCard
          container={item}
          onPress={() => onContainerPress(item._id)}
        />
      )}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};
