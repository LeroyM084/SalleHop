import React from 'react';

const NotificationsList = ({ notifications }) => {
  return (
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
  );
};

export default NotificationsList;
