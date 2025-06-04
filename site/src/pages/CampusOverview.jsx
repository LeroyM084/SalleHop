import React, { useState, useRef } from 'react';
import CampusCard from '../components/CampusCard';
import CampusDetailsPopup from '../components/CampusDetailsPopup';
import { campusData } from '../data/campusData';
import { useOutsideClick } from '../hooks/useOutsideClick';

const CampusOverview = ({ onReserveRoom }) => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const popupRef = useRef(null);

  const handleCampusClick = (campus) => {
    setSelectedCampus(campus);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedCampus(null);
  };

  const handleReserveClick = (room, campus) => {
    onReserveRoom({ salle: room, campus });
  };

  useOutsideClick(popupRef, showDetails, closeDetails);

  return (
    <section className="campus-overview-section">
      <h2 className="section-title">Vue d'ensemble des campus</h2>
      <div className="campus-grid">
        {campusData.map(campus => (
          <CampusCard 
            key={campus.id}
            campus={campus}
            onClick={handleCampusClick}
          />
        ))}
      </div>

      {showDetails && selectedCampus && (
        <CampusDetailsPopup
          campus={selectedCampus}
          onClose={closeDetails}
          onReserve={handleReserveClick}
          popupRef={popupRef}
        />
      )}
    </section>
  );
};

export default CampusOverview;
