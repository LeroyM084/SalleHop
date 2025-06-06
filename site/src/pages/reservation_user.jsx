import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './reservation_user.css';

const RoomReservation = () => {
  console.log('Component mounting...'); // Log initial
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    rooms: [],
    courses: [],
    groups: []
  });

  const [formData, setFormData] = useState({
    group: '',
    course: '',
    room: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '09:00'
  });

  // Séparation de la logique de fetch dans une fonction dédiée
  const fetchInitialData = async (token) => {
    try {
      console.log('Making API call...');
      const response = await fetch('http://localhost:8200/api/data/getData', {
        method: 'GET', // Explicitement définir la méthode
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log('Data received:', jsonData);

      return jsonData;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  // useEffect avec une fonction plus claire
  useEffect(() => {
    console.log('useEffect triggered');
    
    const initializeData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Token present:', !!token);

        if (!token) {
          console.log('No token - redirecting');
          navigate('/login');
          return;
        }

        const jsonData = await fetchInitialData(token);
        
        setData({
          rooms: jsonData.data.salle || [],
          courses: jsonData.data.cours || [],
          groups: jsonData.data.groupe || []
        });
        
        console.log('Data updated successfully');
      } catch (error) {
        console.error('Initialization error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []); // Retirer navigate des dépendances pour éviter les re-renders

  // Gestion des changements de formulaire
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('authToken');
      const eventData = {
        groupName: formData.group,
        coursLabel: formData.course,
        roomNumber: formData.room,
        timeSlot: {
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime
        }
      };

      const response = await fetch('http://localhost:8200/api/events/newEvent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      // Réservation réussie
      alert('Réservation créée avec succès!');
      
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Erreur lors de la création de la réservation');
    }
  };

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="reservation-form-container">
      <form onSubmit={handleSubmit} className="reservation-form">
        <h2>Nouvelle Réservation</h2>
        
        <div className="form-group">
          <label>Groupe</label>
          <select 
            value={formData.group}
            onChange={(e) => handleFormChange('group', e.target.value)}
            required
          >
            <option value="">Sélectionnez un groupe</option>
            {data.groups.map(group => (
              <option key={group.identifiant} value={group.identifiant}>
                {group.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cours</label>
          <select 
            value={formData.course}
            onChange={(e) => handleFormChange('course', e.target.value)}
            required
          >
            <option value="">Sélectionnez un cours</option>
            {data.courses.map(course => (
              <option key={course.identifiant} value={course.identifiant}>
                {course.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Salle</label>
          <select 
            value={formData.room}
            onChange={(e) => handleFormChange('room', e.target.value)}
            required
          >
            <option value="">Sélectionnez une salle</option>
            {data.rooms.map(room => (
              <option key={room.identifiant} value={room.identifiant}>
                {room.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleFormChange('date', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Heure de début</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => handleFormChange('startTime', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Heure de fin</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => handleFormChange('endTime', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Créer la réservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomReservation;