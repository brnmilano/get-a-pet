import { createContext, type ReactNode } from "react";

import useAuth from "../hooks/useAuth";
import type { User, Login } from "../types/auth.types";

interface AuthContextType {
  register: (user: User) => Promise<void>;
  login: (user: Login) => Promise<void>;
  logout: () => Promise<void>;
  authenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  authenticated: false,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const { register, login, authenticated, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ register, login, logout, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
