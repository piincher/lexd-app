import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OutstandingPaymentsListHeader.styles';

interface OutstandingPaymentsListHeaderProps {
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const OutstandingPaymentsListHeader: React.FC<OutstandingPaymentsListHeaderProps> = ({
  onBack,
  rightElement,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Impayés</Text>
      {rightElement || <View style={styles.placeholder} />}
    </View>
  );
};
