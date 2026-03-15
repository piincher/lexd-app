/**
 * DashboardHeader - Header component for admin dashboard
 * SRP: Display user greeting and avatar ONLY
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { User } from "@src/shared/types";

interface DashboardHeaderProps {
  user: User | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.greeting}>Hello, {user?.firstName || "Admin"} 👋</Text>
      <Text style={styles.subtitle}>Welcome back to your dashboard</Text>
    </View>
    <Avatar.Text
      size={50}
      label={(user?.firstName?.[0] || "A") + (user?.lastName?.[0] || "")}
      style={{ backgroundColor: COLORS.blue }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    marginTop: 4,
  },
});

export default DashboardHeader;
