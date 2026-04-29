/**
 * Hook Test Template
 * 
 * Use this template as a starting point for testing custom React hooks.
 * Copy this file and modify it for your specific hook.
 * 
 * @example
 * // useMyHook.test.ts
 * import { renderHook, act } from '@testing-library/react-hooks';
 * import { useMyHook } from './useMyHook';
 * 
 * describe('useMyHook', () => {
 *   it('returns expected initial state', () => {
 *     const { result } = renderHook(() => useMyHook());
 *     expect(result.current.value).toBe('initial');
 *   });
 * });
 */

import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useState, useCallback, useEffect } from 'react';

// Example hook (replace with your actual hook)
interface UseCounterOptions {
  initialValue?: number;
  step?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

const useCounter = (options: UseCounterOptions = {}): UseCounterReturn => {
  const { initialValue = 0, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount((prev) => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
};

// Tests
describe('useCounter', () => {
  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  describe('Initialization', () => {
    it('initializes with default value', () => {
      const { result } = renderHook(() => useCounter());

      expect(result.current.count).toBe(0);
    });

    it('initializes with custom initial value', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 10 }));

      expect(result.current.count).toBe(10);
    });

    it('initializes with custom step', () => {
      const { result } = renderHook(() => useCounter({ step: 5 }));

      expect(result.current.count).toBe(0);
    });
  });

  describe('Increment', () => {
    it('increments by 1 by default', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(1);
    });

    it('increments by custom step', () => {
      const { result } = renderHook(() => useCounter({ step: 5 }));

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(5);
    });

    it('increments multiple times', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.increment();
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.count).toBe(3);
    });
  });

  describe('Decrement', () => {
    it('decrements by 1 by default', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.decrement();
      });

      expect(result.current.count).toBe(4);
    });

    it('decrements by custom step', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 10, step: 3 }));

      act(() => {
        result.current.decrement();
      });

      expect(result.current.count).toBe(7);
    });
  });

  describe('Reset', () => {
    it('resets to initial value', () => {
      const { result } = renderHook(() => useCounter({ initialValue: 5 }));

      act(() => {
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.count).toBe(7);

      act(() => {
        result.current.reset();
      });

      expect(result.current.count).toBe(5);
    });
  });

  describe('SetCount', () => {
    it('sets count directly', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.setCount(100);
      });

      expect(result.current.count).toBe(100);
    });
  });
});

// Example: Testing async hook
const useAsyncData = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));
      setData('fetched data');
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

describe('useAsyncData', () => {
  it('handles async data fetching', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncData());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('fetched data');
  });
});

// Example: Testing hook with dependencies
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    // In real implementation, this would read from localStorage
    const stored = localStorage.getItem(key);
    if (stored) {
      setValue(JSON.parse(stored));
    }
  }, [key]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }, [key]);

  return [value, updateValue] as const;
};

describe('useLocalStorage', () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('reads from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
    expect(result.current[0]).toBe('stored value');
  });

  it('writes to localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new value')
    );
  });
});

// Best practices for testing hooks:
// 1. Always wrap state updates in act()
// 2. Use cleanup() after each test to unmount hooks
// 3. Test initial state, state updates, and edge cases
// 4. Mock external dependencies (API calls, localStorage, etc.)
// 5. Test error states and loading states for async hooks
