/**
 * ContainerTrackingSkeleton
 * Full-screen skeleton placeholder matching ContainerTrackingScreen layout
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShimmerBlock } from '@src/shared/ui';

const WaypointSkeletonItem: React.FC<{ showConnector?: boolean }> = ({
  showConnector = true,
}) => {
  const { colors } = useAppTheme();
  return (
    <View>
      {showConnector && (
        <View style={styles.timelineConnector}>
          <ShimmerBlock width={3} height={24} borderRadius={2} />
        </View>
      )}
      <View style={[styles.waypointCard, { backgroundColor: colors.background.card }]}>
        <ShimmerBlock width="100%" height={4} borderRadius={0} />
        <View style={styles.waypointContent}>
          <View style={styles.wpHeader}>
            <ShimmerBlock width={36} height={36} borderRadius={18} />
            <View style={styles.wpTitleContainer}>
              <ShimmerBlock width={120} height={16} borderRadius={4} />
              <View style={{ height: 4 }} />
              <ShimmerBlock width={60} height={12} borderRadius={3} />
            </View>
            <ShimmerBlock width={70} height={24} borderRadius={12} />
          </View>
          <View style={styles.wpTypeRow}>
            <ShimmerBlock width={80} height={22} borderRadius={11} />
            <ShimmerBlock width={100} height={18} borderRadius={9} />
          </View>
          <ShimmerBlock width={140} height={12} borderRadius={3} />
          <View style={styles.wpExpandIndicator}>
            <ShimmerBlock width={18} height={18} borderRadius={4} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const ContainerTrackingSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  const cardBg = colors.background.card;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
        {/* Header Card */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <View style={styles.headerRow}>
            <ShimmerBlock width={56} height={56} borderRadius={28} />
            <View style={styles.headerInfo}>
              <ShimmerBlock width={160} height={20} borderRadius={4} />
              <View style={{ height: 4 }} />
              <ShimmerBlock width={120} height={14} borderRadius={3} />
            </View>
            <ShimmerBlock width={80} height={32} borderRadius={6} />
          </View>
        </View>

        {/* Progress Summary */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <View style={styles.progressRow}>
            <View style={styles.progressItem}>
              <ShimmerBlock width={40} height={28} borderRadius={4} />
              <View style={{ height: 4 }} />
              <ShimmerBlock width={70} height={10} borderRadius={3} />
            </View>
            <ShimmerBlock width={1} height={40} borderRadius={1} />
            <View style={styles.progressItem}>
              <ShimmerBlock width={40} height={28} borderRadius={4} />
              <View style={{ height: 4 }} />
              <ShimmerBlock width={60} height={10} borderRadius={3} />
            </View>
            <ShimmerBlock width={1} height={40} borderRadius={1} />
            <View style={styles.progressItem}>
              <ShimmerBlock width={40} height={28} borderRadius={4} />
              <View style={{ height: 4 }} />
              <ShimmerBlock width={60} height={10} borderRadius={3} />
            </View>
          </View>
        </View>

        {/* Waypoints Section */}
        <View style={styles.journeySection}>
          <ShimmerBlock
            width={180}
            height={18}
            borderRadius={4}
            style={{ marginBottom: 16 }}
          />
          <WaypointSkeletonItem />
          <WaypointSkeletonItem />
          <WaypointSkeletonItem />
        </View>

        {/* Estimated Arrival */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <View style={styles.estimatedArrivalContainer}>
            <ShimmerBlock width={20} height={20} borderRadius={4} />
            <ShimmerBlock
              width={200}
              height={14}
              borderRadius={3}
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>

        {/* Timeline Details */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ShimmerBlock
            width={160}
            height={18}
            borderRadius={4}
            style={{ marginBottom: 16 }}
          />
          {[...Array(5)].map((_, i) => (
            <View key={i} style={[styles.timelineDetailRow, { borderBottomColor: colors.border }]}>
              <ShimmerBlock width={100} height={14} borderRadius={3} />
              <ShimmerBlock width={120} height={14} borderRadius={3} />
            </View>
          ))}
        </View>

        {/* Goods Section */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <View style={styles.goodsSectionHeader}>
            <ShimmerBlock width={160} height={18} borderRadius={4} />
            <ShimmerBlock width={100} height={18} borderRadius={4} />
          </View>
          <ShimmerBlock
            width={180}
            height={12}
            borderRadius={3}
            style={{ marginBottom: 12 }}
          />
          {[...Array(2)].map((_, i) => (
            <View key={i} style={styles.goodsItem}>
              <ShimmerBlock width={24} height={24} borderRadius={4} />
              <View style={styles.goodsItemInfo}>
                <ShimmerBlock width={120} height={14} borderRadius={3} />
                <View style={{ height: 4 }} />
                <ShimmerBlock width={80} height={12} borderRadius={3} />
              </View>
              <View style={styles.goodsItemRight}>
                <ShimmerBlock width={50} height={12} borderRadius={3} />
                <View style={{ height: 4 }} />
                <ShimmerBlock width={60} height={18} borderRadius={4} />
              </View>
            </View>
          ))}
        </View>

        {/* Pickup Info */}
        <View style={[styles.card, styles.pickupCard]}>
          <View style={styles.pickupHeader}>
            <ShimmerBlock width={24} height={24} borderRadius={4} />
            <ShimmerBlock
              width={160}
              height={18}
              borderRadius={4}
              style={{ marginLeft: 8 }}
            />
          </View>
          <ShimmerBlock
            width="100%"
            height={14}
            borderRadius={3}
            style={{ marginBottom: 12 }}
          />
          <View style={[styles.contactInfo, { backgroundColor: cardBg }]}>
            <ShimmerBlock width="100%" height={14} borderRadius={3} />
          </View>
          <ShimmerBlock
            width="100%"
            height={36}
            borderRadius={6}
            style={{ marginTop: 8 }}
          />
        </View>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <ShimmerBlock
            width={220}
            height={14}
            borderRadius={3}
            style={{ marginBottom: 12 }}
          />
          <ShimmerBlock width={160} height={36} borderRadius={6} />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  journeySection: {
    marginBottom: 16,
  },
  timelineConnector: {
    alignItems: 'center',
    height: 24,
  },
  waypointCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  waypointContent: {
    padding: 16,
  },
  wpHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  wpTitleContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  wpTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  wpExpandIndicator: {
    alignItems: 'center',
    marginTop: 6,
  },
  estimatedArrivalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  goodsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goodsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  goodsItemInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  goodsItemRight: {
    alignItems: 'flex-end',
  },
  pickupCard: {
    backgroundColor: '#FEF3C7',
  },
  pickupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactInfo: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  helpContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
});
