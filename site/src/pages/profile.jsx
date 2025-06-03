import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    nom: '',
    prenom: '',
    civilite: '',
    diplomes: [],
    matieres: []
  });
  const [loading, setLoading] = useState(true);
  
  // Récupérer les informations du profil au chargement du composant
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Simulation de récupération de données (à remplacer par un appel API réel plus tard)
        // Dans une implémentation réelle, vous feriez un appel à votre API
        setTimeout(() => {
          setUserProfile({
            nom: 'Joubert',
            prenom: 'Aline',
            civilite: 'Mme',
            diplomes: ['diplome_joub...ine.pdf'],
            matieres: ['Python', 'JavaScript', 'Java']
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fonction pour aller vers une autre page
  const navigateTo = (path) => {
    navigate(path);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    const newSubject = e.target.elements.newSubject.value.trim();
    if (newSubject && !userProfile.matieres.includes(newSubject)) {
      setUserProfile(prev => ({
        ...prev,
        matieres: [...prev.matieres, newSubject]
      }));
      e.target.reset();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Barre de navigation latérale */}
      <div className="sidebar">
        <nav className="nav-menu">
          <button className="nav-item" onClick={() => navigateTo('/dashboard')}>
            <div className="nav-icon home-icon"></div>
          </button>
        <button className="nav-item" onClick={() => navigateTo('/reservation')}>
        <img src={require('../image/icon.png')} alt="Réservation" className="nav-img-icon" />
        </button>
          <button className="nav-item active" onClick={() => navigateTo('/profile')}>
            <div className="nav-icon profile-icon"></div>
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => navigateTo('/settings')}>
            <div className="nav-icon settings-icon"></div>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        {/* En-tête avec titre */}
        <header className="dashboard-header">
          <div className="user-info">
            Profil
          </div>
          <div className="notification-icon"></div>
        </header>

        {/* Section profil */}
        <section className="profile-section">
          <div className="profile-header">
        </div>
          
          <div className="profile-content">
            <div className="profile-info-section">
              <h3>Informations personnelles</h3>
              
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <label>Nom prénom</label>
                  <div className="profile-info-value">
                    {loading ? 'Chargement...' : `${userProfile.prenom} ${userProfile.nom}`}
                  </div>
                </div>
                
                <div className="profile-info-item">
                  <label>Civilité</label>
                  <div className="profile-info-value">
                    {loading ? 'Chargement...' : userProfile.civilite}
                  </div>
                </div>
              </div>
              
              <div className="profile-info-item full-width">
                <label>Diplômes</label>
                <div className="profile-diploma-list">
                  {loading ? (
                    <div className="loading-placeholder">Chargement des diplômes...</div>
                  ) : (
                    userProfile.diplomes.map((diplome, index) => (
                      <div key={index} className="profile-diploma-item">
                        {diplome}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="profile-subjects-container">
                <div className="profile-subjects-column">
                  <h4>Matières enseignées</h4>
                  <div className="profile-subjects-list">
                    {loading ? (
                      <div className="loading-placeholder">Chargement des matières...</div>
                    ) : (
                      userProfile.matieres.map((matiere, index) => (
                        <div key={index} className="profile-subject-item">
                          {matiere}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="profile-subjects-column">
                  <h4>Prochains cours</h4>
                  <div className="profile-upcoming-classes">
                    <div className="upcoming-class active">
                      <div className="class-header">Python</div>
                      <div className="class-time">27/05 - 31/05</div>
                      <div className="class-status">En cours</div>
                    </div>
                    <div className="upcoming-class pending">
                      <div className="class-header">JavaScript</div>
                      <div className="class-time">01/06 - 12/06</div>
                      <div className="class-status">En attente</div>
                    </div>
                    <div className="upcoming-class cancelled">
                      <div className="class-header">Python</div>
                      <div className="class-time">03/06 - 08/06</div>
                      <div className="class-status">Annulé / Refusé</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="add-subject-form" onSubmit={handleAddSubject}>
                <input 
                  type="text" 
                  name="newSubject" 
                  placeholder="Ajouter une matière" 
                  className="add-subject-input" 
                  required 
                />
                <button type="submit" className="add-subject-button">Ajouter</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;