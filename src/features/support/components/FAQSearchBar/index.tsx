/**
 * FAQSearchBar Component - Search input with animated icon and clear button
 * Following SRP: Single purpose - search input UI (< 100 lines)
 */

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers';
import { Fonts } from '@src/constants/Fonts';

interface FAQSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

export const FAQSearchBar: React.FC<FAQSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Rechercher...',
}) => {
  const { colors, isDark } = useAppTheme();

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(value.length > 0 ? 1.1 : 1, {
          damping: 12,
          stiffness: 200,
        }),
      },
    ],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.background.paper : colors.neutral[100],
          borderColor: isDark ? colors.border : colors.neutral[200],
        },
      ]}
    >
      <Animated.View style={animatedIconStyle}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={colors.text.secondary}
        />
      </Animated.View>
      <TextInput
        style={[
          styles.input,
          { color: colors.text.primary },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.disabled}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityRole="search"
        accessibilityLabel="Rechercher dans la FAQ"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Effacer la recherche"
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={20}
            color={colors.text.disabled}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 15,
    paddingVertical: 4,
    minWidth: 44,
    minHeight: 44,
  },
  clearButton: {
    padding: 4,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FAQSearchBar;
