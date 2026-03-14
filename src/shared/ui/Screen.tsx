/**
 * Screen Component
 * Layout wrapper for screens with consistent styling and behavior
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/constants/Theme';

export type ScreenVariant = 'default' | 'plain' | 'card';

export interface ScreenProps {
  children: React.ReactNode;
  variant?: ScreenVariant;
  scrollable?: boolean;
  safeArea?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  header?: React.ReactNode;
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
      {header}
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
});

export default Screen;
