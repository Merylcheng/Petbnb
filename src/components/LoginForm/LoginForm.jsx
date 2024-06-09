import debug from "debug";
import { useNavigate } from "react-router-dom";
import { login } from "../../utilities/users-service";

const log = debug("mern:components:LoginForm");

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    log("data: %o", data);
    const { email, password, role } = data;
    const user = await login(email, password, role);
    setUser(user); // store
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md"
    >
      <fieldset className="space-y-4">
        <legend className="text-2xl font-bold mb-4">Login</legend>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password:
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role:
            <select
              name="role"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="user">Petowner</option>
              <option value="sitter">Sitter</option>
            </select>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </fieldset>
    </form>
  );
}
