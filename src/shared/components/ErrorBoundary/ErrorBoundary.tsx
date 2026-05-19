/**
 * ErrorBoundary - Global error boundary component
 * Catches JavaScript errors anywhere in the child component tree
 * Logs errors to Sentry and displays a fallback UI
 */

import React, { Component, ErrorInfo, ReactNode, useMemo } from 'react';
import { Alert, View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button } from '@src/shared/ui/Button';

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

interface ErrorFallbackProps {
  error?: Error;
  errorInfo?: ErrorInfo;
  onReset: () => void;
  onReportError: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  onReset,
  onReportError,
}) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.paper,
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
          backgroundColor: `${colors.status.error}15`,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.text.primary,
          marginBottom: 8,
          textAlign: 'center',
        },
        subtitle: {
          fontSize: 16,
          color: colors.text.secondary,
          textAlign: 'center',
          marginBottom: 24,
          paddingHorizontal: 16,
        },
        errorCard: {
          width: '100%',
          backgroundColor: colors.background.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderLeftWidth: 4,
          borderLeftColor: colors.status.error,
          shadowColor: colors.neutral[900],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        errorLabel: {
          fontSize: 12,
          fontWeight: '600',
          color: colors.text.secondary,
          marginBottom: 4,
          textTransform: 'uppercase',
        },
        errorMessage: {
          fontSize: 14,
          color: colors.text.primary,
          marginBottom: 8,
        },
        stackTrace: {
          fontSize: 12,
          color: colors.text.secondary,
          fontFamily: 'monospace',
          backgroundColor: colors.neutral[200],
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
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={colors.status.error}
          />
        </View>

        <Text style={styles.title}>Une erreur est survenue</Text>
        <Text style={styles.subtitle}>
          Nous sommes désolés, mais quelque chose s&apos;est mal passé.
        </Text>

        <View style={styles.errorCard}>
          <Text style={styles.errorLabel}>Détails de l&apos;erreur :</Text>
          <Text style={styles.errorMessage}>
            {error?.message || "Une erreur inattendue s'est produite"}
          </Text>
          {__DEV__ && errorInfo && (
            <Text style={styles.stackTrace} numberOfLines={10}>
              {errorInfo.componentStack}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <Button
            title="Réessayer"
            onPress={onReset}
            variant="primary"
            size="large"
            fullWidth
            icon="refresh-outline"
            style={styles.retryButton}
          />

          <Button
            title="Signaler le problème"
            onPress={onReportError}
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
};

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
    const eventId = Sentry.captureMessage('User reported an error boundary issue', {
      level: 'info',
      extra: {
        componentName: this.props.componentName || 'Unknown',
        errorMessage: this.state.error?.message,
        componentStack: this.state.errorInfo?.componentStack,
      },
    });

    Alert.alert(
      'Merci',
      eventId
        ? `Votre rapport a ete envoye. Reference: ${eventId}`
        : 'Votre rapport a ete envoye.'
    );
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
          onReportError={this.handleReportError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
