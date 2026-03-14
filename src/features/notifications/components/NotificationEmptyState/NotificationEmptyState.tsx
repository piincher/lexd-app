import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface NotificationEmptyStateProps {
  filter: string;
}

export const NotificationEmptyState: React.FC<NotificationEmptyStateProps> = ({ filter }) => {
  const getMessage = () => {
    switch (filter) {
      case 'unread':
        return 'Aucune notification non lue';
      case 'system':
        return 'Aucune notification système';
      default:
        return 'Aucune notification';
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="notifications-off-outline" size={64} color={Theme.neutral.grey400} />
      <Text style={styles.text}>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
  },
  text: {
    marginTop: Theme.spacing.md,
    fontSize: 16,
    color: Theme.neutral.grey500,
  },
});
