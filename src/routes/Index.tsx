import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div id="sidebar">
      <nav>
        <ul>
          <li>
            <Link to={`text3D`}>Your Name</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
