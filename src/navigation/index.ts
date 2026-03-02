/**
 * Navigation Index
 * 
 * Central export for all navigation components and types.
 */

// Navigators
export { PublicNavigator } from './PublicNavigator';
export { AuthenticatedNavigator } from './AuthenticatedNavigator';
export { RootNavigator } from './RootNavigator';

// Types
export type {
  // Public Navigation
  PublicStackParamList,
  PublicStackScreenProps,
  PublicNavigationProp,
  
  // Authenticated Navigation
  AuthenticatedStackParamList,
  AuthenticatedStackScreenProps,
  AuthenticatedNavigationProp,
  
  // Main Tab Navigation
  MainTabParamList,
  MainTabScreenProps,
  MainTabNavigationProp,
  
  // Root Navigation
  RootStackParamList,
  RootStackScreenProps,
  RootNavigationProp,
} from './types';

// Constants
export { TAB_CONFIG, REQUIRES_AUTH, PUBLIC_ROUTES } from './types';
