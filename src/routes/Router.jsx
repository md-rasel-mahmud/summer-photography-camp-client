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
import MyClassesStudent from "../components/StudentDashboard/MyClassesStudent";
import ManageClasses from "../components/AdminDashboard/ManageClasses";
import ManageUsers from "../components/AdminDashboard/ManageUsers";
import MyClassesInstructor from "../components/InstructorDashbord/MyClassesInstructor";
import AddAClass from "../components/InstructorDashbord/AddAClass";
import Payment from "../components/StudentDashboard/Payment";
import MyEnrolledClass from "../components/StudentDashboard/MyEnrolledClass";

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
        path: "/dashboard/student/my-classes",
        element: <MyClassesStudent></MyClassesStudent>,
      },
      {
        path: "/dashboard/admin/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/admin/manage-classes",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "/dashboard/instructor/my-classes",
        element: <MyClassesInstructor></MyClassesInstructor>,
      },
      {
        path: "/dashboard/instructor/add-class",
        element: <AddAClass></AddAClass>,
      },
      {
        path: "/dashboard/student/checkout/:checkoutId",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/student/enrolled-classes",
        element: <MyEnrolledClass></MyEnrolledClass>,
      },
    ],
  },
]);

export default router;
