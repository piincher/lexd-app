import React from "react";
import { View, Text } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import styles from "../Stats.styles";

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
  return (
    <Card style={[styles.userCard, { backgroundColor: COLORS.surface }]}>
      <View style={styles.userCardContent}>
        <Avatar.Image
          size={72}
          source={{
            uri: "https://chinalinexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ChinaLink%20Express%20(1024%20x%201024%20px)%20(1).png",
          }}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: COLORS.DarkGrey }]} numberOfLines={1}>
            {firstName || "—"}
          </Text>
          <Text style={[styles.userDetail, { color: COLORS.DarkGrey }]}>
            {phoneNumber || "No phone"}
          </Text>
          <Text style={[styles.userDetail, { color: COLORS.DarkGrey }]}>
            {role || "User"}
          </Text>
        </View>
      </View>
    </Card>
  );
};
