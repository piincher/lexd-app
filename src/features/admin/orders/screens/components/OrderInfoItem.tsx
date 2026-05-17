import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderInfoSection.styles';

interface OrderInfoItemProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

export const OrderInfoItem: React.FC<OrderInfoItemProps> = ({ icon, label, value, iconColor }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.infoItem}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon as any} size={20} color={iconColor || colors.text.secondary} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
};
