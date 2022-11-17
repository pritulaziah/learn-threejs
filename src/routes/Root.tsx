import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`text3D`}>Text3D</Link>
            </li>
            <li>
              <Link to={`lights`}>Lights</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Root;
