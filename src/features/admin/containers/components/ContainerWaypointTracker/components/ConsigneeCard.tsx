import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Card, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { ConsigneeInfo } from '../../../types';

interface ConsigneeCardProps {
  consignee: ConsigneeInfo;
  onCall: (phone: string) => void;
}

export const ConsigneeCard: React.FC<ConsigneeCardProps> = ({
  consignee,
  onCall,
}) => {
  return (
    <Animated.View entering={FadeInUp.delay(800)}>
      <Card style={styles.consigneeCard}>
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED']}
          style={styles.consigneeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Card.Content>
            <View style={styles.consigneeHeader}>
              <Ionicons name="person-circle" size={32} color="#FFF" />
              <Text style={styles.consigneeTitle}>👤 Consigné pour le retrait</Text>
            </View>
            <View style={styles.consigneeDetails}>
              <Text style={styles.consigneeName}>{consignee.name}</Text>
              <View style={styles.consigneeRow}>
                <Ionicons
                  name="call"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.consigneePhone}>{consignee.phone}</Text>
              </View>
              <View style={styles.consigneeRow}>
                <Ionicons
                  name="location"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.consigneeAddress}>
                  {consignee.warehouseAddress}
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={() => onCall(consignee.phone)}
              style={styles.callButton}
              labelStyle={styles.callButtonLabel}
              icon="phone"
            >
              Appeler le consigné
            </Button>
          </Card.Content>
        </LinearGradient>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  consigneeCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Theme.colors.background.card,
  },
  consigneeGradient: {
    borderRadius: 16,
  },
  consigneeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  consigneeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  consigneeDetails: {
    marginBottom: 16,
  },
  consigneeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  consigneeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  consigneePhone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 8,
  },
  consigneeAddress: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 8,
    flex: 1,
  },
  callButton: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 8,
  },
  callButtonLabel: {
    color: '#7C3AED',
    fontWeight: '600',
  },
});
