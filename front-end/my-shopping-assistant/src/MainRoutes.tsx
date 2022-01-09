import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LogInPage from './pages/login/LogInPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import {useAuth} from "./contexts/auth";
import CollectionPage from "./pages/collection/CollectionPage";

function MainRoutes() {
  const { signed } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (signed) {
        navigate('dashboard')
    } else {
        navigate('/login')
    }
  }, [signed])

  return (
      <Routes>
            <Route path="*" element={<Navigate replace to={signed ? '/dashboard' : '/login'} />} />
            <Route 
                path="/dashboard"
                element={<DashboardPage />} />
            <Route
                path="/collection/*"
                element={<CollectionPage />} />
            <Route
                path="/login"
                element={<LogInPage />}
            />
      </Routes>
  );
}

export default MainRoutes;
