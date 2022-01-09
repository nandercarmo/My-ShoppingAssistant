import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LogInPage from './pages/login/LogInPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import {useAuth} from "./contexts/auth";

function MainRoutes() {
  const { signed } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (signed) {
        navigate('dashboard')
    } else {
        navigate('/login')
    }
  }, [navigate, signed])

  return (
      <Routes>
            <Route path="*" element={<Navigate replace to={signed ? '/dashboard' : '/login'} />} />
            <Route 
            path="/dashboard" 
            element={<DashboardPage />} />
            <Route
              path="/login"
              element={<LogInPage />}
            />
      </Routes>
  );
}

export default MainRoutes;
