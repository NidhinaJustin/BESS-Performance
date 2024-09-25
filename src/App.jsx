import React, { useState } from 'react';
import "./App.css";
import logo from "./Assets/logo.png";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router, Link } from "react-router-dom";
function App() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <div className="p-2 bg-black flex justify-between items-center">
        <img src={logo} alt="Logo" className="w-[150px] h-auto" />
        <nav className="text-white flex items-center">
        <Link to="/" className="mx-2">
          Login
        </Link>
        <Link to="/register" className="mx-2">
          Register
        </Link>
        
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-300 cursor-pointer"
          onClick={togglePopup}
          title={"userName"}
        >
          <p className="text-black text-lg font-bold">{"userName".charAt(0)}</p>
        </div>
      </nav>

      </div>
      <AppRoutes/>
    </Router>
  );
}

export default App;
