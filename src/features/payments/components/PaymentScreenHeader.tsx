import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface PaymentScreenHeaderProps {
  title: string;
  onBack: () => void;
  rightElement?: React.ReactNode;
}

export const PaymentScreenHeader: React.FC<PaymentScreenHeaderProps> = ({
  title,
  onBack,
  rightElement,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text.primary }]}>{title}</Text>
      {rightElement || <View style={styles.placeholder} />}
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
  placeholder: {
    width: 40,
  },
});
