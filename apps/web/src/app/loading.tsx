/**
 * Global Loading State for Next.js App Router
 * Shows loading UI while pages are loading
 */

import { Loading } from '@/components/ui/Loading';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Loading size="lg" />
    </div>
  );
}

