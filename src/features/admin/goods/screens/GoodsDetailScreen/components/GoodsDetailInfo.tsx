import { useAppTheme } from '@src/providers/ThemeProvider';
// GoodsDetailInfo - Description and client information

import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface Client {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface GoodsDetailInfoProps {
  description?: string;
  client: Client | null;
}

export const GoodsDetailInfo: React.FC<GoodsDetailInfoProps> = ({
  description,
  client,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <>
      {description && (
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="text-box-outline" size={20} color={colors.primary[600]} />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.sectionCard}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-circle" size={20} color={colors.primary[600]} />
            <Text style={styles.sectionTitle}>Client</Text>
          </View>
          <View style={styles.clientRow}>
            <Avatar.Text
              size={56}
              label={`${client?.firstName?.[0] || '?'}${client?.lastName?.[0] || '?'}`}
              style={{ backgroundColor: colors.primary[500] }}
              labelStyle={{ fontSize: 22, fontWeight: 'bold' }}
            />
            <View style={styles.clientInfo}>
              <Text style={styles.clientName}>
                {client ? `${client.firstName} ${client.lastName}` : 'Client inconnu'}
              </Text>
              <View style={styles.clientPhoneRow}>
                <Ionicons name="call-outline" size={14} color={colors.neutral[500]} />
                <Text style={styles.clientPhone}>{client?.phoneNumber || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const createStyles = (colors: any) => ({
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.neutral[800],
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: colors.neutral[600],
    lineHeight: 22,
  },
  clientRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  clientInfo: {
    marginLeft: 16,
  },
  clientName: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: colors.neutral[800],
  },
  clientPhoneRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginTop: 4,
  },
  clientPhone: {
    fontSize: 14,
    color: colors.neutral[500],
    marginLeft: 6,
  },
});
