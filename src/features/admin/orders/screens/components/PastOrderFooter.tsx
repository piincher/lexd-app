import React from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { LOGISTICS_COLORS } from './pastOrderConstants';
import { createStyles } from './PastOrderFooter.styles';

interface PastOrderFooterProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export const PastOrderFooter: React.FC<PastOrderFooterProps> = ({
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
}) => {
  const styles = createStyles();

  if (isFetchingNextPage) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={LOGISTICS_COLORS.primary} style={styles.loader} />
      </View>
    );
  }

  if (hasNextPage) {
    return (
      <Pressable onPress={onLoadMore} style={styles.loadMoreContainer}>
        <Text style={styles.loadMoreText}>Charger plus</Text>
      </Pressable>
    );
  }

  return null;
};
