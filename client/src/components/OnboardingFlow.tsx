import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, X, Sparkles, Shield, FileText, Users, Zap } from 'lucide-react';
import { useLocation } from 'wouter';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  content: React.ReactNode;
  roles?: ('admin' | 'user')[];
}

export default function OnboardingFlow() {
  const [, setLocation] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  const { data: progress, refetch } = trpc.onboarding.getProgress.useQuery();
  const updateProgress = trpc.onboarding.updateProgress.useMutation();
  const completeOnboarding = trpc.onboarding.complete.useMutation();
  const skipOnboarding = trpc.onboarding.skip.useMutation();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Define onboarding steps
  const allSteps: OnboardingStep[] = [
    {
      id: 0,
      title: 'Bienvenue chez Nukleo Digital',
      description: 'Découvrez notre plateforme de transformation AI',
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Bienvenue {user?.name || 'chez Nukleo Digital'} !
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Nous sommes ravis de vous accueillir dans notre équipe. Cette courte présentation vous aidera à 
              découvrir notre plateforme et à comprendre comment nous travaillons ensemble pour transformer 
              les entreprises avec l'intelligence artificielle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="p-6 bg-white/5 border-white/10">
              <Zap className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Innovation</h3>
              <p className="text-white/60 text-sm">Technologies AI de pointe</p>
            </Card>
            <Card className="p-6 bg-white/5 border-white/10">
              <Users className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Collaboration</h3>
              <p className="text-white/60 text-sm">Équipe experte et soudée</p>
            </Card>
            <Card className="p-6 bg-white/5 border-white/10">
              <Shield className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Excellence</h3>
              <p className="text-white/60 text-sm">Qualité et résultats garantis</p>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: 'Notre Plateforme',
      description: 'Découvrez les outils à votre disposition',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Votre espace de travail</h2>
          <p className="text-white/70 mb-6">
            Nukleo Digital vous offre une plateforme complète pour gérer vos projets de transformation AI.
          </p>
          
          <div className="space-y-4">
            <Card className="p-4 bg-white/5 border-white/10">
              <h3 className="font-semibold text-white mb-2">📊 Dashboard</h3>
              <p className="text-white/60 text-sm">
                Accédez à vos projets, suivez les métriques et collaborez avec l'équipe
              </p>
            </Card>
            
            <Card className="p-4 bg-white/5 border-white/10">
              <h3 className="font-semibold text-white mb-2">🤖 LEO - Assistant AI</h3>
              <p className="text-white/60 text-sm">
                Notre assistant intelligent disponible 24/7 pour répondre à vos questions
              </p>
            </Card>
            
            <Card className="p-4 bg-white/5 border-white/10">
              <h3 className="font-semibold text-white mb-2">📚 Ressources</h3>
              <p className="text-white/60 text-sm">
                Accédez à notre bibliothèque de guides, templates et meilleures pratiques
              </p>
            </Card>
            
            {user?.role === 'admin' && (
              <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                <h3 className="font-semibold text-white mb-2">⚙️ Administration</h3>
                <p className="text-white/60 text-sm">
                  En tant qu'administrateur, vous avez accès aux paramètres avancés et à la gestion des utilisateurs
                </p>
              </Card>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Politiques Internes',
      description: 'Informations importantes à connaître',
      icon: FileText,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Nos Politiques</h2>
          <p className="text-white/70 mb-6">
            Veuillez prendre connaissance de nos politiques pour assurer une collaboration sereine et conforme.
          </p>
          
          <div className="space-y-4">
            <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <a href="/privacy-policy" target="_blank" className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white mb-1">🔒 Politique de Confidentialité</h3>
                  <p className="text-white/60 text-sm">
                    Comment nous protégeons vos données personnelles
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40" />
              </a>
            </Card>
            
            <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <a href="/terms-of-service" target="_blank" className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white mb-1">📜 Conditions d'Utilisation</h3>
                  <p className="text-white/60 text-sm">
                    Les règles d'utilisation de notre plateforme
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40" />
              </a>
            </Card>
            
            <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <a href="/cookie-policy" target="_blank" className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white mb-1">🍪 Politique des Cookies</h3>
                  <p className="text-white/60 text-sm">
                    Comment nous utilisons les cookies
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40" />
              </a>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-white/80 text-sm">
              💡 <strong>Important :</strong> En continuant, vous confirmez avoir pris connaissance de ces politiques.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Prêt à Commencer',
      description: 'Lancez-vous dans l\'aventure',
      icon: CheckCircle2,
      content: (
        <div className="space-y-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Vous êtes prêt !
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6">
            Vous avez maintenant toutes les clés en main pour commencer à travailler avec Nukleo Digital. 
            Notre équipe est là pour vous accompagner à chaque étape.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto">
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="font-semibold text-white mb-2">🎯 Prochaines Étapes</h3>
              <ul className="text-white/60 text-sm text-left space-y-2">
                <li>• Explorez votre dashboard</li>
                <li>• Consultez vos projets</li>
                <li>• Contactez votre équipe</li>
              </ul>
            </Card>
            
            <Card className="p-6 bg-white/5 border-white/10">
              <h3 className="font-semibold text-white mb-2">💬 Besoin d'Aide ?</h3>
              <ul className="text-white/60 text-sm text-left space-y-2">
                <li>• Utilisez LEO (assistant AI)</li>
                <li>• Consultez la documentation</li>
                <li>• Contactez le support</li>
              </ul>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  // Filter steps based on user role
  const steps = allSteps.filter(step => 
    !step.roles || step.roles.includes(user?.role as 'admin' | 'user')
  );

  // Sync current step with progress
  useEffect(() => {
    if (progress && progress.currentStep !== undefined) {
      setCurrentStepIndex(progress.currentStep);
    }
  }, [progress]);

  const currentStep = steps[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = async () => {
    const nextStep = currentStepIndex + 1;
    const completedSteps = [...(progress?.completedSteps || []), currentStepIndex];
    
    if (nextStep < steps.length) {
      await updateProgress.mutateAsync({
        currentStep: nextStep,
        completedSteps,
      });
      setCurrentStepIndex(nextStep);
      refetch();
    } else {
      await completeOnboarding.mutateAsync();
      refetch();
      setLocation('/');
    }
  };

  const handlePrevious = async () => {
    if (currentStepIndex > 0) {
      const prevStep = currentStepIndex - 1;
      await updateProgress.mutateAsync({
        currentStep: prevStep,
      });
      setCurrentStepIndex(prevStep);
      refetch();
    }
  };

  const handleSkip = async () => {
    await skipOnboarding.mutateAsync();
    refetch();
    setLocation('/');
  };

  if (!user || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)]">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(107,23,22)] via-[rgb(40,60,120)] to-[rgb(107,23,22)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Onboarding</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4 mr-2" />
              Passer
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Étape {currentStepIndex + 1} sur {steps.length}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = (progress?.completedSteps || []).includes(index);
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${isCurrent ? 'border-purple-500 bg-purple-500/20' : ''}
                  ${isCompleted ? 'border-green-500 bg-green-500/20' : 'border-white/20 bg-white/5'}
                `}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Icon className={`w-5 h-5 ${isCurrent ? 'text-purple-400' : 'text-white/40'}`} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-white/20'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">{currentStep.title}</h2>
            <p className="text-white/60">{currentStep.description}</p>
          </div>
          
          <div className="min-h-[300px]">
            {currentStep.content}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            {currentStepIndex === steps.length - 1 ? 'Terminer' : 'Suivant'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
