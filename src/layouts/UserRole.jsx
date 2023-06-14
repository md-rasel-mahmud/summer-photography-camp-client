import { Navigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";

const UserRole = () => {
  const [userData] = useUserData();
  console.log(userData);

  if (userData.role === "admin") {
    return (
      <Navigate to="/dashboard/admin/manage-users" replace={true}></Navigate>
    );
  }
  if (userData.role === "instructor") {
    return (
      <Navigate to="/dashboard/instructor/my-classes" replace={true}></Navigate>
    );
  }
  return (
    <Navigate to="/dashboard/student/my-classes" replace={true}></Navigate>
  );
};

export default UserRole;
