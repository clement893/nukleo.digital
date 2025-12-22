'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

/**
 * Composant pour protéger les routes nécessitant une authentification
 * Empêche le flash de contenu non authentifié
 */
export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Vérifier l'authentification
      if (!isAuthenticated()) {
        router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Vérifier les droits admin si requis
      if (requireAdmin && !user?.is_admin) {
        router.replace('/dashboard?error=unauthorized');
        return;
      }

      // Autoriser l'accès
      setIsAuthorized(true);
      setIsChecking(false);
    };

    // Vérifier immédiatement
    checkAuth();
  }, [isAuthenticated, user, requireAdmin, router, pathname]);

  // Afficher un loader pendant la vérification
  if (isChecking || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-xl text-gray-600">Vérification de l'authentification...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

