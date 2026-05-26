import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import { userData } from "@src/shared/types/user";

interface UserSelectItemProps {
  item: userData;
}

export const UserSelectItem: React.FC<UserSelectItemProps> = ({ item }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container} key={item._id}>
      <Text style={styles.userName}>
        {item.firstName}- {item.lastName}
      </Text>
      <Text style={styles.userRole}> {item.phoneNumber}</Text>
      <Text style={styles.userRole}> {item.role}</Text>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    padding: 15,
  },
  userName: {
    fontSize: 20,
    fontFamily: Fonts.meduim,
  },
  userRole: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: Fonts.black,
  },
});

export default UserSelectItem;
