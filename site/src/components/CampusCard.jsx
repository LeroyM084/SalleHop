import React from 'react';
import OccupationCircle from './OccupationCircle';

const CampusCard = ({ campus, onClick }) => {
  return (
    <div className="campus-card" onClick={() => onClick(campus)}>
      <div className="campus-header">
        <h3 className="campus-name">{campus.name}</h3>
      </div>
      <div className="occupation-display">
        <OccupationCircle 
          percentage={campus.occupationRate} 
          color={campus.color} 
        />
      </div>
    </div>
  );
};

export default CampusCard;
