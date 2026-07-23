import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';

interface SaveCardCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const SaveCardCheckbox: React.FC<SaveCardCheckboxProps> = ({
  checked,
  onToggle,
  disabled,
}) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} disabled={disabled}>
      <View
        style={[
          styles.checkbox,
          { borderColor: colors.text.secondary },
          checked && { backgroundColor: colors.primary.main, borderColor: colors.primary.main },
        ]}
      >
        {checked && (
          <MaterialCommunityIcons name="check" size={14} color={colors.text.inverse} />
        )}
      </View>
      <Text style={[styles.text, { color: colors.text.primary }]}>
        Save card for future payments
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.badge,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
});
