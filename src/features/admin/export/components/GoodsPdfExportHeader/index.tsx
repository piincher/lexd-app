import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from './GoodsPdfExportHeader.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsPdfExportHeaderProps {
  onBack: () => void;
}

export const GoodsPdfExportHeader: React.FC<GoodsPdfExportHeaderProps> = ({
  onBack,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
      </TouchableOpacity>
      <Text style={styles.title}>Exporter en PDF</Text>
      <View style={styles.backButton} />
    </View>
  );
};
