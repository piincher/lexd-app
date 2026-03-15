import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Card, Badge, Avatar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { styles } from '../AllOrdersScreen.styles';

const STATUS_COLORS: Record<string, string> = {
  Active: '#4CAF50',
  'In Transit': '#FF9800',
  Delivered: '#2196F3',
  Inactive: '#757575',
  default: '#757575',
};

interface OrderCardProps {
  order: any;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigation = useNavigation();
  const statusColor = STATUS_COLORS[order.status] || STATUS_COLORS.default;
  const initials = order.clientName?.split(' ').map((n: string) => n[0]).join('') || '?';

  return (
    <Card style={styles.orderCard}>
      <TouchableOpacity onPress={() => navigation.navigate('ActiveOrderDetails' as never, { id: order._id })}>
        <Card.Content>
          <View style={styles.headerRow}>
            <View style={styles.clientInfo}>
              <Avatar.Text
                size={48}
                label={initials}
                style={{ backgroundColor: statusColor + '30' }}
                labelStyle={{ color: statusColor, fontWeight: 'bold' }}
              />
              <View style={styles.clientText}>
                <Text style={styles.clientName}>{order.clientName}</Text>
                <Text style={styles.orderCode}>{order.code}</Text>
              </View>
            </View>
            <Badge style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>{order.status}</Text>
            </Badge>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <MaterialIcons name="phone" size={16} color={COLORS.grey} />
              <Text style={styles.detailText}>{order.clientPhone || 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="attach-money" size={16} color={COLORS.grey} />
              <Text style={styles.detailText}>{order.totalCost?.toLocaleString() || 0} FCFA</Text>
            </View>
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
};

export default OrderCard;
