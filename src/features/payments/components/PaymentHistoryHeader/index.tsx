import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PaymentHistoryHeaderProps {
  onBackPress: () => void;
  onNotificationPress: () => void;
  title: string;
}

export const PaymentHistoryHeader: React.FC<PaymentHistoryHeaderProps> = ({
  onBackPress,
  onNotificationPress,
  title,
}) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.header,
        { borderBottomColor: colors.border },
      ]}
    >
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onNotificationPress} style={styles.backButton}>
        <MaterialCommunityIcons name="bell" size={24} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
});
