import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Button from "../pages/Button";
import DropdownButton from "../pages/DropdownButton";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/button",
        element: <Button />,
      },
      {
        path: "/dropdown-button",
        element: <DropdownButton />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);
