import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useUserData = () => {
  const { user, loading } = useContext(AuthContext);

  const { refetch, data: userData = [] } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_api_link}/user?email=${user?.email}`
      );
      const data = await res.json();  
      return data;
    },
  });
  return [userData, refetch];
};
export default useUserData;