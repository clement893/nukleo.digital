/**
 * Enhanced API Client with timeout, retry, and circuit breaker
 * Provides robust error handling and stability improvements
 */

import { logger } from './logger';

export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'closed' | 'open' | 'half-open';
}

class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private readonly failureThreshold = 5;
  private readonly resetTimeout = 60000; // 1 minute

  canAttempt(): boolean {
    const now = Date.now();

    if (this.state === 'closed') {
      return true;
    }

    if (this.state === 'open') {
      if (now - this.lastFailureTime > this.resetTimeout) {
        this.state = 'half-open';
        logger.tagged('CircuitBreaker').debug('Circuit breaker: OPEN -> HALF-OPEN');
        return true;
      }
      return false;
    }

    // half-open
    return true;
  }

  recordSuccess(): void {
    if (this.state === 'half-open') {
      this.state = 'closed';
      this.failures = 0;
      logger.tagged('CircuitBreaker').debug('Circuit breaker: HALF-OPEN -> CLOSED');
    } else {
      this.failures = Math.max(0, this.failures - 1);
    }
  }

  recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.failureThreshold) {
      this.state = 'open';
      logger.tagged('CircuitBreaker').warn('Circuit breaker: CLOSED -> OPEN (too many failures)');
    }
  }

  getState(): CircuitBreakerState {
    return {
      failures: this.failures,
      lastFailureTime: this.lastFailureTime,
      state: this.state,
    };
  }
}

const circuitBreaker = new CircuitBreaker();

/**
 * Fetch with timeout
 */
function fetchWithTimeout(
  url: string,
  options: RequestOptions = {},
  timeout: number = 30000
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error(`Request timeout after ${timeout}ms`));
    }, timeout);

    fetch(url, {
      ...options,
      signal: controller.signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

/**
 * Exponential backoff delay
 */
function getRetryDelay(attempt: number, baseDelay: number = 1000): number {
  return baseDelay * Math.pow(2, attempt);
}

/**
 * Enhanced fetch with retry, timeout, and circuit breaker
 */
export async function stableFetch(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const {
    timeout = 30000,
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  // Check circuit breaker
  if (!circuitBreaker.canAttempt()) {
    throw new Error('Circuit breaker is OPEN - too many failures');
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions, timeout);

      // Record success
      circuitBreaker.recordSuccess();

      // Check if response is ok
      if (!response.ok && attempt < retries) {
        // Retry on 5xx errors
        if (response.status >= 500) {
          throw new Error(`Server error: ${response.status}`);
        }
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (
        error instanceof Error &&
        (error.message.includes('timeout') ||
          error.message.includes('aborted') ||
          error.message.includes('Circuit breaker'))
      ) {
        if (attempt < retries) {
          const delay = getRetryDelay(attempt, retryDelay);
          logger.tagged('API').warn(
            `Request failed (attempt ${attempt + 1}/${retries + 1}), retrying in ${delay}ms...`,
            error
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }

      // Record failure
      circuitBreaker.recordFailure();

      // If this was the last attempt, throw
      if (attempt === retries) {
        throw error;
      }

      // Wait before retrying
      const delay = getRetryDelay(attempt, retryDelay);
      logger.tagged('API').warn(
        `Request failed (attempt ${attempt + 1}/${retries + 1}), retrying in ${delay}ms...`,
        error
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Request failed after all retries');
}

/**
 * Get circuit breaker state (for monitoring)
 */
export function getCircuitBreakerState() {
  return circuitBreaker.getState();
}

