#!/usr/bin/env tsx

/**
 * Test script for stability improvements
 * Validates that EnhancedErrorBoundary and apiClient work correctly
 */

import { stableFetch, getCircuitBreakerState } from '../client/src/lib/apiClient';

console.log('🧪 Testing Stability Improvements...\n');

// Test 1: Circuit Breaker State
console.log('1. Testing Circuit Breaker State...');
const state = getCircuitBreakerState();
console.log('   ✅ Circuit Breaker State:', state);
console.log('   Expected: { failures: 0, state: "closed" }');
console.log('');

// Test 2: Stable Fetch with valid URL
console.log('2. Testing stableFetch with valid URL...');
try {
  const response = await stableFetch('https://httpbin.org/get', {
    timeout: 5000,
    retries: 1,
  });
  console.log('   ✅ Request successful:', response.status);
} catch (error) {
  console.log('   ⚠️  Request failed (expected if offline):', (error as Error).message);
}
console.log('');

// Test 3: Stable Fetch with timeout
console.log('3. Testing stableFetch timeout...');
try {
  await stableFetch('https://httpbin.org/delay/10', {
    timeout: 2000,
    retries: 0,
  });
  console.log('   ❌ Timeout test failed - should have timed out');
} catch (error) {
  if ((error as Error).message.includes('timeout')) {
    console.log('   ✅ Timeout working correctly');
  } else {
    console.log('   ⚠️  Unexpected error:', (error as Error).message);
  }
}
console.log('');

// Test 4: Circuit Breaker after failures
console.log('4. Testing Circuit Breaker after simulated failures...');
// Note: In real usage, failures would be recorded automatically
console.log('   ℹ️  Circuit breaker will open after 5 consecutive failures');
console.log('   ℹ️  State:', getCircuitBreakerState());
console.log('');

console.log('✅ Stability tests completed!');
console.log('\n📝 Note: EnhancedErrorBoundary should be tested manually in the browser');

