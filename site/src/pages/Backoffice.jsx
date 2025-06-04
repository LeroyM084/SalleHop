import React, { useState } from 'react';

const API_URL = 'http://localhost:8200/api/backoffice';

const Backoffice = () => {
  const [formData, setFormData] = useState({
    user: { nom: '', prenom: '', email: '', mot_de_passe: '' },
    salle: { nom: '', campus_id: '' },
    groupe: { nom: '', est_etudiant: false, ecole_id: '' },
    cours: { nom: '', nombre_heures_total: '' },
    creneau: { date: '', heure_debut: '', heure_fin: '', status: 'en attente' },
    campus: { nom: '', adresse: '' },
    ecole: { nom: '' },
    role: { nom_role: '' },
  });

  const handleInputChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (category, endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData[category]),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      alert(`${category} ajouté avec succès: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error(`Erreur lors de l'ajout de ${category}:`, error);
      alert(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="backoffice-container">
      <h1>Backoffice</h1>

      {/* Formulaire pour ajouter un utilisateur */}
      <section>
        <h2>Ajouter un utilisateur</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('user', 'addUser');
          }}
        >
          <input
            type="text"
            placeholder="Nom"
            value={formData.user.nom}
            onChange={(e) => handleInputChange('user', 'nom', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            value={formData.user.prenom}
            onChange={(e) => handleInputChange('user', 'prenom', e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.user.email}
            onChange={(e) => handleInputChange('user', 'email', e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={formData.user.mot_de_passe}
            onChange={(e) => handleInputChange('user', 'mot_de_passe', e.target.value)}
            required
          />
          <button type="submit">Ajouter utilisateur</button>
        </form>
      </section>

      {/* Formulaire pour ajouter une salle */}
      <section>
        <h2>Ajouter une salle</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('salle', 'addSalle');
          }}
        >
          <input
            type="text"
            placeholder="Nom de la salle"
            value={formData.salle.nom}
            onChange={(e) => handleInputChange('salle', 'nom', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="ID du campus"
            value={formData.salle.campus_id}
            onChange={(e) => handleInputChange('salle', 'campus_id', e.target.value)}
            required
          />
          <button type="submit">Ajouter salle</button>
        </form>
      </section>

      {/* Formulaire pour ajouter un groupe */}
      <section>
        <h2>Ajouter un groupe</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('groupe', 'addGroupe');
          }}
        >
          <input
            type="text"
            placeholder="Nom du groupe"
            value={formData.groupe.nom}
            onChange={(e) => handleInputChange('groupe', 'nom', e.target.value)}
            required
          />
          <select
            value={formData.groupe.est_etudiant}
            onChange={(e) => handleInputChange('groupe', 'est_etudiant', e.target.value === 'true')}
          >
            <option value="true">Étudiant</option>
            <option value="false">Non étudiant</option>
          </select>
          <input
            type="number"
            placeholder="ID de l'école"
            value={formData.groupe.ecole_id}
            onChange={(e) => handleInputChange('groupe', 'ecole_id', e.target.value)}
            required
          />
          <button type="submit">Ajouter groupe</button>
        </form>
      </section>

      {/* Formulaire pour ajouter un cours */}
      <section>
        <h2>Ajouter un cours</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('cours', 'addCours');
          }}
        >
          <input
            type="text"
            placeholder="Nom du cours"
            value={formData.cours.nom}
            onChange={(e) => handleInputChange('cours', 'nom', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Nombre total d'heures"
            value={formData.cours.nombre_heures_total}
            onChange={(e) => handleInputChange('cours', 'nombre_heures_total', e.target.value)}
            required
          />
          <button type="submit">Ajouter cours</button>
        </form>
      </section>

      {/* Formulaire pour ajouter un créneau */}
      <section>
        <h2>Ajouter un créneau</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('creneau', 'addCreneau');
          }}
        >
          <input
            type="date"
            placeholder="Date"
            value={formData.creneau.date}
            onChange={(e) => handleInputChange('creneau', 'date', e.target.value)}
            required
          />
          <input
            type="time"
            placeholder="Heure de début"
            value={formData.creneau.heure_debut}
            onChange={(e) => handleInputChange('creneau', 'heure_debut', e.target.value)}
            required
          />
          <input
            type="time"
            placeholder="Heure de fin"
            value={formData.creneau.heure_fin}
            onChange={(e) => handleInputChange('creneau', 'heure_fin', e.target.value)}
            required
          />
          <button type="submit">Ajouter créneau</button>
        </form>
      </section>

      {/* Formulaire pour ajouter un campus */}
      <section>
        <h2>Ajouter un campus</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('campus', 'addCampus');
          }}
        >
          <input
            type="text"
            placeholder="Nom du campus"
            value={formData.campus.nom}
            onChange={(e) => handleInputChange('campus', 'nom', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Adresse du campus"
            value={formData.campus.adresse}
            onChange={(e) => handleInputChange('campus', 'adresse', e.target.value)}
            required
          />
          <button type="submit">Ajouter campus</button>
        </form>
      </section>

      {/* Formulaire pour ajouter une école */}
      <section>
        <h2>Ajouter une école</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('ecole', 'addEcole');
          }}
        >
          <input
            type="text"
            placeholder="Nom de l'école"
            value={formData.ecole.nom}
            onChange={(e) => handleInputChange('ecole', 'nom', e.target.value)}
            required
          />
          <button type="submit">Ajouter école</button>
        </form>
      </section>

      {/* Formulaire pour ajouter un rôle */}
      <section>
        <h2>Ajouter un rôle</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('role', 'addRole');
          }}
        >
          <input
            type="text"
            placeholder="Nom du rôle"
            value={formData.role.nom_role}
            onChange={(e) => handleInputChange('role', 'nom_role', e.target.value)}
            required
          />
          <button type="submit">Ajouter rôle</button>
        </form>
      </section>
    </div>
  );
};

export default Backoffice;