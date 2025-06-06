import React, { useState, useRef, useEffect } from 'react'; // Ajout de useEffect
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Calendar from '../components/calendar/Calendar';
import NotificationsList from '../components/notifications/NotificationsList';
import { useCalendar } from '../hooks/useCalendar';
import { groupes, salles, notifications } from '../data/mockData';
import './dashboard.css';
import CampusOverview from './CampusOverview';
import { createEvent } from '../services/eventService';

const Dashboard = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [cours, setCours] = useState([]);
  const { currentView, currentDate, setCurrentDate, changeView, navigationActions } = useCalendar();  // Add setCurrentDate here
  
  // États pour la popup d'ajout d'événement
  const [showEventPopup, setShowEventPopup] = React.useState(false);
  const [showRecurrencePopup, setShowRecurrencePopup] = React.useState(false);
  const [selectedDates, setSelectedDates] = React.useState(null);
  const [eventForm, setEventForm] = React.useState({
    groupe: '',
    cours: '',
    salle: '',
    utilisateur: '', // ID de l'utilisateur connecté
    date: '',
    starting_hours: '',
    finishing_hours: ''
  });

  // État pour la récurrence
  const [recurrenceForm, setRecurrenceForm] = React.useState({
    frequency: 'semaine', // semaine, mois
    repeatEvery: 1,
    repeatOn: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    endType: 'never', // never, date, occurrences
    endDate: '',
    occurrences: 1
  });

  // Ajouter un état pour stocker la configuration de récurrence active
  const [activeRecurrence, setActiveRecurrence] = useState(null);

  // Au début du composant Dashboard, avec les autres états
  const [apiData, setApiData] = useState({
    rooms: [],
    courses: [],
    groups: []
  });

  // Cours par groupe (simulation de données relationnelles)
  const coursByGroupe = {
    1: [{ id: 1, nom: 'Mathématiques' }, { id: 2, nom: 'Physique' }, { id: 3, nom: 'Informatique' }],
    2: [{ id: 4, nom: 'Algorithmique' }, { id: 5, nom: 'Base de données' }],
    3: [{ id: 6, nom: 'Réseaux' }, { id: 7, nom: 'Cybersécurité' }],
    4: [{ id: 8, nom: 'Programmation C' }, { id: 9, nom: 'Unix' }],
    5: [{ id: 10, nom: 'Java' }, { id: 11, nom: 'Web Development' }],
    6: [{ id: 12, nom: 'UX/UI Design' }, { id: 13, nom: 'Développement Web' }],
    7: [{ id: 14, nom: 'Gestion de projet' }, { id: 15, nom: 'Architecture logicielle' }]
  };

  // Fonction pour obtenir les dates de la semaine actuelle
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const weekDates = getCurrentWeekDates();

  // État pour les événements (maintenant modifiable)
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour transformer les événements de l'API en format calendrier
  const transformEvents = (apiEvents) => {
    console.log('Transforming events:', apiEvents); // Debug log important
    return apiEvents.map(event => {
      try {
        // Gestion correcte des noms de salle avec campus
        const salleName = event.salle ? `${event.salle.nom} - ${event.salle.campus?.nom}` : 'Salle non définie';
        
        // Construction plus robuste de l'événement
        const transformedEvent = {
          id: event.id,
          title: `${event.cours?.nom || 'Cours sans nom'} - ${salleName}`,
          // Utilisation correcte des champs de l'API
          start: `${event.date.split('T')[0]}T${event.heure_debut}`,
          end: `${event.date.split('T')[0]}T${event.heure_fin}`,
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          textColor: '#ffffff',
          extendedProps: {
            salle: salleName,
            cours: event.cours?.nom,
            groupe: event.groupe?.nom,
            status: event.status // Ajout du status
          }
        };
        console.log('Transformed event:', transformedEvent);
        return transformedEvent;
      } catch (error) {
        console.error('Error transforming event:', event, error);
        return null;
      }
    }).filter(Boolean);
};

  // Fetch des événements au chargement
  useEffect(() => {
  let isMounted = true;

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      console.log('Fetching events...'); // Debug log
      const response = await fetch('http://10.111.9.158:8200/api/events/events', {
        headers: {
          'Authorization': `Bearer ${token}`, // Correction des backticks
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data); // Debug log

      if (isMounted && data.data && Array.isArray(data.data)) {
        const transformedEvents = transformEvents(data.data);
        console.log('Final transformed events:', transformedEvents); // Debug log
        setEvents(transformedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      if (isMounted) setEvents([]);
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  fetchEvents();
  return () => { isMounted = false; };
}, [navigate]);

  // Après les autres useEffect
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        console.log('Fetching form data...');
        const response = await fetch('http://localhost:8200/api/data/getData', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log('Form data received:', jsonData);

        setApiData({
          rooms: jsonData.data.salle || [],
          courses: jsonData.data.cours || [],
          groups: jsonData.data.groupe || []
        });

      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchApiData();
  }, [navigate]);

  // Ajoutez ces états
  // const [currentView, setCurrentView] = React.useState('timeGridWeek');
  // const [currentDate, setCurrentDate] = React.useState(new Date());

  // Modifiez la fonction changeView
  const changeViewHandler = (viewName) => {
    changeView(calendarRef, viewName);
  };

  // Ajoutez ces fonctions
  const formatDateHeader = () => {
    const date = currentDate;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    switch (currentView) {
      case 'timeGridDay':
        return date.toLocaleDateString('fr-FR', options);
      
      case 'timeGridWeek':
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay() + 1);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `Semaine du ${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au ${end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
      
      case 'dayGridMonth':
        return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      
      default:
        return '';
    }
  };

  // Modifiez les fonctions de navigation
  const previousWeek = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const nextWeek = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const goToToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setCurrentDate(calendarApi.getDate());
    }
  };

  // Gestionnaires d'événements FullCalendar
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    alert(`Cours: ${event.title}\nGroupe: ${event.extendedProps.groupe}\nSalle: ${event.extendedProps.salle}`);
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedDates(selectInfo);
    
    // Pré-remplir les champs date et heure
    const startDate = new Date(selectInfo.start);
    const endDate = new Date(selectInfo.end);
    
    setEventForm(prev => ({
      ...prev,
      date: startDate.toISOString().split('T')[0],
      starting_hours: startDate.toTimeString().slice(0, 5),
      finishing_hours: endDate.toTimeString().slice(0, 5)
    }));
    
    setShowEventPopup(true);
  };

  // Gestion du formulaire d'événement
  const handleFormChange = (field, value) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'groupe') {
      const groupeId = parseInt(value);
      setCours(coursByGroupe[groupeId] || []);
      setEventForm(prev => ({
        ...prev,
        cours: ''
      }));
    }
  };

  // Gestion du formulaire de récurrence
  const handleRecurrenceChange = (field, value) => {
    if (field.startsWith('repeatOn.')) {
      const day = field.split('.')[1];
      setRecurrenceForm(prev => ({
        ...prev,
        repeatOn: {
          ...prev.repeatOn,
          [day]: value
        }
      }));
    } else {
      setRecurrenceForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Créer un nouvel événement
  const handleCreateEvent = async () => {
    if (!eventForm.groupe || !eventForm.cours || !eventForm.salle) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      console.log('Creating event with data:', eventForm); // Debug log

      const selectedGroup = apiData.groups.find(g => g.identifiant === parseInt(eventForm.groupe));
      const selectedCourse = apiData.courses.find(c => c.identifiant === parseInt(eventForm.cours));
      const selectedRoom = apiData.rooms.find(r => r.identifiant === parseInt(eventForm.salle));

      if (!selectedGroup || !selectedCourse || !selectedRoom) {
        throw new Error('Données de sélection invalides');
      }

      const eventData = {
        groupName: selectedGroup.nom,
        coursLabel: selectedCourse.nom,
        roomNumber: selectedRoom.nom,
        timeSlot: {
          date: eventForm.date,
          startTime: eventForm.starting_hours,
          endTime: eventForm.finishing_hours
        },
        recurrence: {
          status: recurrenceForm.endType !== 'never',
          daygap: recurrenceForm.frequency === 'semaine' ? 7 : 30,
          iteration: recurrenceForm.endType === 'occurrences' ? recurrenceForm.occurrences : null,
          day: Object.keys(recurrenceForm.repeatOn)
            .filter(day => recurrenceForm.repeatOn[day])
            .map(day => day.toLowerCase())
        }
      };

      console.log('Sending event data:', eventData); // Debug log

      const response = await createEvent(eventData);
      console.log('Server response:', response); // Debug log

      if (response.message === 'Evènement créé avec succès.') {
        const newEvents = generateEventsFromResponse(response.data);
        setEvents(prev => [...prev, ...newEvents]);
        closeEventPopup();
        alert('Événement créé avec succès!');
      }
    } catch (error) {
      console.error('Erreur complète:', error);
      alert(`Erreur lors de la création de l'événement: ${error.message}`);
    }
};

const generateEventsFromResponse = (eventData) => {
    // Transformer les données de l'API en format d'événement pour le calendrier
    return Array.isArray(eventData) ? eventData.map(event => ({
        id: event.id,
        title: `${event.cours} - ${event.groupe}`,
        start: `${event.date}T${event.startTime}`,
        end: `${event.date}T${event.endTime}`,
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        textColor: '#ffffff',
        extendedProps: {
            groupe: event.groupe,
            cours: event.cours,
            salle: event.salle
        }
    })) : [];
};

  // Fermer la popup
  const closeEventPopup = () => {
    setShowEventPopup(false);
    setSelectedDates(null);
    setEventForm({
      groupe: '',
      cours: '',
      salle: '',
      utilisateur: '',
      date: '',
      starting_hours: '',
      finishing_hours: ''
    });
    setCours([]);
    
    // Désélectionner dans le calendrier
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.unselect();
    }
  };

  // Ouvrir popup de récurrence
  const openRecurrencePopup = () => {
    setShowRecurrencePopup(true);
  };

  // Fermer popup de récurrence
  const closeRecurrencePopup = () => {
    setShowRecurrencePopup(false);
    // Sauvegarder la configuration de récurrence actuelle
    setActiveRecurrence(recurrenceForm);
  };

  // Génère les dates d'occurrences selon la récurrence
  const generateRecurrenceDates = () => {
    const {
      frequency,
      repeatEvery,
      repeatOn,
      endType,
      endDate,
      occurrences
    } = activeRecurrence || recurrenceForm;

    const startDate = new Date(eventForm.date);
    const startTime = eventForm.starting_hours;
    const endTime = eventForm.finishing_hours;

    let dates = [];
    let count = 0;
    const maxOccurrences = 100;

    // Obtenir les jours sélectionnés
    const selectedDays = Object.entries(repeatOn)
      .filter(([_, selected]) => selected)
      .map(([day]) => ({
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 0
      })[day]);

    if (selectedDays.length === 0) {
      selectedDays.push(startDate.getDay() || 7);
    }

    // Calculer la date de fin
    const endDateLimit = endType === 'date' ? new Date(endDate)
      : endType === 'occurrences' 
        ? new Date(startDate.getTime() + (occurrences * (frequency === 'semaine' ? 7 : 31) * repeatEvery * 24 * 60 * 60 * 1000))
        : new Date(startDate.getTime() + (maxOccurrences * 31 * 24 * 60 * 60 * 1000));

    let currentDate = new Date(startDate);
    let iterationCount = 0;

    while (currentDate <= endDateLimit && count < maxOccurrences) {
      if (frequency === 'semaine') {
        // Logique existante pour la récurrence hebdomadaire
        let mondayOfWeek = new Date(currentDate);
        mondayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

        for (const dayNum of selectedDays) {
          let eventDate = new Date(mondayOfWeek);
          eventDate.setDate(mondayOfWeek.getDate() + (dayNum === 0 ? 6 : dayNum - 1));

          if (eventDate >= startDate && eventDate <= endDateLimit) {
            dates.push({
              date: eventDate.toISOString().split('T')[0],
              startTime,
              endTime
            });
            count++;
          }
        }

        // Avancer d'une semaine
        currentDate.setDate(currentDate.getDate() + (7 * repeatEvery));
      } else {
        // Logique pour la récurrence mensuelle
        for (const dayNum of selectedDays) {
          let eventDate = new Date(currentDate);
          let week = Math.floor((startDate.getDate() - 1) / 7);
          let dayInMonth = 1 + week * 7 + (dayNum === 0 ? 6 : dayNum - 1);
          
          eventDate.setDate(dayInMonth);

          // Vérifier si la date est valide
          if (eventDate.getMonth() === currentDate.getMonth() && 
              eventDate >= startDate && 
              eventDate <= endDateLimit) {
            dates.push({
              date: eventDate.toISOString().split('T')[0],
              startTime,
              endTime
            });
            count++;
          }
        }

        // Avancer d'un mois
        currentDate.setMonth(currentDate.getMonth() + repeatEvery);
      }

      iterationCount++;
      if (endType === 'occurrences' && iterationCount >= occurrences) {
        break;
      }
    }

    return dates;
  };

  const { previous, next, today } = navigationActions(calendarRef);

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <header className="dashboard-header">
          <div className="user-info">Accueil</div>
          <div className="notification-icon"></div>
        </header>

        <CampusOverview />

        <section className="dashboard-calendar-section">
          {/* Calendar navigation controls */}
          <div className="dashboard-calendar-header">
            <div className="week-selector">
              <span>{formatDateHeader()}</span>
              <div className="navigation-buttons">
                <button className="nav-button" onClick={previous}>
                  &lt;
                </button>
                <button className="nav-button" onClick={today}>
                  Aujourd'hui
                </button>
                <button className="nav-button" onClick={next}>
                  &gt;
                </button>
              </div>
            </div>
            <div className="view-buttons">
              <button 
                className={`nav-button ${currentView === 'timeGridWeek' ? 'active' : ''}`} 
                onClick={() => changeViewHandler('timeGridWeek')}
              >
                Semaine
              </button>
              <button 
                className={`nav-button ${currentView === 'dayGridMonth' ? 'active' : ''}`} 
                onClick={() => changeViewHandler('dayGridMonth')}
              >
                Mois
              </button>
              <button 
                className={`nav-button ${currentView === 'timeGridDay' ? 'active' : ''}`} 
                onClick={() => changeViewHandler('timeGridDay')}
              >
                Jour
              </button>
            </div>
          </div>

          <div className="fullcalendar-container">
            {isLoading ? (
              <div className="loading">Chargement des événements...</div>
            ) : (
              <Calendar
                calendarRef={calendarRef}
                events={events}
                handleEventClick={handleEventClick}
                handleDateSelect={handleDateSelect}
              />
            )}
          </div>
        </section>

        <NotificationsList notifications={notifications} />
      </div>

      {/* Popup d'ajout d'événement */}
      {showEventPopup && (
        <div className="event-popup-overlay">
          <div className="event-popup">
            <div className="popup-header">
              <h3>Nouveau créneau de cours</h3>
              <button className="close-button" onClick={closeEventPopup}>×</button>
            </div>
            
            <div className="popup-content">
              <div className="form-group">
                <label>Groupe *</label>
                <select
                  value={eventForm.groupe}
                  onChange={(e) => handleFormChange('groupe', e.target.value)}
                  required
                >
                  <option value="">Sélectionnez un groupe</option>
                  {apiData.groups.map(group => (
                    <option key={group.identifiant} value={group.identifiant}>
                      {group.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Cours *</label>
                <select
                  value={eventForm.cours}
                  onChange={(e) => handleFormChange('cours', e.target.value)}
                  required
                >
                  <option value="">Sélectionnez un cours</option>
                  {apiData.courses.map(course => (
                    <option key={course.identifiant} value={course.identifiant}>
                      {course.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Salle *</label>
                <select
                  value={eventForm.salle}
                  onChange={(e) => handleFormChange('salle', e.target.value)}
                  required
                >
                  <option value="">Sélectionnez une salle</option>
                  {apiData.rooms.map(room => (
                    <option key={room.identifiant} value={room.identifiant}>
                      {room.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Heure de début *</label>
                  <input
                    type="time"
                    value={eventForm.starting_hours}
                    onChange={(e) => handleFormChange('starting_hours', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Heure de fin *</label>
                  <input
                    type="time"
                    value={eventForm.finishing_hours}
                    onChange={(e) => handleFormChange('finishing_hours', e.target.value)}
                    required
                  />
                </div>
              </div>

              {selectedDates && (
                <div className="date-info">
                  <strong>Créneau sélectionné:</strong><br/>
                  Du {new Date(selectedDates.start).toLocaleString('fr-FR')} <br/>
                  Au {new Date(selectedDates.end).toLocaleString('fr-FR')}
                </div>
              )}
            </div>

            <div className="popup-footer">
              <button className="recurrence-button" onClick={openRecurrencePopup}>
                + Récurrence
              </button>
              <div className="footer-buttons">
                <button className="cancel-button" onClick={closeEventPopup}>
                  Annuler
                </button>
                <button className="create-button" onClick={handleCreateEvent}>
                  Créer le créneau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup de récurrence */}
      {showRecurrencePopup && (
        <div className="event-popup-overlay">
          <div className="recurrence-popup">
            <div className="popup-header">
              <h3>Récurrence personnalisée</h3>
              <button className="close-button" onClick={closeRecurrencePopup}>×</button>
            </div>
            
            <div className="popup-content">
              <div className="form-row">
                <div className="form-group">
                  <label>Répéter tout(e)s les</label>
                  <input
                    type="number"
                    min="1"
                    value={recurrenceForm.repeatEvery}
                    onChange={(e) => handleRecurrenceChange('repeatEvery', parseInt(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <select
                    value={recurrenceForm.frequency}
                    onChange={(e) => handleRecurrenceChange('frequency', e.target.value)}
                  >
                    <option value="semaine">semaine</option>
                    <option value="mois">mois</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Répéter le</label>
                <div className="day-selector">
                  {[
                    { key: 'monday', label: 'L', full: 'Lundi' },
                    { key: 'tuesday', label: 'M', full: 'Mardi' },
                    { key: 'wednesday', label: 'M', full: 'Mercredi' },
                    { key: 'thursday', label: 'J', full: 'Jeudi' },
                    { key: 'friday', label: 'V', full: 'Vendredi' },
                    { key: 'saturday', label: 'S', full: 'Samedi' },
                    { key: 'sunday', label: 'D', full: 'Dimanche' }
                  ].map(day => (
                    <button
                      key={day.key}
                      type="button"
                      className={`day-button ${recurrenceForm.repeatOn[day.key] ? 'selected' : ''}`}
                      onClick={() => handleRecurrenceChange(`repeatOn.${day.key}`, !recurrenceForm.repeatOn[day.key])}
                      title={day.full}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Se termine</label>
                <div className="end-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="endType"
                      value="never"
                      checked={recurrenceForm.endType === 'never'}
                      onChange={(e) => handleRecurrenceChange('endType', e.target.value)}
                    />
                    <span>Jamais</span>
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="endType"
                      value="date"
                      checked={recurrenceForm.endType === 'date'}
                      onChange={(e) => handleRecurrenceChange('endType', e.target.value)}
                    />
                    <span>Le</span>
                    <input
                      type="date"
                      value={recurrenceForm.endDate}
                      onChange={(e) => handleRecurrenceChange('endDate', e.target.value)}
                      disabled={recurrenceForm.endType !== 'date'}
                      className="inline-input"
                    />
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="endType"
                      value="occurrences"
                      checked={recurrenceForm.endType === 'occurrences'}
                      onChange={(e) => handleRecurrenceChange('endType', e.target.value)}
                    />
                    <span>Après</span>
                    <input
                      type="number"
                      min="1"
                      value={recurrenceForm.occurrences}
                      onChange={(e) => handleRecurrenceChange('occurrences', parseInt(e.target.value))}
                      disabled={recurrenceForm.endType !== 'occurrences'}
                      className="inline-input"
                    />
                    <span>occurrences</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="popup-footer">
              <button className="cancel-button" onClick={closeRecurrencePopup}>
                Annuler
              </button>
              <button className="create-button" onClick={closeRecurrencePopup}>
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;