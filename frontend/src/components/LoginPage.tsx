import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';
import '../styles/LoginPage.css';
import logo from '../assets/logo.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === 'admin@emineo.fr' && password === 'admin123') {
      navigate('/dashboard');
    } else {
      alert('Identifiants incorrects. Essayez admin@emineo.fr / admin123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="Emineo Logo" />
        </div>
        <h2 className="subtitle">GESTION DES SALLES DE CLASSES</h2>

        <div className="login-form">
          <h3>CONNEXION</h3>
          <form onSubmit={handleLogin}>
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
          <div className="forgot-password">
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
