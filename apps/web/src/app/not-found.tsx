/**
 * 404 Not Found Page
 * Shown when a route doesn't exist
 */

'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">Retour à l'accueil</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
}
