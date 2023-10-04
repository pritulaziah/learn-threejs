import { Link } from "react-router-dom";
import Routes from "constants/route";

const IndexPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="py-4 px-3 bg-gray-50 w-[300px] rounded shadow-sm border">
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
    </div>
  );
};

export default IndexPage;
