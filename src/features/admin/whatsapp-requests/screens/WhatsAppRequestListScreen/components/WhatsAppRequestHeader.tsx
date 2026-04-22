/**
 * WhatsAppRequestHeader - Header with title, greeting, and refresh button
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/features/notifications';
import { useNavigation } from '@react-navigation/native';

interface WhatsAppRequestHeaderProps {
  onRefresh: () => void;
}

export const WhatsAppRequestHeader: React.FC<WhatsAppRequestHeaderProps> = ({ onRefresh }) => {
  const navigation = useNavigation();
  return (
  <LinearGradient colors={Theme.gradients.glass} style={styles.header}>
    <View style={styles.headerTop}>
      <View>
        <Text style={styles.headerGreeting}>Service Client</Text>
        <Text style={styles.headerTitle}>WhatsApp Requests</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={24}
          color={Theme.neutral[700]}
        />
        <TouchableOpacity style={styles.iconButton} onPress={onRefresh}>
          <Ionicons name="refresh" size={24} color={Theme.neutral[700]} />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.lg,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
});

export default WhatsAppRequestHeader;
