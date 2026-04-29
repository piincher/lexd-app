import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from '../screens/AllOrdersScreen.styles';

interface AllOrdersErrorStateProps {
  error: Error | null;
}

export const AllOrdersErrorState: React.FC<AllOrdersErrorStateProps> = ({ error }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        Error loading orders: {error?.message}
      </Text>
    </View>
  );
};
