// GoodsDetailSkeleton - Loading skeleton for goods detail screen

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

const SkeletonBlock: React.FC<{ width?: string | number; height: number; style?: any }> = ({
  width = '100%',
  height,
  style,
}) => (
  <View
    style={[
      styles.skeleton,
      { width, height },
      style,
    ]}
  />
);

export const GoodsDetailSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <LinearGradient colors={Theme.gradients.primary} style={styles.header}>
        <View style={styles.headerTop}>
          <SkeletonBlock width={40} height={40} style={styles.iconSkeleton} />
          <SkeletonBlock width={40} height={40} style={styles.iconSkeleton} />
        </View>
        <View style={styles.headerContent}>
          <SkeletonBlock width={180} height={36} style={styles.badgeSkeleton} />
          <SkeletonBlock width={100} height={28} />
        </View>
      </LinearGradient>

      <View style={styles.scrollView}>
        {/* QR Card Skeleton */}
        <Card style={styles.card}>
          <View style={styles.qrContent}>
            <SkeletonBlock width={200} height={200} style={styles.qrSkeleton} />
            <SkeletonBlock width={160} height={16} style={{ marginTop: 12 }} />
          </View>
        </Card>

        {/* Info Card Skeleton */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <SkeletonBlock width={120} height={20} style={{ marginBottom: 16 }} />
            <SkeletonBlock width="100%" height={60} />
          </View>
        </Card>

        {/* Physical Props Skeleton */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <SkeletonBlock width={180} height={20} style={{ marginBottom: 16 }} />
            <View style={styles.propertyGrid}>
              <SkeletonBlock width="30%" height={80} />
              <SkeletonBlock width="30%" height={80} />
              <SkeletonBlock width="30%" height={80} />
            </View>
          </View>
        </Card>

        {/* Pricing Skeleton */}
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <SkeletonBlock width={160} height={20} style={{ marginBottom: 16 }} />
            <SkeletonBlock width="100%" height={40} style={{ marginBottom: 12 }} />
            <SkeletonBlock width="100%" height={40} style={{ marginBottom: 12 }} />
            <SkeletonBlock width="100%" height={40} />
          </View>
        </Card>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  skeleton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconSkeleton: {
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  headerContent: {
    alignItems: 'center',
  },
  badgeSkeleton: {
    borderRadius: 25,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  qrContent: {
    padding: 20,
    alignItems: 'center',
  },
  qrSkeleton: {
    borderRadius: 16,
    backgroundColor: Theme.neutral[200],
  },
  propertyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomSpacer: {
    height: 40,
  },
});
