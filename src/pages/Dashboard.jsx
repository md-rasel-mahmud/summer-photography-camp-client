import Heading from "../components/Heading";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useState } from "react";
import {
  FaChalkboard,
  FaChalkboardTeacher,
  FaHandHoldingUsd,
  FaHome,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { BsCardChecklist } from "react-icons/bs";
import useSelectedClass from "../hooks/useSelectedClass";
import useUserData from "../hooks/useUserData";
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [selectedClass] = useSelectedClass();
  const [userData] = useUserData();
  const [theme, setTheme] = useState();
  return (
    <div data-theme={theme ? "cupcake" : "dark"}>
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
        <div className="drawer-content  flex flex-col m-4">
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side items-end z-50 lg:z-20">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-2/3 gap-1 lg:w-80 h-full sticky bg-base-300 text-base-content">
            {/* Sidebar content here */}

              <div className="flex flex-col bg-base-100 relative rounded-lg py-5 justify-center">
                <label className="p-2 swap swap-rotate absolute -top-2 -right-2 bg-accent text-white rounded-full">
                  {/* this hidden checkbox controls the state */}
                  <input
                    onChange={() => setTheme(!theme)}
                    type="checkbox"
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-on fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-off fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
                <img
                  className="h-16 lg:h-28 w-fit mx-auto mask mask-squircle shadow-lg"
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                />
                <h3 className="flex justify-center text-md lg:text-lg font-bold uppercase">
                  {user?.displayName}
                </h3>
              </div>

            <div className="divider"></div>

            {/* ======================================================================= */}
            {!userData.role && (
              <>
                <li>
                  <Link
                    to={"/dashboard/student/my-classes"}
                    className="btn btn-sm"
                  >
                    <FaChalkboard></FaChalkboard> My Selected Classes
                    {selectedClass.length > 0 && (
                      <div className="badge badge-secondary">
                        {selectedClass.length}
                      </div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/student/payment-history"}
                    className="btn btn-sm"
                  >
                    <FaHandHoldingUsd></FaHandHoldingUsd>
                    Payment History
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/student/enrolled-classes"}
                    className="btn btn-sm"
                  >
                    <BsCardChecklist></BsCardChecklist>
                    My Enrolled Classes
                  </Link>
                </li>
              </>
            )}
            {userData.role === "admin" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/admin/manage-classes"}
                    className="btn btn-sm"
                  >
                    <FaUserMd></FaUserMd>
                    Manage classes
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/admin/manage-users"}
                    className="btn btn-sm"
                  >
                    <FaUsers></FaUsers>
                    Manage Users
                  </Link>
                </li>
              </>
            )}
            {userData.role === "instructor" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/instructor/my-classes"}
                    className="btn btn-sm"
                  >
                    <FaChalkboardTeacher></FaChalkboardTeacher> My classes
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/instructor/add-class"}
                    className="btn btn-sm"
                  >
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
              </Link>
            </li>
            <li>
              <Link to={"/instructors"} className="btn btn-sm">
                <FaChalkboardTeacher></FaChalkboardTeacher> instructors
              </Link>
            </li>
            <li>
              <button onClick={() => logout()} className="btn btn-error btn-sm">
                logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
