import React, { useState, useRef } from 'react';
import './CampusDetails.css';

const CampusDetailsPopup = ({ campus, onClose, onReserve }) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const containerRef = useRef(null);

  // État pour les filtres de recherche
  const [searchFilters, setSearchFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '18:00',
    capacity: '',
    equipment: ''
  });

  // Gestionnaire de clic pour la fermeture
  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Ajouter/Retirer l'écouteur d'événements
  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // État pour les salles filtrées
  const [filteredRooms, setFilteredRooms] = useState(campus.availableRooms);

  // Gestion des changements de filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction de recherche
  const handleSearch = async () => {
    try {
      // Simulation d'appel API - À remplacer par votre vrai appel API
      const response = await fetch(`http://votre-api/rooms/available`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campusId: campus.id,
          ...searchFilters
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setFilteredRooms(data.rooms);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  const handleReserveClick = (room, e) => {
    e.preventDefault();
    e.stopPropagation();
    onReserve(room, campus.name);
  };

  return (
    <div className="campus-details-overlay" onClick={handleOutsideClick}>
      <div className="campus-details-container" ref={containerRef} onClick={e => e.stopPropagation()}>
        <div className="header">
          <h3>{campus.name}</h3>
          <button 
            className="search-button"
            onClick={() => setSearchExpanded(!searchExpanded)}
          >
            {searchExpanded ? 'Masquer la recherche' : 'Rechercher une salle'}
          </button>
        </div>

        {/* Section de recherche extensible */}
        <div className={`room-search-section ${searchExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="search-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={searchFilters.date}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="filter-group">
                <label>De</label>
                <input
                  type="time"
                  name="startTime"
                  value={searchFilters.startTime}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="filter-group">
                <label>À</label>
                <input
                  type="time"
                  name="endTime"
                  value={searchFilters.endTime}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="filter-row">
              <div className="filter-group">
                <label>Capacité min.</label>
                <input
                  type="number"
                  name="capacity"
                  value={searchFilters.capacity}
                  onChange={handleFilterChange}
                  placeholder="Nombre de places"
                />
              </div>
              <div className="filter-group">
                <label>Équipement</label>
                <select
                  name="equipment"
                  value={searchFilters.equipment}
                  onChange={handleFilterChange}
                >
                  <option value="">Tous</option>
                  <option value="computer">Ordinateurs</option>
                  <option value="projector">Projecteur</option>
                  <option value="whiteboard">Tableau blanc</option>
                </select>
              </div>
              <button className="search-button" onClick={handleSearch}>
                Rechercher
              </button>
            </div>
          </div>
        </div>

        {/* Liste des salles principale */}
        <div className="content">
          <div className="rooms-section">
            <h4>Salles disponibles</h4>
            <div className="available-rooms">
              {filteredRooms.map((room, index) => (
                <div key={index} className="room-item">
                  <span className="room-name">{room}</span>
                  <button
                    className="reserve-button"
                    onClick={(e) => handleReserveClick(room, e)}
                  >
                    Réserver
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusDetailsPopup;

