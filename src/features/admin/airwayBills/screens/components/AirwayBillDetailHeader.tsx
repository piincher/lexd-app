import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  onBack: () => void;
  onMenuOpen?: () => void;
  title: string;
  children?: React.ReactNode;
}

export const AirwayBillDetailHeader: React.FC<Props> = ({ onBack, onMenuOpen, title, children }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} hitSlop={8}>
        <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
      {children || (
        <TouchableOpacity onPress={onMenuOpen} hitSlop={8}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.neutral[800]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
