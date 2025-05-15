import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(31);
  const [userName, setUserName] = useState({ prenom: '', nom: '' });
  const [loading, setLoading] = useState(true);

  // Récupérer le nom et prénom de l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await fetch('http://10.111.60.225:8200/api/profile/name', {
          method: 'GET', // Correction de 'methods' en 'method'
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Ajout d'un espace après 'Bearer' et utilisation de getItem
          }
        });

        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const data = await res.json();
        setUserName({ 
          prenom: data.prenom || '', 
          nom: data.nom || '' 
        });
      } catch (error) {
        console.error('Erreur:', error);
        // Fallback en cas d'erreur
        setUserName({ prenom: 'Utilisateur', nom: '' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  // Données d'exemple pour le calendrier
  const calendarData = {
    days: ['27/05', '28/05', '29/05', '30/05', '31/05'],
    timeSlots: [
      { id: 1, time: '8h' },
      { id: 2, time: '10h' },
      { id: 3, time: '12h' },
      { id: 4, time: '14h' },
      { id: 5, time: '16h' },
      { id: 6, time: '18h' }
    ],
    events: [
      { id: 1, day: '27/05', startTime: '8h', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 2, day: '27/05', startTime: '14h', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 3, day: '28/05', startTime: '8h', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 4, day: '28/05', startTime: '14h', room: 'Informatique - 154', type: 'EPITECH' },
      { id: 5, day: '29/05', startTime: '8h', room: 'Outlook - 3', type: 'IIM CDA' },
      { id: 6, day: '29/05', startTime: '14h', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 7, day: '30/05', startTime: '8h', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 8, day: '30/05', startTime: '14h', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 9, day: '30/05', startTime: '16h', room: 'Sup de vinci - 1', type: 'Labo Cyber' },
      { id: 10, day: '31/05', startTime: '8h', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 11, day: '31/05', startTime: '14h', room: 'Sup de vinci - 204', type: 'ESILV' }
    ],
    notifications: [
      { id: 1, type: 'success', message: 'Sup de Vinci - 204 | 6 mai de 8h à 9h', detail: 'Votre réservation a été acceptée.' },
      { id: 2, type: 'info', message: 'Sup de Vinci - 204 | 6 mai de 10h à 14h', detail: 'Vous avez été ajouté à un cours.' }
    ]
  };

  // Fonctions pour la navigation dans le calendrier
  const previousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const nextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  // Fonction pour trouver les événements à une date et heure spécifiques
  const getEventsForTimeSlot = (day, time) => {
    return calendarData.events.filter(event => event.day === day && event.startTime === time);
  };

  // Fonction pour déterminer la classe CSS en fonction du type d'événement
  const getEventClass = (type) => {
    switch (type) {
      case 'ESILV':
        return 'event-esilv';
      case 'EPITECH':
        return 'event-epitech';
      case 'IIM CDA':
        return 'event-iim';
      case 'Labo Cyber':
        return 'event-cyber';
      default:
        return 'event-default';
    }
  };

  // Fonction pour aller vers une autre page
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Barre de navigation latérale */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-placeholder"></div>
        </div>
        <nav className="nav-menu">
          <button className="nav-item active" onClick={() => navigateTo('/dashboard')}>
            <div className="nav-icon home-icon"></div>
          </button>
            <button className="nav-item" onClick={() => navigateTo('/graduation')}>
            <div className="nav-icon graduation-icon"></div>
            </button>
          <button className="nav-item" onClick={() => navigateTo('/profile')}>
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
        {/* En-tête avec nom utilisateur et notification */}
        <header className="dashboard-header">
          <div className="user-info">
            {loading ? 'Chargement...' : `${userName.prenom} ${userName.nom}`}
          </div>
          <div className="notification-icon"></div>
        </header>

        {/* Section calendrier */}
        <section className="calendar-section">
          <div className="calendar-header">
            <div className="week-selector">
              <span>Semaine {currentWeek}</span>
              <div className="navigation-buttons">
                <button className="nav-button" onClick={previousWeek}>
                  &lt;
                </button>
                <button className="nav-button" onClick={nextWeek}>
                  &gt;
                </button>
              </div>
            </div>
          </div>
          
          <div className="calendar-grid">
            {/* En-tête des jours */}
            <div className="time-header"></div>
            {calendarData.days.map((day, index) => (
              <div key={index} className="day-header">{day}</div>
            ))}
            
            {/* Grille du calendrier avec créneaux horaires */}
            {calendarData.timeSlots.map(slot => (
              <React.Fragment key={slot.id}>
                <div className="time-slot-label">{slot.time}</div>
                
                {calendarData.days.map((day, dayIndex) => {
                  const events = getEventsForTimeSlot(day, slot.time);
                  return (
                    <div key={`${slot.id}-${dayIndex}`} className="calendar-cell">
                      {events.map(event => (
                        <div 
                          key={event.id} 
                          className={`calendar-event ${getEventClass(event.type)}`}
                        >
                          <div className="event-title">{event.room}</div>
                          <div className="event-type">{event.type}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Section notifications */}
        <section className="notifications-section">
          <h2 className="section-title">Dernières notifications</h2>
          <div className="notifications-list">
            {calendarData.notifications.map(notification => (
              <div key={notification.id} className={`notification-item ${notification.type}`}>
                <div className="notification-icon"></div>
                <div className="notification-content">
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-detail">{notification.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;