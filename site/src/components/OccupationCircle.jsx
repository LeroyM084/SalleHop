import React from 'react';

const OccupationCircle = ({ percentage, color }) => {
  return (
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
          stroke={color}
          strokeWidth="4"
          fill="transparent"
          r="26"
          cx="30"
          cy="30"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - percentage / 100)}`}
          transform="rotate(-90 30 30)"
        />
      </svg>
      <span className="occupation-percentage">{percentage}%</span>
    </div>
  );
};

export default OccupationCircle;
