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
import { Theme, lightTheme } from '@src/constants/Theme';

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
        <View style={styles.simpleHeader}>
          {headerConfig.showBack && (
            <TouchableOpacity 
              onPress={headerConfig.onBackPress} 
              style={styles.backButton}
              testID="screen-back-button"
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>{headerConfig.title}</Text>
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
    variant === 'plain' && styles.plainContainer,
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
      <StatusBar barStyle="dark-content" backgroundColor={Theme.neutral.white} />
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
    backgroundColor: Theme.neutral[50],
  },
  plainContainer: {
    backgroundColor: Theme.neutral.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  cardContent: {
    padding: Theme.spacing.md,
  },
  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  backButton: {
    padding: Theme.spacing.sm,
    minWidth: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: lightTheme.colors.primary.main,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: lightTheme.typography.h4.fontSize,
    fontWeight: lightTheme.typography.h4.fontWeight as '700',
    color: lightTheme.colors.text.primary,
  },
  rightAction: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
  rightPlaceholder: {
    minWidth: 40,
  },
});

export default Screen;
