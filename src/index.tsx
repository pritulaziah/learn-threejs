import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Routes from "constants/route";
import IndexPage from "routes/Index";
// import Text3DPage from "routes/Text3D";
// import LightsPage from "routes/Lights";
// import ShadowsPage from "routes/Shadows";
// import HauntedHousePage from "routes/HauntedHouse";
// import ParticlesPage from "routes/Particles";
// import GalaxyGeneratorPage from "routes/GalaxyGenerator";
import LearnPhysicsPage from "routes/LearnPhysicsPage";

const router = createBrowserRouter([
  {
    path: Routes.Main,
    element: <IndexPage />,
  },
  // {
  //   path: Routes.Text3D,
  //   element: <Text3DPage />,
  // },
  // {
  //   path: Routes.Lights,
  //   element: <LightsPage />,
  // },
  // {
  //   path: Routes.Shadows,
  //   element: <ShadowsPage />,
  // },
  // {
  //   path: Routes.HauntedHouse,
  //   element: <HauntedHousePage />,
  // },
  // {
  //   path: Routes.Particles,
  //   element: <ParticlesPage />,
  // },
  // {
  //   path: Routes.GalaxyGenerator,
  //   element: <GalaxyGeneratorPage />,
  // },
  {
    path: Routes.LearnPhysics,
    element: <LearnPhysicsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
