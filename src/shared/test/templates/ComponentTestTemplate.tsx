/**
 * Component Test Template
 * 
 * Use this template as a starting point for testing React Native components.
 * Copy this file and modify it for your specific component.
 * 
 * @example
 * // MyComponent.test.tsx
 * import React from 'react';
 * import { render, screen, fireEvent } from '@src/test/utils/render';
 * import { MyComponent } from './MyComponent';
 * 
 * describe('MyComponent', () => {
 *   it('renders correctly', () => {
 *     render(<MyComponent />);
 *     expect(screen.getByTestId('my-component')).toBeTruthy();
 *   });
 * });
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/render';
import { View, Text, TouchableOpacity } from 'react-native';

// Example component (replace with your actual component)
interface ExampleComponentProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <View testID="example-component">
      <Text testID="title-text">{title}</Text>
      <TouchableOpacity
        testID="action-button"
        onPress={onPress}
        disabled={disabled}
      >
        <Text>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tests
describe('ExampleComponent', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders correctly with required props', () => {
      render(<ExampleComponent title="Test Title" />);
      
      expect(screen.getByTestId('example-component')).toBeTruthy();
      expect(screen.getByTestId('title-text')).toHaveTextContent('Test Title');
    });

    it('renders with custom title', () => {
      render(<ExampleComponent title="Custom Title" />);
      
      expect(screen.getByText('Custom Title')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('calls onPress when button is pressed', () => {
      const onPressMock = jest.fn();
      render(<ExampleComponent title="Test" onPress={onPressMock} />);
      
      fireEvent.press(screen.getByTestId('action-button'));
      
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPressMock = jest.fn();
      render(<ExampleComponent title="Test" onPress={onPressMock} disabled />);
      
      fireEvent.press(screen.getByTestId('action-button'));
      
      expect(onPressMock).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct accessibility props', () => {
      render(<ExampleComponent title="Accessible Title" />);
      
      // Add accessibility tests here
      // Example:
      // expect(screen.getByTestId('action-button')).toHaveAccessibilityState({ disabled: false });
    });
  });

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { toJSON } = render(<ExampleComponent title="Snapshot Test" />);
      
      expect(toJSON()).toMatchSnapshot();
    });
  });
});

// Testing with async operations
describe('ExampleComponent with Async', () => {
  it('handles async operations', async () => {
    const asyncOperation = jest.fn().mockResolvedValue({ success: true });
    
    render(
      <ExampleComponent
        title="Async Test"
        onPress={asyncOperation}
      />
    );
    
    fireEvent.press(screen.getByTestId('action-button'));
    
    await waitFor(() => {
      expect(asyncOperation).toHaveBeenCalled();
    });
  });
});

// Testing with different states
describe('ExampleComponent States', () => {
  it.each([
    { title: 'State 1', disabled: false },
    { title: 'State 2', disabled: true },
  ])('renders correctly with title=$title and disabled=$disabled', ({ title, disabled }) => {
    render(<ExampleComponent title={title} disabled={disabled} />);
    
    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByTestId('action-button').props.disabled).toBe(disabled);
  });
});
