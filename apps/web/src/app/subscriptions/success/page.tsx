'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const [planName, setPlanName] = useState('');
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    const plan = searchParams.get('plan');
    const period = searchParams.get('period') as 'month' | 'year' | null;

    // Map plan IDs to names
    const planNames: Record<string, string> = {
      starter: 'Starter',
      professional: 'Professional',
      enterprise: 'Enterprise',
    };

    setPlanName(planNames[plan || ''] || plan || '');
    setBillingPeriod(period || 'month');
  }, [isAuthenticated, router, searchParams]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Abonnement confirmé !
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Merci pour votre confiance. Votre abonnement <strong>{planName}</strong> est maintenant actif.
          </p>

          {/* Subscription Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de votre abonnement</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-gray-900">{planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Période:</span>
                <span className="font-medium text-gray-900">
                  {billingPeriod === 'month' ? 'Mensuel' : 'Annuel'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Statut:</span>
                <span className="font-medium text-green-600">Actif</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prochaines étapes</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Vous pouvez maintenant accéder à toutes les fonctionnalités de votre plan</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Un email de confirmation a été envoyé à votre adresse</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Vous pouvez gérer votre abonnement depuis la page Mes Abonnements</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button>
                Aller au tableau de bord
              </Button>
            </Link>
            <Link href="/subscriptions">
              <Button variant="outline">
                Gérer mon abonnement
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
