import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAllUserData = () => {
  const { loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure()

  const { refetch, data: allUserData = [] } = useQuery({
    enabled: !loading,
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get('/user');
      return res.data;
    },
  });
  return [allUserData, refetch];
};
export default useAllUserData;