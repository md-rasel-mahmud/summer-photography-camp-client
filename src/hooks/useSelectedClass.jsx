import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useSelectedClass = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure()

  const { refetch, data: selectedClass = [] } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["selected-classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selected-classes?email=${user?.email}`)
      return res.data;
    },
  });
  return [selectedClass, refetch];
};
export default useSelectedClass;
