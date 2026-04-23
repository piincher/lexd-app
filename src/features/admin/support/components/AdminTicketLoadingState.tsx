import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AdminTicketLoadingStateProps {
  label?: string;
}

export const AdminTicketLoadingState: React.FC<AdminTicketLoadingStateProps> = ({
  label = 'Chargement des tickets...',
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary.main} />
      <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    marginTop: 10,
  },
});
