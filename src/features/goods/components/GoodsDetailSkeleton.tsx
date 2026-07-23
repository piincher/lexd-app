/**
 * GoodsDetailSkeleton
 * Shimmer skeleton matching GoodsDetailScreen layout
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Card, Divider } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SkeletonCard } from './SkeletonCard';
import { SkeletonInfoRow } from './SkeletonInfoRow';
import { styles } from './GoodsDetailSkeleton.styles';

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
        <Card style={[styles.photoCard, { borderColor: colors.border }]}>
          <ShimmerBlock width="100%" height={220} borderRadius={0} />
        </Card>

        {/* ── Quick Stats ── */}
        <View style={[styles.statsRow, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <View style={styles.statBox}>
                <ShimmerBlock width={22} height={22} borderRadius={11} />
                <ShimmerBlock width={50} height={16} borderRadius={4} style={styles.statGap} />
                <ShimmerBlock width={60} height={11} borderRadius={3} />
              </View>
              {i < 2 && <View style={[styles.statDivider, { backgroundColor: colors.border }]} />}
            </React.Fragment>
          ))}
        </View>

        {/* ── Informations Card ── */}
        <SkeletonCard headerWidth={120}>
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
        </SkeletonCard>

        {/* ── Suivi du statut Card ── */}
        <SkeletonCard headerWidth={140}>
          <View style={styles.timeline}>
            {Array.from({ length: 7 }).map((_, i) => (
              <View key={i} style={styles.timelineStep}>
                <ShimmerBlock width={32} height={32} borderRadius={16} />
                <ShimmerBlock width={30} height={9} borderRadius={3} style={styles.timelineLabelGap} />
              </View>
            ))}
          </View>
        </SkeletonCard>

        {/* ── Tarification & Paiement Card ── */}
        <SkeletonCard headerWidth={180}>
          <SkeletonInfoRow />
          <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
          <SkeletonInfoRow />
          <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
          <SkeletonInfoRow />
          <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
          <SkeletonInfoRow />
          <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
          <SkeletonInfoRow />
        </SkeletonCard>

        {/* ── Container Card ── */}
        <SkeletonCard headerWidth={100}>
          <View style={[styles.containerBox, { backgroundColor: colors.background.paper }]}>
            <ShimmerBlock width={36} height={36} borderRadius={18} />
            <View style={styles.containerBoxInfo}>
              <ShimmerBlock width="80%" height={12} borderRadius={4} />
              <View style={{ height: 6 }} />
              <ShimmerBlock width="60%" height={16} borderRadius={4} />
            </View>
          </View>
        </SkeletonCard>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </Animated.View>
  );
};

export default GoodsDetailSkeleton;
