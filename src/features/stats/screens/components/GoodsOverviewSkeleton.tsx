import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';

export const GoodsOverviewSkeleton: React.FC = () => {
  return (
    <View style={{ gap: 12, paddingVertical: 8 }}>
      <ShimmerBlock width={'100%'} height={50} borderRadius={12} />
      {Array.from({ length: 4 }).map((_, i) => (
        <View key={i} style={{ gap: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <ShimmerBlock width={8} height={8} borderRadius={4} />
              <ShimmerBlock width={80} height={12} borderRadius={3} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <ShimmerBlock width={30} height={12} borderRadius={3} />
              <ShimmerBlock width={28} height={10} borderRadius={3} />
            </View>
          </View>
          <ShimmerBlock width={'100%'} height={4} borderRadius={2} />
        </View>
      ))}
    </View>
  );
};
