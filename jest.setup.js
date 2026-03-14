import '@testing-library/jest-native/extend-expect';

// Global test timeout
jest.setTimeout(10000);

// Mock react-native-reanimated before anything else
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    FadeIn: { duration: () => ({}) },
    FadeInUp: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
    FadeOutDown: { duration: () => ({}) },
    Layout: {
      springify: () => ({}),
      damping: () => ({}),
      stiffness: () => ({}),
    },
    Easing: {
      linear: (t) => t,
      ease: (t) => t,
      inOut: (easing) => easing,
    },
  };
});

// Mock react-native-worklets
jest.mock('react-native-worklets', () => ({
  Worklets: {
    runOnUI: (fn) => fn,
    runOnJS: (fn) => fn,
    createSharedValue: (value) => ({ value }),
    useSharedValue: (value) => ({ value }),
  },
}));

// Mock moti
jest.mock('moti', () => ({
  View: 'MotiView',
  Text: 'MotiText',
  Image: 'MotiImage',
  MotiView: 'MotiView',
  MotiText: 'MotiText',
  useAnimationState: () => ({}),
  useDynamicAnimation: () => ({}),
}));

// Mock moti/skeleton
jest.mock('moti/skeleton', () => ({
  Skeleton: 'Skeleton',
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-font
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        apiUrl: 'https://test-api.example.com',
      },
    },
  },
  expoConfig: {
    extra: {
      apiUrl: 'https://test-api.example.com',
    },
  },
}));

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock expo-notifications
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getExpoPushTokenAsync: jest.fn(() => Promise.resolve({ data: 'test-push-token' })),
  addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  removeNotificationSubscription: jest.fn(),
  getPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
}));

// Mock expo-modules-core
jest.mock('expo-modules-core', () => ({
  EventEmitter: class EventEmitter {
    listeners = {};
    addListener(event, callback) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(callback);
      return { remove: () => this.removeListener(event, callback) };
    }
    removeListener(event, callback) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
      }
    }
    emit(event, ...args) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(cb => cb(...args));
      }
    }
  },
  NativeModulesProxy: {},
  requireNativeModule: () => ({}),
  requireOptionalNativeModule: () => null,
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  State: {},
  PanGestureHandler: 'PanGestureHandler',
  TapGestureHandler: 'TapGestureHandler',
  LongPressGestureHandler: 'LongPressGestureHandler',
  PinchGestureHandler: 'PinchGestureHandler',
  RotationGestureHandler: 'RotationGestureHandler',
  FlingGestureHandler: 'FlingGestureHandler',
  NativeViewGestureHandler: 'NativeViewGestureHandler',
  RawButton: 'RawButton',
  BaseButton: 'BaseButton',
  RectButton: 'RectButton',
  BorderlessButton: 'BorderlessButton',
  FlatList: 'FlatList',
  Directions: {},
  TouchableHighlight: 'TouchableHighlight',
  TouchableNativeFeedback: 'TouchableNativeFeedback',
  TouchableOpacity: 'TouchableOpacity',
  TouchableWithoutFeedback: 'TouchableWithoutFeedback',
  ScrollView: 'ScrollView',
  Swipeable: 'Swipeable',
  DrawerLayout: 'DrawerLayout',
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
}));

// Mock react-native-paper
jest.mock('react-native-paper', () => ({
  Provider: ({ children }) => children,
  ThemeProvider: ({ children }) => children,
  useTheme: () => ({
    dark: false,
    mode: 'adaptive',
    roundness: 4,
    colors: {
      primary: '#6200ee',
      primaryContainer: '#6200ee',
      secondary: '#03dac6',
      surface: '#ffffff',
      background: '#f6f6f6',
      error: '#b00020',
      onPrimary: '#ffffff',
      onSurface: '#000000',
      onBackground: '#000000',
      outline: '#e0e0e0',
      backdrop: 'rgba(0, 0, 0, 0.5)',
    },
    fonts: {
      default: { fontFamily: 'System', fontWeight: '400' },
    },
    animation: { scale: 1 },
  }),
  withTheme: (Component) => Component,
  Button: 'Button',
  Card: 'Card',
  CardContent: 'CardContent',
  CardActions: 'CardActions',
  TextInput: 'TextInput',
  Appbar: {
    Header: 'AppbarHeader',
    Content: 'AppbarContent',
    Action: 'AppbarAction',
    BackAction: 'AppbarBackAction',
  },
  Portal: ({ children }) => children,
  Modal: ({ children, visible }) => visible ? children : null,
  Dialog: ({ children, visible }) => visible ? children : null,
  Snackbar: ({ children, visible }) => visible ? children : null,
  ActivityIndicator: 'ActivityIndicator',
  Avatar: {
    Image: 'AvatarImage',
    Icon: 'AvatarIcon',
    Text: 'AvatarText',
  },
  IconButton: 'IconButton',
  FAB: 'FAB',
  List: {
    Section: 'ListSection',
    Item: 'ListItem',
    Icon: 'ListIcon',
  },
  Menu: ({ children, visible }) => visible ? children : null,
  Divider: 'Divider',
  Chip: 'Chip',
  Badge: 'Badge',
  ProgressBar: 'ProgressBar',
  MD3LightTheme: {},
  MD3DarkTheme: {},
}));

// Mock react-native-paper-dates
jest.mock('react-native-paper-dates', () => ({
  DatePickerModal: ({ visible }) => visible ? null : null,
  TimePickerModal: ({ visible }) => visible ? null : null,
  en: { translation: {} },
  fr: { translation: {} },
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(() => () => {}),
    removeListener: jest.fn(),
    isFocused: jest.fn(() => true),
    canGoBack: jest.fn(() => true),
  }),
  useRoute: () => ({
    key: 'test-route-key',
    name: 'TestRoute',
    params: {},
    path: undefined,
  }),
  useFocusEffect: (callback) => {
    callback();
    return () => {};
  },
  useIsFocused: () => true,
  NavigationContainer: ({ children }) => children,
}));

// Silence console warnings during tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    if (args[0]?.includes('Animated')) return;
    if (args[0]?.includes('useNativeDriver')) return;
    if (args[0]?.includes('Reanimated')) return;
    if (args[0]?.includes('GestureHandler')) return;
    originalConsoleWarn(...args);
  };
  
  console.error = (...args) => {
    if (args[0]?.includes('ReactDOMTestUtils.act')) return;
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) return;
    originalConsoleError(...args);
  };
});

afterAll(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});
