import React from 'react';
import { View } from 'react-native';
import { Card, Text, Avatar, Button } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { createStyles } from '../GoodsDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ClientCardProps {
  client: any;
  /** Renders an "Assigner un client" CTA when the goods has no client yet. */
  onAssignClient?: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onAssignClient }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const isMissing = !client;

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="account-circle" size={20} color={colors.primary.main} />
          <Text style={styles.sectionTitle}>Client</Text>
        </View>
        <View style={styles.clientRow}>
          <Avatar.Text
            size={56}
            label={`${client?.firstName?.[0] || '?'}${client?.lastName?.[0] || '?'}`}
            style={{ backgroundColor: isMissing ? colors.text.disabled : colors.primary.main }}
            labelStyle={{ fontSize: 22, fontWeight: 'bold' }}
          />
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>
              {client ? `${client.firstName} ${client.lastName}` : 'Propriétaire à identifier'}
            </Text>
            <View style={styles.clientPhoneRow}>
              <Ionicons name="call-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.clientPhone}>{client?.phoneNumber || 'Aucun numéro'}</Text>
            </View>
          </View>
        </View>

        {isMissing && onAssignClient && (
          <Button
            mode="contained"
            icon="account-search"
            onPress={onAssignClient}
            style={{ marginTop: 14, borderRadius: 10 }}
            contentStyle={{ paddingVertical: 4 }}
          >
            Assigner un client
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};
