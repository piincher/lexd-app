/**
 * AppHeader — Unified header component
 *
 * Wraps react-native-paper's Appbar.Header with consistent theming.
 * Replaces the fragmented header patterns across screens.
 *
 * Features:
 * - Consistent back button handling
 * - Theme-aware colors
 * - Optional transparent mode for hero screens
 * - Optional collapsible header with scroll tracking
 * - Right action slot for icons/menus
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  transparent?: boolean;
  scrollY?: Animated.SharedValue<number>;
  elevationThreshold?: number;
}

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

  // Collapsible header animation
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
          {
            backgroundColor: transparent ? 'transparent' : colors.background.default,
          },
        ]}
      >
        {canGoBack ? (
          <Appbar.BackAction
            onPress={handleBack}
            iconColor={colors.text.primary}
          />
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View style={styles.titleContainer}>
          <Text
            variant="titleLarge"
            style={[
              styles.title,
              { color: colors.text.primary },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              variant="bodySmall"
              style={[styles.subtitle, { color: colors.text.secondary }]}
              numberOfLines={1}
            >
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

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
  },
  backPlaceholder: {
    width: 48,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightContainer: {
    minWidth: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightPlaceholder: {
    width: 48,
  },
});
