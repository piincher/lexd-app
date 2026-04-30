import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { createStyles } from "./PastOrdersHeader.styles";

export const PastOrdersHeader: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
      </Pressable>
      <Text style={styles.headerTitle}>Commandes Terminées</Text>
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={colors.text.primary}
      />
    </View>
  );
};
