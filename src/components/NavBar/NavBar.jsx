import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img
          className="h-8 w-auto mr-2"
          src="/images/pawprint.png"
          alt="Petbnb Logo"
        />
        <NavLink to="/" className="text-xl font-bold text-gray-900">
          Petbnb
        </NavLink>
      </div>
      <div className="flex items-center space-x-4">
        <NavLink
          to="/beasitter"
          className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          Become a Sitter
        </NavLink>
        {user ? (
          <>
            <span className="text-sm font-semibold text-gray-900">
              Welcome, {user.name}
            </span>
            <NavLink
              to="/messages/receiverId"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Inbox
            </NavLink>
            <NavLink
              to="/bookingPage"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Bookings
            </NavLink>
            {user.role === "sitter" && (
              <NavLink
                to="/profile"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Profile
              </NavLink>
            )}
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
          </>
        )}
      </div>
    </nav>
  );
}
