/**
 * OrderDetailSkeleton
 * Shimmer skeleton matching OrderDetailScreen layout
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Card, Divider } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';

const SkeletonInfoRow: React.FC = () => (
  <View style={styles.infoRow}>
    <View style={styles.rowLeft}>
      <ShimmerBlock width={18} height={18} borderRadius={9} />
      <ShimmerBlock width={100} height={13} borderRadius={4} />
    </View>
    <ShimmerBlock width={80} height={13} borderRadius={4} />
  </View>
);

export const OrderDetailSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ── OrderHeader ── */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <ShimmerBlock width={72} height={26} borderRadius={8} />
            <ShimmerBlock width={80} height={26} borderRadius={8} />
          </View>
          <ShimmerBlock width={90} height={12} borderRadius={4} />
        </View>

        {/* ── OrderImageSection ── */}
        <Card style={styles.imageCard}>
          <ShimmerBlock width="100%" height={200} borderRadius={0} />
        </Card>

        {/* ── OrderQuickStats ── */}
        <View style={[styles.statsRow, { backgroundColor: colors.background.card }]}>
          <View style={styles.statBox}>
            <ShimmerBlock width={22} height={22} borderRadius={11} />
            <ShimmerBlock width={40} height={16} borderRadius={4} style={styles.statGap} />
            <ShimmerBlock width={50} height={11} borderRadius={3} />
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statBox}>
            <ShimmerBlock width={22} height={22} borderRadius={11} />
            <ShimmerBlock width={50} height={16} borderRadius={4} style={styles.statGap} />
            <ShimmerBlock width={50} height={11} borderRadius={3} />
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statBox}>
            <ShimmerBlock width={22} height={22} borderRadius={11} />
            <ShimmerBlock width={40} height={16} borderRadius={4} style={styles.statGap} />
            <ShimmerBlock width={50} height={11} borderRadius={3} />
          </View>
        </View>

        {/* ── OrderTimeline ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={140} height={15} borderRadius={4} />
          </View>
          <Card.Content>
            <View style={styles.timeline}>
              {Array.from({ length: 5 }).map((_, i) => (
                <View key={i} style={styles.timelineStep}>
                  <ShimmerBlock width={34} height={34} borderRadius={17} />
                  <ShimmerBlock width={36} height={10} borderRadius={3} style={styles.timelineLabelGap} />
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* ── OrderInfoCard ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={120} height={15} borderRadius={4} />
          </View>
          <Card.Content>
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
          </Card.Content>
        </Card>

        {/* ── OrderShippingCard ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={100} height={15} borderRadius={4} />
          </View>
          <Card.Content>
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
          </Card.Content>
        </Card>

        {/* ── OrderPaymentCard ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={100} height={15} borderRadius={4} />
          </View>
          <Card.Content>
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
            <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            <SkeletonInfoRow />
          </Card.Content>
        </Card>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  imageCard: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statGap: {
    marginTop: 4,
    marginBottom: 2,
  },
  statDivider: {
    width: 1,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    marginVertical: 0,
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
  },
  timelineLabelGap: {
    marginTop: 6,
  },
  bottomPadding: {
    height: 32,
  },
});
