import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createTopCustomersHeaderStyles } from './TopCustomersHeader.styles';

export const TopCustomersHeader: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createTopCustomersHeaderStyles(colors);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Top Clients</Text>
        <Text style={styles.subtitle}>Par revenu</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="trophy-outline" size={18} color={colors.status.warning} />
      </View>
    </View>
  );
};
