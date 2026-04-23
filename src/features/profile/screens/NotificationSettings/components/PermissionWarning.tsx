import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface PermissionWarningProps {
  visible: boolean;
}

export const PermissionWarning: React.FC<PermissionWarningProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.warningCard}>
      <MaterialIcons name="info" size={20} color="#F59E0B" />
      <Text style={styles.warningText}>
        Les notifications sont desactivees. Activez-les pour recevoir les mises a jour importantes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.feedback.warningBg,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Theme.colors.status.warning,
  },
  warningText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Theme.colors.feedback.warningDark,
  },
});
