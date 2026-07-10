import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ClientIdBadgeProps {
  clientId: string;
}

export const ClientIdBadge: React.FC<ClientIdBadgeProps> = ({ clientId }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary.main + '15' }]}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>Client ID</Text>
      <Text style={[styles.value, { color: colors.primary.main }]}>{clientId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
});
