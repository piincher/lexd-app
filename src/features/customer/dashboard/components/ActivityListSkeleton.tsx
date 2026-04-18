import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';

interface ActivityListSkeletonProps {
  count?: number;
}

export const ActivityListSkeleton: React.FC<ActivityListSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.item}>
          <ShimmerBlock width={48} height={48} borderRadius={24} />
          <View style={styles.content}>
            <ShimmerBlock width="60%" height={16} borderRadius={4} />
            <ShimmerBlock width="90%" height={14} borderRadius={4} />
            <ShimmerBlock width="40%" height={12} borderRadius={4} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    gap: 8,
  },
});
