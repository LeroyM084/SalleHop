import React from 'react';
import '../styles/Main.css';
import '../styles/DashboardPage.css'; // Tu peux créer SettingsPage.css si besoin

const SettingsPage: React.FC = () => {
  return (
    <div className="main-content fade-in">
      <h1 className="mb-20">Paramètres</h1>

      <div className="settings-section">
        <h2 className="mb-10">Informations du compte</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" id="username" className="form-control" placeholder="Nom d'utilisateur" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" className="form-control" placeholder="Adresse email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" className="form-control" placeholder="Mot de passe" />
          </div>

          <button type="submit" className="btn btn-primary mt-20">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
