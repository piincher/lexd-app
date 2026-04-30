/**
 * AppHeader — Unified header component
 *
 * Wraps react-native-paper's Appbar.Header with consistent theming.
 */

import React from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { AppHeaderProps } from './app-header.types';
import { styles } from './app-header.styles';

export { type AppHeaderProps } from './app-header.types';

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBack,
  right,
  transparent = false,
  scrollY,
  elevationThreshold = 20,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const canGoBack = navigation.canGoBack?.() ?? false;

  const animatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    const opacity = interpolate(
      scrollY.value,
      [0, elevationThreshold],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      elevation: opacity * 4,
      shadowOpacity: opacity * 0.1,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Appbar.Header
        style={[
          styles.header,
          { backgroundColor: transparent ? 'transparent' : colors.background.default },
        ]}
      >
        {canGoBack ? (
          <Appbar.BackAction onPress={handleBack} iconColor={colors.text.primary} />
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View style={styles.titleContainer}>
          <Text variant="titleLarge" style={[styles.title, { color: colors.text.primary }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodySmall" style={[styles.subtitle, { color: colors.text.secondary }]} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {right ? (
          <View style={styles.rightContainer}>{right}</View>
        ) : (
          <View style={styles.rightPlaceholder} />
        )}
      </Appbar.Header>
    </Animated.View>
  );
};
