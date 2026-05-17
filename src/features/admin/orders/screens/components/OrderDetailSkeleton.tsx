import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  HeaderSkeleton,
  PaymentSkeleton,
  InfoSkeleton,
  TimelineSkeleton,
  ActionsSkeleton,
} from './OrderDetailSkeletonSections';
import { styles } from './OrderDetailSkeleton.styles';

export const OrderDetailSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <HeaderSkeleton />
      <PaymentSkeleton />
      <InfoSkeleton />
      <TimelineSkeleton />
      <ActionsSkeleton />
    </View>
  );
};

export default OrderDetailSkeleton;
