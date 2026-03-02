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
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

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
  const { token, user } = useAuth();
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

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text style={styles.text}>Vérification de l'authentification...</Text>
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
  return (props: P) => {
    const { isAuthenticated, user } = useAuthGuard();
    const navigation = useNavigation();

    useEffect(() => {
      if (!isAuthenticated) {
        navigation.navigate('Login' as never);
      } else if (options?.requireAdmin && user?.role !== 'admin') {
        navigation.navigate('Home' as never);
      }
    }, [isAuthenticated, user]);

    if (!isAuthenticated) {
      if (options?.fallback) {
        return <>{options.fallback}</>;
      }
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      );
    }

    if (options?.requireAdmin && user?.role !== 'admin') {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Accès réservé aux administrateurs</Text>
          <Button onPress={() => navigation.navigate('Home' as never)}>
            Retour
          </Button>
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontFamily: Fonts.regular,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontFamily: Fonts.bold,
    marginBottom: 16,
  },
});

export default AuthGuard;
