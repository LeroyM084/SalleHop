import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './campus_admin.module.css';

function CampusAdmin() {
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState([]);
  const [newCampus, setNewCampus] = useState({ name: '', address: '' });
  const [editingCampusId, setEditingCampusId] = useState(null);
  const [editedCampus, setEditedCampus] = useState({ name: '', address: '' });

  useEffect(() => {
    fetchCampuses();
  }, []);

  const fetchCampuses = async () => {
    try {
      const response = await fetch('http://localhost:8080/campus'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCampuses(data);
    } catch (error) {
      console.error("Could not fetch campuses:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCampus({ ...newCampus, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditedCampus({ ...editedCampus, [e.target.name]: e.target.value });
  };

  const createCampus = async () => {
    try {
      const response = await fetch('http://localhost:8080/campus', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCampus),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse the response body
      fetchCampuses(); // Refresh campus list
      setNewCampus({ name: '', address: '' }); // Clear input fields
    } catch (error) {
      console.error("Could not create campus:", error);
    }
  };

  const updateCampus = async () => {
    try {
      const response = await fetch(`http://localhost:8080/campus/${editingCampusId}`, { // Replace with your API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCampus),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCampuses(); // Refresh campus list
      setEditingCampusId(null); // Exit editing mode
      setEditedCampus({ name: '', address: '' });
    } catch (error) {
      console.error("Could not update campus:", error);
    }
  };

  const deleteCampus = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/campus/${id}`, { // Replace with your API endpoint
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCampuses(); // Refresh campus list
    } catch (error) {
      console.error("Could not delete campus:", error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoPlaceholder}></div>
        </div>
        <nav className={styles.navMenu}>
          <button className={styles.navItem} onClick={() => navigateTo('/dashboard')}>
            <div className={`${styles.navIcon} ${styles.homeIcon}`}></div>
          </button>
          <button className={styles.navItem} onClick={() => navigateTo('/school')}>
            <div className={`${styles.navIcon} ${styles.schoolIcon}`}></div>
          </button>
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigateTo('/campus')}>
            <div className={`${styles.navIcon} ${styles.campusIcon}`}></div>
          </button>
          <button className={styles.navItem} onClick={() => navigateTo('/profile')}>
            <div className={`${styles.navIcon} ${styles.profileIcon}`}></div>
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.navItem} onClick={() => navigateTo('/settings')}>
            <div className={`${styles.navIcon} ${styles.settingsIcon}`}></div>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <div className={styles.userInfo}>Campus Management</div>
          <div className={styles.notificationIcon}></div>
        </header>

        <div className={styles.campusAdminContainer}>
          <h1 className={styles.title}>Campus Management</h1>

          <div className={styles.campusList}>
            <h2 className={styles.subtitle}>Existing Campuses</h2>
            {campuses.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campuses.map((campus) => (
                    <tr key={campus.Identifiant}>
                      <td>{campus.Identifiant}</td>
                      <td>
                        {editingCampusId === campus.Identifiant ? (
                          <input
                            type="text"
                            name="name"
                            value={editedCampus.name}
                            onChange={handleEditInputChange}
                            className={styles.input}
                          />
                        ) : (
                          campus.name
                        )}
                      </td>
                      <td>
                        {editingCampusId === campus.Identifiant ? (
                          <input
                            type="text"
                            name="address"
                            value={editedCampus.adress}
                            onChange={handleEditInputChange}
                            className={styles.input}
                          />
                        ) : (
                          campus.adress
                        )}
                      </td>
                      <td>
                        {editingCampusId === campus.Identifiant ? (
                          <>
                            <button className={styles.updateButton} onClick={updateCampus}>Update</button>
                            <button className={styles.cancelButton} onClick={() => setEditingCampusId(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button className={styles.editButton} onClick={() => {
                              setEditingCampusId(campus.Identifiant);
                              setEditedCampus({ name: campus.name, address: campus.adress });
                            }}>Edit</button>
                            <button className={styles.deleteButton} onClick={() => deleteCampus(campus.Identifiant)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.noData}>No campuses found.</p>
            )}
          </div>

          <div className={styles.addCampus}>
            <h2 className={styles.subtitle}>Add New Campus</h2>
            <input
              type="text"
              name="name"
              placeholder="Campus Name"
              value={newCampus.name}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="text"
              name="address"
              placeholder="Campus Address"
              value={newCampus.address}
              onChange={handleInputChange}
              className={styles.input}
            />
            <button className={styles.createButton} onClick={createCampus}>Create Campus</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampusAdmin;