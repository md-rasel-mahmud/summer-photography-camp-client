import Heading from "../components/Heading";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import useSelectedClass from "../hooks/useSelectedClass";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [selectedClass] = useSelectedClass();
  return (
    <div>
      <Heading heading={"student dashboard"}></Heading>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-secondary btn-block drawer-button lg:hidden"
          >
            <TiThMenu></TiThMenu> Open Dashboard Menu
          </label>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side items-end z-50 lg:z-20">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-2/3 gap-1 lg:w-80 h-full bg-base-300 text-base-content">
            {/* Sidebar content here */}
            <li>
              <div className="flex flex-col bg-base-100 py-5 justify-center">
                <img
                  className="h-28 mask mask-squircle shadow-lg"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
                <h3 className="flex justify-center text-xl font-bold uppercase">
                  {user?.displayName}
                </h3>
              </div>
            </li>
            <div className="divider"></div>
            <li>
              <Link
                to={"/dashboard/my-classes"}
                className="btn block btn-sm !text-left"
              >
                My Selected Classes
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/my-classes"}
                className="btn block btn-sm !text-left"
              >
                My Enrolled Classes
              </Link>
            </li>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
