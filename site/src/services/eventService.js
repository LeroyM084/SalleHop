const API_URL = 'http://localhost:8200/api/events';

export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('http://localhost:8200/api/addEvents/newEvent', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      const errorData = await response.text(); // Utiliser text() au lieu de json()
      console.error('Response error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Create event error:', error);
    throw new Error(`Erreur de création: ${error.message}`);
  }
};
