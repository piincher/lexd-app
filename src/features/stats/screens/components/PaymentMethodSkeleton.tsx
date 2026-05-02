import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';

export const PaymentMethodSkeleton: React.FC = () => {
  return (
    <View style={{ marginTop: 16, gap: 10 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <ShimmerBlock width={28} height={28} borderRadius={8} />
          <ShimmerBlock width={'40%'} height={12} borderRadius={3} />
          <View style={{ flex: 1 }} />
          <ShimmerBlock width={60} height={12} borderRadius={3} />
          <ShimmerBlock width={30} height={12} borderRadius={3} />
        </View>
      ))}
    </View>
  );
};
