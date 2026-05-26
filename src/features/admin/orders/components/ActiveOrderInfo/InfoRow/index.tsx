import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './InfoRow.styles';

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, iconColor }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        <View style={[styles.infoIcon, { backgroundColor: `${iconColor || colors.text.secondary}15` }]}>
          <MaterialCommunityIcons name={icon as any} size={18} color={iconColor || colors.text.secondary} />
        </View>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value || 'N/A'}
      </Text>
    </View>
  );
};

export default InfoRow;
