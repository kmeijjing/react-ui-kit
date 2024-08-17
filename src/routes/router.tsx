import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Button from "../pages/Button";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/button",
        element: <Button />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);
