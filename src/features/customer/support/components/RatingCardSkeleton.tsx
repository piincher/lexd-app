import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './TicketDetailSkeleton.styles';

export const RatingCardSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.ratingCard,
        {
          backgroundColor: colors.background.card,
          borderColor: colors.border,
        },
      ]}
    >
      <ShimmerBlock width={'80%' as any} height={16} borderRadius={4} style={{ alignSelf: 'center', marginBottom: 4 }} />
      <ShimmerBlock width={'60%' as any} height={13} borderRadius={3} style={{ alignSelf: 'center', marginBottom: 8 }} />
      <ShimmerBlock width={150} height={32} borderRadius={6} style={{ alignSelf: 'center', marginBottom: 12 }} />
      <ShimmerBlock width={'100%' as any} height={40} borderRadius={8} />
    </View>
  );
};
