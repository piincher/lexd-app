/**
 * TicketDetailSkeleton
 * Skeleton loading placeholder matching TicketDetailScreen layout
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { COLORS } from '@src/constants/Colors';

const InfoCardSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.infoCard,
        {
          backgroundColor: colors.background.card,
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : COLORS.Silver,
        },
      ]}
    >
      {/* Ticket Number + Status */}
      <View style={styles.infoHeader}>
        <ShimmerBlock width={120} height={16} borderRadius={4} />
        <ShimmerBlock width={72} height={24} borderRadius={6} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Type + Priority Row */}
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

      {/* Created Date Row */}
      <View style={styles.infoItem}>
        <ShimmerBlock width={16} height={16} borderRadius={8} />
        <View style={{ width: 6 }} />
        <ShimmerBlock width={50} height={13} borderRadius={3} />
        <View style={{ width: 4 }} />
        <ShimmerBlock width={140} height={13} borderRadius={3} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Subject */}
      <ShimmerBlock width={'85%' as any} height={15} borderRadius={4} style={{ marginBottom: 8 }} />

      {/* Description Lines */}
      <ShimmerBlock width={'100%' as any} height={14} borderRadius={3} style={{ marginBottom: 6 }} />
      <ShimmerBlock width={'95%' as any} height={14} borderRadius={3} style={{ marginBottom: 6 }} />
      <ShimmerBlock width={'70%' as any} height={14} borderRadius={3} />
    </View>
  );
};

const MessageBubbleSkeleton: React.FC<{ isCustomer?: boolean }> = ({ isCustomer = false }) => {
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
          backgroundColor: isCustomer ? colors.primary : COLORS.white,
        }}
      />
      {isCustomer && <View style={{ width: 8 }} />}
      {isCustomer && <ShimmerBlock width={32} height={32} borderRadius={16} />}
    </View>
  );
};

const RatingCardSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.ratingCard,
        {
          backgroundColor: colors.background.card,
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : COLORS.Silver,
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

export const TicketDetailSkeleton: React.FC = () => (
  <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <InfoCardSkeleton />
      <MessageBubbleSkeleton isCustomer={false} />
      <MessageBubbleSkeleton isCustomer={true} />
      <RatingCardSkeleton />
    </ScrollView>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.Silver,
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  adminContainer: {
    justifyContent: 'flex-start',
  },
  customerContainer: {
    justifyContent: 'flex-end',
  },
  ratingCard: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
});
