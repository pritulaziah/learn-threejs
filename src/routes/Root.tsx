import { Link, Outlet } from "react-router-dom";
import Routes from "constants/route";

const Root = () => {
  return (
    <>
      <aside className="max-w-[15%]">
        <div className="min-h-screen py-4 px-3 bg-gray-50">
          <ul className="space-y-2">
            {Object.entries(Routes).map(([title, link]) => (
              <li key={link}>
                <Link
                  to={link}
                  className="flex p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <Outlet />
    </>
  );
};

export default Root;
