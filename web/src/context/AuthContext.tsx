import { createContext, useEffect, useState, type ReactNode } from 'react';
import { api } from '../services/api';

type AuthContext = {
  isLoading: boolean;
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContext);

const LOCAL_STORAGE_KEY = '@refund';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user)
    );
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    // add token to the header for all requisitions
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    setSession(data);
  }

  function logout() {
    setSession(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
    window.location.assign('/');
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setSession({
        token,
        user: JSON.parse(user),
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ session, save, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
