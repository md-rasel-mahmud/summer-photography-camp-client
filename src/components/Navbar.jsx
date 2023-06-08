import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  // create a navigation variable and store here all navigation menu for no repetition
  const { user, logout } = useContext(AuthContext);
  const navigation = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/instructors"}>Instructors</Link>
      </li>
      <li>
        <Link to={"/classes"}>Classes</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          {/* TODO: added icon on navbar */}
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navigation}
          </ul>
        </div>
        <div className="flex flex-col md:flex-row justify-center text-center gap-3 items-center">
          <img className="w-10" src={logo} alt="logo" />
          <Link className="text-2xl uppercase" to={"/"}>
            Summer Photography Camp
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navigation}</ul>
      </div>
      {/* TODO: added toggle to change night mode dark mode */}
      <div className="navbar-end">
        <div className="bg-base-300 flex gap-1 items-center rounded-full">
          {user?.displayName && (
            <p className="hidden lg:block uppercase pl-4 font-semibold text-accent">
              {user?.displayName.split(" ")[0]}{" "}
              {user?.displayName.split(" ")[1]}
            </p>
          )}
          <div className="dropdown dropdown-end">
            {user ? (
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="rounded-full">
                  {user?.photoURL ? (
                    <div className="w-10">
                      <img src={user?.photoURL} />
                    </div>
                  ) : (
                    <div className="text-2xl">
                      <FaUser></FaUser>
                    </div>
                  )}
                </div>
              </label>
            ) : (
              <Link to={"/login"} className="btn btn-sm btn-primary">
                Login
              </Link>
            )}
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-60 z-50"
            >
              {user && (
                <>
                  <li>
                    <a className="break-all">
                      <b>Full Name:</b> {user?.displayName}
                    </a>
                  </li>
                  <li>
                    <a className="break-all">
                      <b>Email:</b> {user?.email}
                    </a>
                  </li>
                  <li>
                    <button onClick={() => logout()} className="btn-error">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
