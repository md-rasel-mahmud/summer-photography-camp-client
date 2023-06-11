import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Classes from "../pages/Classes";
import Instructors from "../pages/Instructors";
import Dashboard from "../pages/Dashboard";
import PrivateLayout from "../layouts/PrivateLayout";
import MyClasses from "../components/StudentDashboard/MyClasses";
import ManageClasses from "../components/AdminDashboard/ManageClasses";
import ManageUsers from "../components/AdminDashboard/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <PublicLayout></PublicLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateLayout>
        <Dashboard></Dashboard>
      </PrivateLayout>
    ),
    children: [
      {
        path: "/dashboard/my-classes",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "/dashboard/all-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/manage-classes",
        element: <ManageClasses></ManageClasses>,
      },
    ],
  },
]);

export default router;
