/**
 * GoodsDetailSkeleton - Loading skeleton for goods detail
 * SRP: Show loading state while goods data loads
 */

import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { Skeleton } from '@src/shared/ui/Skeleton';
import { styles } from './GoodsDetailScreen.styles';

export const GoodsDetailSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <Card style={{ marginBottom: 12, borderRadius: 16 }}>
          <Card.Content>
            <Skeleton width={200} height={24} style={{ marginBottom: 16 }} />
            <Skeleton width="100%" height={200} borderRadius={12} />
          </Card.Content>
        </Card>
        
        <Card style={{ marginBottom: 12, borderRadius: 16 }}>
          <Card.Content>
            <Skeleton width={150} height={20} style={{ marginBottom: 12 }} />
            <Skeleton width="100%" height={80} borderRadius={8} />
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 12, borderRadius: 16 }}>
          <Card.Content>
            <Skeleton width={180} height={20} style={{ marginBottom: 12 }} />
            <Skeleton width="100%" height={100} borderRadius={8} />
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};
