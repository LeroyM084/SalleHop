import React from 'react';
import '../styles/main.css';
import '../styles/dashboard.css';

const DashboardPage: React.FC = () => {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="Emineo Logo" />
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="active">
              <a href="/dashboard">
                <img src="/assets/images/icons/home.svg" alt="Accueil" />
                <span>Accueil</span>
              </a>
            </li>
            <li>
              <a href="/campus">
                <img src="/assets/images/icons/campus.svg" alt="Campus" />
                <span>Campus</span>
              </a>
            </li>
            <li>
              <a href="/profile">
                <img src="/assets/images/icons/profile.svg" alt="Profil" />
                <span>Profil</span>
              </a>
            </li>
            <li>
              <a href="/settings">
                <img src="/assets/images/icons/settings.svg" alt="Paramètres" />
                <span>Paramètres</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="campus-selector">
            <h1>Accueil</h1>
          </div>
          <div className="notification">
            <img src="/assets/images/icons/notification.svg" alt="Notifications" />
          </div>
        </header>

        <section className="planning-section">
          <div className="planning-header">
            <h2>Planning des salles</h2>
            <div className="campus-info">Campus Sup de Vinci Bordeaux</div>
          </div>

          <div className="planning-grid">
            <div className="room-row header-row">
              <div className="time-column"></div>
              <div className="room-column">204</div>
              <div className="room-column">205</div>
              <div className="room-column">206</div>
              <div className="room-column">207</div>
              <div className="room-column">208</div>
              <div className="room-column">
                <button className="scroll-right">
                  <span>&gt;</span>
                </button>
              </div>
            </div>

            {[27, 28, 29].map((day, i) => (
              <div className="planning-day" key={day}>
                <div className="date-column">{`${day}/05`}</div>
                <div className="room-planning">
                  {[204, 205, 206, 207, 208].map((room, j) => (
                    <div className="room-slot" key={j}>
                      {(day === 27 && room === 204) && <div className="reservation orange">Informatique<br />8h30 - 12h30</div>}
                      {(day === 27 && room === 205) && <div className="reservation red">Mathématiques<br />8h30 - 12h30</div>}
                      {((day === 27 && room === 206) || (day === 28 && room === 206) || (day === 29 && room === 206)) && (
                        <div className="reservation yellow">Anglais<br />8h30 - 12h30</div>
                      )}
                      {(day === 28 && room === 205) && <div className="reservation red">Mathématiques<br />8h30 - 12h30</div>}
                      {(day === 28 && room === 207) && <div className="reservation">Libre</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;