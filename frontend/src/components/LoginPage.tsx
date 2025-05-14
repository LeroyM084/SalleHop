import React from 'react';
import '../styles/Main.css';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container fade-in">
      <div className="login-box">
        <div className="logo mb-20">
          <img src="/assets/logo.png" alt="Emineo Logo" />
        </div>
        <h2 className="subtitle mb-20 text-center">GESTION DES SALLES DE CLASSES</h2>

        <div className="login-form">
          <h3 className="mb-20 text-center">CONNEXION</h3>
          <form id="loginForm">
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email ou nom d'utilisateur"
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">SE CONNECTER</button>
            </div>
          </form>
          <div className="forgot-password mb-10">
            <a href="#">Mot de passe oublié ?</a>
          </div>
          <div className="create-account">
            <button className="btn btn-secondary">CRÉER UN COMPTE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
