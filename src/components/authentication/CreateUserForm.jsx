import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate= useNavigate();
  const handleChangeInput = (e) => {
    let userDetails = { ...userInfo, [e.target.name]: e.target.value };
    setUserInfo(userDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(userInfo));
    navigate("/login");
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full overflow-auto max-h-full">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleChangeInput}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChangeInput}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChangeInput}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?
          <Link className="text-stone-700 font-medium mx-2" to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateUserForm;
