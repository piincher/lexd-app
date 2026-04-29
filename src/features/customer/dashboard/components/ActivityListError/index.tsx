import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ActivityListErrorProps {
  message: string;
}

export const ActivityListError: React.FC<ActivityListErrorProps> = ({
  message,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.center}>
      <Text style={[styles.errorText, { color: colors.text.secondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ActivityListError;
