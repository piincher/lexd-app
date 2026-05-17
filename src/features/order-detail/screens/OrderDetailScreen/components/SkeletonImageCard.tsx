import React from 'react';
import { Card } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { styles } from './OrderDetailSkeleton.styles';

export const SkeletonImageCard: React.FC = () => (
  <Card style={styles.imageCard}>
    <ShimmerBlock width="100%" height={200} borderRadius={0} />
  </Card>
);
