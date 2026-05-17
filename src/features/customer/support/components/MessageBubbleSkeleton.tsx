import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './TicketDetailSkeleton.styles';

interface MessageBubbleSkeletonProps {
  isCustomer?: boolean;
}

export const MessageBubbleSkeleton: React.FC<MessageBubbleSkeletonProps> = ({ isCustomer = false }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.messageContainer,
        isCustomer ? styles.customerContainer : styles.adminContainer,
      ]}
    >
      {!isCustomer && <ShimmerBlock width={32} height={32} borderRadius={16} />}
      {!isCustomer && <View style={{ width: 8 }} />}
      <ShimmerBlock
        width={'70%' as any}
        height={60}
        borderRadius={12}
        style={{
          backgroundColor: isCustomer ? colors.primary.main : colors.background.card,
        }}
      />
      {isCustomer && <View style={{ width: 8 }} />}
      {isCustomer && <ShimmerBlock width={32} height={32} borderRadius={16} />}
    </View>
  );
};
