import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (!user.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return children;
}

export function RequireProfile({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (user.onboardingComplete) return <Navigate to="/dashboard" replace />;
  return children;
}
