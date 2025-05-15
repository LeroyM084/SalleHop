import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simule une connexion (remplacez par une vraie logique d'authentification)
    return new Promise((resolve, reject) => {
      if (email === 'test@example.com' && password === 'password') {
        setUser({ email });
        resolve();
      } else {
        reject(new Error('Identifiants incorrects'));
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);