/**
 * SmsSubscriptionList
 * Renders a scrollable list of SMS subscription cards
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { SmsService } from '@src/shared/types/user';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { SmsSubscriptionCard } from './SmsSubscriptionCard';

interface SmsSubscriptionListProps {
  subscriptions: SmsService[];
}

export const SmsSubscriptionList: React.FC<SmsSubscriptionListProps> = ({
  subscriptions,
}) => {
  const activeCount = subscriptions.filter((s) => s.isActive).length;
  const expiredCount = subscriptions.filter((s) => s.isExpired).length;
  const expiringSoonCount = subscriptions.filter((s) => s.isExpiringSoon).length;

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.summaryText}>
            <Text style={styles.summaryValue}>{activeCount}</Text> actif{activeCount > 1 ? 's' : ''}
          </Text>
        </View>
        {expiringSoonCount > 0 && (
          <View style={styles.summaryItem}>
            <Ionicons name="warning" size={16} color="#F59E0B" />
            <Text style={styles.summaryText}>
              <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>{expiringSoonCount}</Text> bientôt expiré
            </Text>
          </View>
        )}
        {expiredCount > 0 && (
          <View style={styles.summaryItem}>
            <Ionicons name="close-circle" size={16} color="#EF4444" />
            <Text style={styles.summaryText}>
              <Text style={[styles.summaryValue, { color: '#EF4444' }]}>{expiredCount}</Text> expiré
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {subscriptions.map((sub, index) => (
          <SmsSubscriptionCard key={sub.id} subscription={sub} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
  },
  summaryValue: {
    fontFamily: Fonts.bold,
    color: Theme.neutral[800],
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default SmsSubscriptionList;
