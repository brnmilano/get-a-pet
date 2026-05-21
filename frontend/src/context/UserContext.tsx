import { createContext, type ReactNode } from "react";

import useAuth from "../hooks/useAuth";

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface UserContextType {
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  authenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  register: async () => {},
  logout: async () => {},
  authenticated: false,
});

function UserProvider({ children }: { children: ReactNode }) {
  const { register, authenticated, logout } = useAuth();

  return (
    <UserContext.Provider value={{ register, authenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
