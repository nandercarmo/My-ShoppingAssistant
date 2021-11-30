import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LogInPage from './pages/login/LogInPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { signInWithGoogle, useAuth } from './service/firebase';

function MainRoutes() {
  const currentUser = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (currentUser) {
      navigate('dashboard')
    }
  }, [currentUser])

  return (
      <Routes>
            <Route path="*" element={<Navigate replace to={currentUser ? '/dashboard' : '/login'} />} />
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
