import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAllClasses = () => {
  const { loading } = useContext(AuthContext);

  const { refetch, data: allClasses = [] } = useQuery({
    enabled: !loading ,
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_api_link}/classes`
      );
      const data = await res.json();  
      return data;
    },
  });
  return [allClasses, refetch];
};
export default useAllClasses;