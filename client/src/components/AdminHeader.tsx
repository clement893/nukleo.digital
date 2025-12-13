import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { Link } from "wouter";

export function AdminHeader() {
  const { user, logout } = useAdminAuth();

  if (!user) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/admin">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                src="/Nukleo_blanc_RVB.svg" 
                alt="Nukleo Digital - AI Transformation Agency" 
                width="120"
                height="32"
                fetchPriority="high"
                loading="eager"
                className="h-8"
              />
              <span className="text-sm text-white/60 hidden sm:inline">Admin Panel</span>
            </div>
          </Link>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={`${user.name} - Admin Profile Picture`}
                  width="32"
                  height="32"
                  loading="lazy"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-white/60">{user.email}</p>
              </div>
            </div>

            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
