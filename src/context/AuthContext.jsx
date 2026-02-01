import { createContext, useState, useEffect, useContext, useCallback } from "react";
import {
  checkLoginRequest,
  loginRequest,
  logoutRequest,
} from "../api/apiService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await checkLoginRequest();
      setAuthenticated(Boolean(data.authenticated));
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  async function login(email, password) {
    await loginRequest(email, password);
    await restoreSession();
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      setAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{ authenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
