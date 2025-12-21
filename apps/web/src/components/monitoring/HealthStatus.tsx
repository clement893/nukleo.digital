/**
 * Health Status Component
 * Affiche le statut de santé des services
 */

'use client';

import { useEffect, useState } from 'react';
import type { HealthStatus } from '@/lib/monitoring/types';
import { checkApplicationHealth } from '@/lib/monitoring/health';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';

export default function HealthStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        const data = await checkApplicationHealth();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch health status');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center p-8">
          <Spinner />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="p-4 text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      </Card>
    );
  }

  if (!health) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'down':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">System Health</h3>
          <Badge
            variant={health.status === 'healthy' ? 'success' : health.status === 'degraded' ? 'warning' : 'danger'}
          >
            {health.status.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-3">
          {health.services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`} />
                <div>
                  <div className="font-medium">{service.name}</div>
                  {service.message && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">{service.message}</div>
                  )}
                </div>
              </div>
              {service.responseTime !== undefined && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {service.responseTime}ms
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date(health.timestamp).toLocaleString()}
        </div>
      </div>
    </Card>
  );
}

