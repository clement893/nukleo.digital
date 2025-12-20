import { lazy, ComponentType, LazyExoticComponent } from 'react';
import { logger } from './logger';

/**
 * Wraps React.lazy() with retry logic for failed chunk loads.
 * This handles cases where the HTML references a chunk file that doesn't exist
 * (e.g., after a new deployment where old chunks were deleted).
 * 
 * @param importFn - The dynamic import function
 * @param retries - Number of retry attempts (default: 1)
 * @returns A lazy-loaded component with retry logic
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries = 1
): LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        
        // Check if it's a chunk loading error
        const isChunkError = 
          error instanceof TypeError &&
          (error.message.includes('Failed to fetch dynamically imported module') ||
           error.message.includes('Loading chunk') ||
           error.message.includes('Loading CSS chunk'));
        
        if (isChunkError && attempt < retries) {
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        
        // If it's a chunk error and we've exhausted retries, reload the page
        // This ensures users get the latest HTML that matches the available chunks
        if (isChunkError) {
          logger.tagged('LazyLoad').warn('Chunk loading failed, reloading page to get latest build...', error);
          
          // Store the current URL to reload to
          const currentUrl = window.location.href;
          
          // CRITICAL: Clear ALL caches and unregister service worker for chunk errors
          // This ensures we get fresh HTML that matches available chunks
          Promise.all([
            // Clear all caches
            'caches' in window ? window.caches.keys().then(names => 
              Promise.all(names.map(name => window.caches.delete(name)))
            ) : Promise.resolve(),
            // Unregister service worker
            'serviceWorker' in navigator 
              ? navigator.serviceWorker.getRegistrations().then(registrations =>
                  Promise.all(registrations.map(reg => reg.unregister()))
                )
              : Promise.resolve(),
          ]).then(() => {
            // Force hard reload with cache bypass
            const separator = currentUrl.includes('?') ? '&' : '?';
            window.location.replace(`${currentUrl.split('?')[0]}${separator}_reload=${Date.now()}&_nocache=1`);
          }).catch(() => {
            // If cache clearing fails, still reload
            const separator = currentUrl.includes('?') ? '&' : '?';
            window.location.replace(`${currentUrl.split('?')[0]}${separator}_reload=${Date.now()}&_nocache=1`);
          });
          
          // Return a promise that never resolves (page will reload)
          return new Promise(() => {});
        }
        
        // For non-chunk errors, throw immediately
        throw error;
      }
    }
    
    // Should never reach here, but TypeScript needs it
    throw lastError || new Error('Failed to load component');
  });
}

