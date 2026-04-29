/**
 * App-level modules
 * Central export for initialization, providers, navigation, and context
 */

export {
  UpdateContext,
  UpdateProvider,
} from './context/UpdateProvider';

export {
  NotificationProvider,
  useNotificationContext,
  type NotificationContextValue,
} from './providers/NotificationProvider';

export {
  ThemeProvider,
  useAppTheme,
  useThemeStyles,
  type ThemeContextType,
} from './providers';

export {
  ScrollDirectionProvider,
  useScrollDirection,
  useTabBarVisibility,
} from './providers/ScrollDirectionProvider';

export type {
  AuthenticatedStackParamList,
  AuthenticatedStackScreenProps,
  PublicStackScreenProps,
} from './navigation/types';

export { REQUIRES_AUTH } from './navigation/types';

export type {
  RootStackParamList,
  RootStackScreenProps,
  HomeTabParamList,
  navigationProps,
  PublicNavigationProp,
  HomeTabScreenProps,
} from './navigation/type';

export { navigationRef } from './navigation/navigationRef';
