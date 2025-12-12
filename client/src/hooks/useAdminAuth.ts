import { useState, useEffect } from "react";
import { useLocation } from "wouter";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = "/api/auth/google";
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setLocation("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
