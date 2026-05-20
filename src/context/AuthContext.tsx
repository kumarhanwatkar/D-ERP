import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { backendApi, BackendUser } from '@/lib/backendApi';

export type UserRole = 'admin' | 'employee' | 'hr' | null;

interface User extends BackendUser {
  organizationId?: string;
  jobTitle?: string;
  status?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  login: (walletAddress: string, role: UserRole, userData?: Partial<User>, token?: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'derp_session';
const TOKEN_KEY = 'derp_token';

const readStoredSession = (): { user: User; token: string } | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as { user: User; token: string };
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const stored = readStoredSession();
  const [user, setUser] = useState<User | null>(stored?.user || null);
  const [token, setToken] = useState<string | null>(stored?.token || null);

  useEffect(() => {
    if (!stored) return;
    window.localStorage.setItem(TOKEN_KEY, stored.token);
  }, []);

  const persistSession = (nextUser: User | null, nextToken: string | null) => {
    if (typeof window === 'undefined') return;

    if (nextUser && nextToken) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
      window.localStorage.setItem(TOKEN_KEY, nextToken);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    }
  };

  const login = (walletAddress: string, role: UserRole, userData?: Partial<User>, nextToken?: string) => {
    const userRole = role || 'employee';
    const mergedUser = {
      id: userData?.id || walletAddress,
      walletAddress,
      role: userRole,
      name: userData?.name || 'Team Member',
      email: userData?.email || 'user@techforge.io',
      organizationId: userData?.organizationId || 'org-techforge',
      organizationName: userData?.organizationName || 'TechForge Industries',
      department: userData?.department || 'Engineering',
      hourlyRate: userData?.hourlyRate ?? 25,
      jobTitle: userData?.jobTitle || (userRole === 'admin' ? 'Administrator' : 'Engineer'),
      status: userData?.status || 'active',
      avatarUrl: userData?.avatarUrl || '',
    } as User;

    setUser(mergedUser);
    if (nextToken) {
      setToken(nextToken);
      persistSession(mergedUser, nextToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    persistSession(null, null);
  };

  const updateUser = (data: Partial<User>) => {
    setUser((current) => {
      if (!current) return current;
      const updated = { ...current, ...data };
      if (token) {
        persistSession(updated, token);
      }
      return updated;
    });
  };

  const refreshUser = async () => {
    if (!token) return;
    const response = await backendApi.getCurrentUser();
    if (response.user) {
      setUser(response.user as User);
      persistSession(response.user as User, token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        token,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
