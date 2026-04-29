import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';

interface ActionButtonProps {
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.actionButton, { backgroundColor: color + '12' }]}
      activeOpacity={0.7}
    >
      <Ionicons name={icon as any} size={16} color={color} />
      <Text style={[styles.actionText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  actionText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
});
