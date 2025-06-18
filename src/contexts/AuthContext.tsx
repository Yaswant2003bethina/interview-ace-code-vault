
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your backend API
    const mockUsers = [
      { id: 1, fullName: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' as const },
      { id: 2, fullName: 'John Doe', email: 'john@example.com', password: 'password', role: 'student' as const },
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { 
        id: foundUser.id, 
        fullName: foundUser.fullName, 
        email: foundUser.email, 
        role: foundUser.role 
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in real app, this would call your backend API
    const userData = { 
      id: Date.now(), 
      fullName, 
      email, 
      role: 'student' as const 
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
