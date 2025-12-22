/**
 * Lazy Loading Utilities
 * Optimize component loading with dynamic imports
 */

import { ComponentType, lazy, Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';

/**
 * Create a lazy-loaded component with loading fallback
 */
export function createLazyComponent<T extends ComponentType<Record<string, unknown>>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = LazyComponent as any;
    return (
      <Suspense fallback={fallback || <Spinner />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

/**
 * Lazy load a component with custom loading component
 */
export function lazyLoad<T extends ComponentType<Record<string, unknown>>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent?: ComponentType
) {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = LazyComponent as any;
    const fallback = LoadingComponent ? <LoadingComponent /> : <Spinner />;
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}

