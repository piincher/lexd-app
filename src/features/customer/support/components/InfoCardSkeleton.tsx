import React from 'react';
import { View } from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './TicketDetailSkeleton.styles';

export const InfoCardSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View
      style={[
        styles.infoCard,
        {
          backgroundColor: colors.background.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.infoHeader}>
        <ShimmerBlock width={120} height={16} borderRadius={4} />
        <ShimmerBlock width={72} height={24} borderRadius={6} />
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <ShimmerBlock width={16} height={16} borderRadius={8} />
          <View style={{ width: 6 }} />
          <ShimmerBlock width={50} height={13} borderRadius={3} />
          <View style={{ width: 4 }} />
          <ShimmerBlock width={60} height={13} borderRadius={3} />
        </View>
        <View style={styles.infoItem}>
          <ShimmerBlock width={16} height={16} borderRadius={8} />
          <View style={{ width: 6 }} />
          <ShimmerBlock width={50} height={13} borderRadius={3} />
          <View style={{ width: 4 }} />
          <ShimmerBlock width={60} height={13} borderRadius={3} />
        </View>
      </View>

      <View style={styles.infoItem}>
        <ShimmerBlock width={16} height={16} borderRadius={8} />
        <View style={{ width: 6 }} />
        <ShimmerBlock width={50} height={13} borderRadius={3} />
        <View style={{ width: 4 }} />
        <ShimmerBlock width={140} height={13} borderRadius={3} />
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <ShimmerBlock width={'85%' as any} height={15} borderRadius={4} style={{ marginBottom: 8 }} />
      <ShimmerBlock width={'100%' as any} height={14} borderRadius={3} style={{ marginBottom: 6 }} />
      <ShimmerBlock width={'95%' as any} height={14} borderRadius={3} style={{ marginBottom: 6 }} />
      <ShimmerBlock width={'70%' as any} height={14} borderRadius={3} />
    </View>
  );
};
