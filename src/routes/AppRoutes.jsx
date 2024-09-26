import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../components/authentication/LoginForm';
import CreateUserForm from '../components/authentication/CreateUserForm';
// import BessInfo from '../components/BessInfo';
import BatteryList from '../components/BatteryList';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/BESS-Performance" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<CreateUserForm />} />
      <Route path="/batteryList" element={<BatteryList />} />
    </Routes>
  );
};

export default AppRoutes;
