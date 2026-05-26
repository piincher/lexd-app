import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OutstandingPaymentsEmpty.styles';

export const OutstandingPaymentsEmpty: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.empty}>
      <Ionicons name="checkmark-circle" size={64} color={colors.status.success} />
      <Text style={styles.emptyText}>Aucun impayé trouvé</Text>
    </View>
  );
};
