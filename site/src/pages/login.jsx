import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    motdepasse: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials.email, credentials.motdepasse);
      navigate('/dashboard'); // Redirection vers le tableau de bord après connexion
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold">Semineo</h1>
        </div>
        
        <div className="text-center mb-4">
          <h2 className="text-sm uppercase text-gray-600">GESTION DES SALLES DE CLASSES</h2>
        </div>
        
        <div className="bg-gray-700 rounded-md shadow-md p-6">
          <div className="text-center mb-6">
            <h3 className="text-white">CONNEXION</h3>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          
          <div>
            <div className="mb-4">
              <input
                type="text"
                name="email"
                placeholder="Email ou nom d'utilisateur"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
            </div>
            
            <div className="mb-4">
              <input
                type="password"
                name="motdepasse"
                placeholder="Mot de passe"
                value={credentials.motdepasse}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
            </div>
            
            <div className="mb-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                disabled={loading}
              >
                {loading ? 'CONNEXION EN COURS...' : 'SE CONNECTER'}
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              className="text-gray-400 text-sm hover:text-white"
              onClick={() => console.log('Mot de passe oublié')}
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