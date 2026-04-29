/**
 * Performance Monitoring
 * 
 * Provides detailed performance metrics collection and reporting
 * for tracking app performance in production.
 */

import { trackEvent } from './analytics';
import { addBreadcrumb, captureException } from './sentry';

interface PerformanceMark {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: 'ms' | 'bytes' | 'count' | 'percent';
  metadata?: Record<string, unknown>;
}

interface PerformanceReport {
  marks: PerformanceMark[];
  metrics: PerformanceMetric[];
  timestamp: string;
}

/**
 * Performance Monitor Class
 * 
 * Tracks performance marks and metrics throughout the app lifecycle.
 */
class PerformanceMonitor {
  private marks: Map<string, PerformanceMark> = new Map();
  private metrics: PerformanceMetric[] = [];
  private maxMetrics: number = 100;

  constructor(maxMetrics: number = 100) {
    this.maxMetrics = maxMetrics;
  }

  /**
   * Start a performance mark
   */
  startMark(name: string, metadata?: Record<string, unknown>): void {
    const mark: PerformanceMark = {
      name,
      startTime: performance.now(),
      metadata,
    };
    this.marks.set(name, mark);
  }

  /**
   * End a performance mark and calculate duration
   */
  endMark(name: string, additionalMetadata?: Record<string, unknown>): PerformanceMark | null {
    const mark = this.marks.get(name);
    if (!mark) {
      console.warn(`[PerformanceMonitor] Mark "${name}" not found`);
      return null;
    }

    mark.endTime = performance.now();
    mark.duration = mark.endTime - mark.startTime;
    
    if (additionalMetadata) {
      mark.metadata = { ...mark.metadata, ...additionalMetadata };
    }

    // Log to analytics
    this.logMark(mark);

    // Clean up
    this.marks.delete(name);

    return mark;
  }

  /**
   * Measure a synchronous function
   */
  measure<T>(
    name: string,
    fn: () => T,
    metadata?: Record<string, unknown>
  ): T {
    this.startMark(name, metadata);
    try {
      const result = fn();
      this.endMark(name);
      return result;
    } catch (error) {
      this.endMark(name, { error: true });
      throw error;
    }
  }

  /**
   * Measure an asynchronous function
   */
  async measureAsync<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, unknown>
  ): Promise<T> {
    this.startMark(name, metadata);
    try {
      const result = await fn();
      this.endMark(name);
      return result;
    } catch (error) {
      this.endMark(name, { error: true });
      throw error;
    }
  }

  /**
   * Record a metric value
   */
  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }

    // Log to Firebase
    this.logMetric(metric);
  }

  /**
   * Record memory usage
   */
  recordMemoryUsage(context?: string): void {
    if (global.performance && 'memory' in global.performance) {
      const memory = (global.performance as any).memory;
      if (memory) {
        this.recordMetric({
          name: 'memory_usage',
          value: memory.usedJSHeapSize,
          unit: 'bytes',
          metadata: {
            total: memory.totalJSHeapSize,
            limit: memory.jsHeapSizeLimit,
            context,
          },
        });
      }
    }
  }

  /**
   * Get all marks
   */
  getMarks(): PerformanceMark[] {
    return Array.from(this.marks.values());
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get marks by name pattern
   */
  getMarksByPattern(pattern: RegExp): PerformanceMark[] {
    return this.getMarks().filter(mark => pattern.test(mark.name));
  }

  /**
   * Get average duration for marks matching pattern
   */
  getAverageDuration(pattern: RegExp): number {
    const marks = this.getMarksByPattern(pattern);
    if (marks.length === 0) return 0;

    const total = marks.reduce((sum, mark) => sum + (mark.duration || 0), 0);
    return total / marks.length;
  }

  /**
   * Clear all marks and metrics
   */
  clear(): void {
    this.marks.clear();
    this.metrics = [];
  }

  /**
   * Generate performance report
   */
  generateReport(): PerformanceReport {
    return {
      marks: this.getMarks(),
      metrics: [...this.metrics],
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Log mark to analytics
   */
  private async logMark(mark: PerformanceMark): Promise<void> {
    if (!mark.duration) return;

    try {
      // Log to Mixpanel
      await trackEvent('performance_mark', {
        mark_name: mark.name,
        duration_ms: Math.round(mark.duration),
        ...this.flattenMetadata(mark.metadata),
      });

      // Add breadcrumb for Sentry
      addBreadcrumb(
        `Performance: ${mark.name} took ${mark.duration.toFixed(2)}ms`,
        'performance',
        mark.duration > 1000 ? 'warning' : 'info',
        { 
          markName: mark.name, 
          duration: mark.duration,
          ...mark.metadata,
        }
      );

      // Log slow operations to Sentry
      if (mark.duration > 1000) {
        captureException(
          new Error(`Slow operation: ${mark.name}`),
          { 
            duration: mark.duration,
            metadata: mark.metadata,
          }
        );
      }
    } catch (error) {
      console.warn('[PerformanceMonitor] Failed to log mark:', error);
    }
  }

  /**
   * Log metric to analytics
   */
  private async logMetric(metric: PerformanceMetric): Promise<void> {
    try {
      await trackEvent('performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_unit: metric.unit,
        ...this.flattenMetadata(metric.metadata),
      });
    } catch (error) {
      console.warn('[PerformanceMonitor] Failed to log metric:', error);
    }
  }

  /**
   * Flatten metadata for analytics (no nested objects)
   */
  private flattenMetadata(metadata?: Record<string, unknown>): Record<string, string | number | boolean> {
    if (!metadata) return {};

    const flattened: Record<string, string | number | boolean> = {};
    
    for (const [key, value] of Object.entries(metadata)) {
      if (value === null || value === undefined) continue;
      
      if (typeof value === 'object') {
        flattened[key] = JSON.stringify(value);
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        flattened[key] = value;
      }
    }

    return flattened;
  }
}

// Global performance monitor instance
export const perfMonitor = new PerformanceMonitor();

/**
 * Hook-compatible function to start a mark
 */
export function startMark(name: string, metadata?: Record<string, unknown>): void {
  perfMonitor.startMark(name, metadata);
}

/**
 * Hook-compatible function to end a mark
 */
export function endMark(name: string, metadata?: Record<string, unknown>): PerformanceMark | null {
  return perfMonitor.endMark(name, metadata);
}

/**
 * Measure function execution time
 */
export function measure<T>(name: string, fn: () => T, metadata?: Record<string, unknown>): T {
  return perfMonitor.measure(name, fn, metadata);
}

/**
 * Measure async function execution time
 */
export function measureAsync<T>(
  name: string, 
  fn: () => Promise<T>, 
  metadata?: Record<string, unknown>
): Promise<T> {
  return perfMonitor.measureAsync(name, fn, metadata);
}

/**
 * Record a metric
 */
export function recordMetric(metric: PerformanceMetric): void {
  perfMonitor.recordMetric(metric);
}

/**
 * Create performance observer for React components
 */
export function createPerformanceObserver(
  onMark?: (mark: PerformanceMark) => void,
  onMetric?: (metric: PerformanceMetric) => void
): { observe: () => void; disconnect: () => void } {
  let isObserving = false;

  return {
    observe: () => {
      isObserving = true;
      
      // Poll for new marks/metrics
      const checkInterval = setInterval(() => {
        if (!isObserving) {
          clearInterval(checkInterval);
          return;
        }

        const marks = perfMonitor.getMarks();
        const metrics = perfMonitor.getMetrics();

        marks.forEach(mark => onMark?.(mark));
        metrics.forEach(metric => onMetric?.(metric));
      }, 1000);
    },
    disconnect: () => {
      isObserving = false;
    },
  };
}

// Default export
export default {
  perfMonitor,
  startMark,
  endMark,
  measure,
  measureAsync,
  recordMetric,
  createPerformanceObserver,
};
