import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface PermissionWarningProps {
  visible: boolean;
}

export const PermissionWarning: React.FC<PermissionWarningProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.warningCard}>
      <MaterialIcons name="info" size={20} color="#F59E0B" />
      <Text style={styles.warningText}>
        Notifications are disabled. Enable them to receive important updates.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  warningText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#92400E',
  },
});
