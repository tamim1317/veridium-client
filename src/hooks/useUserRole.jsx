import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isLoading: isRoleLoading,
    isError,
    error,
    refetch: refetchRole,
  } = useQuery({
    queryKey: ["userRole", user?.email], // Cache key unique per user
    enabled: !authLoading && !!user?.email, // Only run when user is ready
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user.email}`);
      return data; // Expected: { role, company, status, ... }
    },
    // Best practices for better UX
    retry: 1, // Retry once on failure
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 min
    keepPreviousData: true, // Prevent UI flicker during refetch
    onError: (err) => {
      console.error("Failed to fetch user role:", err);
    },
  });

  return {
    role: userData?.role || null,
    company: userData?.company || null,
    status: userData?.status || null,
    isRoleLoading: authLoading || isRoleLoading,
    isError,
    error,
    refetchRole,
  };
};

export default useUserRole;