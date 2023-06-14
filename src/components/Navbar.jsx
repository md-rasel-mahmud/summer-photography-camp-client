/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useSelectedClass from "../hooks/useSelectedClass";

const Navbar = ({ setTheme, theme }) => {
  // create a navigation variable and store here all navigation menu for no repetition
  const { user, logout } = useContext(AuthContext);
  const [selectedClass] = useSelectedClass();
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
      {user && <li>
        <Link to={"/dashboard/user-role"}>Dashboard</Link>
      </li>}
    </>
  );

  return (
    <div className="bg-base-200 shadow-lg sticky top-0 z-30">
      <div className="navbar max-w-screen-xl mx-auto ">
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
            <Link className="text-xl text-accent uppercase" to={"/"}>
              Summer Photography Camp
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navigation}</ul>
        </div>
        {/* TODO: added toggle to change night mode dark mode */}
        <div className="navbar-end">
          <div className="bg-base-300 flex gap-1 p-1 items-center rounded-full">
            <label className="pl-1 swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input className="tooltip tooltip-left" data-tip={theme ? 'Click to switch Dark Theme' : 'Click to switch Light Theme'} onChange={() => setTheme(!theme)} type="checkbox" />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-9 h-9"
                
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-9 h-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            {user?.displayName && (
              <p className="hidden lg:block uppercase font-semibold text-accent">
                {user?.displayName.split(" ")[0]}{" "}
                {user?.displayName.split(" ")[1]}
              </p>
            )}
            {selectedClass.length > 0 && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-secondary badge-sm indicator-item">
                      {selectedClass.length}
                    </span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                  <div className="card-body">
                    <span className="font-bold text-lg">
                      My Classes: {selectedClass.length}
                    </span>
                    <span className="text-info">
                      Subtotal: $
                      {selectedClass.reduce((sum, item) => {
                        const price = parseFloat(item.price);
                        return sum + price;
                      }, 0)}
                    </span>
                    <div className="card-actions">
                      <Link
                        to={"/dashboard/student/my-classes"}
                        className="btn btn-primary btn-block"
                      >
                        View My Classes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="dropdown dropdown-end">
              {user ? (
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="rounded-full">
                    {user?.photoURL ? (
                      <div className="w-10">
                        <img src={user?.photoURL} referrerPolicy="no-referrer"/>
                      </div>
                    ) : (
                      <div className="text-2xl">
                        <FaUser></FaUser>
                      </div>
                    )}
                  </div>
                </label>
              ) : (
                // TODO: whenever click login button it will show blank list box need to fix when main requirement would done
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

                    <a className="break-all px-3">
                      <b>Email:</b> {user?.email}
                    </a>

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
    </div>
  );
};

export default Navbar;
