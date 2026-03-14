/**
 * Custom render utility for testing React Native components
 * Wraps components with all necessary providers
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a fresh QueryClient for each test
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}, // Silence query errors in tests
    },
  });
};

// Simple provider wrapper that uses mocked components
const SimpleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

interface AllTheProvidersProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

/**
 * Wraps children with all app providers
 */
export const AllTheProviders: React.FC<AllTheProvidersProps> = ({
  children,
  queryClient = createTestQueryClient(),
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  queryClient?: QueryClient;
  initialRoute?: string;
}

/**
 * Custom render function that wraps the component with all providers
 */
export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const { queryClient, ...renderOptions } = options;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Simple render without complex providers
 * Use this for simple component tests
 */
export function simpleRender(
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapper'> = {}
): RenderResult {
  return render(ui, options);
}

/**
 * Renders a hook with all providers
 * Useful for testing hooks that depend on context
 */
export function renderHookWithProviders<T>(
  hook: () => T,
  options: CustomRenderOptions = {}
): { result: { current: T }; rerender: () => void; unmount: () => void } {
  const { queryClient } = options;
  const testQueryClient = queryClient || createTestQueryClient();

  let result: T = {} as T;

  const TestComponent: React.FC = () => {
    result = hook();
    return null;
  };

  const { rerender, unmount } = customRender(<TestComponent />, {
    queryClient: testQueryClient,
  });

  return {
    result: { current: result },
    rerender,
    unmount,
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react-native';

// Override render with custom render
export { customRender as render };
