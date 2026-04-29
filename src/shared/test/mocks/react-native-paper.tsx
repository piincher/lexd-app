/**
 * React Native Paper mocks for testing
 */

import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// Mock PaperProvider
export const PaperProvider = ({ children }: { children: React.ReactNode }) => children;

// Mock ThemeProvider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => children;

// Mock withTheme HOC
export const withTheme = (Component: React.ComponentType<any>) => {
  return (props: any) => <Component {...props} theme={mockTheme} />;
};

// Mock theme object
export const mockTheme = {
  dark: false,
  mode: 'adaptive',
  roundness: 4,
  colors: {
    primary: '#6200ee',
    primaryContainer: '#6200ee',
    secondary: '#03dac6',
    secondaryContainer: '#03dac6',
    tertiary: '#018786',
    tertiaryContainer: '#018786',
    surface: '#ffffff',
    surfaceVariant: '#f5f5f5',
    surfaceDisabled: '#e0e0e0',
    background: '#f6f6f6',
    error: '#b00020',
    errorContainer: '#b00020',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#ffffff',
    onSecondary: '#000000',
    onSecondaryContainer: '#000000',
    onTertiary: '#ffffff',
    onTertiaryContainer: '#ffffff',
    onSurface: '#000000',
    onSurfaceVariant: '#424242',
    onSurfaceDisabled: '#9e9e9e',
    onError: '#ffffff',
    onErrorContainer: '#ffffff',
    onBackground: '#000000',
    outline: '#e0e0e0',
    outlineVariant: '#e0e0e0',
    inverseSurface: '#121212',
    inverseOnSurface: '#ffffff',
    inversePrimary: '#bb86fc',
    shadow: '#000000',
    scrim: '#000000',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    elevation: {
      level0: 'transparent',
      level1: '#f5f5f5',
      level2: '#eeeeee',
      level3: '#e0e0e0',
      level4: '#bdbdbd',
      level5: '#9e9e9e',
    },
  },
  fonts: {
    default: {
      fontFamily: 'System',
      fontWeight: '400',
      letterSpacing: 0,
    },
  },
  animation: {
    scale: 1,
  },
  isV3: true,
};

// Mock useTheme hook
export const useTheme = () => mockTheme;

// Mock Paper components
export const Button = ({ children, onPress, ...props }: any) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export const Card = ({ children, ...props }: any) => (
  <View {...props}>{children}</View>
);

export const CardContent = ({ children, ...props }: any) => (
  <View {...props}>{children}</View>
);

export const CardActions = ({ children, ...props }: any) => (
  <View {...props}>{children}</View>
);

export const TextInputComponent = ({ ...props }: any) => (
  <TextInput {...props} />
);

export const Appbar = {
  Header: ({ children, ...props }: any) => <View {...props}>{children}</View>,
  Content: ({ children, ...props }: any) => <View {...props}>{children}</View>,
  Action: ({ ...props }: any) => <TouchableOpacity {...props} />,
  BackAction: ({ onPress, ...props }: any) => (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text>Back</Text>
    </TouchableOpacity>
  ),
};

export const Portal = ({ children }: { children: React.ReactNode }) => children;

export const Modal = ({ children, visible, ...props }: any) =>
  visible ? <View {...props}>{children}</View> : null;

export const Dialog = ({ children, visible, ...props }: any) =>
  visible ? <View {...props}>{children}</View> : null;

export const DialogTitle = ({ children, ...props }: any) => (
  <Text {...props}>{children}</Text>
);

export const DialogContent = ({ children, ...props }: any) => (
  <View {...props}>{children}</View>
);

export const DialogActions = ({ children, ...props }: any) => (
  <View {...props}>{children}</View>
);

export const Snackbar = ({ children, visible, ...props }: any) =>
  visible ? <View {...props}>{children}</View> : null;

export const ActivityIndicator = ({ ...props }: any) => (
  <View {...props} testID="activity-indicator" />
);

export const Avatar = {
  Image: ({ ...props }: any) => <View {...props} testID="avatar-image" />,
  Icon: ({ ...props }: any) => <View {...props} testID="avatar-icon" />,
  Text: ({ children, ...props }: any) => <Text {...props}>{children}</Text>,
};

export const IconButton = ({ onPress, icon, ...props }: any) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <Text>{icon}</Text>
  </TouchableOpacity>
);

export const FAB = ({ onPress, icon, ...props }: any) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <Text>{icon}</Text>
  </TouchableOpacity>
);

export const List = {
  Section: ({ children, ...props }: any) => <View {...props}>{children}</View>,
  Item: ({ title, description, onPress, ...props }: any) => (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text>{title}</Text>
      {description && <Text>{description}</Text>}
    </TouchableOpacity>
  ),
  Icon: ({ ...props }: any) => <View {...props} />,
};

export const Menu = ({ children, visible, ...props }: any) =>
  visible ? <View {...props}>{children}</View> : null;

export const Divider = ({ ...props }: any) => <View {...props} />;

export const Chip = ({ children, onPress, ...props }: any) => (
  <TouchableOpacity onPress={onPress} {...props}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export const Badge = ({ children, ...props }: any) => (
  <View {...props}>
    <Text>{children}</Text>
  </View>
);

export const ProgressBar = ({ progress, ...props }: any) => (
  <View {...props} testID="progress-bar" />
);

// Setup React Native Paper mocks
jest.mock('react-native-paper', () => ({
  Provider: PaperProvider,
  ThemeProvider,
  withTheme,
  useTheme,
  Button,
  Card,
  CardContent,
  CardActions,
  TextInput: TextInputComponent,
  Appbar,
  Portal,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  ActivityIndicator,
  Avatar,
  IconButton,
  FAB,
  List,
  Menu,
  Divider,
  Chip,
  Badge,
  ProgressBar,
  MD3LightTheme: mockTheme,
  MD3DarkTheme: { ...mockTheme, dark: true },
}));

// Mock react-native-paper-dates
jest.mock('react-native-paper-dates', () => ({
  DatePickerModal: ({ visible, ...props }: any) =>
    visible ? <View {...props} testID="date-picker-modal" /> : null,
  TimePickerModal: ({ visible, ...props }: any) =>
    visible ? <View {...props} testID="time-picker-modal" /> : null,
  en: { translation: {} },
}));
