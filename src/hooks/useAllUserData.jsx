import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAllUserData = () => {
  const { loading } = useContext(AuthContext);

  const { refetch, data: allUserData = [] } = useQuery({
    enabled: !loading,
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_api_link}/user`
      );
      const data = await res.json();  
      return data;
    },
  });
  return [allUserData, refetch];
};
export default useAllUserData;