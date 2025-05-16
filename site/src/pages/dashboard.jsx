import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import RoomReservation from './reservation_user';

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
      { id: 1, day: '27/05', startTime: '8h00', endTime: '10h00', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 2, day: '27/05', startTime: '14h00', endTime: '16h00', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 3, day: '28/05', startTime: '8h00', endTime: '12h00', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 4, day: '28/05', startTime: '14h00', endTime: '16h00', room: 'Informatique - 154', type: 'EPITECH' },
      { id: 5, day: '29/05', startTime: '8h00', endTime: '10h00', room: 'Outlook - 3', type: 'IIM CDA' },
      { id: 6, day: '29/05', startTime: '14h00', endTime: '16h00', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 7, day: '30/05', startTime: '8h00', endTime: '10h00', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 8, day: '30/05', startTime: '14h00', endTime: '16h00', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 9, day: '30/05', startTime: '16h00', endTime: '18h00', room: 'Sup de vinci - 1', type: 'Labo Cyber' },
      { id: 10, day: '31/05', startTime: '8h00', endTime: '10h00', room: 'Sup de vinci - 204', type: 'ESILV' },
      { id: 11, day: '31/05', startTime: '14h00', endTime: '16h00', room: 'Sup de vinci - 204', type: 'ESILV' }
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
          <button className="nav-item" onClick={() => navigateTo('/reservation')}>
            <img src={require('../image/icon.png')} alt="Réservation" className="nav-img-icon" />
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
            Accueil
          </div>
          <div className="notification-icon"></div>
        </header>

               <section className="dashboard-calendar-section">
          <div className="dashboard-calendar-header">
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

          {/* Nouveau calendrier type "body" */}
          <div className="dashboard-calendar-body">
            <div className="dashboard-calendar-sidebar">
              {[8, 10, 12, 14, 16, 18].map((hour, i) => (
                <div key={hour} className="dashboard-calendar-hour-label" style={{
                  height: 'calc(100% / 6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  color: '#444',
                  borderBottom: i < 5 ? '1px solid #e0e0e0' : 'none',
                  paddingRight: 8,
                  background: i % 2 === 0 ? '#f0f0f0' : '#e6e6e6'
                }}>
                  {hour}h
                </div>
              ))}
            </div>
            <div className="dashboard-calendar-columns">
              {calendarData.days.map((day, dayIdx) => (
                <div key={dayIdx} className="dashboard-calendar-day-column">
                  <div className="dashboard-calendar-day-header">{day}</div>
                  <div className="dashboard-calendar-day-body">
                    {/* Affichage des rectangles pour chaque événement */}
                    {calendarData.events
                      .filter(ev => ev.day === day)
                      .map((ev, idx) => {
                        const getMinutes = (str) => {
                          const [h, m] = str.split('h');
                          return (parseInt(h) * 60 + parseInt(m || '0')) - (8 * 60);
                        };
                        const start = getMinutes(ev.startTime || '8h00');
                        const end = getMinutes(ev.endTime || '10h00');
                        const top = (start / 600) * 100;
                        const height = ((end - start) / 600) * 100;
                        let colorClass = 'event-default';
                        if (ev.type === 'ESILV') colorClass = 'event-esilv';
                        else if (ev.type === 'EPITECH') colorClass = 'event-epitech';
                        else if (ev.type === 'IIM CDA') colorClass = 'event-iim';
                        else if (ev.type === 'Labo Cyber') colorClass = 'event-cyber';
                        return (
                          <div
                            key={idx}
                            className={`dashboard-calendar-block ${colorClass}`}
                            style={{
                              top: `${top}%`,
                              height: `${height}%`
                            }}
                          >
                            <div className="dashboard-calendar-block-content">
                              <div className="event-title">{ev.room}</div>
                              <div className="event-type">{ev.type}</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
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