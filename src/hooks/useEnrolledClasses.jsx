import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useEnrolledClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure()

  const { refetch, data: enrolledClasses = [] } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["enrolled-classes","classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-classes?email=${user?.email}`)
      return res.data;
    },
  });
  return [enrolledClasses, refetch];
};
export default useEnrolledClasses;
