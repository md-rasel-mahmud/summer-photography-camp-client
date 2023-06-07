import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>
  },
]);

export default router;
