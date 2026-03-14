/**
 * ErrorBoundary - Global error boundary component
 * Catches JavaScript errors anywhere in the child component tree
 * Logs errors to Sentry and displays a fallback UI
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Button } from '@src/shared/ui';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to Sentry with additional context
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
        componentName: this.props.componentName || 'Unknown',
      },
      tags: {
        errorBoundary: 'true',
        component: this.props.componentName || 'Unknown',
      },
    });

    // Update state with error info
    this.setState({ errorInfo });

    // Call optional onError callback
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.onReset?.();
  };

  handleReportError = () => {
    // Trigger Sentry user feedback
    Sentry.showFeedbackDialog({
      onSubmitSuccess: () => {
        console.log('Feedback submitted successfully');
      },
      onSubmitError: (error) => {
        console.error('Error submitting feedback:', error);
      },
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="alert-circle-outline" size={64} color={COLORS.danger} />
            </View>

            <Text style={styles.title}>Une erreur est survenue</Text>
            <Text style={styles.subtitle}>
              Nous sommes désolés, mais quelque chose s'est mal passé.
            </Text>

            <View style={styles.errorCard}>
              <Text style={styles.errorLabel}>Détails de l'erreur :</Text>
              <Text style={styles.errorMessage}>
                {this.state.error?.message || 'Une erreur inattendue s\'est produite'}
              </Text>
              {__DEV__ && this.state.errorInfo && (
                <Text style={styles.stackTrace} numberOfLines={10}>
                  {this.state.errorInfo.componentStack}
                </Text>
              )}
            </View>

            <View style={styles.actions}>
              <Button
                title="Réessayer"
                onPress={this.handleReset}
                variant="primary"
                size="large"
                fullWidth
                icon="refresh-outline"
                style={styles.retryButton}
              />

              <Button
                title="Signaler le problème"
                onPress={this.handleReportError}
                variant="outline"
                size="medium"
                fullWidth
                icon="mail-outline"
                style={styles.reportButton}
              />
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.FeatherWhite,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${COLORS.danger}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.DarkGrey,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  errorCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.grey,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  errorMessage: {
    fontSize: 14,
    color: COLORS.DarkGrey,
    marginBottom: 8,
  },
  stackTrace: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: 'monospace',
    backgroundColor: COLORS.lightergray,
    padding: 8,
    borderRadius: 4,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  retryButton: {
    marginBottom: 8,
  },
  reportButton: {
    marginTop: 8,
  },
});

export default ErrorBoundary;
