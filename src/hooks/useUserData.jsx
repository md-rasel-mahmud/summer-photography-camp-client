import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure]= useAxiosSecure()

  const { refetch, data: userData = [] } = useQuery({
    enabled: !loading && !!user?.email ,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`)
      return res.data;

    },
  });
  return [userData, refetch];
};
export default useUserData;