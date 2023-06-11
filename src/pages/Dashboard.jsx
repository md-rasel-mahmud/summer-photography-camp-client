import Heading from "../components/Heading";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { FaChalkboardTeacher, FaHome, FaUserMd, FaUsers } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import useSelectedClass from "../hooks/useSelectedClass";
import useUserData from "../hooks/useUserData";
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [selectedClass] = useSelectedClass();
  const [userData] = useUserData();
  return (
    <>
      <Heading
        heading={
          userData?.role === "admin"
            ? "admin dashboard"
            : userData?.role === "instructor"
            ? "instructor dashboard"
            : "student dashboard"
        }
      ></Heading>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-secondary btn-sm btn-block drawer-button lg:hidden"
      >
        <TiThMenu></TiThMenu> Open Dashboard Menu
      </label>
      <div className="drawer overflow-x-auto lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side items-end z-50 lg:z-20">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-2/3 gap-1 lg:w-80 h-full sticky bg-base-300 text-base-content">
            {/* Sidebar content here */}
            <li>
              <div className="flex flex-col bg-base-100 py-5 justify-center">
                <img
                  className="h-16 lg:h-28 mask mask-squircle shadow-lg"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
                <h3 className="flex justify-center text-md lg:text-lg font-bold uppercase">
                  {user?.displayName}
                </h3>
              </div>
            </li>
            <div className="divider"></div>

            {/* ======================================================================= */}
            {!userData.role && (
              <>
                <li>
                  <Link
                    to={"/dashboard/student/my-classes"}
                    className="btn block btn-sm !text-left"
                  >
                    My Selected Classes
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/student/my-enrolled-classes"}
                    className="btn block btn-sm !text-left"
                  >
                    My Enrolled Classes
                  </Link>
                </li>
              </>
            )}
            {userData.role === "admin" && (
              <>
                <li>
                  <Link to={"/dashboard/admin/manage-classes"} className="btn btn-sm">
                    <FaUserMd></FaUserMd>
                    Manage classes
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/admin/manage-users"} className="btn btn-sm">
                    <FaUsers></FaUsers>
                    Manage Users
                  </Link>
                </li>
              </>
            )}
            {userData.role === "instructor" && (
              <>
                <li>
                  <Link to={"/dashboard/instructor/my-classes"} className="btn btn-sm">
                    <FaChalkboardTeacher></FaChalkboardTeacher> My classes
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/instructor/add-class"} className="btn btn-sm">
                    <FaUsers></FaUsers>
                    Add A Class
                  </Link>
                </li>
              </>
            )}

            {/* ======================================================================= */}
            <div className="divider"></div>
            <li>
              <Link to={"/"} className="btn btn-sm">
                <FaHome></FaHome> home
              </Link>
            </li>
            <li>
              <Link to={"/classes"} className="btn btn-sm">
                <SiGoogleclassroom></SiGoogleclassroom> classes{" "}
                {selectedClass.length > 0 && (
                  <div className="badge badge-secondary">
                    {selectedClass.length}
                  </div>
                )}
              </Link>
            </li>
            <li>
              <Link to={"/instructors"} className="btn btn-sm">
                <FaChalkboardTeacher></FaChalkboardTeacher> instructors
              </Link>
            </li>
            <li>
              <button onClick={()=>logout()} className="btn btn-error btn-sm">logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
