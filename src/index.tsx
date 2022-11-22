import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "routes/Root";
import Text3D from "routes/Text3D";
import Lights from "routes/Lights";
import Routes from "constants/route";

const router = createBrowserRouter([
  {
    path: Routes.Main,
    element: <Root />,
  },
  {
    path: Routes.Text3D,
    element: <Text3D />,
  },
  {
    path: Routes.Lights,
    element: <Lights />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
