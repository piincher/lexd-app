import React from "react";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./LoadMoreButton.styles";

interface LoadMoreButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onPress, isLoading }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary.main} />
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Charger plus</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoadMoreButton;
