/**
 * Centralized logging utility
 * 
 * Provides consistent logging across the application with automatic
 * filtering of logs in production environment.
 * 
 * @example
 * import { logger } from '@/lib/logger';
 * 
 * logger.log('Debug information');
 * logger.warn('Warning message');
 * logger.error('Error occurred', error);
 */

const isDevelopment = import.meta.env.DEV;

interface Logger {
  /**
   * Logs informational messages (only in development)
   * @param args - Arguments to log
   */
  log: (...args: unknown[]) => void;
  
  /**
   * Logs warning messages (only in development)
   * @param args - Arguments to log
   */
  warn: (...args: unknown[]) => void;
  
  /**
   * Logs error messages (always logged, even in production)
   * @param args - Arguments to log
   */
  error: (...args: unknown[]) => void;
  
  /**
   * Logs debug messages (only in development)
   * @param args - Arguments to log
   */
  debug: (...args: unknown[]) => void;
  
  /**
   * Logs messages with a specific tag/prefix
   * @param tag - Tag to prefix the message with
   * @param args - Arguments to log
   */
  tagged: (tag: string) => {
    log: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    debug: (...args: unknown[]) => void;
  };
}

export const logger: Logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  error: (...args: unknown[]) => {
    // Always log errors, even in production
    console.error(...args);
  },
  
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
  
  tagged: (tag: string) => ({
    log: (...args: unknown[]) => {
      if (isDevelopment) {
        console.log(`[${tag}]`, ...args);
      }
    },
    warn: (...args: unknown[]) => {
      if (isDevelopment) {
        console.warn(`[${tag}]`, ...args);
      }
    },
    error: (...args: unknown[]) => {
      console.error(`[${tag}]`, ...args);
    },
    debug: (...args: unknown[]) => {
      if (isDevelopment) {
        console.debug(`[${tag}]`, ...args);
      }
    },
  }),
};

