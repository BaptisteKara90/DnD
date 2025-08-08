// src/app/providers/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserFieldsFragment } from '@/graphql/generated'; // Si tu utilises le fragment UserFields

type AuthContextType = {
  token: string | null;
  user: UserFieldsFragment | null;
  login: (user: UserFieldsFragment, token: string) => void;
  logout: (e: React.MouseEvent) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserFieldsFragment | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: UserFieldsFragment, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
