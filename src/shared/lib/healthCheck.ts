/**
 * Health Check System
 * 
 * Provides comprehensive health monitoring for the application,
 * including API, database, storage, and network connectivity checks.
 */

import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import { getItem, getAllKeys } from './offlineStorage';
import { captureException, addBreadcrumb } from './sentry';
import { perfMonitor } from './performanceMonitoring';

// API URL from environment or constants
const API_URL = Constants.expoConfig?.extra?.apiUrl || 
  process.env.EXPO_PUBLIC_API_URL || 
  'https://api.lexdservices.com';

interface HealthCheckResult {
  healthy: boolean;
  checks: HealthChecks;
  timestamp: string;
  duration: number;
  version: string;
}

interface HealthChecks {
  api: boolean;
  database: boolean;
  storage: boolean;
  network: boolean;
  memory: boolean;
}

interface HealthCheckDetails {
  api: { status: boolean; latency?: number; error?: string };
  database: { status: boolean; latency?: number; error?: string };
  storage: { status: boolean; usage?: number; error?: string };
  network: { status: boolean; type?: string; error?: string };
  memory: { status: boolean; usage?: number; error?: string };
}

/**
 * Run comprehensive health check
 */
export async function runHealthCheck(
  includeDetails: boolean = false
): Promise<HealthCheckResult & { details?: HealthCheckDetails }> {
  const startTime = Date.now();
  
  perfMonitor.startMark('health_check');

  const [apiResult, databaseResult, storageResult, networkResult, memoryResult] = await Promise.allSettled([
    checkApiHealth(),
    checkDatabaseHealth(),
    checkStorageHealth(),
    checkNetworkHealth(),
    checkMemoryHealth(),
  ]);

  const checks: HealthChecks = {
    api: apiResult.status === 'fulfilled' ? apiResult.value.status : false,
    database: databaseResult.status === 'fulfilled' ? databaseResult.value.status : false,
    storage: storageResult.status === 'fulfilled' ? storageResult.value.status : false,
    network: networkResult.status === 'fulfilled' ? networkResult.value.status : false,
    memory: memoryResult.status === 'fulfilled' ? memoryResult.value.status : false,
  };

  const allHealthy = Object.values(checks).every(Boolean);
  const duration = Date.now() - startTime;

  perfMonitor.endMark('health_check', { 
    healthy: allHealthy,
    checks_failed: Object.values(checks).filter(c => !c).length,
  });

  addBreadcrumb(
    `Health check completed: ${allHealthy ? 'healthy' : 'unhealthy'}`,
    'health',
    allHealthy ? 'info' : 'warning',
    { checks, duration }
  );

  const result: HealthCheckResult = {
    healthy: allHealthy,
    checks,
    timestamp: new Date().toISOString(),
    duration,
    version: Constants.expoConfig?.version || 'unknown',
  };

  if (includeDetails) {
    const details: HealthCheckDetails = {
      api: apiResult.status === 'fulfilled' ? apiResult.value : { status: false, error: 'Check failed' },
      database: databaseResult.status === 'fulfilled' ? databaseResult.value : { status: false, error: 'Check failed' },
      storage: storageResult.status === 'fulfilled' ? storageResult.value : { status: false, error: 'Check failed' },
      network: networkResult.status === 'fulfilled' ? networkResult.value : { status: false, error: 'Check failed' },
      memory: memoryResult.status === 'fulfilled' ? memoryResult.value : { status: false, error: 'Check failed' },
    };
    return { ...result, details };
  }

  return result;
}

/**
 * Check API health
 */
async function checkApiHealth(): Promise<{ status: boolean; latency?: number; error?: string }> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const latency = Date.now() - startTime;

    return {
      status: response.ok,
      latency,
    };
  } catch (error) {
    return {
      status: false,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check database health (via local storage as proxy)
 */
async function checkDatabaseHealth(): Promise<{ status: boolean; latency?: number; error?: string }> {
  const startTime = Date.now();

  try {
    // Test read operation
    const testKey = '_health_check_test';
    await getItem(testKey);
    
    const latency = Date.now() - startTime;

    return {
      status: true,
      latency,
    };
  } catch (error) {
    return {
      status: false,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Storage error',
    };
  }
}

/**
 * Check storage health
 */
async function checkStorageHealth(): Promise<{ status: boolean; usage?: number; error?: string }> {
  try {
    const keys = await getAllKeys();
    const usage = keys.length;
    
    // Consider unhealthy if storage has too many items (potential bloat)
    const isHealthy = usage < 1000;

    return {
      status: isHealthy,
      usage,
    };
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error.message : 'Storage error',
    };
  }
}

/**
 * Check network health
 */
async function checkNetworkHealth(): Promise<{ status: boolean; type?: string; error?: string }> {
  try {
    const state = await NetInfo.fetch();
    
    return {
      status: state.isConnected === true && state.isInternetReachable !== false,
      type: state.type,
    };
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error.message : 'Network check failed',
    };
  }
}

/**
 * Check memory health
 */
function checkMemoryHealth(): { status: boolean; usage?: number; error?: string } {
  try {
    if (global.performance && 'memory' in global.performance) {
      const memory = (global.performance as any).memory;
      if (memory) {
        const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        
        // Consider unhealthy if using more than 90% of available memory
        const isHealthy = usagePercent < 90;

        return {
          status: isHealthy,
          usage: Math.round(usagePercent),
        };
      }
    }

    // Memory API not available (e.g., on iOS)
    return {
      status: true,
      usage: undefined,
    };
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error.message : 'Memory check failed',
    };
  }
}

/**
 * Quick health check (API only)
 */
export async function quickHealthCheck(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_URL}/health`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Health check with automatic retry
 */
export async function runHealthCheckWithRetry(
  maxRetries: number = 3,
  delay: number = 1000
): Promise<HealthCheckResult> {
  for (let i = 0; i < maxRetries; i++) {
    const result = await runHealthCheck();
    
    if (result.healthy) {
      return result;
    }

    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }

  return runHealthCheck();
}

/**
 * Schedule periodic health checks
 */
export function scheduleHealthChecks(
  intervalMs: number = 60000,
  onUnhealthy?: (result: HealthCheckResult) => void
): { stop: () => void } {
  const intervalId = setInterval(async () => {
    const result = await runHealthCheck();
    
    if (!result.healthy && onUnhealthy) {
      onUnhealthy(result);
    }
  }, intervalMs);

  return {
    stop: () => clearInterval(intervalId),
  };
}

/**
 * Report health status to monitoring service
 */
export async function reportHealthStatus(result: HealthCheckResult): Promise<void> {
  try {
    // Send to analytics
    const { trackEvent } = await import('./analytics');
    await trackEvent('health_check', {
      healthy: result.healthy,
      api_healthy: result.checks.api,
      database_healthy: result.checks.database,
      storage_healthy: result.checks.storage,
      network_healthy: result.checks.network,
      memory_healthy: result.checks.memory,
      check_duration: result.duration,
    });
  } catch (error) {
    captureException(error instanceof Error ? error : new Error('Failed to report health status'));
  }
}

// Default export
export default {
  runHealthCheck,
  quickHealthCheck,
  runHealthCheckWithRetry,
  scheduleHealthChecks,
  reportHealthStatus,
};
