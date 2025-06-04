import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Utilisateur temporaire pour les tests
  const testUser = {
    email: 'test@example.com',
    password: 'password123'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Correction des erreurs dans la requête fetch
      const res = await fetch('http://localhost:8200/api/auth/login', {
        method: 'POST', // 'method' au lieu de 'methods'
        headers: { // 'headers' au lieu de 'header'
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      
      if (!res) {
        setError('Problème de connection au serveur');
        setLoading(false);
        return;
      }
      
      const resStatus = res.status;
      
      // Traitement de la réponse
      if (resStatus === 200) {
        // Récupérer les données de la réponse
        const data = await res.json();
        
        // Stocker le token dans localStorage si présent
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        navigate('/dashboard'); // Redirection vers le tableau de bord après connexion
      } else if (resStatus === 401) {
        setError('Identifiants incorrects');
      } else {
        // Essayer de récupérer le message d'erreur du serveur
        try {
          const errorData = await res.json();
          setError(errorData.message || 'Erreur de connexion');
        } catch (jsonError) {
          setError(`Erreur ${resStatus}: Échec de la connexion`);
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Logique pour la réinitialisation du mot de passe
    console.log('Mot de passe oublié');
  };

  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="logo-container">
          <h1 className="logo">Semineo</h1>
          <span className="logo-subtitle">EDUCATION</span>
        </div>
        <div className="title-container">
          <h2 className="main-title">GESTION DES SALLES DE CLASSES</h2>
        </div>
        <div className="login-card">
          <div className="login-header">
            <h3>CONNEXION</h3>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="email"
                placeholder="Email ou nom d'utilisateur"
                value={credentials.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={credentials.password}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? 'CONNEXION EN COURS...' : 'SE CONNECTER'}
              </button>
            </div>
          </form>
          <div className="forgot-password">
            <button
              className="forgot-password-link"
              onClick={handleForgotPassword}
              type="button"
            >
              Mot de passe oublié ?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
