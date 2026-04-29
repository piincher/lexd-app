/**
 * PickupInfo - Consignee pickup information card
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Divider } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface PickupInfoProps {
  consignee: {
    name: string;
    phone: string;
    warehouseAddress: string;
    businessHours?: string;
  };
  onCall: (phone: string) => void;
  iconColor: string;
  styles: Record<string, any>;
}

export const PickupInfo: React.FC<PickupInfoProps> = ({ consignee, onCall, iconColor, styles }) => (
  <Animated.View entering={FadeInUp.delay(600)}>
    <Card style={styles.pickupCard}>
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.pickupGradient}>
        <Card.Content>
          <View style={styles.pickupHeader}>
            <Ionicons name="location" size={28} color={iconColor} />
            <Text style={styles.pickupTitle}>POINT DE RETRAIT</Text>
          </View>
          <Text style={styles.warehouseName}>{consignee.name}</Text>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.phoneButton} onPress={() => onCall(consignee.phone)}>
            <Ionicons name="call" size={20} color="#7C3AED" />
            <Text style={styles.phoneText}>{consignee.phone}</Text>
          </TouchableOpacity>
          <Text style={styles.hours}>{consignee.warehouseAddress}</Text>
        </Card.Content>
      </LinearGradient>
    </Card>
  </Animated.View>
);
