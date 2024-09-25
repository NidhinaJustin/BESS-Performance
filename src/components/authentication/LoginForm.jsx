import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [userInfo , setUserInfo] =useState({
    email:"",
    password:""
  });
  const navigate= useNavigate();

  const handleInputChange=(e)=>{
    let userDetails = { ...userInfo, [e.target.name]: e.target.value };
    setUserInfo(userDetails);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser=JSON.parse(localStorage.getItem("user"));
    if(userInfo.email=== loggedUser.email && userInfo.password=== loggedUser.password){
      navigate("/batteryList")
    }
    else{
      alert("wrong email or password")
    }
    
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleInputChange}
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
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don’t have an account?
          <Link className="text-stone-700 font-medium mx-2" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
