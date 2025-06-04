import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './reservation_user.css';

const RoomReservation = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({ prenom: '', nom: '' });
  const [loading, setLoading] = useState(true);

  const [selectedClass, setSelectedClass] = useState('B3DEV');
  // Nouveaux états pour jour, heure début, heure fin
  const [selectedDay, setSelectedDay] = useState('27/05');
  const [selectedStartTime, setSelectedStartTime] = useState('8h00');
  const [selectedEndTime, setSelectedEndTime] = useState('9h00');

  // Récupérer le nom et prénom de l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Simulation de récupération de données utilisateur
        setTimeout(() => {
          setUserName({ 
            prenom: 'Utilisateur', 
            nom: '' 
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Erreur:', error);
        setUserName({ prenom: 'Utilisateur', nom: '' });
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  // Données d'exemple pour les salles disponibles
  const roomOptions = [
    { id: '204', name: '204' },
    { id: '205', name: '205' },
    { id: '206', name: '206' },
    { id: '154', name: '154' },
  ];

  // Données d'exemple pour les classes
  const classOptions = [
    { id: 'B3DEV', name: 'B3DEV' },
    { id: 'B2DEV', name: 'B2DEV' },
    { id: 'M1INFO', name: 'M1INFO' },
    { id: 'M2DATA', name: 'M2DATA' },
  ];

  // Données d'exemple pour le calendrier de disponibilité
  const weekdays = ['27/05', '28/05', '29/05', '30/05', '31/05', '01/06', '02/06'];
  
  // Plage horaire de la journée (8h - 18h)
  const startHour = 8;
  const endHour = 18;
  const slotCount = (endHour - startHour) * 2; // 20 demi-heures

  const timeSlots = Array.from({ length: slotCount + 1 }, (_, i) => {
  const hour = startHour + Math.floor(i / 2);
  const min = i % 2 === 0 ? '00' : '30';
  return `${hour}h${min}`;
});

  // Exemple de réservations existantes
  const bookings = [
    { day: '27/05', start: '8h00', end: '13h30', title: 'Cours B3DEV' },
    { day: '27/05', start: '14h00', end: '16h00', title: 'Réunion' },
    { day: '28/05', start: '9h00', end: '12h00', title: 'TD M1INFO' },  
    { day: '29/05', start: '10h00', end: '11h00', title: 'Soutien' },
    { day: '30/05', start: '8h00', end: '10h00', title: 'Cours B2DEV' },
    { day: '30/05', start: '14h00', end: '17h00', title: 'TP M2DATA' },
    { day: '31/05', start: '8h00', end: '10h00', title: 'Conférence' },
    { day: '31/05', start: '15h00', end: '17h00', title: 'Atelier' },
  ];

  // Fonction pour convertir un format horaire "Xh00" en nombre d'heures depuis le début de la journée
  const getHourValue = (timeStr) => {
    const hour = parseInt(timeStr.split('h')[0]);
    return hour - startHour; // Nombre d'heures depuis le début (8h)
  };

  // Fonction pour calculer la position et la hauteur d'une réservation
const calculateBookingPosition = (booking) => {
  const getMinutes = (str) => {
    const [h, m] = str.split('h');
    const hour = parseInt(h, 10);
    const min = parseInt(m || '0', 10);
    if (isNaN(hour) || isNaN(min)) return 0;
    return (hour * 60 + min) - (startHour * 60);
  };
  const startOffset = getMinutes(booking.start);
  const endOffset = getMinutes(booking.end);
  const duration = endOffset - startOffset;

  const totalMinutes = (endHour - startHour) * 60;
  const top = (startOffset / totalMinutes) * 100;
  const height = (duration / totalMinutes) * 100;

  return { top, height };
};

  // Fonction pour la réservation d'une salle
  const handleReservation = () => {
    // Cette fonction sera implémentée plus tard pour communiquer avec l'API
    alert(
        `Réservation enregistrée pour la classe ${selectedClass}, le ${selectedDay} de ${selectedStartTime} à ${selectedEndTime}.`
    );
  };

  // Fonction pour naviguer vers une autre page
  const navigateTo = (path) => {
    navigate(path);
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
            <div className="nav-icon calendar-icon"></div>
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
            Réservations
          </div>
          <div className="notification-icon"></div>
        </header>

        {/* Section de réservation */}
        <section className="reservation-section">
          <h2 className="section-title">Réserver une salle</h2>
          
          <div className="reservation-form">
            <div className="form-row">
              {/* Champ Classe */}
              <div className="form-group">
                <label>Pour quelle Classe ?</label>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="form-select"
                >
                  {classOptions.map(classOption => (
                    <option key={classOption.id} value={classOption.id}>{classOption.name}</option>
                  ))}
                </select>
              </div>
              {/* Champ Jour */}
              <div className="form-group">
                <label>Jour</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="form-select"
                >
                  {weekdays.map((day, idx) => (
                    <option key={idx} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">

              {/* Champ Heure de début */}
              <div className="form-group">
                <label>Heure de début</label>
                <select
                  value={selectedStartTime}
                  onChange={(e) => setSelectedStartTime(e.target.value)}
                  className="form-select"
                >
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              {/* Champ Heure de fin */}
              <div className="form-group">
                <label>Heure de fin</label>
                <select
                  value={selectedEndTime}
                  onChange={(e) => setSelectedEndTime(e.target.value)}
                  className="form-select"
                >
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="reservation_user-calendar-container">
            <h3 className="reservation_user-calendar-title">Créneaux</h3>
            
            <div className="reservation_user-calendar-grid">
              <div className="reservation_user-calendar-header">
                {weekdays.map((day, index) => (
                  <div key={index} className="day-column-header">{day}</div>
                ))}
              </div>
              
             <div className="reservation_user-calendar-body">
              <div className="calendar-time-indicators">
                {timeSlots.map((slot, idx) => (
                  <div key={idx} className="time-indicator">
                    {slot}
                  </div>
                ))}
              </div>
              <div className="calendar-columns-container">
                {weekdays.map((day, dayIndex) => (
                  <div key={dayIndex} className="day-column">
                    {/* Lignes horaires pour la grille visuelle */}
                    {timeSlots.slice(1).map((_, slotIdx) => (
                      <div
                        key={slotIdx}
                        className="hour-line"
                        style={{ top: `${(slotIdx / slotCount) * 100}%` }}
                      ></div>
                    ))}
                    {/* Réservations pour ce jour */}
                    {bookings
                      .filter(booking => booking.day === day)
                      .map((booking, bookingIndex) => {
                        const { top, height } = calculateBookingPosition(booking);
                        return (
                          <div
                            key={bookingIndex}
                            className="booking-block"
                            style={{
                              top: `${top}%`,
                              height: `${height}%`
                            }}
                          >
                            <div className="booking-content">
                              <div className="booking-time">
                                {booking.start} - {booking.end}
                              </div>
                              <div className="booking-title">
                                {booking.title}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reservation-footer">
              <button className="reservation-button" onClick={handleReservation}>
                Réserver
              </button>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
};

export default RoomReservation;