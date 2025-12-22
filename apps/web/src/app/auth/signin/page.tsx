'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Sign In Page - Alternative login page
 * This is a redirect page that sends users to the main login page
 */
export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main login page
    router.replace('/auth/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Redirection vers la page de connexion...</p>
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Cliquez ici si la redirection ne fonctionne pas
        </Link>
      </div>
    </div>
  );
}
