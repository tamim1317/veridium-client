import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();
  const hasShownToast = useRef(false);

  // Show loading while role is being fetched
  if (loading || role === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!allowed.includes(role)) {
    // Show toast only once per route
    if (!hasShownToast.current) {
      toast.error("You don't have permission to access this page.", {
        duration: 4000,
      });
      hasShownToast.current = true;
    }
    return <Navigate to="/" replace />;
  }

  // Reset toast flag when route changes
  useEffect(() => {
    hasShownToast.current = false;
  }, [location.pathname]);

  return children;
};

export default RoleBasedRoute;