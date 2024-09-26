import React, { useState } from "react";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate= useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = {
    user: JSON.parse(localStorage.getItem("user")),
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    togglePopup();
    navigate("/login")
  };
  return (
    <div className="p-2 bg-black flex justify-between items-center">
      <img src={logo} alt="Logo" className="w-[80px] h-auto" />
      <nav className="text-white flex items-center">
        {isLoggedIn && (
          <div className="flex">
            <p className="text-white text-sm	 mr-3">{user?.email}</p>
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-300 cursor-pointer"
              onClick={togglePopup}
              title={"userName"}
            >
              <p className="text-black text-sm font-bold">
                {user?.userName?.charAt(0)}
              </p>
            </div>
          </div>
        )}
      </nav>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{user?.email}</h3>
              <button onClick={togglePopup} className="text-black text-2xl">
                &times;
              </button>
            </div>

            <div className="mt-4">
            Are you sure you want to logout?
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={togglePopup}
                className="px-4 py-2 text-white bg-black mr-4 rounded"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
