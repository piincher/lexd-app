import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { StyleSheet } from 'react-native';

interface CostRowProps {
  label: string;
  value: string;
}

const createStyles = () => StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export const CostRow: React.FC<CostRowProps> = ({ label, value }) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(), []);
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text.primary }]}>{value}</Text>
    </View>
  );
};
