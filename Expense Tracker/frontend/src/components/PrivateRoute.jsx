import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Home /> : <Navigate to="/login" />;
};
export default PrivateRoute;
