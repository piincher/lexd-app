import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { createStyles } from './DataExportHeader.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const DataExportHeader: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
      <Text variant="titleLarge" style={styles.headerTitle}>
        Data Export & Backup
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );
};
