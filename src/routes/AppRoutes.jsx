import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../components/authentication/LoginForm';
import CreateUserForm from '../components/authentication/CreateUserForm';
import BessInfo from '../components/BessInfo';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<CreateUserForm />} />
      <Route path="/batteryList" element={<BessInfo />} />
    </Routes>
  );
};

export default AppRoutes;
