import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingSequenceItem } from '../../../components/LoadingSequenceItem';
import { Theme } from '@src/constants/Theme';
import { LoadingListItem } from '../../../types/packingList';

interface LoadingSequenceListProps {
  items: LoadingListItem[];
  onToggleLoaded: (goodsId: string, isLoaded: boolean) => void;
}

export const LoadingSequenceList: React.FC<LoadingSequenceListProps> = ({
  items,
  onToggleLoaded,
}) => {
  const nextPendingId = items.find((item) => !item.isLoaded)?.goods._id;

  return (
    <View style={styles.loadingList}>
      {items.map((item, index) => (
        <LoadingSequenceItem
          key={item.goods._id}
          item={item}
          index={index}
          isNext={item.goods._id === nextPendingId}
          onToggleLoaded={onToggleLoaded}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingList: {
    paddingLeft: Theme.spacing.sm,
  },
});
