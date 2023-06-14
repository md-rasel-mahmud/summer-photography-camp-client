import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useAllClasses = () => {
  const { loading } = useContext(AuthContext);

  const {status, refetch, data: allClasses = []} = useQuery({
    enabled: !loading,
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_api_link}/classes`);

      return res.data;
    },
  });
  return [allClasses, status, refetch];
};
export default useAllClasses;
