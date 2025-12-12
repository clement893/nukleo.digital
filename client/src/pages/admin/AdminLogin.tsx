import { useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const { isAuthenticated, login, loading } = useAdminAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const error = params.get("error");

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/admin");
    }
  }, [isAuthenticated, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f0519] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-white/60">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f0519] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader className="text-center">
          <div className="mb-6">
            <img 
              src="/Nukleo_blanc_RVB.svg" 
              alt="Nukleo" 
              className="h-12 mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Admin Access
          </CardTitle>
          <CardDescription className="text-white/60">
            Sign in with your authorized Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error === "unauthorized" && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-200">
                <p className="font-semibold mb-1">Access Denied</p>
                <p>Your email is not authorized to access the admin panel. Please contact the administrator.</p>
              </div>
            </div>
          )}

          <Button
            onClick={login}
            className="w-full bg-white hover:bg-white/90 text-gray-900 font-semibold py-6 text-lg"
            size="lg"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>

          <p className="text-xs text-white/40 text-center mt-6">
            Only authorized email addresses can access the admin panel.
            <br />
            If you need access, please contact the administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
