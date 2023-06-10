import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useSelectedClass = () => {
  const { user, loading } = useContext(AuthContext);

  const { refetch, data: selectedClass = [] } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["selected-classes", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_api_link}/selected-classes?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return [selectedClass, refetch];
};
export default useSelectedClass;
