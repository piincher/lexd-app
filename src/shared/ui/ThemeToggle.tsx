/**
 * ThemeToggle Component
 * Allows users to toggle between light/dark/system themes
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ThemeMode } from '@src/constants/Theme';
import { ThemeToggleProps } from './ThemeToggle.types';
import { getCurrentIcon } from './ThemeToggle.utils';
import { ThemeToggleIcon } from './ThemeToggleIcon';
import { ThemeToggleButton } from './ThemeToggleButton';
import { ThemeToggleModal } from './ThemeToggleModal';
import { createStyles } from './ThemeToggle.styles';

export { type ThemeToggleProps } from './ThemeToggle.types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  size = 24,
  style,
}) => {
  const { theme, setTheme, isDark, colors } = useAppTheme();
  const styles = createStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [scaleAnim] = useState(() => new Animated.Value(1));

  const handlePress = () => {
    if (variant === 'menu') {
      setModalVisible(true);
    } else {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
      const newTheme: ThemeMode = isDark ? 'light' : 'dark';
      setTheme(newTheme);
    }
  };

  const handleThemeSelect = (selectedTheme: ThemeMode) => {
    setTheme(selectedTheme);
    setModalVisible(false);
  };

  const currentIcon = getCurrentIcon(theme, isDark);

  if (variant === 'icon') {
    return (
      <ThemeToggleIcon
        iconName={currentIcon.name}
        size={size}
        scaleAnim={scaleAnim}
        onPress={handlePress}
        colors={colors}
        style={style}
      />
    );
  }

  if (variant === 'button') {
    return (
      <>
        <ThemeToggleButton
          iconName={currentIcon.name}
          label={theme === 'system' ? 'Système' : isDark ? 'Sombre' : 'Clair'}
          onPress={() => setModalVisible(true)}
          colors={colors}
          style={style}
        />
        <ThemeToggleModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          currentTheme={theme}
          onSelect={handleThemeSelect}
          colors={colors}
        />
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.menuButton, style]}
        activeOpacity={0.7}
      >
        <View style={styles.menuIconContainer}>
          <FontAwesome6 name={currentIcon.name as any} size={20} color={colors.primary.main} />
        </View>
        <Text style={[styles.menuText, { color: colors.text.primary }]}>Thème</Text>
        <Text style={[styles.menuValue, { color: colors.text.secondary }]}>
          {theme === 'system' ? 'Automatique' : isDark ? 'Sombre' : 'Clair'}
        </Text>
        <FontAwesome6 name="chevron-right" size={16} color={colors.text.secondary} />
      </TouchableOpacity>

      <ThemeToggleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentTheme={theme}
        onSelect={handleThemeSelect}
        colors={colors}
      />
    </>
  );
};

export default ThemeToggle;
