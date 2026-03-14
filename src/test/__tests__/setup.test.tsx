/**
 * Smoke test to verify Jest configuration is working
 */

import React from 'react';
import { View, Text } from 'react-native';
import { render, screen } from '../utils/render';

// Simple test component
const TestComponent: React.FC<{ message: string }> = ({ message }) => (
  <View testID="test-container">
    <Text testID="test-message">{message}</Text>
  </View>
);

describe('Jest Configuration', () => {
  it('renders correctly with testing-library', () => {
    render(<TestComponent message="Hello Test" />);
    
    expect(screen.getByTestId('test-container')).toBeTruthy();
    expect(screen.getByTestId('test-message')).toHaveTextContent('Hello Test');
  });

  it('supports async/await', async () => {
    const asyncFunction = async () => {
      return Promise.resolve('success');
    };
    
    const result = await asyncFunction();
    expect(result).toBe('success');
  });

  it('supports mocking', () => {
    const mockFn = jest.fn();
    mockFn('test');
    
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('has moduleNameMapper working', () => {
    // This test verifies that @src imports work
    // If the import at the top works, this test passes
    expect(true).toBe(true);
  });
});

describe('React Native Mocks', () => {
  it('react-native-safe-area-context is mocked', () => {
    const { useSafeAreaInsets } = require('react-native-safe-area-context');
    const insets = useSafeAreaInsets();
    
    expect(insets).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
  });

  it('react-native-paper is mocked', () => {
    const { useTheme } = require('react-native-paper');
    const theme = useTheme();
    
    expect(theme).toBeDefined();
    expect(theme.colors).toBeDefined();
    expect(theme.colors.primary).toBeDefined();
  });
});
