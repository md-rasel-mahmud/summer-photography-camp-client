import Heading from "../components/Heading";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
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
          <ul className="menu p-4 w-2/3 lg:w-80 h-full bg-base-300 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link
                to={"/dashboard/my-classes"}
                className="btn block btn-sm !text-left"
              >
                My Selected Classes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
