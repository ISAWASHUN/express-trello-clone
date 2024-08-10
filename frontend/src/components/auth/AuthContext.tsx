import { createContext, FC, ReactNode, useState } from 'react';
import { AuthContextType } from '../../types/auth';
import { login as performLogin } from '../../lib/auth/login';
import { logout as performLogout } from '../../lib/auth/logout';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    await performLogin(email, password);
    setIsAuthenticated(true);
  }
  const logout = () => {
    performLogout();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
