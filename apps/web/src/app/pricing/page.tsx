'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      period: billingPeriod,
      description: 'Parfait pour les petites organisations',
      features: [
        'Jusqu\'à 100 donateurs',
        '1 campagne active',
        'Support email',
        'Rapports de base',
        'API limitée',
      ],
      buttonText: 'Commencer',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 79,
      period: billingPeriod,
      description: 'Pour les organisations en croissance',
      features: [
        'Jusqu\'à 1,000 donateurs',
        'Campagnes illimitées',
        'Support prioritaire',
        'Rapports avancés',
        'API complète',
        'Intégrations tierces',
        'Formulaires personnalisés',
      ],
      popular: true,
      buttonText: 'Essayer gratuitement',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      period: billingPeriod,
      description: 'Pour les grandes organisations',
      features: [
        'Donateurs illimités',
        'Toutes les fonctionnalités',
        'Support dédié 24/7',
        'Rapports personnalisés',
        'API illimitée',
        'Intégrations personnalisées',
        'Formulaires avancés',
        'Multi-organisations',
        'RBAC avancé',
      ],
      buttonText: 'Nous contacter',
    },
  ];

  const calculatePrice = (plan: Plan) => {
    if (plan.period === 'year') {
      return plan.price * 12 * 0.8; // 20% discount for yearly
    }
    return plan.price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Tarifs</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choisissez le plan qui correspond à vos besoins
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setBillingPeriod('month')}
              className={`px-6 py-2 rounded-md transition-colors ${
                billingPeriod === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('year')}
              className={`px-6 py-2 rounded-md transition-colors ${
                billingPeriod === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Annuel
              <Badge className="ml-2 bg-green-500">-20%</Badge>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="success" className="px-4 py-1">
                    Le plus populaire
                  </Badge>
                </div>
              )}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {billingPeriod === 'year' ? Math.round(calculatePrice(plan) / 12) : plan.price}€
                  </span>
                  <span className="text-gray-600">/{billingPeriod === 'year' ? 'mois' : 'mois'}</span>
                  {billingPeriod === 'year' && (
                    <div className="text-sm text-gray-500 mt-1">
                      {Math.round(calculatePrice(plan))}€/an
                    </div>
                  )}
                </div>
                <Link href={`/subscriptions?plan=${plan.id}&period=${billingPeriod}`}>
                  <Button
                    className={`w-full mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Puis-je changer de plan à tout moment ?
                </h3>
                <p className="text-gray-600">
                  Oui, vous pouvez mettre à niveau ou rétrograder votre plan à tout moment. Les changements prendront effet immédiatement.
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Y a-t-il un essai gratuit ?
                </h3>
                <p className="text-gray-600">
                  Oui, tous les plans incluent un essai gratuit de 14 jours. Aucune carte de crédit requise.
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quels modes de paiement acceptez-vous ?
                </h3>
                <p className="text-gray-600">
                  Nous acceptons les cartes de crédit (Visa, Mastercard, American Express) et les virements bancaires pour les plans Enterprise.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
