import React from "react";
import { View, Text } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "../Stats.styles";

interface UserInfoCardProps {
  firstName?: string;
  phoneNumber?: string;
  role?: string;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({
  firstName,
  phoneNumber,
  role,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <Card style={[styles.userCard, { backgroundColor: colors.background.card }]}>
      <View style={styles.userCardContent}>
        <Avatar.Image
          size={72}
          source={{
            uri: "https://chinalinexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/LEXD%20Express%20(1024%20x%201024%20px)%20(1).png",
          }}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.text.primary }]} numberOfLines={1}>
            {firstName || "—"}
          </Text>
          <Text style={[styles.userDetail, { color: colors.text.secondary }]}>
            {phoneNumber || "No phone"}
          </Text>
          <Text style={[styles.userDetail, { color: colors.text.secondary }]}>
            {role || "User"}
          </Text>
        </View>
      </View>
    </Card>
  );
};
