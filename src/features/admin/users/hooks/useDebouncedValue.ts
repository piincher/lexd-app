import { useState, useEffect } from "react";

/**
 * Hook to debounce a value by a specified delay.
 * Returns the debounced value and whether the value is currently pending.
 */
export const useDebouncedValue = <T>(value: T, delay: number = 400) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return { debouncedValue, isPending };
};
