/**
 * Next.js Middleware
 * Handles password protection and NextAuth authentication
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = 'Template123123';
const PASSWORD_COOKIE = 'template_auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes publiques qui ne nÃ©cessitent pas d'authentification
  const publicRoutes = [
    '/auth/signin',
    '/auth/signout',
    '/auth/error',
    '/auth/callback',
    '/api/auth',
    '/api/public',
    '/api/auth/check-password',
    '/login-password',
  ];

  // VÃ©rifier si la route est publique
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Protection par mot de passe simple (pour toutes les routes sauf les publiques)
  if (!isPublicRoute) {
    const isPasswordAuthenticated = request.cookies.get(PASSWORD_COOKIE)?.value === 'authenticated';

    if (!isPasswordAuthenticated) {
      // Rediriger vers la page de login avec mot de passe
      const loginUrl = new URL('/login-password', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si c'est la route de vÃ©rification du mot de passe ou de login, laisser passer
  if (pathname === '/api/auth/check-password' || pathname.startsWith('/login-password')) {
    return NextResponse.next();
  }

  // Pour les autres routes protÃ©gÃ©es, on peut ajouter la vÃ©rification NextAuth ici si nÃ©cessaire
  // Pour l'instant, on se contente de la protection par mot de passe

  const response = NextResponse.next();

  // Headers de performance
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Cache pour les assets statiques
  if (pathname.startsWith('/_next/static')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Cache pour les images
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Prefetch DNS pour les domaines externes
  if (pathname === '/') {
    const linkHeader = [
      '<https://fonts.googleapis.com>; rel=dns-prefetch',
      '<https://fonts.gstatic.com>; rel=dns-prefetch',
    ].join(', ');
    response.headers.set('Link', linkHeader);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};