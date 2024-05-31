// import { Link, NavLink } from "react-router-dom";
// import { logOut } from "../../utilities/users-service";

// export default function NavBar({ setUser }) {
//   const handleLogOut = () => {
//     logOut();
//     setUser(null);
//   };

//   return (
//     <nav>
//       <NavLink to="/" className="text-xl font-bold text-gray-900">
//         Petbnb
//       </NavLink>
//       <NavLink
//         to="/sitterform"
//         className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-indigo-500"
//       >
//         Become a Sitter
//       </NavLink>
//       <NavLink
//         to="/login"
//         className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
//       >
//         Login
//       </NavLink>
//       <NavLink
//         to="/signup"
//         className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
//       >
//         Signup
//       </NavLink>

//       <Link to="" onClick={handleLogOut}>
//         Log Out
//       </Link>
//     </nav>
//   );
// }

import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <NavLink to="/" className="text-xl font-bold text-gray-900">
        Petbnb
      </NavLink>
      <NavLink
        to="/sitterform"
        className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-indigo-500"
      >
        Become a Sitter
      </NavLink>
      {user ? (
        <>
          <span className="text-sm font-semibold text-gray-900">
            Welcome, {user.name}
          </span>
          <Link
            to="/"
            onClick={handleLogOut}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Log Out
          </Link>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </NavLink>
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
        </>
      )}
    </nav>
  );
}
