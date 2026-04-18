/**
 * Lazy Loading Utilities
 * 
 * Provides code splitting capabilities for React Native using
 * react-native-bundle-splitter for optimal bundle size and performance.
 */

import React, { ComponentType, ReactNode } from 'react';
import { Loading, Skeleton } from '@src/components/ui/Loading/Loading';
import { View, StyleSheet } from 'react-native';

interface LazyLoadOptions {
  /** Custom fallback component while loading */
  fallback?: ReactNode;
  /** Delay before showing fallback (ms) to prevent flash */
  delay?: number;
  /** Whether to show skeleton instead of spinner */
  useSkeleton?: boolean;
  /** Skeleton variant if useSkeleton is true */
  skeletonVariant?: 'list' | 'card' | 'detail';
}

/**
 * Higher-order component for lazy loading with bundle splitting
 * Uses dynamic imports compatible with React Native / Metro
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options: LazyLoadOptions = {}
): ComponentType<React.ComponentProps<T>> {
  const {
    fallback,
    delay = 0,
    useSkeleton = false,
    skeletonVariant = 'card',
  } = options;

  // Wrapper component with manual dynamic import
  const LazyLoadWrapper: React.FC<React.ComponentProps<T>> = (props) => {
    const [Component, setComponent] = React.useState<ComponentType<any> | null>(null);
    const [showFallback, setShowFallback] = React.useState(delay === 0);

    React.useEffect(() => {
      let isMounted = true;

      importFn().then((mod) => {
        if (isMounted) {
          const ResolvedComponent = (mod as any).default || mod;
          setComponent(() => ResolvedComponent);
        }
      });

      if (delay > 0) {
        const timer = setTimeout(() => setShowFallback(true), delay);
        return () => {
          isMounted = false;
          clearTimeout(timer);
        };
      }

      return () => {
        isMounted = false;
      };
    }, []);

    const renderFallback = () => {
      if (fallback) return <>{fallback}</>;
      if (useSkeleton) {
        if (skeletonVariant === 'list') {
          return (
            <View style={{ padding: 16 }}>
              <Skeleton width="100%" height={60} style={{ marginBottom: 12 }} />
              <Skeleton width="100%" height={60} style={{ marginBottom: 12 }} />
              <Skeleton width="100%" height={60} style={{ marginBottom: 12 }} />
            </View>
          );
        }
        if (skeletonVariant === 'detail') {
          return (
            <View style={{ padding: 16 }}>
              <Skeleton width="100%" height={200} style={{ marginBottom: 16 }} />
              <Skeleton width="80%" height={20} style={{ marginBottom: 12 }} />
              <Skeleton width="60%" height={20} style={{ marginBottom: 12 }} />
              <Skeleton width="40%" height={20} />
            </View>
          );
        }
        return <Skeleton width="100%" height={120} />;
      }
      return (
        <View style={styles.fallbackContainer}>
          <Loading />
        </View>
      );
    };

    if (!Component) {
      return showFallback ? renderFallback() : null;
    }

    return <Component {...props} />;
  };

  // Set display name for debugging
  const componentName = importFn.name || 'Component';
  LazyLoadWrapper.displayName = `LazyLoad(${componentName})`;

  return LazyLoadWrapper;
}

/**
 * Preload a component for faster subsequent navigation
 * Call this when you anticipate user navigation (e.g., on button hover/press start)
 */
export function preloadComponent<T>(
  importFn: () => Promise<T>
): Promise<T | null> {
  try {
    return importFn();
  } catch (error) {
    console.warn('[LazyLoad] Failed to preload component:', error);
    return Promise.resolve(null);
  }
}

/**
 * Create a lazy-loaded screen for React Navigation
 * Optimized for screen components with default 200ms delay to prevent flash
 */
export function lazyLoadScreen<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options: Omit<LazyLoadOptions, 'delay'> & { delay?: number } = {}
): ComponentType<React.ComponentProps<T>> {
  return lazyLoad(importFn, {
    delay: 200,
    useSkeleton: true,
    skeletonVariant: 'detail',
    ...options,
  });
}

/**
 * Lazy load a list component with list skeleton
 */
export function lazyLoadList<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options: Omit<LazyLoadOptions, 'useSkeleton' | 'skeletonVariant'> = {}
): ComponentType<React.ComponentProps<T>> {
  return lazyLoad(importFn, {
    delay: 150,
    useSkeleton: true,
    skeletonVariant: 'list',
    ...options,
  });
}

/**
 * Lazy load a card component with card skeleton
 */
export function lazyLoadCard<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options: Omit<LazyLoadOptions, 'useSkeleton' | 'skeletonVariant'> = {}
): ComponentType<React.ComponentProps<T>> {
  return lazyLoad(importFn, {
    delay: 100,
    useSkeleton: true,
    skeletonVariant: 'card',
    ...options,
  });
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {
  lazyLoad,
  lazyLoadScreen,
  lazyLoadList,
  lazyLoadCard,
  preloadComponent,
};
