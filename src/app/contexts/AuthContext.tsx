import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  subscriptionStatus: "free" | "trial" | "premium";
  subscriptionExpiry?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  updateSubscription: (status: "free" | "trial" | "premium", expiry?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("vpn_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUser: User = {
      email,
      subscriptionStatus: "free",
    };
    setUser(newUser);
    localStorage.setItem("vpn_user", JSON.stringify(newUser));
  };

  const signup = async (email: string, password: string) => {
    // Mock signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUser: User = {
      email,
      subscriptionStatus: "free",
    };
    setUser(newUser);
    localStorage.setItem("vpn_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vpn_user");
  };

  const updateSubscription = (
    status: "free" | "trial" | "premium",
    expiry?: string
  ) => {
    if (user) {
      const updatedUser = { ...user, subscriptionStatus: status, subscriptionExpiry: expiry };
      setUser(updatedUser);
      localStorage.setItem("vpn_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        updateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
