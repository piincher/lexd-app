import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface StatusRowProps {
  counts: { UNPAID: number; PARTIAL: number; PAID: number };
}

export const StatusRow: React.FC<StatusRowProps> = ({ counts }) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        statusRow: {
          flexDirection: "row",
          paddingVertical: 14,
          paddingHorizontal: 12,
        },
        statusItem: {
          flex: 1,
          alignItems: "center",
        },
        statusIconWrap: {
          width: 34,
          height: 34,
          borderRadius: 11,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 6,
        },
        statusIconWrapUnpaid: {
          backgroundColor: "#EF444420",
        },
        statusIconWrapPartial: {
          backgroundColor: "#F59E0B20",
        },
        statusIconWrapPaid: {
          backgroundColor: "#10B98120",
        },
        statusCount: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        statusLabel: {
          fontSize: 10,
          fontFamily: Fonts.bold,
          marginTop: 2,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        },
        statusLabelUnpaid: {
          color: "#EF4444",
        },
        statusLabelPartial: {
          color: "#F59E0B",
        },
        statusLabelPaid: {
          color: "#10B981",
        },
        statusDivider: {
          width: 1,
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          marginVertical: 4,
        },
      }),
    [colors, isDark]
  );

  return (
    <View style={styles.statusRow}>
      <View style={styles.statusItem}>
        <View style={[styles.statusIconWrap, styles.statusIconWrapUnpaid]}>
          <MaterialCommunityIcons name="alert-circle" size={18} color="#EF4444" />
        </View>
        <Text style={styles.statusCount}>{counts.UNPAID}</Text>
        <Text style={[styles.statusLabel, styles.statusLabelUnpaid]}>Impayés</Text>
      </View>
      <View style={styles.statusDivider} />
      <View style={styles.statusItem}>
        <View style={[styles.statusIconWrap, styles.statusIconWrapPartial]}>
          <MaterialCommunityIcons name="progress-clock" size={18} color="#F59E0B" />
        </View>
        <Text style={styles.statusCount}>{counts.PARTIAL}</Text>
        <Text style={[styles.statusLabel, styles.statusLabelPartial]}>Partiels</Text>
      </View>
      <View style={styles.statusDivider} />
      <View style={styles.statusItem}>
        <View style={[styles.statusIconWrap, styles.statusIconWrapPaid]}>
          <MaterialCommunityIcons name="check-circle" size={18} color="#10B981" />
        </View>
        <Text style={styles.statusCount}>{counts.PAID}</Text>
        <Text style={[styles.statusLabel, styles.statusLabelPaid]}>Payés</Text>
      </View>
    </View>
  );
};
