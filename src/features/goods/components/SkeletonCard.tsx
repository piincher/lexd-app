import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './GoodsDetailSkeleton.styles';

interface SkeletonCardProps {
  headerWidth: number;
  children: React.ReactNode;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ headerWidth, children }) => (
  <Card style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <ShimmerBlock width={20} height={20} borderRadius={10} />
      <ShimmerBlock width={headerWidth} height={15} borderRadius={4} />
    </View>
    <Card.Content>
      {children}
    </Card.Content>
  </Card>
);
