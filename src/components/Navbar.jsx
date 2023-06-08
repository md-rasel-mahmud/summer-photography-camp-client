import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from '../assets/logo.png'

const Navbar = () => {
  // create a navigation variable and store here all navigation menu for no repetition
  const user = false;
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
            <Link className="text-2xl uppercase" to={'/'}>Summer Photography Camp</Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navigation}</ul>
      </div>
      {/* TODO: added toggle to change night mode dark mode */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full">
              {user ? (
                <div className="w-10">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              ) : (
                <div className="text-2xl">
                  <FaUser></FaUser>
                </div>
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-50"
          >
            {user && (
              <li>
                <Link className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
            )}
            <li>{user ? <button className="btn-error">Logout</button> : <Link to={'/login'} className="bg-base-300">Login</Link>}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
