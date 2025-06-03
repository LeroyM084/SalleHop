import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(31);
  const [userName, setUserName] = useState({ prenom: '', nom: '' });
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef(null);

  // Récupérer le nom et prénom de l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await fetch('http://10.111.60.225:8200/api/profile/name', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
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
        setUserName({ prenom: 'Utilisateur', nom: '' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);
// Remplacez la section des événements dans votre composant Dashboard par ceci :

// Fonction pour obtenir les dates de la semaine actuelle
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Lundi = 1
  
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
  }
  
  return dates;
};

const weekDates = getCurrentWeekDates();

// Événements formatés pour FullCalendar avec dates actuelles
const events = [
  {
    id: '1',
    title: 'Sup de vinci - 204',
    start: `${weekDates[0]}T08:00:00`, // Lundi 8h-10h
    end: `${weekDates[0]}T12:30:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  },
  {
    id: '2',
    title: 'Sup de vinci - 204',
    start: `${weekDates[0]}T14:00:00`, // Lundi 14h-16h
    end: `${weekDates[0]}T16:00:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  },
  {
    id: '3',
    title: 'Sup de vinci - 204',
    start: `${weekDates[1]}T08:00:00`, // Mardi 8h-12h
    end: `${weekDates[1]}T12:00:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  },
  {
    id: '4',
    title: 'Informatique - 154',
    start: `${weekDates[1]}T14:00:00`, // Mardi 14h-16h
    end: `${weekDates[1]}T16:00:00`,
    backgroundColor: '#90ee90',
    borderColor: '#90ee90',
    textColor: '#000000',
    extendedProps: {
      type: 'EPITECH',
      room: 'Informatique - 154'
    }
  },
  {
    id: '5',
    title: 'Outlook - 3',
    start: `${weekDates[2]}T08:00:00`, // Mercredi 8h-10h
    end: `${weekDates[2]}T10:00:00`,
    backgroundColor: '#87cefa',
    borderColor: '#87cefa',
    textColor: '#000000',
    extendedProps: {
      type: 'IIM CDA',
      room: 'Outlook - 3'
    }
  },
  {
    id: '6',
    title: 'Sup de vinci - 204',
    start: `${weekDates[2]}T14:00:00`, // Mercredi 14h-16h
    end: `${weekDates[2]}T16:00:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  },
  {
    id: '7',
    title: 'Sup de vinci - 204',
    start: `${weekDates[3]}T08:00:00`, // Jeudi 8h-10h
    end: `${weekDates[3]}T10:00:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  },
  {
    id: '8',
    title: 'Sup de vinci - 204',
    start: `${weekDates[3]}T14:00:00`, // Jeudi 14h-16h
    end: `${weekDates[3]}T16:00:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  },
  {
    id: '9',
    title: 'Sup de vinci - 1',
    start: `${weekDates[3]}T16:00:00`, // Jeudi 16h-18h
    end: `${weekDates[3]}T18:00:00`,
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
    textColor: '#ffffff',
    extendedProps: {
      type: 'Labo Cyber',
      room: 'Sup de vinci - 1'
    }
  },
  {
    id: '10',
    title: 'Sup de vinci - 204',
    start: `${weekDates[4]}T08:00:00`, // Vendredi 8h-10h
    end: `${weekDates[4]}T10:00:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  },
  {
    id: '11',
    title: 'Sup de vinci - 204',
    start: `${weekDates[4]}T14:00:00`, // Vendredi 14h-16h
    end: `${weekDates[4]}T16:00:00`,
    backgroundColor: '#ff7f7f',
    borderColor: '#ff7f7f',
    textColor: '#ffffff',
    extendedProps: {
      type: 'ESILV',
      room: 'Sup de vinci - 204'
    }
  }
];

  // Notifications
  const notifications = [
    { id: 1, type: 'success', message: 'Sup de Vinci - 204 | 6 mai de 8h à 9h', detail: 'Votre réservation a été acceptée.' },
    { id: 2, type: 'info', message: 'Sup de Vinci - 204 | 6 mai de 10h à 14h', detail: 'Vous avez été ajouté à un cours.' }
  ];

  // Fonctions de navigation
  const previousWeek = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
    }
    setCurrentWeek(currentWeek - 1);
  };

  const nextWeek = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
    }
    setCurrentWeek(currentWeek + 1);
  };

  const goToToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
    }
  };

  const changeView = (viewName) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(viewName);
    }
  };

  // Fonction pour aller vers une autre page
  const navigateTo = (path) => {
    navigate(path);
  };

  // Gestionnaires d'événements FullCalendar
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    alert(`Événement: ${event.title}\nType: ${event.extendedProps.type}\nSalle: ${event.extendedProps.room}`);
  };

  const handleDateSelect = (selectInfo) => {
    console.log('Date sélectionnée:', selectInfo);
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

        {/* Section calendrier avec FullCalendar */}
        <section className="dashboard-calendar-section">
          <div className="dashboard-calendar-header">
            <div className="week-selector">
              <span>Semaine {currentWeek}</span>
              <div className="navigation-buttons">
                <button className="nav-button" onClick={previousWeek}>
                  &lt;
                </button>
                <button className="nav-button" onClick={goToToday}>
                  Aujourd'hui
                </button>
                <button className="nav-button" onClick={nextWeek}>
                  &gt;
                </button>
              </div>
            </div>
            <div className="view-buttons">
              <button className="nav-button" onClick={() => changeView('timeGridWeek')}>
                Semaine
              </button>
              <button className="nav-button" onClick={() => changeView('dayGridMonth')}>
                Mois
              </button>
              <button className="nav-button" onClick={() => changeView('timeGridDay')}>
                Jour
              </button>
            </div>
          </div>

          {/* FullCalendar */}
          <div className="fullcalendar-container">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={false} // Désactive l'en-tête par défaut pour utiliser le nôtre
              events={events}
              height="600px"
              slotMinTime="08:00:00"
              slotMaxTime="19:00:00"
              slotDuration="01:00:00"
              slotLabelInterval="02:00:00"
              weekends={true}
              editable={false}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekNumbers={false}
              navLinks={false}
              locale="fr"
              firstDay={1} // Commencer par lundi
              allDaySlot={false}
              slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: false
              }}
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: false
              }}
              eventClick={handleEventClick}
              select={handleDateSelect}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5], // Lundi à vendredi
                startTime: '08:00',
                endTime: '19:00',
              }}
              eventDidMount={(info) => {
                // Personnalisation avancée des événements si nécessaire
                info.el.style.borderRadius = '4px';
                info.el.style.fontSize = '12px';
              }}
            />
          </div>

          {/* Légende des couleurs */}
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#ff7f7f'}}></div>
              <span>ESILV</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#90ee90'}}></div>
              <span>EPITECH</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#87cefa'}}></div>
              <span>IIM CDA</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{backgroundColor: '#ff6b6b'}}></div>
              <span>Labo Cyber</span>
            </div>
          </div>
        </section>

        {/* Section notifications */}
        <section className="notifications-section">
          <h2 className="section-title">Dernières notifications</h2>
          <div className="notifications-list">
            {notifications.map(notification => (
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