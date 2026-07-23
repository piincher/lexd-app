import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

interface PermissionWarningProps {
  visible: boolean;
}

export const PermissionWarning: React.FC<PermissionWarningProps> = ({ visible }) => {
  const { colors } = useAppTheme();

  if (!visible) return null;

  return (
    <View style={[styles.warningCard, { backgroundColor: colors.feedback.warningBg, borderColor: colors.status.warning }]}>
      <MaterialIcons name="info" size={20} color={colors.status.warning} />
      <Text style={[styles.warningText, { color: colors.feedback.warningDark }]}>
        Les notifications sont desactivees. Activez-les pour recevoir les mises a jour importantes.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: RADIUS.control,
    marginBottom: 16,
    borderWidth: HAIRLINE,
  },
  warningText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
});
