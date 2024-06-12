import debug from "debug";
import { Component } from "react";
import { signUp } from "../../utilities/users-service";

const log = debug("mern:components:SignUpForm");

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "user",
    error: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { ...this.state };
    delete formData.error;
    delete formData.confirm;

    try {
      const user = await signUp(formData);
      log("user: %o", user);
      this.props.setUser(user);
    } catch (error) {
      this.setState({ error: "Sign Up Failed" });
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-md"
      >
        <fieldset>
          <legend className="text-2xl font-bold mb-4 text-center">
            Sign Up
          </legend>

          <label className="block mb-2">
            Name:
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="block mb-2">
            Email:
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="block mb-2">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="block mb-2">
            Confirm:
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="block mb-4">
            Role:
            <select
              name="role"
              value={this.state.role}
              onChange={this.handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="user">Petowner</option>
              <option value="sitter">Sitter</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Sign Up
          </button>

          {this.state.error && (
            <p className="mt-4 text-red-600 text-center">{this.state.error}</p>
          )}
        </fieldset>
      </form>
    );
  }
}
