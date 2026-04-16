/**
 * Screen Component
 * Layout wrapper for screens with consistent styling and behavior
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';

export type ScreenVariant = 'default' | 'plain' | 'card';

export interface HeaderConfig {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export interface ScreenProps {
  children: React.ReactNode;
  variant?: ScreenVariant;
  scrollable?: boolean;
  safeArea?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  header?: React.ReactNode | HeaderConfig;
  footer?: React.ReactNode;
}

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

  // Render header based on type
  const renderHeader = () => {
    if (!header) return null;
    
    // If header is a React element, render it directly
    if (React.isValidElement(header)) {
      return header;
    }
    
    // If header is a config object with title, render a simple header
    const headerConfig = header as HeaderConfig;
    if (headerConfig.title) {
      return (
        <View style={[styles.simpleHeader, { 
          backgroundColor: colors.background.default,
          borderBottomColor: colors.border,
        }]}>
          {headerConfig.showBack && (
            <TouchableOpacity 
              onPress={headerConfig.onBackPress} 
              style={styles.backButton}
              testID="screen-back-button"
            >
              <Text style={[styles.backButtonText, { color: colors.primary.main }]}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            {headerConfig.title}
          </Text>
          {headerConfig.rightAction ? (
            <View style={styles.rightAction}>{headerConfig.rightAction}</View>
          ) : (
            <View style={styles.rightPlaceholder} />
          )}
        </View>
      );
    }
    
    return null;
  };

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
      {renderHeader()}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  cardContent: {
    padding: 16,
  },
  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 10,
    minWidth: 44,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  rightAction: {
    minWidth: 44,
    alignItems: 'flex-end',
  },
  rightPlaceholder: {
    minWidth: 44,
  },
});

export default Screen;
