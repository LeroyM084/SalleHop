import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Reservation_user from './pages/reservation_user';
import CampusAdmin from './pages/campus_admin';
import SchoolAdmin from './pages/school_admin';
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/campus" element={<CampusAdmin />} />
          <Route path="/school" element={<SchoolAdmin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);