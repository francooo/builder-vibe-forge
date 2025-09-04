import React, { createContext, useContext, useState, useEffect } from 'react';

interface TenantConfig {
  nome: string;
  logo_url?: string;
  cor_primaria: string;
  cor_secundaria: string;
  configuracoes?: any;
}

interface User {
  id: number;
  nome: string;
  email: string;
  perfil: string;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  user: User | null;
  token: string | null;
  login: (email: string, senha: string, tenant_slug: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async (email: string, senha: string, tenant_slug: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha, tenant_slug })
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        setTenant(data.tenant);
        localStorage.setItem('token', data.token);
        return true;
      } else {
        const error = await response.json();
        console.error('Erro de login:', error);
      }
      return false;
    } catch (error) {
      console.error('Erro de rede:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setTenant(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (tenant) {
      document.documentElement.style.setProperty('--primary-color', tenant.cor_primaria);
      document.documentElement.style.setProperty('--secondary-color', tenant.cor_secundaria);
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={{
      tenant,
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token && !!user
    }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant deve ser usado dentro de TenantProvider');
  }
  return context;
}