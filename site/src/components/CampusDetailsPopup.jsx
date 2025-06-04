import React from 'react';

const CampusDetailsPopup = ({ campus, onClose, onReserve, popupRef }) => {
  const handleReserveClick = (room, e) => {
    e.preventDefault();
    e.stopPropagation();
    onReserve(room, campus.name);
  };

  return (
    <div className="campus-details-overlay">
      <div className="campus-details-popup" ref={popupRef}>
        <div className="popup-header">
          <h3>{campus.name}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="popup-content">
          <div className="rooms-section">
            <h4>Salles disponibles</h4>
            <div className="available-rooms">
              {campus.availableRooms.map((room, index) => (
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
