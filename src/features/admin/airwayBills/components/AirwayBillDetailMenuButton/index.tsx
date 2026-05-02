import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  onPress: () => void;
}

export const AirwayBillDetailMenuButton: React.FC<Props> = ({ onPress }) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress} hitSlop={12} activeOpacity={0.7}>
      <Ionicons name="ellipsis-vertical" size={24} color={colors.neutral[800]} />
    </TouchableOpacity>
  );
};
