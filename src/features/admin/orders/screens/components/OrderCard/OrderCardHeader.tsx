import React from 'react';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';

interface OrderCardHeaderProps {
  clientName: string;
  initials: string;
  orderCode: string;
  statusConfig: { color: string; icon: string; label: string };
  hasHighValue: boolean;
}

export const OrderCardHeader: React.FC<OrderCardHeaderProps> = ({
  clientName,
  initials,
  orderCode,
  statusConfig,
  hasHighValue,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.header}>
      <View style={styles.clientSection}>
        <Avatar.Text
          size={44}
          label={initials}
          style={[styles.avatar, { backgroundColor: statusConfig.color + '20' }]}
          labelStyle={[styles.avatarLabel, { color: statusConfig.color }]}
        />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName} numberOfLines={1}>
            {clientName || 'Unknown'}
          </Text>
          <View style={styles.orderMeta}>
            <Text style={styles.orderCode}>{orderCode || 'No code'}</Text>
            {hasHighValue && (
              <View style={styles.priorityBadge}>
                <MaterialCommunityIcons name="star" size={10} color={colors.text.inverse} />
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
        <MaterialCommunityIcons name={statusConfig.icon as any} size={14} color={statusConfig.color} />
        <Text style={[styles.statusText, { color: statusConfig.color }]}>
          {statusConfig.label}
        </Text>
      </View>
    </View>
  );
};
