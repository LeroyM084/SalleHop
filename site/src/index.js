import React from 'react';
import ReactDOM from 'react-dom/client'; // Importer createRoot depuis react-dom/client
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Reservation_user from './pages/reservation_user';
import CampusAdmin from './pages/campus_admin';
import SchoolAdmin from './pages/school_admin';
import { AuthProvider } from './context/AuthContext';
import Backoffice from './pages/Backoffice';

const root = ReactDOM.createRoot(document.getElementById('root')); // Utiliser createRoot

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservation" element={<Reservation_user />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campus" element={<CampusAdmin />} />
          <Route path="/school" element={<SchoolAdmin />} />
          <Route path="/backoffice" element={<Backoffice />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);