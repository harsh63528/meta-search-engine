import { createContext, useEffect, useState } from "react";
import { getProfile } from "../api/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getProfile();

      // 🔥 FIX HERE
      setUser(res.data.user);  

    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
