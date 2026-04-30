/**
 * Screen Component
 * Layout wrapper for screens with consistent styling and behavior
 */

import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ScreenProps } from './Screen.types';
import { ScreenHeader } from './ScreenHeader';
import { styles } from './Screen.styles';

export { type ScreenProps, type ScreenVariant, type HeaderConfig } from './Screen.types';

export const Screen: React.FC<ScreenProps> = ({
  children,
  variant = 'default',
  scrollable = true,
  safeArea = true,
  style,
  contentStyle,
  header,
  footer,
}) => {
  const { colors, isDark } = useAppTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: colors.background.default },
    variant === 'plain' && { backgroundColor: colors.background.default },
    style,
  ];

  const contentContainerStyle = [
    styles.content,
    variant === 'card' && styles.cardContent,
    contentStyle,
  ];

  const renderContent = () => (
    <>
      <ScreenHeader header={header} colors={colors} />
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={contentContainerStyle}>{children}</View>
      )}
      {footer}
    </>
  );

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background.default}
      />
      {safeArea ? (
        <SafeAreaView style={containerStyle} edges={['top', 'left', 'right']}>
          {renderContent()}
        </SafeAreaView>
      ) : (
        <View style={containerStyle}>{renderContent()}</View>
      )}
    </>
  );
};

export default Screen;
