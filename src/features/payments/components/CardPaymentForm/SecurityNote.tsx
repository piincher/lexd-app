import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';

export const SecurityNote: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.status.success + '08' }]}>
      <MaterialCommunityIcons name="shield-check" size={16} color={colors.status.success} />
      <Text style={[styles.text, { color: colors.status.success }]}>
        Your card details are encrypted and secure. We use 256-bit SSL encryption.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.control,
    padding: 12,
  },
  text: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
});
