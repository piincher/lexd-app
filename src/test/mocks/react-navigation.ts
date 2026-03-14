/**
 * React Navigation mocks for testing
 */

import React from 'react';

// Mock navigation hooks
export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();
export const mockReset = jest.fn();
export const mockSetParams = jest.fn();
export const mockSetOptions = jest.fn();
export const mockDispatch = jest.fn();
export const mockAddListener = jest.fn(() => () => {});
export const mockRemoveListener = jest.fn();
export const mockIsFocused = jest.fn(() => true);
export const mockCanGoBack = jest.fn(() => true);

export const useNavigation = () => ({
  navigate: mockNavigate,
  goBack: mockGoBack,
  reset: mockReset,
  setParams: mockSetParams,
  setOptions: mockSetOptions,
  dispatch: mockDispatch,
  addListener: mockAddListener,
  removeListener: mockRemoveListener,
  isFocused: mockIsFocused,
  canGoBack: mockCanGoBack,
  getId: () => undefined,
  getParent: () => undefined,
  getState: () => ({ routes: [], index: 0 }),
});

export const useRoute = <T extends Record<string, any> = Record<string, any>>(routeParams?: T) => ({
  key: 'test-route-key',
  name: 'TestRoute',
  params: routeParams || {},
  path: undefined,
});

export const useFocusEffect = (callback: () => void | (() => void)) => {
  React.useEffect(() => {
    return callback();
  }, [callback]);
};

export const useIsFocused = () => true;

export const useNavigationState = (selector?: (state: any) => any) => {
  const state = { routes: [], index: 0 };
  return selector ? selector(state) : state;
};

// Mock screen components
export const createNavigationMock = () => ({
  navigate: mockNavigate,
  goBack: mockGoBack,
  reset: mockReset,
  setParams: mockSetParams,
  setOptions: mockSetOptions,
  dispatch: mockDispatch,
  addListener: mockAddListener,
  removeListener: mockRemoveListener,
  isFocused: mockIsFocused,
  canGoBack: mockCanGoBack,
});

// Reset all navigation mocks
export const resetNavigationMocks = () => {
  mockNavigate.mockClear();
  mockGoBack.mockClear();
  mockReset.mockClear();
  mockSetParams.mockClear();
  mockSetOptions.mockClear();
  mockDispatch.mockClear();
  mockAddListener.mockClear();
  mockRemoveListener.mockClear();
  mockIsFocused.mockClear();
  mockCanGoBack.mockClear();
};

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation,
  useRoute,
  useFocusEffect,
  useIsFocused,
  useNavigationState,
}));

// Mock @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: () => null,
  }),
}));

// Mock @react-navigation/bottom-tabs
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: () => null,
  }),
}));

// Mock @react-navigation/stack
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: () => null,
  }),
  TransitionPresets: {
    ModalSlideFromBottomIOS: {},
    ModalPresentationIOS: {},
  },
  CardStyleInterpolators: {
    forHorizontalIOS: () => ({}),
    forVerticalIOS: () => ({}),
  },
}));
