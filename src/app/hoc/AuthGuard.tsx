/**
 * AuthGuard Component
 * 
 * HOC that protects authenticated routes.
 * Redirects to login if user is not authenticated.
 * 
 * Usage:
 *   export default withAuthGuard(MyComponent);
 * 
 * Or use the hook:
 *   const { isAuthenticated, requireAuth } = useAuthGuard();
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@src/store/Auth';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { isAdminRole } from '@src/shared/lib/roles';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * AuthGuard Hook
 * Returns auth state and utilities
 */
export const useAuthGuard = () => {
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const navigation = useNavigation();
  
  const isAuthenticated = !!token && !!user?._id;

  const requireAuth = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const redirectToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return {
    isAuthenticated,
    token,
    user,
    requireAuth,
    redirectToLogin,
  };
};

/**
 * AuthGuard Component
 * Renders children only if authenticated, otherwise shows fallback
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback,
  redirectTo = 'Login'
}) => {
  const { isAuthenticated } = useAuthGuard();
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <View style={[styles.container, { backgroundColor: colors.background.default }]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={[styles.text, { color: colors.text.secondary }]}>Vérification de l&apos;authentification...</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate(redirectTo as never)}
          style={styles.button}
        >
          Se Connecter
        </Button>
      </View>
    );
  }

  return <>{children}</>;
};

/**
 * withAuthGuard HOC
 * Wraps a component with authentication check
 */
export function withAuthGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    fallback?: React.ReactNode;
    requireAdmin?: boolean;
  }
): React.FC<P> {
  const GuardedComponent: React.FC<P> = (props: P) => {
    const { isAuthenticated, user } = useAuthGuard();
    const navigation = useNavigation();

    useEffect(() => {
      if (!isAuthenticated) {
        navigation.navigate('Login' as never);
      } else if (options?.requireAdmin && !isAdminRole(user?.role)) {
        navigation.navigate('Home' as never);
      }
    }, [isAuthenticated, navigation, user]);

    const { colors } = useAppTheme();

    if (!isAuthenticated) {
      if (options?.fallback) {
        return <>{options.fallback}</>;
      }
      return (
        <View style={[styles.container, { backgroundColor: colors.background.default }]}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      );
    }

    if (options?.requireAdmin && !isAdminRole(user?.role)) {
      return (
        <View style={[styles.container, { backgroundColor: colors.background.default }]}>
          <Text style={[styles.errorText, { color: colors.status.error }]}>Accès réservé aux administrateurs</Text>
          <Button onPress={() => navigation.navigate('Home' as never)}>
            Retour
          </Button>
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };

  GuardedComponent.displayName = `withAuthGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return GuardedComponent;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    marginBottom: 16,
  },
});

export default AuthGuard;
