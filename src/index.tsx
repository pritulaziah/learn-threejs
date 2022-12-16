import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Routes from "constants/route";
import IndexPage from "routes/Index";
import Text3DPage from "routes/Text3D";
import Lights from "routes/Lights";
import ShadowsPage from "routes/Shadows";
import HauntedHouse from "routes/HauntedHouse";

const router = createBrowserRouter([
  {
    path: Routes.Main,
    element: <IndexPage />,
  },
  {
    path: Routes.Text3D,
    element: <Text3DPage />,
  },
  {
    path: Routes.Lights,
    element: <Lights />,
  },
  {
    path: Routes.Shadows,
    element: <ShadowsPage />,
  },
  {
    path: Routes.HauntedHouse,
    element: <HauntedHouse />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
