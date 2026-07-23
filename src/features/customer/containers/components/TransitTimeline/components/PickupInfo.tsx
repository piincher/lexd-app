/**
 * PickupInfo - Consignee pickup information card
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Divider } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PickupInfoProps {
  consignee: {
    name: string;
    phone: string;
    warehouseAddress: string;
    businessHours?: string;
  };
  onCall: (phone: string) => void;
  styles: Record<string, any>;
}

export const PickupInfo: React.FC<PickupInfoProps> = ({ consignee, onCall, styles }) => {
  const { colors } = useAppTheme();
  return (
  <Animated.View entering={FadeInUp.delay(800)}>
    <Card style={styles.pickupCard}>
      <LinearGradient colors={[colors.primary.main, colors.primary.dark]} style={styles.pickupGradient}>
        <Card.Content>
          <View style={styles.pickupHeader}>
            <Ionicons name="location" size={28} color={colors.text.inverse} />
            <Text style={styles.pickupTitle}>📍 POINT DE RETRAIT</Text>
          </View>

          {/* Warehouse Address */}
          <Text style={styles.warehouseName}>LEXD Warehouse</Text>
          <Text style={styles.warehouseAddress}>Bamako, Mali</Text>

          <Divider style={styles.divider} />

          {/* Consignee Info */}
          <View style={styles.consigneeSection}>
            <Text style={styles.consigneeLabel}>👤 Votre consigné:</Text>
            <Text style={styles.consigneeName}>{consignee.name}</Text>

            {/* Call Button */}
            <TouchableOpacity
              style={styles.phoneButton}
              onPress={() => onCall(consignee.phone)}
            >
              <Ionicons name="call" size={20} color={colors.primary.main} />
              <Text style={styles.phoneText}>{consignee.phone}</Text>
            </TouchableOpacity>

            {/* Business Hours */}
            <View style={styles.hoursRow}>
              <Ionicons name="time-outline" size={16} color={colors.text.inverse} />
              <Text style={styles.hours}>
                {consignee.businessHours || 'Lun-Ven: 8h-17h | Sam: 9h-13h'}
              </Text>
            </View>

            {/* Warehouse Address */}
            <View style={styles.addressRow}>
              <Ionicons name="location" size={16} color={colors.text.inverse} />
              <Text style={styles.addressText}>{consignee.warehouseAddress}</Text>
            </View>
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  </Animated.View>
);}
