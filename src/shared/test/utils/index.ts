/**
 * Test utilities exports
 */

export * from './render';

// Test ID helpers
export const testID = (id: string) => ({ testID: id });
export const accessibilityLabel = (label: string) => ({ accessibilityLabel: label });

// Async helpers
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data generators
export const generateId = () => Math.random().toString(36).substring(2, 9);

export const mockDate = (daysFromNow: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
};

// Form helpers
export const fillInput = async (
  getByTestId: (id: string) => any,
  testId: string,
  value: string
) => {
  const input = getByTestId(testId);
  input.props.onChangeText(value);
};

export const pressButton = async (
  getByTestId: (id: string) => any,
  testId: string
) => {
  const button = getByTestId(testId);
  button.props.onPress();
};

// Common test data
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  phone: '+1234567890',
};

export const mockOrder = {
  id: 'test-order-id',
  orderNumber: 'ORD-001',
  status: 'pending',
  total: 100,
  currency: 'USD',
  createdAt: new Date().toISOString(),
};
