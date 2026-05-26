/**
 * GoodsClientInfo - Display client contact information
 * SRP: Show client name, phone, and avatar
 */

import React from 'react';
import { View } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createStyles } from './GoodsClientInfo.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Client {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

interface GoodsClientInfoProps {
  client: Client | null;
}

export const GoodsClientInfo: React.FC<GoodsClientInfoProps> = ({ client }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const initials = `${client?.firstName?.[0] || '?'}${client?.lastName?.[0] || '?'}`;
  const fullName = client ? `${client.firstName} ${client.lastName}` : 'Client inconnu';

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons name="account-circle" size={20} color={colors.primary[600]} />
          <Text style={styles.title}>Client</Text>
        </View>

        <View style={styles.clientRow}>
          <Avatar.Text
            size={56}
            label={initials}
            style={{ backgroundColor: colors.primary[500] }}
            labelStyle={{ fontSize: 22, fontWeight: 'bold' }}
          />
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{fullName}</Text>
            <View style={styles.clientPhoneRow}>
              <Ionicons name="call-outline" size={14} color={colors.neutral[500]} />
              <Text style={styles.clientPhone}>{client?.phoneNumber || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
