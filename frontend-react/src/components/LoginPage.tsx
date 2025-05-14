import React from 'react';
import '../styles/main.css';
import '../styles/login.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="Emineo Logo" />
        </div>
        <h2 className="subtitle">GESTION DES SALLES DE CLASSES</h2>

        <div className="login-form">
          <h3>CONNEXION</h3>
          <form id="loginForm">
            <div className="form-group">
              <input type="email" id="email" placeholder="Email ou nom d'utilisateur" required />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="Mot de passe" required />
            </div>
            <div className="form-group">
              <button type="submit" className="btn-primary">SE CONNECTER</button>
            </div>
          </form>
          <div className="forgot-password">
            <a href="#">Mot de passe oublié ?</a>
          </div>
          <div className="create-account">
            <button className="btn-secondary">CRÉER UN COMPTE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;