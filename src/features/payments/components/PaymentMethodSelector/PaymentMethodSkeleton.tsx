import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';

interface Props {
  style: any;
  cardStyle: any;
}

export const PaymentMethodSkeleton: React.FC<Props> = ({ style, cardStyle }) => (
  <View style={style}>
    <ShimmerBlock width={180} height={20} borderRadius={4} />
    <View style={{ marginTop: 16, gap: 12 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <View key={i} style={[cardStyle, { borderColor: 'transparent' }]}>
          <ShimmerBlock width={48} height={48} borderRadius={24} />
          <View style={{ flex: 1, marginLeft: 12, gap: 6 }}>
            <ShimmerBlock width={120} height={16} borderRadius={3} />
            <ShimmerBlock width={'70%'} height={12} borderRadius={3} />
          </View>
          <ShimmerBlock width={24} height={24} borderRadius={12} />
        </View>
      ))}
    </View>
  </View>
);
