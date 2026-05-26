import React from "react";
import { View } from "react-native";
import { ShimmerBlock } from "@src/shared/ui";
import { createStyles } from "./ContainerTrackingSkeleton.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface WaypointSkeletonItemProps {
  showConnector?: boolean;
}

export const WaypointSkeletonItem: React.FC<WaypointSkeletonItemProps> = ({
  showConnector = true,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
  <View>
    {showConnector && (
      <View style={styles.timelineConnector}>
        <ShimmerBlock width={3} height={24} borderRadius={2} />
      </View>
    )}
    <View style={styles.waypointCard}>
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
