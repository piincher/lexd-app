/**
 * SecurityNote Component
 * SMS verification note with shield icon
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from '@src/providers/ThemeProvider';

export const SecurityNote: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="shield-check-outline" size={16} color={colors.text.disabled} />
      <Text style={[styles.text, { color: colors.text.disabled }]}>
        Un code de verification sera envoye par SMS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  text: { fontSize: 12, fontFamily: Fonts.regular },
});

export default SecurityNote;
