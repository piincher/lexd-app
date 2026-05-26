import React from "react";
import { View, ScrollView } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ShimmerBlock } from "@src/shared/ui";
import { createStyles } from "./ContainerTrackingSkeleton.styles";
import { WaypointSkeletonItem } from "./WaypointSkeletonItem";

export const ContainerTrackingSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
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
            {[{ w: 40, lbl: 70 }, { w: 40, lbl: 60 }, { w: 40, lbl: 60 }].map((item, idx) => (
              <React.Fragment key={idx}>
                <View style={styles.progressItem}>
                  <ShimmerBlock width={item.w} height={28} borderRadius={4} />
                  <View style={{ height: 4 }} />
                  <ShimmerBlock width={item.lbl} height={10} borderRadius={3} />
                </View>
                {idx < 2 && <ShimmerBlock width={1} height={40} borderRadius={1} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Waypoints Section */}
        <View style={styles.journeySection}>
          <ShimmerBlock width={180} height={18} borderRadius={4} style={{ marginBottom: 16 }} />
          <WaypointSkeletonItem />
          <WaypointSkeletonItem />
          <WaypointSkeletonItem />
        </View>

        {/* Estimated Arrival */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <View style={styles.estimatedArrivalContainer}>
            <ShimmerBlock width={20} height={20} borderRadius={4} />
            <ShimmerBlock width={200} height={14} borderRadius={3} style={{ marginLeft: 8 }} />
          </View>
        </View>

        {/* Timeline Details */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ShimmerBlock width={160} height={18} borderRadius={4} style={{ marginBottom: 16 }} />
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
          <ShimmerBlock width={180} height={12} borderRadius={3} style={{ marginBottom: 12 }} />
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
            <ShimmerBlock width={160} height={18} borderRadius={4} style={{ marginLeft: 8 }} />
          </View>
          <ShimmerBlock width="100%" height={14} borderRadius={3} style={{ marginBottom: 12 }} />
          <View style={[styles.contactInfo, { backgroundColor: cardBg }]}>
            <ShimmerBlock width="100%" height={14} borderRadius={3} />
          </View>
          <ShimmerBlock width="100%" height={36} borderRadius={6} style={{ marginTop: 8 }} />
        </View>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <ShimmerBlock width={220} height={14} borderRadius={3} style={{ marginBottom: 12 }} />
          <ShimmerBlock width={160} height={36} borderRadius={6} />
        </View>
      </Animated.View>
    </ScrollView>
  );
};
