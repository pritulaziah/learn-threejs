import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import Text3D from "./routes/Text3D";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "text3D",
    element: <Text3D />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
