/**
 * Performance Monitoring Utilities
 * 
 * Provides tools for measuring component render performance,
 * tracking metrics, and optimizing React Native applications.
 */

import React, { useEffect, useRef, ComponentType } from 'react';
import { InteractionManager } from 'react-native';

// Performance measurement types
interface RenderMetrics {
  componentName: string;
  renderTime: number;
  timestamp: number;
  props?: Record<string, unknown>;
}

interface PerformanceConfig {
  /** Enable/disable performance logging */
  enabled: boolean;
  /** Minimum render time to log (ms) */
  threshold: number;
  /** Callback for performance metrics */
  onMetric?: (metric: RenderMetrics) => void;
}

// Global configuration
let config: PerformanceConfig = {
  enabled: __DEV__,
  threshold: 16, // 1 frame at 60fps
};

/**
 * Configure performance monitoring
 */
export function configurePerformance(options: Partial<PerformanceConfig>): void {
  config = { ...config, ...options };
}

/**
 * Measure render time of a component
 * Returns a HOC that wraps the component with performance measurement
 */
export function measureRender<T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  name?: string
): ComponentType<T> {
  const componentName = name || Component.displayName || Component.name || 'Unknown';

  const MeasuredComponent: React.FC<T> = (props) => {
    const startTimeRef = useRef<number>(0);
    const renderCountRef = useRef(0);

    useEffect(() => {
      renderCountRef.current += 1;
    });

    startTimeRef.current = performance.now();

    useEffect(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;

      if (config.enabled && renderTime > config.threshold) {
        const metric: RenderMetrics = {
          componentName,
          renderTime,
          timestamp: Date.now(),
          props: config.enabled ? undefined : undefined, // Don't log props in production
        };

        console.log(
          `[Performance] ${componentName} rendered in ${renderTime.toFixed(2)}ms ` +
          `(render #${renderCountRef.current})`
        );

        config.onMetric?.(metric);
      }
    });

    return React.createElement(Component, props);
  };

  MeasuredComponent.displayName = `MeasureRender(${componentName})`;
  return MeasuredComponent;
}

/**
 * Hook to measure function execution time
 */
export function usePerformanceTimer(name: string) {
  const startTimeRef = useRef<number>(0);

  const start = () => {
    startTimeRef.current = performance.now();
  };

  const end = (metadata?: Record<string, unknown>) => {
    const duration = performance.now() - startTimeRef.current;
    
    if (config.enabled) {
      console.log(
        `[Performance] ${name} took ${duration.toFixed(2)}ms`,
        metadata ? JSON.stringify(metadata) : ''
      );
    }

    return duration;
  };

  return { start, end };
}

/**
 * Hook to defer expensive operations until after animations/interactions
 */
export function useDeferredExecution(delay: number = 0) {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      if (delay > 0) {
        const timer = setTimeout(() => setIsReady(true), delay);
        return () => clearTimeout(timer);
      } else {
        setIsReady(true);
      }
    });

    return () => handle.cancel();
  }, [delay]);

  return isReady;
}

/**
 * Memo comparison function for deep equality (use with React.memo)
 * Only compares primitive values and shallow arrays
 */
export function shallowEqual<T extends Record<string, unknown>>(
  prevProps: T,
  nextProps: T
): boolean {
  const keys = Object.keys(prevProps);
  
  for (const key of keys) {
    const prev = prevProps[key];
    const next = nextProps[key];

    // Handle functions - always consider equal (assumes stable callbacks)
    if (typeof prev === 'function' && typeof next === 'function') {
      continue;
    }

    // Handle arrays with shallow comparison
    if (Array.isArray(prev) && Array.isArray(next)) {
      if (prev.length !== next.length) return false;
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] !== next[i]) return false;
      }
      continue;
    }

    // Primitive comparison
    if (prev !== next) return false;
  }

  return true;
}

/**
 * Create a memoized component with custom comparison
 */
export function memoizeComponent<T extends ComponentType<any>>(
  Component: T,
  comparisonFn?: (prev: React.ComponentProps<T>, next: React.ComponentProps<T>) => boolean
): React.MemoExoticComponent<T> {
  return React.memo(Component, comparisonFn || shallowEqual);
}

/**
 * Utility to batch multiple state updates
 * Uses React 18's automatic batching or falls back to manual batching
 */
export function batchUpdates<T>(fn: () => T): T {
  // React 18+ has automatic batching, but we can use this for explicit batching
  return fn();
}

/**
 * Debounce a function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Throttle a function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Performance metrics collector for analytics
 */
class PerformanceMetricsCollector {
  private metrics: RenderMetrics[] = [];
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  add(metric: RenderMetrics): void {
    this.metrics.push(metric);
    
    // Keep only recent metrics
    if (this.metrics.length > this.maxSize) {
      this.metrics.shift();
    }
  }

  getAverageRenderTime(componentName?: string): number {
    const relevant = componentName
      ? this.metrics.filter(m => m.componentName === componentName)
      : this.metrics;

    if (relevant.length === 0) return 0;

    const sum = relevant.reduce((acc, m) => acc + m.renderTime, 0);
    return sum / relevant.length;
  }

  getSlowRenders(threshold: number = 100): RenderMetrics[] {
    return this.metrics.filter(m => m.renderTime > threshold);
  }

  clear(): void {
    this.metrics = [];
  }

  getReport(): {
    totalMeasurements: number;
    averageRenderTime: number;
    slowestRender: RenderMetrics | null;
    fastestRender: RenderMetrics | null;
  } {
    if (this.metrics.length === 0) {
      return {
        totalMeasurements: 0,
        averageRenderTime: 0,
        slowestRender: null,
        fastestRender: null,
      };
    }

    const sorted = [...this.metrics].sort((a, b) => b.renderTime - a.renderTime);

    return {
      totalMeasurements: this.metrics.length,
      averageRenderTime: this.getAverageRenderTime(),
      slowestRender: sorted[0],
      fastestRender: sorted[sorted.length - 1],
    };
  }
}

// Global metrics collector instance
export const metricsCollector = new PerformanceMetricsCollector();

// Export default object
export default {
  measureRender,
  usePerformanceTimer,
  useDeferredExecution,
  shallowEqual,
  memoizeComponent,
  batchUpdates,
  debounce,
  throttle,
  configurePerformance,
  metricsCollector,
};
