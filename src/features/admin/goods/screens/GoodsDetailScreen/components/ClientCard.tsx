import React from 'react';
import { View } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from '../GoodsDetailScreen.styles';

interface ClientCardProps {
  client: any;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => (
  <Card style={styles.sectionCard}>
    <Card.Content>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="account-circle" size={20} color={Theme.primary[600]} />
        <Text style={styles.sectionTitle}>Client</Text>
      </View>
      <View style={styles.clientRow}>
        <Avatar.Text
          size={56}
          label={`${client?.firstName?.[0] || '?'}${client?.lastName?.[0] || '?'}`}
          style={{ backgroundColor: Theme.primary[500] }}
          labelStyle={{ fontSize: 22, fontWeight: 'bold' }}
        />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>
            {client ? `${client.firstName} ${client.lastName}` : 'Client inconnu'}
          </Text>
          <View style={styles.clientPhoneRow}>
            <Ionicons name="call-outline" size={14} color={Theme.neutral[500]} />
            <Text style={styles.clientPhone}>{client?.phoneNumber || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </Card.Content>
  </Card>
);
