import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`text3D`}>Project Text3D</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Root;
