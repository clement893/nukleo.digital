import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

interface OnboardingWrapperProps {
  children: React.ReactNode;
}

export default function OnboardingWrapper({ children }: OnboardingWrapperProps) {
  const [location, setLocation] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  const { data: progress } = trpc.onboarding.getProgress.useQuery(undefined, {
    enabled: !!user,
  });

  useEffect(() => {
    // Skip onboarding check for these routes
    const skipRoutes = ['/onboarding', '/privacy-policy', '/terms-of-service', '/cookie-policy'];
    if (skipRoutes.includes(location)) {
      return;
    }

    // If user is logged in and hasn't completed onboarding
    if (user && progress && !progress.isCompleted && !progress.skipped) {
      setLocation('/onboarding');
    }
  }, [user, progress, location, setLocation]);

  return <>{children}</>;
}
