import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './reservation_user.css';

const RoomReservation = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({ prenom: '', nom: '' });
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState('204');
  const [selectedInstructor, setSelectedInstructor] = useState('M.Joubert');
  const [selectedClass, setSelectedClass] = useState('B3DEV');

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

  // Données d'exemple pour les formateurs
  const instructorOptions = [
    { id: 'M.Joubert', name: 'M.Joubert' },
    { id: 'Mme.Martin', name: 'Mme.Martin' },
    { id: 'M.Dupont', name: 'M.Dupont' },
    { id: 'M.Bernard', name: 'M.Bernard' },
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
  const totalHours = endHour - startHour;

  // Exemple de réservations existantes
  const bookings = [
    { day: '27/05', start: '8h00', end: '12h00', title: 'Cours B3DEV' },
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
    const startOffset = getHourValue(booking.start);
    const endOffset = getHourValue(booking.end);
    const duration = endOffset - startOffset;
    
    // Calculer la position top et la hauteur en pourcentage de la journée totale
    const top = (startOffset / totalHours) * 100;
    const height = (duration / totalHours) * 100;
    
    return { top, height };
  };

  // Fonction pour la réservation d'une salle
  const handleReservation = () => {
    // Cette fonction sera implémentée plus tard pour communiquer avec l'API
    alert('Votre demande de réservation a été enregistrée.');
  };

  // Fonction pour naviguer vers une autre page
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
          <button className="nav-item" onClick={() => navigateTo('/dashboard')}>
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
            Réservations
          </div>
          <div className="notification-icon"></div>
        </header>

        {/* Section de réservation */}
        <section className="reservation-section">
          <h2 className="section-title">Réserver une salle</h2>
          
          <div className="reservation-form">
            <div className="form-row">
              <div className="form-group">
                <label>Pour quel formateur ?</label>
                <select 
                  value={selectedInstructor} 
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="form-select"
                >
                  {instructorOptions.map(instructor => (
                    <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                  ))}
                </select>
              </div>
              
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
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Numéro de salle</label>
                <select 
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="form-select"
                >
                  {roomOptions.map(room => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ))}
                </select>
                {selectedRoom === '204' && (
                  <div className="room-warning">
                    <span className="warning-icon">⚠️</span>
                    La salle 204 est prisée par les formateurs
                  </div>
                )}
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
                  {Array.from({ length: totalHours + 1 }).map((_, index) => (
                    <div key={index} className="time-indicator">
                      {`${startHour + index}h00`}
                    </div>
                  ))}
                </div>
                
                <div className="calendar-columns-container">
                  {weekdays.map((day, dayIndex) => (
                    <div key={dayIndex} className="day-column">
                      {/* Lignes horaires pour la grille visuelle */}
                      {Array.from({ length: totalHours }).map((_, hourIndex) => (
                        <div key={hourIndex} className="hour-line"></div>
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
            </div>
            
            <div className="reservation-footer">
              <button className="reservation-button" onClick={handleReservation}>
                Réserver
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoomReservation;