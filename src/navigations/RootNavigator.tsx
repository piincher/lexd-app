/**
 * RootNavigator
 * 
 * Root navigation component that handles the authentication state
 * and switches between Public and Authenticated navigators.
 * 
 * Flow:
 * 1. Check if user is authenticated (has valid token)
 * 2. If authenticated -> Show AuthenticatedNavigator
 * 3. If not authenticated -> Show PublicNavigator
 * 4. Handle onboarding (first app launch)
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@src/store/Auth';
import { useAppLaunchStore } from '@src/store/AppLaunch';
import { COLORS } from '@src/constants/Colors';

import { PublicNavigator } from './PublicNavigator';
import { AuthenticatedNavigator } from '../navigation/AuthenticatedNavigator';
import { OnBoardingScreen } from '@src/features/onboarding';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList & { OnBoarding: undefined; Main: undefined }>();

/**
 * Authentication Gate Component
 * Decides which navigator to show based on auth state
 */
const AuthGate: React.FC = () => {
  const { token, user } = useAuth();
  const isAuthenticated = !!token && !!user?._id;

  return isAuthenticated ? <AuthenticatedNavigator /> : <PublicNavigator />;
};

/**
 * Root Navigator Component
 */
export const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const { isAppLaunchFirst, markAppAsLaunched } = useAppLaunchStore();

  // Simulate checking auth state (token validation, etc.)
  useEffect(() => {
    const initializeAuth = async () => {
      // Add any auth validation logic here
      // e.g., check token expiration, refresh token, etc.
      
      // Simulate delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const handleOnboardingComplete = () => {
    markAppAsLaunched();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Onboarding - Only show on first launch */}
        {isAppLaunchFirst && (
          <Stack.Screen name="OnBoarding">
            {(props) => (
              <OnBoardingScreen 
                {...props} 
                onComplete={handleOnboardingComplete}
              />
            )}
          </Stack.Screen>
        )}

        {/* Main App - Switches between Public and Authenticated */}
        <Stack.Screen name="Main" component={AuthGate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default RootNavigator;
