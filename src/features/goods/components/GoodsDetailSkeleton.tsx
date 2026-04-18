/**
 * GoodsDetailSkeleton
 * Shimmer skeleton matching GoodsDetailScreen layout
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Card, Divider } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';

const SkeletonInfoRow: React.FC = () => (
  <View style={styles.infoRow}>
    <ShimmerBlock width={120} height={13} borderRadius={4} />
    <ShimmerBlock width={80} height={13} borderRadius={4} />
  </View>
);

export const GoodsDetailSkeleton: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ── Status Header ── */}
        <View style={[styles.statusHeader, { backgroundColor: colors.background.card }]}>
          <View style={styles.statusHeaderLeft}>
            <ShimmerBlock width={72} height={24} borderRadius={8} />
            <ShimmerBlock width={80} height={24} borderRadius={8} />
          </View>
          <ShimmerBlock width={90} height={12} borderRadius={4} />
        </View>

        {/* ── Photo Card ── */}
        <Card style={styles.photoCard}>
          <ShimmerBlock width="100%" height={220} borderRadius={0} />
        </Card>

        {/* ── Quick Stats ── */}
        <View style={[styles.statsRow, { backgroundColor: colors.background.card }]}>
          <View style={styles.statBox}>
            <ShimmerBlock width={22} height={22} borderRadius={11} />
            <ShimmerBlock width={50} height={16} borderRadius={4} style={styles.statGap} />
            <ShimmerBlock width={60} height={11} borderRadius={3} />
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statBox}>
            <ShimmerBlock width={22} height={22} borderRadius={11} />
            <ShimmerBlock width={50} height={16} borderRadius={4} style={styles.statGap} />
            <ShimmerBlock width={60} height={11} borderRadius={3} />
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statBox}>
            <ShimmerBlock width={22} height={22} borderRadius={11} />
            <ShimmerBlock width={50} height={16} borderRadius={4} style={styles.statGap} />
            <ShimmerBlock width={60} height={11} borderRadius={3} />
          </View>
        </View>

        {/* ── Informations Card ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={120} height={15} borderRadius={4} />
          </View>
          <Card.Content>
            <ShimmerBlock width="100%" height={14} borderRadius={4} />
            <View style={{ height: 6 }} />
            <ShimmerBlock width="85%" height={14} borderRadius={4} />
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

        {/* ── Suivi du statut Card ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={140} height={15} borderRadius={4} />
          </View>
          <Card.Content>
            <View style={styles.timeline}>
              {Array.from({ length: 7 }).map((_, i) => (
                <View key={i} style={styles.timelineStep}>
                  <ShimmerBlock width={32} height={32} borderRadius={16} />
                  <ShimmerBlock width={30} height={9} borderRadius={3} style={styles.timelineLabelGap} />
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* ── Tarification & Paiement Card ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={180} height={15} borderRadius={4} />
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

        {/* ── Container Card ── */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <ShimmerBlock width={20} height={20} borderRadius={10} />
            <ShimmerBlock width={100} height={15} borderRadius={4} />
          </View>
          <Card.Content>
            <View style={[styles.containerBox, { backgroundColor: colors.background.paper }]}>
              <ShimmerBlock width={36} height={36} borderRadius={18} />
              <View style={styles.containerBoxInfo}>
                <ShimmerBlock width="80%" height={12} borderRadius={4} />
                <View style={{ height: 6 }} />
                <ShimmerBlock width="60%" height={16} borderRadius={4} />
              </View>
            </View>
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
    paddingBottom: 32,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  statusHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    paddingVertical: 16,
    elevation: 1,
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
    marginBottom: 12,
    elevation: 2,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  divider: {
    marginVertical: 0,
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
  },
  timelineLabelGap: {
    marginTop: 6,
  },
  containerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
  },
  containerBoxInfo: {
    marginLeft: 12,
    flex: 1,
  },
  bottomPadding: {
    height: 32,
  },
});
