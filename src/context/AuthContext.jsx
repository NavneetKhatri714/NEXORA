import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "nexora_user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const signUp = ({ name, email }) => {
    const newUser = {
      name,
      email,
      onboardingComplete: false,
      profile: { resume: false, github: false, linkedin: false },
      targetRole: null,
      skills: [],
      readiness: 0,
      roadmap: [],
      createdAt: Date.now(),
    };
    setUser(newUser);
    return newUser;
  };

  const signIn = ({ email }) => {
    const existing = readStoredUser();
    if (existing && existing.email === email) {
      setUser(existing);
      return existing;
    }
    // Prototype: simulate a returning demo user if nothing matches.
    const demoUser = {
      name: email.split("@")[0] || "Explorer",
      email,
      onboardingComplete: false,
      profile: { resume: false, github: false, linkedin: false },
      targetRole: null,
      skills: [],
      readiness: 0,
      roadmap: [],
      createdAt: Date.now(),
    };
    setUser(demoUser);
    return demoUser;
  };

  const signOut = () => setUser(null);

  const updateUser = (patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
