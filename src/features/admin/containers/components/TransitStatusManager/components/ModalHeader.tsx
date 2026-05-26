import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './StatusUpdateModal.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const ModalHeader: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.header}>
      <Ionicons name="swap-horizontal" size={28} color={colors.status.info} />
      <Text style={styles.title}>Mettre à jour le statut</Text>
    </View>
  );
};
