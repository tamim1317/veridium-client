// src/hooks/useMyAssets.jsx
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useMyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myAssets = [], isLoading, refetch } = useQuery({
    queryKey: ["myAssets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-assets?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch if user is logged in
  });

  return { myAssets, isLoading, refetch };
};

export default useMyAssets;