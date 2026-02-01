import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const UserDataContext = createContext(undefined);

export function UserDataProvider({ children }) {
  const { authenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUserData = useCallback(async () => {
    //to do
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadUserData();
    } else {
      setUserData(null);
    }
  }, [authenticated, loadUserData]);

  return (
    <UserDataContext.Provider
      value={{ userData, loading, error, reloadUserData: loadUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
}
