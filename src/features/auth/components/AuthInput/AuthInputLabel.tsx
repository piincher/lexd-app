import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AuthInput.styles';

interface AuthInputLabelProps {
  label: string;
  errorMsg: string;
}

export const AuthInputLabel: React.FC<AuthInputLabelProps> = ({ label, errorMsg }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.label, { color: colors.status.error }]}>{errorMsg}</Text>
    </View>
  );
};
