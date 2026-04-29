import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { userData } from "@src/shared/types/user";

interface UserSelectItemProps {
  item: userData;
}

export const UserSelectItem: React.FC<UserSelectItemProps> = ({ item }) => (
  <View style={styles.container} key={item._id}>
    <Text style={styles.userName}>
      {item.firstName}- {item.lastName}
    </Text>
    <Text style={styles.userRole}> {item.phoneNumber}</Text>
    <Text style={styles.userRole}> {item.role}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  userName: {
    fontSize: 20,
    fontFamily: Fonts.meduim,
  },
  userRole: {
    fontSize: 14,
    color: "#888",
    fontFamily: Fonts.black,
  },
});

export default UserSelectItem;
