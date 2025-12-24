'use client';

import { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { PageHeader, PageContainer, Section } from '@/components/layout';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle, ThemeToggleWithIcon } from '@/components/ui';
import { Palette, Moon, Sun, Monitor } from 'lucide-react';
import { clsx } from 'clsx';

export const dynamic = 'force-dynamic';

function ThemeSettingsContent() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Light',
      icon: Sun,
      description: 'Always use light mode',
    },
    {
      value: 'dark' as const,
      label: 'Dark',
      icon: Moon,
      description: 'Always use dark mode',
    },
    {
      value: 'system' as const,
      label: 'System',
      icon: Monitor,
      description: 'Follow system preferences',
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Paramètres de Thème"
        description="Personnalisez l'apparence de votre interface. Vos préférences sont sauvegardées automatiquement."
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Thème' },
        ]}
      />

      <div className="space-y-8">
        {/* Current Theme Status */}
        <Section title="Thème Actuel">
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Préférence sélectionnée:
                </span>
                <Badge variant="info">{theme}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Thème actif:
                </span>
                <Badge variant={resolvedTheme === 'dark' ? 'default' : 'info'}>
                  {resolvedTheme}
                </Badge>
              </div>
            </div>
          </Card>
        </Section>

        {/* Theme Selection */}
        <Section title="Choisir un Thème">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={clsx(
                    'p-6 rounded-lg border-2 transition-all text-left',
                    isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={clsx(
                        'p-3 rounded-lg',
                        isSelected
                          ? 'bg-primary-100 dark:bg-primary-900/40'
                          : 'bg-gray-100 dark:bg-gray-700'
                      )}
                    >
                      <Icon
                        className={clsx(
                          'w-6 h-6',
                          isSelected
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-400'
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={clsx(
                          'font-semibold mb-1',
                          isSelected
                            ? 'text-primary-900 dark:text-primary-100'
                            : 'text-gray-900 dark:text-white'
                        )}
                      >
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
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
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Quick Toggle */}
        <Section title="Toggle Rapide">
          <Card>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Utilisez ces composants pour basculer rapidement entre les thèmes:
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Toggle Simple
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggleWithIcon />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Toggle avec Icône
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        {/* Theme Preview */}
        <Section title="Aperçu">
          <Card>
            <div className="space-y-4">
              <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  Couleur Primaire
                </h4>
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  Cette couleur est utilisée pour les éléments principaux de
                  l'interface.
                </p>
              </div>
              <div className="p-4 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg border border-secondary-200 dark:border-secondary-800">
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  Couleur Secondaire
                </h4>
                <p className="text-sm text-secondary-800 dark:text-secondary-200">
                  Cette couleur est utilisée pour les éléments secondaires.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
          </Card>
        </Section>

        {/* Information */}
        <Section title="Informations">
          <Card>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Fonctionnalités:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    Vos préférences sont sauvegardées automatiquement dans votre
                    navigateur
                  </li>
                  <li>
                    Le thème est appliqué immédiatement à toutes les pages
                  </li>
                  <li>
                    Le mode "System" suit automatiquement les préférences de
                    votre système d'exploitation
                  </li>
                  <li>
                    Tous les composants s'adaptent automatiquement au thème
                    sélectionné
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </Section>
      </div>
    </PageContainer>
  );
}

export default function ThemeSettingsPage() {
  return <ThemeSettingsContent />;
}

