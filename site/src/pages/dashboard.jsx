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

  // États pour la popup d'ajout d'événement
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [showRecurrencePopup, setShowRecurrencePopup] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);
  const [eventForm, setEventForm] = useState({
    groupe: '',
    cours: '',
    salle: '',
    utilisateur: '', // ID de l'utilisateur connecté
    date: '',
    starting_hours: '',
    finishing_hours: ''
  });

  // État pour la récurrence
  const [recurrenceForm, setRecurrenceForm] = useState({
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

  // Données pour les dropdowns (à remplacer par des appels API)
  const [groupes, setGroupes] = useState([
    { id: 1, nom: 'A1 ESILV' },
    { id: 2, nom: 'A2 ESILV' },
    { id: 3, nom: 'A3 ESILV' },
    { id: 4, nom: 'B1 EPITECH' },
    { id: 5, nom: 'B2 EPITECH' },
    { id: 6, nom: 'M1 IIM CDA' },
    { id: 7, nom: 'M2 IIM CDA' }
  ]);

  const [cours, setCours] = useState([]);
  const [salles, setSalles] = useState([
    { id: 1, nom: 'Sup de vinci - 204' },
    { id: 2, nom: 'Informatique - 154' },
    { id: 3, nom: 'Outlook - 3' },
    { id: 4, nom: 'Sup de vinci - 1' }
  ]);

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
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Mathématiques - A1 ESILV',
      start: `${weekDates[0]}T08:00:00`,
      end: `${weekDates[0]}T12:30:00`,
      backgroundColor: '#ff7f7f',
      borderColor: '#ff7f7f',
      textColor: '#ffffff',
      extendedProps: {
        groupe: 'A1 ESILV',
        cours: 'Mathématiques',
        salle: 'Sup de vinci - 204'
      }
    },
    {
      id: '2',
      title: 'Programmation C - B1 EPITECH',
      start: `${weekDates[1]}T14:00:00`,
      end: `${weekDates[1]}T16:00:00`,
      backgroundColor: '#90ee90',
      borderColor: '#90ee90',
      textColor: '#000000',
      extendedProps: {
        groupe: 'B1 EPITECH',
        cours: 'Programmation C',
        salle: 'Informatique - 154'
      }
    }
  ]);

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

  const navigateTo = (path) => {
    navigate(path);
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

    // Si le groupe change, mettre à jour les cours disponibles
    if (field === 'groupe') {
      const groupeId = parseInt(value);
      setCours(coursByGroupe[groupeId] || []);
      setEventForm(prev => ({
        ...prev,
        cours: '' // Reset cours selection
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
  const createEvent = () => {
    if (!eventForm.groupe || !eventForm.cours || !eventForm.salle) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Ici vous ajouterez l'appel API pour créer l'événement en base
    const eventData = {
      date_: eventForm.date,
      starting_hours: eventForm.starting_hours,
      finishing_hours: eventForm.finishing_hours,
      Identifiant_1: parseInt(eventForm.salle), // ID de la salle
      Identifiant_2: parseInt(eventForm.groupe), // ID du groupe
      Identifiant_3: 1, // ID de l'utilisateur (à récupérer du token)
      Identifiant_4: parseInt(eventForm.cours) // ID du cours
    };

    console.log('Données à envoyer à la DB:', eventData);

    // Créer l'événement pour l'affichage (temporaire)
    const selectedGroupe = groupes.find(g => g.id === parseInt(eventForm.groupe));
    const selectedCours = cours.find(c => c.id === parseInt(eventForm.cours));
    const selectedSalle = salles.find(s => s.id === parseInt(eventForm.salle));

    const newEvent = {
      id: Date.now().toString(),
      title: `${selectedCours?.nom} - ${selectedGroupe?.nom}`,
      start: `${eventForm.date}T${eventForm.starting_hours}:00`,
      end: `${eventForm.date}T${eventForm.finishing_hours}:00`,
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
      textColor: '#ffffff',
      extendedProps: {
        groupe: selectedGroupe?.nom,
        cours: selectedCours?.nom,
        salle: selectedSalle?.nom
      }
    };

    setEvents(prev => [...prev, newEvent]);
    closeEventPopup();
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
    setRecurrenceForm({
      frequency: 'semaine',
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
      endType: 'never',
      endDate: '',
      occurrences: 1
    });
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
    } = recurrenceForm;

    const startDate = new Date(eventForm.date);
    const startTime = eventForm.starting_hours;
    const endTime = eventForm.finishing_hours;

    let dates = [];
    let count = 0;
    let current = new Date(startDate);

    // Pour les jours sélectionnés (repeatOn)
    const daysOfWeek = Object.entries(repeatOn)
      .filter(([_, v]) => v)
      .map(([k]) => {
        // 0: dimanche, 1: lundi, ..., 6: samedi
        return (
          {
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
            sunday: 0
          }[k]
        );
      });

    // Si aucun jour sélectionné, prendre le jour de départ
    if (daysOfWeek.length === 0) {
      daysOfWeek.push(current.getDay());
    }

    // Limite de sécurité
    const maxOccurrences = 100;

    while (true) {
      // Pour chaque semaine/mois, ajouter les jours sélectionnés
      if (frequency === 'semaine') {
        // Trouver la première semaine à partir de la date de départ
        let weekStart = new Date(current);
        // Pour chaque semaine
        for (let week = 0; ; week++) {
          // Pour chaque jour sélectionné
          for (let d of daysOfWeek) {
            // Calculer la date du jour dans la semaine
            let dayDate = new Date(weekStart);
            dayDate.setDate(weekStart.getDate() + ((d - weekStart.getDay() + 7) % 7) + week * 7 * repeatEvery);
            // Ne pas ajouter avant la date de départ
            if (dayDate < startDate) continue;
            // Arrêt selon endType
            if (endType === 'date' && endDate && dayDate > new Date(endDate)) return dates;
            if (endType === 'occurrences' && count >= occurrences) return dates;
            if (count >= maxOccurrences) return dates;
            // Ajout
            dates.push({
              date: dayDate.toISOString().split('T')[0],
              startTime,
              endTime
            });
            count++;
          }
          // Arrêt selon endType
          if (endType === 'occurrences' && count >= occurrences) return dates;
          if (endType === 'date' && endDate && new Date(weekStart).setDate(weekStart.getDate() + 7 * repeatEvery) > new Date(endDate)) return dates;
          if (count >= maxOccurrences) return dates;
        }
      } else if (frequency === 'mois') {
        // Pour chaque mois
        let monthStart = new Date(current);
        for (let month = 0; ; month++) {
          for (let d of daysOfWeek) {
            // Chercher le premier jour d dans le mois
            let firstDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + month * repeatEvery, 1);
            let dayInMonth = new Date(firstDayOfMonth);
            dayInMonth.setDate(
              1 +
                ((d - firstDayOfMonth.getDay() + 7) % 7)
            );
            // Si ce jour est dans le bon mois
            if (dayInMonth.getMonth() === firstDayOfMonth.getMonth()) {
              // Ne pas ajouter avant la date de départ
              if (dayInMonth < startDate) continue;
              // Arrêt selon endType
              if (endType === 'date' && endDate && dayInMonth > new Date(endDate)) return dates;
              if (endType === 'occurrences' && count >= occurrences) return dates;
              if (count >= maxOccurrences) return dates;
              // Ajout
              dates.push({
                date: dayInMonth.toISOString().split('T')[0],
                startTime,
                endTime
              });
              count++;
            }
          }
          // Arrêt selon endType
          if (endType === 'occurrences' && count >= occurrences) return dates;
          if (endType === 'date' && endDate && new Date(monthStart.getFullYear(), monthStart.getMonth() + (month + 1) * repeatEvery, 1) > new Date(endDate)) return dates;
          if (count >= maxOccurrences) return dates;
        }
      } else {
        // Par défaut, une seule occurrence
        dates.push({
          date: startDate.toISOString().split('T')[0],
          startTime,
          endTime
        });
        return dates;
      }
    }
  };

  // Créer événement récurrent
  const createRecurrentEvent = () => {
    // Générer toutes les occurrences
    const occurrences = generateRecurrenceDates();

    // Récupérer les infos sélectionnées
    const selectedGroupe = groupes.find(g => g.id === parseInt(eventForm.groupe));
    const selectedCours = cours.find(c => c.id === parseInt(eventForm.cours));
    const selectedSalle = salles.find(s => s.id === parseInt(eventForm.salle));

    // Créer les événements
    const newEvents = occurrences.map((occ, idx) => ({
      id: `${Date.now()}_${idx}`,
      title: `${selectedCours?.nom} - ${selectedGroupe?.nom}`,
      start: `${occ.date}T${occ.startTime}:00`,
      end: `${occ.date}T${occ.endTime}:00`,
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
      textColor: '#ffffff',
      extendedProps: {
        groupe: selectedGroupe?.nom,
        cours: selectedCours?.nom,
        salle: selectedSalle?.nom
      }
    }));

    setEvents(prev => [...prev, ...newEvents]);
    closeRecurrencePopup();
    closeEventPopup();
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
          <button className="nav-item" onClick={() => navigateTo('/school')}>
            <div className="nav-icon school-icon"></div>
          </button>
          <button className="nav-item" onClick={() => navigateTo('/campus')}>
            <div className="nav-icon campus-icon"></div>
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
              headerToolbar={false}
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
              firstDay={1}
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
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: '08:00',
                endTime: '19:00',
              }}
              eventDidMount={(info) => {
                info.el.style.borderRadius = '4px';
                info.el.style.fontSize = '12px';
              }}
              selectAllow={() => true}
              unselectAuto={false}
            />
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
                  {groupes.map(groupe => (
                    <option key={groupe.id} value={groupe.id}>{groupe.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Cours *</label>
                <select
                  value={eventForm.cours}
                  onChange={(e) => handleFormChange('cours', e.target.value)}
                  disabled={!eventForm.groupe}
                  required
                >
                  <option value="">Sélectionnez un cours</option>
                  {cours.map(coursItem => (
                    <option key={coursItem.id} value={coursItem.id}>{coursItem.nom}</option>
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
                  {salles.map(salle => (
                    <option key={salle.id} value={salle.id}>{salle.nom}</option>
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
                <button className="create-button" onClick={createEvent}>
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
              <button className="create-button" onClick={createRecurrentEvent}>
                Terminé
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;