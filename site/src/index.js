import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import Reservation_user from './pages/reservation_user';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservation" element={<Reservation_user />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);