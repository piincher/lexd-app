/**
 * Navigation Analytics
 * 
 * Automatically tracks screen views using React Navigation's 
 * useNavigationContainerRef and onStateChange.
 */

import React, { useRef, useCallback } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import type { NavigationState } from '@react-navigation/native';
import { useAnalytics } from '../hooks/useAnalytics';

interface NavigationAnalyticsProps {
  children: React.ReactNode;
}

/**
 * Get current route name from navigation state
 */
function getCurrentRouteName(state: NavigationState): string {
  const route = state.routes[state.index];
  
  if (route.state) {
    // Dive into nested navigators
    return getCurrentRouteName(route.state as NavigationState);
  }
  
  return route.name;
}

/**
 * Get current route params from navigation state
 */
function getCurrentRouteParams(state: NavigationState): Record<string, unknown> | undefined {
  const route = state.routes[state.index];
  
  if (route.state) {
    // Dive into nested navigators
    return getCurrentRouteParams(route.state as NavigationState);
  }
  
  return route.params;
}

/**
 * Navigation Analytics Wrapper Component
 * 
 * Wraps NavigationContainer and automatically logs screen views
 */
export const NavigationAnalytics: React.FC<NavigationAnalyticsProps> = ({ children }) => {
  const navigationRef = useNavigationContainerRef();
  const { logScreenView } = useAnalytics();
  const routeNameRef = useRef<string | null>(null);

  const onStateChange = useCallback(async () => {
    const currentRoute = navigationRef.getCurrentRoute();
    
    if (currentRoute) {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = currentRoute.name;

      if (previousRouteName !== currentRouteName) {
        // Log screen view
        await logScreenView(
          currentRouteName,
          currentRouteName,
          currentRoute.params as Record<string, string | number | boolean>
        );
        
        routeNameRef.current = currentRouteName;
      }
    }
  }, [navigationRef, logScreenView]);

  // Clone the child (NavigationContainer) and add onStateChange
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: navigationRef,
      onStateChange,
    } as any);
  }

  return <>{children}</>;
};

/**
 * Hook to manually track screen views
 */
export function useNavigationAnalytics() {
  const { logScreenView, logEvent } = useAnalytics();

  /**
   * Track a screen view manually
   */
  const trackScreen = React.useCallback((
    screenName: string,
    params?: Record<string, string | number | boolean>
  ) => {
    return logScreenView(screenName, screenName, params);
  }, [logScreenView]);

  /**
   * Track navigation action
   */
  const trackNavigation = React.useCallback((
    fromScreen: string,
    toScreen: string,
    action: 'navigate' | 'go_back' | 'replace'
  ) => {
    return logEvent('navigation', {
      from_screen: fromScreen,
      to_screen: toScreen,
      navigation_action: action,
    });
  }, [logEvent]);

  return {
    trackScreen,
    trackNavigation,
  };
}

export default NavigationAnalytics;
