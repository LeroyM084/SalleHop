import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './school_admin.module.css';

function SchoolAdmin() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [newSchool, setNewSchool] = useState({ name: '' });
  const [editingSchoolId, setEditingSchoolId] = useState(null);
  const [editedSchool, setEditedSchool] = useState({ name: '' });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('http://localhost:8080/school');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSchools(data);
    } catch (error) {
      console.error("Could not fetch schools:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewSchool({ ...newSchool, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditedSchool({ ...editedSchool, [e.target.name]: e.target.value });
  };

  const createSchool = async () => {
    try {
      const response = await fetch('http://localhost:8080/school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSchool),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      fetchSchools();
      setNewSchool({ name: '' });
    } catch (error) {
      console.error("Could not create school:", error);
    }
  };

  const updateSchool = async () => {
    try {
      const response = await fetch(`http://localhost:8080/school/${editingSchoolId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSchool),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchSchools();
      setEditingSchoolId(null);
      setEditedSchool({ name: '' });
    } catch (error) {
      console.error("Could not update school:", error);
    }
  };

  const deleteSchool = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/school/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchSchools();
    } catch (error) {
      console.error("Could not delete school:", error);
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
          <button className={`${styles.navItem} ${styles.active}`} onClick={() => navigateTo('/school')}>
            <div className={`${styles.navIcon} ${styles.schoolIcon}`}></div>
          </button>
          <button className={styles.navItem} onClick={() => navigateTo('/campus')}>
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
          <div className={styles.userInfo}>School Management</div>
          <div className={styles.notificationIcon}></div>
        </header>

        <div className={styles.schoolAdminContainer}>
          <h1 className={styles.title}>School Management</h1>

          <div className={styles.schoolList}>
            <h2 className={styles.subtitle}>Existing Schools</h2>
            {schools.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((school) => (
                    <tr key={school.id}>
                      <td>{school.id}</td>
                      <td>
                        {editingSchoolId === school.id ? (
                          <input
                            type="text"
                            name="name"
                            value={editedSchool.name}
                            onChange={handleEditInputChange}
                            className={styles.input}
                          />
                        ) : (
                          school.name
                        )}
                      </td>
                      <td>
                        {editingSchoolId === school.id ? (
                          <>
                            <button className={styles.updateButton} onClick={updateSchool}>Update</button>
                            <button className={styles.cancelButton} onClick={() => setEditingSchoolId(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button className={styles.editButton} onClick={() => {
                              setEditingSchoolId(school.id);
                              setEditedSchool({ name: school.name });
                            }}>Edit</button>
                            <button className={styles.deleteButton} onClick={() => deleteSchool(school.id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.noData}>No schools found.</p>
            )}
          </div>

          <div className={styles.addSchool}>
            <h2 className={styles.subtitle}>Add New School</h2>
            <input
              type="text"
              name="name"
              placeholder="School Name"
              value={newSchool.name}
              onChange={handleInputChange}
              className={styles.input}
            />
            <button className={styles.createButton} onClick={createSchool}>Create School</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolAdmin;
