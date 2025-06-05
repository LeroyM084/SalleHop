import React, { useState } from 'react';
import './backoffice.css'

const API_URL = 'http://localhost:8200/api/backoffice';

const initialFormData = {
  utilisateur: { nom: '', prenom: '', email: '', mot_de_passe: '' },
  salle: { nom: '', campus_id: '' },
  groupe: { nom: '', est_etudiant: '', ecole_id: '' }, // <-- est_etudiant vide de base
  cours: { nom: '', nombre_heures_total: '' },
  creneau: { date: '', heure_debut: '', heure_fin: '', status: 'en attente' },
  campus: { nom: '', adresse: '' },
  ecole: { nom: '' },
  role: { nom_role: '' },
};

const requiredFields = {
  utilisateur: ['nom', 'prenom', 'email', 'mot_de_passe'],
  salle: ['nom', 'campus_id'],
  groupe: ['nom', 'est_etudiant', 'ecole_id'],
  cours: ['nom', 'nombre_heures_total'],
  creneau: ['date', 'heure_debut', 'heure_fin'],
  campus: ['nom', 'adresse'],
  ecole: ['nom'],
  role: ['nom_role'],
};

const Backoffice = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  // Vérifie si tous les champs d'une catégorie sont remplis
  const isCategoryComplete = (category) => {
    return requiredFields[category].every(
      (field) =>
        formData[category][field] !== '' &&
        formData[category][field] !== null &&
        formData[category][field] !== undefined
    );
  };

  // Vérifie si au moins un champ d'une catégorie est rempli
  const isCategoryPartiallyFilled = (category) => {
    return requiredFields[category].some(
      (field) =>
        formData[category][field] !== '' &&
        formData[category][field] !== null &&
        formData[category][field] !== undefined
    );
  };

  const handleGlobalSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Vérifie les catégories partiellement remplies
    for (const category of Object.keys(formData)) {
      if (
        isCategoryPartiallyFilled(category) &&
        !isCategoryComplete(category)
      ) {
        setError(
          `Veuillez remplir tous les champs pour la catégorie "${category}" ou laissez-la vide.`
        );
        return;
      }
    }

    // Prépare les données à envoyer
    const dataToSend = {};
    for (const category of Object.keys(formData)) {
      if (isCategoryComplete(category)) {
        dataToSend[category] = formData[category];
      }
    }

    if (Object.keys(dataToSend).length === 0) {
      setError('Veuillez remplir au moins une catégorie entièrement.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/addData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || response.statusText);
      }

      const data = await response.json();
      alert('Données ajoutées avec succès !');
      // Réinitialise uniquement les catégories envoyées
      setFormData((prev) => {
        const newData = { ...prev };
        for (const cat of Object.keys(dataToSend)) {
          newData[cat] = { ...initialFormData[cat] };
        }
        return newData;
      });
    } catch (err) {
      setError(`Erreur lors de l'envoi : ${err.message}`);
    }
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`backoffice-container${darkMode ? ' dark' : ''}`}>
      <button
        className="theme-toggle-btn"
        onClick={handleThemeToggle}
        aria-label="Changer le thème"
        type="button"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <h1>Backoffice</h1>
      {error && <div className="error">{error}</div>}

      {/* Utilisateur */}
      <section>
        <h2>Ajouter un utilisateur</h2>
        <form>
          <input
            type="text"
            placeholder="Nom"
            value={formData.utilisateur.nom}
            onChange={(e) => handleInputChange('utilisateur', 'nom', e.target.value)}
          />
          <input
            type="text"
            placeholder="Prénom"
            value={formData.utilisateur.prenom}
            onChange={(e) => handleInputChange('utilisateur', 'prenom', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.utilisateur.email}
            onChange={(e) => handleInputChange('utilisateur', 'email', e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={formData.utilisateur.mot_de_passe}
            onChange={(e) => handleInputChange('utilisateur', 'mot_de_passe', e.target.value)}
          />
        </form>
      </section>

      <section>
        <h2>Ajouter une salle</h2>
        <form>
          <input
            type="text"
            placeholder="Nom de la salle"
            value={formData.salle.nom}
            onChange={(e) => handleInputChange('salle', 'nom', e.target.value)}
          />
          <input
            type="number"
            placeholder="ID du campus"
            value={formData.salle.campus_id}
            onChange={(e) => handleInputChange('salle', 'campus_id', e.target.value)}
          />
        </form>
      </section>

      <section>
        <h2>Ajouter un groupe</h2>
        <form>
          <input
            type="text"
            placeholder="Nom du groupe"
            value={formData.groupe.nom}
            onChange={(e) => handleInputChange('groupe', 'nom', e.target.value)}
          />
          <select
            value={formData.groupe.est_etudiant}
            onChange={(e) => handleInputChange('groupe', 'est_etudiant', e.target.value)}
          >
            <option value="">-- Étudiant ou non --</option>
            <option value="true">Étudiant</option>
            <option value="false">Non étudiant</option>
          </select>
          <input
            type="number"
            placeholder="ID de l'école"
            value={formData.groupe.ecole_id}
            onChange={(e) => handleInputChange('groupe', 'ecole_id', e.target.value)}
          />
        </form>
      </section>

      <section>
        <h2>Ajouter un cours</h2>
        <form>
          <input
            type="text"
            placeholder="Nom du cours"
            value={formData.cours.nom}
            onChange={(e) => handleInputChange('cours', 'nom', e.target.value)}
          />
          <input
            type="number"
            placeholder="Nombre total d'heures"
            value={formData.cours.nombre_heures_total}
            onChange={(e) => handleInputChange('cours', 'nombre_heures_total', e.target.value)}
          />
        </form>
      </section>

      <section>
        <h2>Ajouter un créneau</h2>
        <form>
          <input
            type="date"
            placeholder="Date"
            value={formData.creneau.date}
            onChange={(e) => handleInputChange('creneau', 'date', e.target.value)}
          />
          <input
            type="time"
            placeholder="Heure de début"
            value={formData.creneau.heure_debut}
            onChange={(e) => handleInputChange('creneau', 'heure_debut', e.target.value)}
          />
          <input
            type="time"
            placeholder="Heure de fin"
            value={formData.creneau.heure_fin}
            onChange={(e) => handleInputChange('creneau', 'heure_fin', e.target.value)}
          />
        </form>
      </section>

      <section>
        <h2>Ajouter un campus</h2>
        <form>
          <input
            type="text"
            placeholder="Nom du campus"
            value={formData.campus.nom}
            onChange={(e) => handleInputChange('campus', 'nom', e.target.value)}
          />
          <input
            type="text"
            placeholder="Adresse du campus"
            value={formData.campus.adresse}
            onChange={(e) => handleInputChange('campus', 'adresse', e.target.value)}
          />
        </form>
      </section>

      <section>
        <h2>Ajouter une école</h2>
        <form>
          <input
            type="text"
            placeholder="Nom de l'école"
            value={formData.ecole.nom}
            onChange={(e) => handleInputChange('ecole', 'nom', e.target.value)}
          />
        </form>
      </section>

      <section>
        <h2>Ajouter un rôle</h2>
        <form>
          <input
            type="text"
            placeholder="Nom du rôle"
            value={formData.role.nom_role}
            onChange={(e) => handleInputChange('role', 'nom_role', e.target.value)}
          />
        </form>
      </section>

      {/* Bouton d'envoi global */}
      <button style={{ marginTop: 20 }} onClick={handleGlobalSubmit}>
        Envoyer toutes les données remplies
      </button>
    </div>
  );
};

export default Backoffice;