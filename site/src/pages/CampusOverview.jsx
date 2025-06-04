import React, { useState, useEffect, useRef } from 'react';

const CampusOverview = ({ onReserveRoom }) => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const popupRef = useRef(null);

  const campusData = [
    {
      id: 1,
      name: 'Sup de Vinci',
      occupationRate: 75,
      totalRooms: 24,
      availableRooms: ['salle 11', 'salle 15', 'salle 3', 'salle labo 1'],
      occupiedRooms: 18,
      color: '#4ECDC4'
    },
    {
      id: 2,
      name: 'ESILV Campus',
      occupationRate: 60,
      totalRooms: 20,
      availableRooms: ['salle A12', 'salle B5', 'amphithéâtre 2'],
      occupiedRooms: 12,
      color: '#45B7D1'
    },
    {
      id: 3,
      name: 'EPITECH',
      occupationRate: 85,
      totalRooms: 18,
      availableRooms: ['lab 3', 'room 201'],
      occupiedRooms: 15,
      color: '#96CEB4'
    },
    {
      id: 4,
      name: 'IIM Digital',
      occupationRate: 40,
      totalRooms: 15,
      availableRooms: ['studio 1', 'studio 2', 'salle créa', 'lab mac'],
      occupiedRooms: 6,
      color: '#FFEAA7'
    }
  ];

  const handleCampusClick = (campus) => {
    setSelectedCampus(campus);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedCampus(null);
  };

  const handleReserveClick = (room, e) => {
    e.preventDefault();
    e.stopPropagation();
    onReserveRoom({
      salle: room,
      campus: selectedCampus.name
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDetails && popupRef.current && !popupRef.current.contains(event.target) && event.target.classList.contains('campus-details-overlay')) {
        closeDetails();
      }
    };

    if (showDetails) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDetails]);

  return (
    <section className="campus-overview-section">
      <h2 className="section-title">Vue d'ensemble des campus</h2>
      <div className="campus-grid">
        {campusData.map(campus => (
          <div 
            key={campus.id} 
            className="campus-card" 
            onClick={() => handleCampusClick(campus)}
          >
            <div className="campus-header">
              <h3 className="campus-name">{campus.name}</h3>
            </div>
            
            <div className="occupation-display">
              <div className="occupation-circle">
                <svg className="progress-ring" width="60" height="60">
                  <circle
                    className="progress-ring-bg"
                    stroke="#e6e6e6"
                    strokeWidth="4"
                    fill="transparent"
                    r="26"
                    cx="30"
                    cy="30"
                  />
                  <circle
                    className="progress-ring-progress"
                    stroke={campus.color}
                    strokeWidth="4"
                    fill="transparent"
                    r="26"
                    cx="30"
                    cy="30"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - campus.occupationRate / 100)}`}
                    transform="rotate(-90 30 30)"
                  />
                </svg>
                <span className="occupation-percentage">{campus.occupationRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedCampus && (
        <div className="campus-details-overlay">
          <div className="campus-details-popup" ref={popupRef}>
            <div className="popup-header">
              <h3>{selectedCampus.name}</h3>
              <button className="close-button" onClick={closeDetails}>×</button>
            </div>
            
            <div className="popup-content">
              <div className="rooms-section">
                <h4>Salles disponibles</h4>
                <div className="available-rooms">
                  {selectedCampus.availableRooms.map((room, index) => (
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
      )}
    </section>
  );
};

export default CampusOverview;
